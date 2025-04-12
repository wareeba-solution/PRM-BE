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
var TwilioMockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioMockService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TwilioMockService = TwilioMockService_1 = class TwilioMockService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(TwilioMockService_1.name);
        this.logger.log('Initializing mock Twilio client');
        // Create a mock client that provides the expected methods/properties
        this.mockClient = {
            messages: {
                create: async (params) => {
                    this.logger.log(`[MOCK] Sending SMS to ${params.to}: ${params.body}`);
                    return {
                        sid: `MOCK_${Date.now()}`,
                        status: 'queued',
                        dateCreated: new Date(),
                    };
                },
            },
            calls: {
                create: async (params) => {
                    this.logger.log(`[MOCK] Initiating call to ${params.to} from ${params.from}`);
                    return {
                        sid: `MOCK_CALL_${Date.now()}`,
                        status: 'queued',
                        dateCreated: new Date(),
                    };
                },
            },
        };
    }
    // Method to get the mock client
    getClient() {
        return this.mockClient;
    }
};
TwilioMockService = TwilioMockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioMockService);
exports.TwilioMockService = TwilioMockService;
//# sourceMappingURL=twilio-mock.service.js.map