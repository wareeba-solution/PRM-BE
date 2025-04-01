var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WhatsappModule_1;
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsappService } from './services/whatsapp.services';
import { WhatsappTemplateService } from './services/whatsapp-template.service';
import { WhatsappTemplate } from './entities/whatsapp-template.entity';
import { WhatsappLog } from './entities/whatsapp-log.entity';
let WhatsappModule = WhatsappModule_1 = class WhatsappModule {
    static forRoot(options) {
        return {
            module: WhatsappModule_1,
            providers: [
                {
                    provide: 'WHATSAPP_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            module: WhatsappModule_1,
            imports: options.imports || [],
            providers: [
                {
                    provide: 'WHATSAPP_MODULE_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ],
        };
    }
    static register(options) {
        return {
            module: WhatsappModule_1,
            providers: [
                {
                    provide: 'WHATSAPP_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }
};
WhatsappModule = WhatsappModule_1 = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([WhatsappTemplate, WhatsappLog]),
            ConfigModule,
        ],
        providers: [
            WhatsappService,
            WhatsappTemplateService,
        ],
        exports: [
            WhatsappService,
            WhatsappTemplateService,
        ],
    })
], WhatsappModule);
export { WhatsappModule };
//# sourceMappingURL=whatsapp.module.js.map