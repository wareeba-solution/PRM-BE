"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallManagerService = void 0;
// src/modules/voip/services/call-manager.service.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const call_log_entity_1 = require("../entities/call-log.entity");
const freeswitch_service_1 = require("./freeswitch.service");
const dratchio_service_1 = require("./dratchio.service");
const config_1 = require("@nestjs/config");
const bull_1 = require("@nestjs/bull");
let CallManagerService = CallManagerService_1 = class CallManagerService {
    constructor(freeswitchService, dratchioService, configService, callLogRepository) {
        this.freeswitchService = freeswitchService;
        this.dratchioService = dratchioService;
        this.configService = configService;
        this.callLogRepository = callLogRepository;
        this.logger = new common_1.Logger(CallManagerService_1.name);
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
                // Default to FreeSWITCH
                callUuid = await this.freeswitchService.placeCall(destination, callerId);
            }
            // Update appointment ID if this is a scheduled call
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
    // Process call handling from the queue
    async handleIncomingCall(job) {
        const { callId } = job.data;
        // Check if call is still active
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: callId } });
        if (!callLog || callLog.status !== 'ringing') {
            // Call has been handled or hung up
            return;
        }
        // Check if this matches an appointment
        if (await this.matchAppointment(callLog)) {
            // Already handled by appointment service
            return;
        }
        // Auto-answer call and route to IVR
        // Implementation depends on how you want to handle calls
        this.logger.log(`Auto-handling incoming call ${callId}`);
    }
    async matchAppointment(callLog) {
        // This would be implemented to check against scheduled appointments
        // For example, query the appointments repository
        return false;
    }
    // Process playing voice messages
    async playVoiceMessage(job) {
        const { callUuid, message } = job.data;
        try {
            // This would use FreeSWITCH's text-to-speech or play a recorded message
            // Implementation depends on your FreeSWITCH setup
            this.logger.log(`Playing message for call ${callUuid}: ${message}`);
        }
        catch (error) {
            this.logger.error(`Failed to play message: ${error.message}`);
        }
    }
};
__decorate([
    (0, bull_1.Process)('handle-incoming-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallManagerService.prototype, "handleIncomingCall", null);
__decorate([
    (0, bull_1.Process)('play-voice-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallManagerService.prototype, "playVoiceMessage", null);
CallManagerService = CallManagerService_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('voip-calls'),
    __param(3, (0, typeorm_1.InjectRepository)(call_log_entity_1.CallLog)),
    __metadata("design:paramtypes", [freeswitch_service_1.FreeswitchService,
        dratchio_service_1.DratchioService,
        config_1.ConfigService,
        typeorm_2.Repository])
], CallManagerService);
exports.CallManagerService = CallManagerService;
//# sourceMappingURL=call-manager.service.js.map