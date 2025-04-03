"use strict";
// src/modules/whatsapp/whatsapp.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WhatsappModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const whatsapp_services_1 = require("./services/whatsapp.services");
const whatsapp_template_service_1 = require("./services/whatsapp-template.service");
const whatsapp_template_entity_1 = require("./entities/whatsapp-template.entity");
const whatsapp_log_entity_1 = require("./entities/whatsapp-log.entity");
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
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([whatsapp_template_entity_1.WhatsappTemplate, whatsapp_log_entity_1.WhatsappLog]),
            config_1.ConfigModule,
        ],
        providers: [
            whatsapp_services_1.WhatsappService,
            whatsapp_template_service_1.WhatsappTemplateService,
        ],
        exports: [
            whatsapp_services_1.WhatsappService,
            whatsapp_template_service_1.WhatsappTemplateService,
        ],
    })
], WhatsappModule);
exports.WhatsappModule = WhatsappModule;
//# sourceMappingURL=whatsapp.module.js.map