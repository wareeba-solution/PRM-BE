var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SmsModule_1;
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsTemplateService } from './services/sms-template.service';
import { SmsTemplate } from './entities/sms-template.entity';
import { SmsLog } from './entities/sms-log.entity';
import { SmsService } from './services/sms.service';
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
    Module({
        imports: [
            TypeOrmModule.forFeature([SmsTemplate, SmsLog]),
            ConfigModule,
        ],
        providers: [
            SmsService,
            SmsTemplateService,
        ],
        exports: [
            SmsService,
            SmsTemplateService,
        ],
    })
], SmsModule);
export { SmsModule };
//# sourceMappingURL=sms.module.js.map