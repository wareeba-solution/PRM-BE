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
var FreeswitchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeswitchService = void 0;
// src/modules/voip/services/freeswitch.service.ts
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const esl = __importStar(require("esl"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const voip_config_entity_1 = require("../entities/voip-config.entity");
const call_log_entity_1 = require("../entities/call-log.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let FreeswitchService = FreeswitchService_1 = class FreeswitchService {
    constructor(configService, eventEmitter, voipConfigRepository, callLogRepository) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.voipConfigRepository = voipConfigRepository;
        this.callLogRepository = callLogRepository;
        this.logger = new common_1.Logger(FreeswitchService_1.name);
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
                // Subscribe to relevant events
                this.connection.subscribe([
                    'CHANNEL_CREATE',
                    'CHANNEL_ANSWER',
                    'CHANNEL_HANGUP_COMPLETE'
                ]);
            });
            this.connection.on('esl::end', () => {
                this.isConnected = false;
                this.logger.warn('Disconnected from FreeSWITCH');
                // Attempt reconnection after delay
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
            // Attempt reconnection after delay
            setTimeout(() => this.connectToFreeswitch(), 5000);
        }
    }
    async getFreeswitchConfig() {
        let config = await this.voipConfigRepository.findOne({ where: { isActive: true } });
        if (!config) {
            // Use default config if none is found in DB
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
        // Create call log
        const callLog = this.callLogRepository.create({
            callUuid: uuid,
            callerNumber: callerId,
            destinationNumber: destination,
            startTime: new Date(),
            status: 'initiated',
        });
        await this.callLogRepository.save(callLog);
        // Emit event for other modules
        this.eventEmitter.emit('call.started', { uuid, callerId, destination });
    }
    async handleCallAnswer(event) {
        const uuid = event.getHeader('Unique-ID');
        this.logger.log(`Call answered (UUID: ${uuid})`);
        // Update call log
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: uuid } });
        if (callLog) {
            callLog.status = 'answered';
            callLog.answerTime = new Date();
            await this.callLogRepository.save(callLog);
        }
        // Emit event for other modules
        this.eventEmitter.emit('call.answered', { uuid });
    }
    async handleCallEnd(event) {
        const uuid = event.getHeader('Unique-ID');
        const duration = parseInt(event.getHeader('variable_duration') || '0');
        const hangupCause = event.getHeader('variable_hangup_cause');
        this.logger.log(`Call ended (UUID: ${uuid}), duration: ${duration}s, cause: ${hangupCause}`);
        // Update call log
        const callLog = await this.callLogRepository.findOne({ where: { callUuid: uuid } });
        if (callLog) {
            callLog.status = 'completed';
            callLog.endTime = new Date();
            callLog.duration = duration;
            callLog.hangupCause = hangupCause;
            await this.callLogRepository.save(callLog);
        }
        // Emit event for other modules
        this.eventEmitter.emit('call.ended', { uuid, duration, hangupCause });
    }
    // Method to place outbound calls
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
                    // Extract UUID from response
                    const uuid = response.body ? response.body.trim() : '';
                    this.logger.log(`Call placed to ${destination}, UUID: ${uuid}`);
                    resolve(uuid);
                }
            });
        });
    }
    // Send DTMF tones during active call
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
    // Hangup a call
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
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(voip_config_entity_1.VoipConfig)),
    __param(3, (0, typeorm_1.InjectRepository)(call_log_entity_1.CallLog)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        event_emitter_1.EventEmitter2,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FreeswitchService);
exports.FreeswitchService = FreeswitchService;
//# sourceMappingURL=freeswitch.service.js.map