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
var CallManagerService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallLog } from '../entities/call-log.entity';
import { FreeswitchService } from './freeswitch.service';
import { DratchioService } from './dratchio.service';
import { ConfigService } from '@nestjs/config';
import { Process, Processor } from '@nestjs/bull';
let CallManagerService = CallManagerService_1 = class CallManagerService {
    constructor(freeswitchService, dratchioService, configService, callLogRepository) {
        this.freeswitchService = freeswitchService;
        this.dratchioService = dratchioService;
        this.configService = configService;
        this.callLogRepository = callLogRepository;
        this.logger = new Logger(CallManagerService_1.name);
    }
    async placeCall(destination, options = {}) {
        try {
            const provider = options.provider || 'default';
            const callerId = options.callerId || this.configService.get('DEFAULT_CALLER_ID');
            let callUuid;
            if (provider === 'dratchio') {
                callUuid = await this.dratchioService.placeCall(destination, callerId);
            }
            else {
                callUuid = await this.freeswitchService.placeCall(destination, callerId);
            }
            if (options.appointmentId) {
                const callLog = await this.callLogRepository.findOne({ where: { callUuid } });
                if (callLog) {
                    callLog.appointmentId = options.appointmentId;
                    await this.callLogRepository.save(callLog);
                }
            }
            return callUuid;
        }
        catch (error) {
            this.logger.error(`Failed to place call: ${error.message}`);
            throw error;
        }
    }
    async handleIncomingCall(job) {
        const { callId } = job.data;
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: callId } });
        if (!callLog || callLog.status !== 'ringing') {
            return;
        }
        if (await this.matchAppointment(callLog)) {
            return;
        }
        this.logger.log(`Auto-handling incoming call ${callId}`);
    }
    async matchAppointment(callLog) {
        return false;
    }
    async playVoiceMessage(job) {
        const { callUuid, message } = job.data;
        try {
            this.logger.log(`Playing message for call ${callUuid}: ${message}`);
        }
        catch (error) {
            this.logger.error(`Failed to play message: ${error.message}`);
        }
    }
};
__decorate([
    Process('handle-incoming-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallManagerService.prototype, "handleIncomingCall", null);
__decorate([
    Process('play-voice-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallManagerService.prototype, "playVoiceMessage", null);
CallManagerService = CallManagerService_1 = __decorate([
    Injectable(),
    Processor('voip-calls'),
    __param(3, InjectRepository(CallLog)),
    __metadata("design:paramtypes", [FreeswitchService,
        DratchioService,
        ConfigService,
        Repository])
], CallManagerService);
export { CallManagerService };
//# sourceMappingURL=call-manager.service.js.map