var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailModule_1;
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './services/email.service';
import { EmailTemplateService } from './services/email-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplate } from './entities/email-template.entity';
import { EmailLog } from './entities/email-log.entity';
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
    Module({
        imports: [
            TypeOrmModule.forFeature([EmailTemplate, EmailLog]),
            ConfigModule,
        ],
        providers: [
            EmailService,
            EmailTemplateService,
        ],
        exports: [
            EmailService,
            EmailTemplateService,
        ],
    })
], EmailModule);
export { EmailModule };
//# sourceMappingURL=email.module.js.map