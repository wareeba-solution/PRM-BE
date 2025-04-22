"use strict";
// src/modules/email/email.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_service_1 = require("./services/email.service");
const email_template_service_1 = require("./services/email-template.service");
const typeorm_1 = require("@nestjs/typeorm");
const email_template_entity_1 = require("./entities/email-template.entity");
const email_log_entity_1 = require("./entities/email-log.entity");
const email_verification_service_1 = require("./services/email-verification.service");
const user_verification_entity_1 = require("../users/entities/user-verification.entity");
const user_entity_1 = require("../users/entities/user.entity");
let EmailModule = EmailModule_1 = class EmailModule {
    static forRoot(options) {
        return {
            module: EmailModule_1,
            providers: [
                {
                    provide: 'EMAIL_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            module: EmailModule_1,
            imports: options.imports || [],
            providers: [
                {
                    provide: 'EMAIL_MODULE_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ],
        };
    }
    static register(options) {
        return {
            module: EmailModule_1,
            providers: [
                {
                    provide: 'EMAIL_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
};
EmailModule = EmailModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([email_template_entity_1.EmailTemplate, email_log_entity_1.EmailLog, user_verification_entity_1.UserVerification, user_entity_1.User]),
            config_1.ConfigModule,
        ],
        providers: [
            email_service_1.EmailService,
            email_template_service_1.EmailTemplateService,
            email_verification_service_1.EmailVerificationService,
        ],
        exports: [
            email_service_1.EmailService,
            email_template_service_1.EmailTemplateService,
            email_verification_service_1.EmailVerificationService,
        ],
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map