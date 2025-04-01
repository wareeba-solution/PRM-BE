var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FreeswitchService } from './services/freeswitch.service';
import { DratchioService } from './services/dratchio.service';
import { CallManagerService } from './services/call-manager.service';
import { VoipController } from './controllers/voip.controller';
import { VoipConfig } from './entities/voip-config.entity';
import { CallLog } from './entities/call-log.entity';
let VoipModule = class VoipModule {
};
VoipModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([VoipConfig, CallLog]),
            BullModule.registerQueue({
                name: 'voip-calls',
            }),
            ConfigModule,
            EventEmitterModule.forRoot(),
        ],
        controllers: [VoipController],
        providers: [
            FreeswitchService,
            DratchioService,
            CallManagerService,
        ],
        exports: [
            FreeswitchService,
            DratchioService,
            CallManagerService,
        ],
    })
], VoipModule);
export { VoipModule };
//# sourceMappingURL=voip.module.js.map