var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
let VoipConfig = class VoipConfig {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], VoipConfig.prototype, "id", void 0);
__decorate([
    Column({ default: 'default' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "name", void 0);
__decorate([
    Column({ default: 'freeswitch' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "provider", void 0);
__decorate([
    Column({ default: '127.0.0.1' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "host", void 0);
__decorate([
    Column({ default: 8021 }),
    __metadata("design:type", Number)
], VoipConfig.prototype, "port", void 0);
__decorate([
    Column({ default: 'ClueCon' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "password", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], VoipConfig.prototype, "configJson", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], VoipConfig.prototype, "isActive", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], VoipConfig.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], VoipConfig.prototype, "updatedAt", void 0);
VoipConfig = __decorate([
    Entity('voip_configs')
], VoipConfig);
export { VoipConfig };
//# sourceMappingURL=voip-config.entity.js.map