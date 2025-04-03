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
exports.SmsLog = exports.SmsStatus = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/sms/entities/sms-log.entity.ts
const typeorm_1 = require("typeorm");
const sms_template_entity_1 = require("../entities/sms-template.entity");
/**
 * Status of SMS delivery
 */
var SmsStatus;
(function (SmsStatus) {
    SmsStatus["PENDING"] = "pending";
    SmsStatus["SENT"] = "sent";
    SmsStatus["DELIVERED"] = "delivered";
    SmsStatus["FAILED"] = "failed";
    SmsStatus["UNDELIVERED"] = "undelivered";
    SmsStatus["REJECTED"] = "rejected";
})(SmsStatus = exports.SmsStatus || (exports.SmsStatus = {}));
/**
 * Entity to log all SMS communications
 */
let SmsLog = class SmsLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, to: { required: true, type: () => String }, from: { required: true, type: () => String }, message: { required: true, type: () => String }, status: { required: true, enum: require("./sms-log.entity").SmsStatus }, statusMessage: { required: true, type: () => String }, externalId: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, appointmentId: { required: true, type: () => String }, contactId: { required: true, type: () => String }, templateId: { required: true, type: () => String }, template: { required: true, type: () => require("./sms-template.entity").SmsTemplate }, provider: { required: true, type: () => String }, variables: { required: true, type: () => Object }, providerResponse: { required: true, type: () => Object }, segments: { required: true, type: () => Number }, cost: { required: true, type: () => Number }, currency: { required: true, type: () => String }, ipAddress: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deliveredAt: { required: true, type: () => Date }, createdById: { required: true, type: () => String }, metadata: { required: true, type: () => Object, description: "Optional metadata for additional properties" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SmsLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SmsLog.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SmsStatus,
        default: SmsStatus.PENDING,
    }),
    __metadata("design:type", String)
], SmsLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "statusMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sms_template_entity_1.SmsTemplate, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", sms_template_entity_1.SmsTemplate)
], SmsLog.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "variables", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "providerResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SmsLog.prototype, "segments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], SmsLog.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SmsLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SmsLog.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SmsLog.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsLog.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "metadata", void 0);
SmsLog = __decorate([
    (0, typeorm_1.Entity)('sms_logs')
], SmsLog);
exports.SmsLog = SmsLog;
//# sourceMappingURL=sms-log.entity.js.map