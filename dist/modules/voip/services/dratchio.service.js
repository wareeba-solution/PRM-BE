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
var DratchioService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoipConfig } from '../entities/voip-config.entity';
import { FreeswitchService } from './freeswitch.service';
import { CallLog } from '../entities/call-log.entity';
import { InjectQueue } from '@nestjs/bull';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
let DratchioService = DratchioService_1 = class DratchioService {
    constructor(configService, freeswitchService, eventEmitter, voipConfigRepository, callLogRepository, voipQueue) {
        this.configService = configService;
        this.freeswitchService = freeswitchService;
        this.eventEmitter = eventEmitter;
        this.voipConfigRepository = voipConfigRepository;
        this.callLogRepository = callLogRepository;
        this.voipQueue = voipQueue;
        this.logger = new Logger(DratchioService_1.name);
        this.dratchioClient = null;
        this.initializeDratchio().catch(err => {
            this.logger.error(`Error during Dratchio initialization: ${err.message}`);
        });
    }
    async initializeDratchio() {
        try {
            const module = await import('../../../libs/dratchio');
            const { DratchioClient } = module;
            const config = await this.getDratchioConfig();
            this.dratchioClient = new DratchioClient({
                apiKey: config.apiKey,
                apiSecret: config.apiSecret,
                sipServer: config.sipServer,
                sipUsername: config.sipUsername,
                sipPassword: config.sipPassword,
            });
            this.dratchioClient.on('registered', () => {
                this.logger.log('Dratchio SIP client registered successfully');
            });
            this.dratchioClient.on('registrationFailed', (error) => {
                this.logger.error(`Dratchio SIP registration failed: ${error.message}`);
            });
            this.dratchioClient.on('incomingCall', (call) => {
                this.handleIncomingCall(call);
            });
            await this.dratchioClient.register();
            this.logger.log('Dratchio service initialized');
        }
        catch (error) {
            this.logger.error(`Failed to initialize Dratchio: ${error.message}`);
        }
    }
    async getDratchioConfig() {
        const config = await this.voipConfigRepository.findOne({
            where: { isActive: true, provider: 'dratchio' }
        });
        if (!config) {
            return {
                apiKey: this.configService.get('DRATCHIO_API_KEY'),
                apiSecret: this.configService.get('DRATCHIO_API_SECRET'),
                sipServer: this.configService.get('DRATCHIO_SIP_SERVER'),
                sipUsername: this.configService.get('DRATCHIO_SIP_USERNAME'),
                sipPassword: this.configService.get('DRATCHIO_SIP_PASSWORD'),
            };
        }
        return JSON.parse(config.configJson || '{}');
    }
    async handleIncomingCall(call) {
        const { callerId, destination } = call;
        this.logger.log(`Incoming call from ${callerId} to ${destination}`);
        const callLog = this.callLogRepository.create({
            callUuid: call.uuid,
            callerNumber: callerId,
            destinationNumber: destination,
            startTime: new Date(),
            status: 'ringing',
            provider: 'dratchio',
        });
        await this.callLogRepository.save(callLog);
        this.eventEmitter.emit('dratchio.incomingCall', {
            uuid: call.uuid,
            callerId,
            destination,
            accept: () => call.answer(),
            reject: () => call.hangup()
        });
        await this.voipQueue.add('handle-incoming-call', { callId: call.uuid }, {
            delay: 5000
        });
    }
    async placeCall(destination, callerId) {
        if (!this.dratchioClient) {
            throw new Error('Dratchio client not initialized');
        }
        try {
            const call = await this.dratchioClient.call({
                to: destination,
                from: callerId,
            });
            const callLog = this.callLogRepository.create({
                callUuid: call.uuid,
                callerNumber: callerId,
                destinationNumber: destination,
                startTime: new Date(),
                status: 'initiated',
                provider: 'dratchio',
            });
            await this.callLogRepository.save(callLog);
            return call.uuid;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to place call: ${errorMessage}`);
            throw error;
        }
    }
    async handleAppointmentReminder(payload) {
        const { patientPhone, message } = payload;
        const clinicNumber = this.configService.get('CLINIC_PHONE_NUMBER') || '';
        try {
            const callUuid = await this.placeCall(patientPhone, clinicNumber);
            await this.voipQueue.add('play-voice-message', {
                callUuid,
                message,
            });
            this.logger.log(`Appointment reminder call placed to ${patientPhone}`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Failed to send appointment reminder call: ${errorMessage}`);
        }
    }
};
__decorate([
    OnEvent('appointment.reminder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DratchioService.prototype, "handleAppointmentReminder", null);
DratchioService = DratchioService_1 = __decorate([
    Injectable(),
    __param(3, InjectRepository(VoipConfig)),
    __param(4, InjectRepository(CallLog)),
    __param(5, InjectQueue('voip-calls')),
    __metadata("design:paramtypes", [ConfigService,
        FreeswitchService,
        EventEmitter2,
        Repository,
        Repository, Object])
], DratchioService);
export { DratchioService };
//# sourceMappingURL=dratchio.service.js.map