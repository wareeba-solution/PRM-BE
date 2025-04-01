var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FreeswitchService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as esl from 'esl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoipConfig } from '../entities/voip-config.entity';
import { CallLog } from '../entities/call-log.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
let FreeswitchService = FreeswitchService_1 = class FreeswitchService {
    constructor(configService, eventEmitter, voipConfigRepository, callLogRepository) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.voipConfigRepository = voipConfigRepository;
        this.callLogRepository = callLogRepository;
        this.logger = new Logger(FreeswitchService_1.name);
        this.isConnected = false;
    }
    async onModuleInit() {
        await this.connectToFreeswitch();
    }
    async connectToFreeswitch() {
        const config = await this.getFreeswitchConfig();
        try {
            this.connection = new esl.Connection(config.host, config.port, config.password);
            this.connection.on('esl::ready', () => {
                this.isConnected = true;
                this.logger.log('Connected to FreeSWITCH');
                this.connection.subscribe([
                    'CHANNEL_CREATE',
                    'CHANNEL_ANSWER',
                    'CHANNEL_HANGUP_COMPLETE'
                ]);
            });
            this.connection.on('esl::end', () => {
                this.isConnected = false;
                this.logger.warn('Disconnected from FreeSWITCH');
                setTimeout(() => this.connectToFreeswitch(), 5000);
            });
            this.connection.on('esl::event::CHANNEL_CREATE::*', (event) => {
                this.handleCallStart(event);
            });
            this.connection.on('esl::event::CHANNEL_ANSWER::*', (event) => {
                this.handleCallAnswer(event);
            });
            this.connection.on('esl::event::CHANNEL_HANGUP_COMPLETE::*', (event) => {
                this.handleCallEnd(event);
            });
        }
        catch (error) {
            this.logger.error(`Failed to connect to FreeSWITCH: ${error.message}`);
            setTimeout(() => this.connectToFreeswitch(), 5000);
        }
    }
    async getFreeswitchConfig() {
        let config = await this.voipConfigRepository.findOne({ where: { isActive: true } });
        if (!config) {
            return {
                host: this.configService.get('FREESWITCH_HOST', '127.0.0.1'),
                port: parseInt(this.configService.get('FREESWITCH_PORT', '8021')),
                password: this.configService.get('FREESWITCH_PASSWORD', 'ClueCon'),
                isActive: true,
            };
        }
        return config;
    }
    async handleCallStart(event) {
        const callerId = event.getHeader('Caller-Caller-ID-Number');
        const destination = event.getHeader('Caller-Destination-Number');
        const uuid = event.getHeader('Unique-ID');
        this.logger.log(`Call started: ${callerId} -> ${destination} (UUID: ${uuid})`);
        const callLog = this.callLogRepository.create({
            callUuid: uuid,
            callerNumber: callerId,
            destinationNumber: destination,
            startTime: new Date(),
            status: 'initiated',
        });
        await this.callLogRepository.save(callLog);
        this.eventEmitter.emit('call.started', { uuid, callerId, destination });
    }
    async handleCallAnswer(event) {
        const uuid = event.getHeader('Unique-ID');
        this.logger.log(`Call answered (UUID: ${uuid})`);
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: uuid } });
        if (callLog) {
            callLog.status = 'answered';
            callLog.answerTime = new Date();
            await this.callLogRepository.save(callLog);
        }
        this.eventEmitter.emit('call.answered', { uuid });
    }
    async handleCallEnd(event) {
        const uuid = event.getHeader('Unique-ID');
        const duration = parseInt(event.getHeader('variable_duration') || '0');
        const hangupCause = event.getHeader('variable_hangup_cause');
        this.logger.log(`Call ended (UUID: ${uuid}), duration: ${duration}s, cause: ${hangupCause}`);
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: uuid } });
        if (callLog) {
            callLog.status = 'completed';
            callLog.endTime = new Date();
            callLog.duration = duration;
            callLog.hangupCause = hangupCause;
            await this.callLogRepository.save(callLog);
        }
        this.eventEmitter.emit('call.ended', { uuid, duration, hangupCause });
    }
    async placeCall(destination, callerId) {
        if (!this.isConnected) {
            throw new Error('Not connected to FreeSWITCH');
        }
        const originationString = `{origination_caller_id_number=${callerId}}sofia/external/${destination}`;
        return new Promise((resolve, reject) => {
            this.connection.api('originate', originationString, (response) => {
                if (response.body && response.body.includes('-ERR')) {
                    this.logger.error(`Failed to place call: ${response.body}`);
                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                }
                else {
                    const uuid = response.body ? response.body.trim() : '';
                    this.logger.log(`Call placed to ${destination}, UUID: ${uuid}`);
                    resolve(uuid);
                }
            });
        });
    }
    async sendDTMF(uuid, digits) {
        if (!this.isConnected) {
            throw new Error('Not connected to FreeSWITCH');
        }
        return new Promise((resolve, reject) => {
            this.connection.api('uuid_send_dtmf', `${uuid} ${digits}`, (response) => {
                if (response.body && response.body.includes('-ERR')) {
                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                }
                else {
                    resolve();
                }
            });
        });
    }
    async hangupCall(uuid) {
        if (!this.isConnected) {
            throw new Error('Not connected to FreeSWITCH');
        }
        return new Promise((resolve, reject) => {
            this.connection.api('uuid_kill', uuid, (response) => {
                if (response.body && response.body.includes('-ERR')) {
                    reject(new Error(Array.isArray(response.body) ? response.body.join(', ') : response.body));
                }
                else {
                    resolve();
                }
            });
        });
    }
};
FreeswitchService = FreeswitchService_1 = __decorate([
    Injectable(),
    __param(2, InjectRepository(VoipConfig)),
    __param(3, InjectRepository(CallLog)),
    __metadata("design:paramtypes", [ConfigService,
        EventEmitter2,
        Repository,
        Repository])
], FreeswitchService);
export { FreeswitchService };
//# sourceMappingURL=freeswitch.service.js.map