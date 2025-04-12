"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DratchioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DratchioService = void 0;
// src/modules/voip/services/dratchio.service.ts
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const voip_config_entity_1 = require("../entities/voip-config.entity");
const freeswitch_service_1 = require("./freeswitch.service");
const call_log_entity_1 = require("../entities/call-log.entity");
const bull_1 = require("@nestjs/bull");
const event_emitter_1 = require("@nestjs/event-emitter");
let DratchioService = DratchioService_1 = class DratchioService {
    constructor(configService, freeswitchService, eventEmitter, voipConfigRepository, callLogRepository, voipQueue) {
        this.configService = configService;
        this.freeswitchService = freeswitchService;
        this.eventEmitter = eventEmitter;
        this.voipConfigRepository = voipConfigRepository;
        this.callLogRepository = callLogRepository;
        this.voipQueue = voipQueue;
        this.logger = new common_1.Logger(DratchioService_1.name);
        this.dratchioClient = null;
        // Initialize Dratchio integration
        this.initializeDratchio().catch(err => {
            this.logger.error(`Error during Dratchio initialization: ${err.message}`);
        });
    }
    async initializeDratchio() {
        try {
            // Import dynamically to avoid issues if package isn't installed
            const module = await Promise.resolve().then(() => __importStar(require('../../../libs/dratchio')));
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
        // Create call log
        const callLog = this.callLogRepository.create({
            callUuid: call.uuid,
            callerNumber: callerId,
            destinationNumber: destination,
            startTime: new Date(),
            status: 'ringing',
            provider: 'dratchio',
        });
        await this.callLogRepository.save(callLog);
        // Emit event for the appointment module to check if this is a scheduled call
        this.eventEmitter.emit('dratchio.incomingCall', {
            uuid: call.uuid,
            callerId,
            destination,
            accept: () => call.answer(),
            reject: () => call.hangup()
        });
        // Queue for auto-handling if no one handles the call within 5 seconds
        await this.voipQueue.add('handle-incoming-call', { callId: call.uuid }, {
            delay: 5000
        });
    }
    // Method to place outbound calls via Dratchio
    async placeCall(destination, callerId) {
        if (!this.dratchioClient) {
            throw new Error('Dratchio client not initialized');
        }
        try {
            const call = await this.dratchioClient.call({
                to: destination,
                from: callerId,
            });
            // Create call log
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
    // Event handler for appointment reminders
    async handleAppointmentReminder(payload) {
        const { patientPhone, message } = payload;
        const clinicNumber = this.configService.get('CLINIC_PHONE_NUMBER') || '';
        try {
            // First, place a call
            const callUuid = await this.placeCall(patientPhone, clinicNumber);
            // Queue message to be played when call is answered
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
    (0, event_emitter_1.OnEvent)('appointment.reminder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DratchioService.prototype, "handleAppointmentReminder", null);
DratchioService = DratchioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(voip_config_entity_1.VoipConfig)),
    __param(4, (0, typeorm_1.InjectRepository)(call_log_entity_1.CallLog)),
    __param(5, (0, bull_1.InjectQueue)('voip-calls')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        freeswitch_service_1.FreeswitchService,
        event_emitter_1.EventEmitter2,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], DratchioService);
exports.DratchioService = DratchioService;
//# sourceMappingURL=dratchio.service.js.map