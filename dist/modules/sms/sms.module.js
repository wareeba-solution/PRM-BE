"use strict";
// src/modules/sms/sms.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SmsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const sms_template_service_1 = require("./services/sms-template.service");
const sms_template_entity_1 = require("./entities/sms-template.entity");
const sms_log_entity_1 = require("./entities/sms-log.entity");
const sms_service_1 = require("./services/sms.service");
let SmsModule = SmsModule_1 = class SmsModule {
    static forRoot(options) {
        return {
            module: SmsModule_1,
            providers: [
                {
                    provide: 'SMS_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            module: SmsModule_1,
            imports: options.imports || [],
            providers: [
                {
                    provide: 'SMS_MODULE_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ],
        };
    }
    static register(options) {
        return {
            module: SmsModule_1,
            providers: [
                {
                    provide: 'SMS_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
};
SmsModule = SmsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sms_template_entity_1.SmsTemplate, sms_log_entity_1.SmsLog]),
            config_1.ConfigModule,
        ],
        providers: [
            sms_service_1.SmsService,
            sms_template_service_1.SmsTemplateService,
        ],
        exports: [
            sms_service_1.SmsService,
            sms_template_service_1.SmsTemplateService,
        ],
    })
], SmsModule);
exports.SmsModule = SmsModule;
//# sourceMappingURL=sms.module.js.map