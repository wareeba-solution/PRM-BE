var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
export var SmsTemplateType;
(function (SmsTemplateType) {
    SmsTemplateType["APPOINTMENT_REMINDER"] = "appointment_reminder";
    SmsTemplateType["APPOINTMENT_CONFIRMATION"] = "appointment_confirmation";
    SmsTemplateType["APPOINTMENT_CANCELLATION"] = "appointment_cancellation";
    SmsTemplateType["APPOINTMENT_RESCHEDULED"] = "appointment_rescheduled";
    SmsTemplateType["APPOINTMENT_FOLLOWUP"] = "appointment_followup";
    SmsTemplateType["GENERAL_NOTIFICATION"] = "general_notification";
    SmsTemplateType["CUSTOM"] = "custom";
})(SmsTemplateType || (SmsTemplateType = {}));
let SmsTemplate = class SmsTemplate {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], SmsTemplate.prototype, "id", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "name", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: SmsTemplateType,
        default: SmsTemplateType.CUSTOM
    }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "type", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "content", void 0);
__decorate([
    Column({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "description", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], SmsTemplate.prototype, "isDefault", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], SmsTemplate.prototype, "isActive", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsTemplate.prototype, "organizationId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsTemplate.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], SmsTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], SmsTemplate.prototype, "updatedAt", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsTemplate.prototype, "sampleVariables", void 0);
__decorate([
    Column({ default: 160 }),
    __metadata("design:type", Number)
], SmsTemplate.prototype, "maxLength", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsTemplate.prototype, "metadata", void 0);
SmsTemplate = __decorate([
    Entity('sms_templates')
], SmsTemplate);
export { SmsTemplate };
//# sourceMappingURL=sms-template.entity.js.map