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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoipConfig = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/voip/entities/voip-config.entity.ts
const typeorm_1 = require("typeorm");
let VoipConfig = class VoipConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, provider: { required: true, type: () => String }, host: { required: true, type: () => String }, port: { required: true, type: () => Number }, password: { required: true, type: () => String }, configJson: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VoipConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'default' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'freeswitch' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '127.0.0.1' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 8021 }),
    __metadata("design:type", Number)
], VoipConfig.prototype, "port", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ClueCon' }),
    __metadata("design:type", String)
], VoipConfig.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], VoipConfig.prototype, "configJson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], VoipConfig.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VoipConfig.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], VoipConfig.prototype, "updatedAt", void 0);
VoipConfig = __decorate([
    (0, typeorm_1.Entity)('voip_configs')
], VoipConfig);
exports.VoipConfig = VoipConfig;
//# sourceMappingURL=voip-config.entity.js.map