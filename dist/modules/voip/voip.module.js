"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipModule = void 0;
// src/modules/voip/voip.module.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const freeswitch_service_1 = require("./services/freeswitch.service");
const dratchio_service_1 = require("./services/dratchio.service");
const call_manager_service_1 = require("./services/call-manager.service");
const voip_controller_1 = require("./controllers/voip.controller");
const voip_config_entity_1 = require("./entities/voip-config.entity");
const call_log_entity_1 = require("./entities/call-log.entity");
let VoipModule = class VoipModule {
};
VoipModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([voip_config_entity_1.VoipConfig, call_log_entity_1.CallLog]),
            bull_1.BullModule.registerQueue({
                name: 'voip-calls',
            }),
            config_1.ConfigModule,
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
        controllers: [voip_controller_1.VoipController],
        providers: [
            freeswitch_service_1.FreeswitchService,
            dratchio_service_1.DratchioService,
            call_manager_service_1.CallManagerService,
        ],
        exports: [
            freeswitch_service_1.FreeswitchService,
            dratchio_service_1.DratchioService,
            call_manager_service_1.CallManagerService,
        ],
    })
], VoipModule);
exports.VoipModule = VoipModule;
//# sourceMappingURL=voip.module.js.map