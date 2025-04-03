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
exports.SmsTemplate = exports.SmsTemplateType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/sms/entities/sms-template.entity.ts
const typeorm_1 = require("typeorm");
/**
 * SMS template types for different scenarios
 */
var SmsTemplateType;
(function (SmsTemplateType) {
    SmsTemplateType["APPOINTMENT_REMINDER"] = "appointment_reminder";
    SmsTemplateType["APPOINTMENT_CONFIRMATION"] = "appointment_confirmation";
    SmsTemplateType["APPOINTMENT_CANCELLATION"] = "appointment_cancellation";
    SmsTemplateType["APPOINTMENT_RESCHEDULED"] = "appointment_rescheduled";
    SmsTemplateType["APPOINTMENT_FOLLOWUP"] = "appointment_followup";
    SmsTemplateType["GENERAL_NOTIFICATION"] = "general_notification";
    SmsTemplateType["CUSTOM"] = "custom";
})(SmsTemplateType = exports.SmsTemplateType || (exports.SmsTemplateType = {}));
let SmsTemplate = class SmsTemplate {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, type: { required: true, enum: require("./sms-template.entity").SmsTemplateType }, content: { required: true, type: () => String }, description: { required: true, type: () => String }, isDefault: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, organizationId: { required: true, type: () => String }, createdById: { required: true, type: () => String }, updatedById: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, sampleVariables: { required: true, type: () => Object, description: "Sample variables that can be used in this template\nStored as a JSON object { variableName: description }" }, maxLength: { required: true, type: () => Number, description: "The maximum allowed length for SMS (for reference)" }, metadata: { required: true, type: () => Object, description: "Optional metadata for additional properties" } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SmsTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SmsTemplateType,
        default: SmsTemplateType.CUSTOM
    }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SmsTemplate.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SmsTemplate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SmsTemplate.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SmsTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SmsTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsTemplate.prototype, "sampleVariables", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 160 }),
    __metadata("design:type", Number)
], SmsTemplate.prototype, "maxLength", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsTemplate.prototype, "metadata", void 0);
SmsTemplate = __decorate([
    (0, typeorm_1.Entity)('sms_templates')
], SmsTemplate);
exports.SmsTemplate = SmsTemplate;
//# sourceMappingURL=sms-template.entity.js.map