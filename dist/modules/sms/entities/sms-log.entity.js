var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SmsTemplate } from '../entities/sms-template.entity';
export var SmsStatus;
(function (SmsStatus) {
    SmsStatus["PENDING"] = "pending";
    SmsStatus["SENT"] = "sent";
    SmsStatus["DELIVERED"] = "delivered";
    SmsStatus["FAILED"] = "failed";
    SmsStatus["UNDELIVERED"] = "undelivered";
    SmsStatus["REJECTED"] = "rejected";
})(SmsStatus || (SmsStatus = {}));
let SmsLog = class SmsLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], SmsLog.prototype, "id", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "to", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "from", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], SmsLog.prototype, "message", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: SmsStatus,
        default: SmsStatus.PENDING,
    }),
    __metadata("design:type", String)
], SmsLog.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "statusMessage", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "externalId", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "organizationId", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "appointmentId", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "contactId", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "templateId", void 0);
__decorate([
    ManyToOne(() => SmsTemplate, { nullable: true, onDelete: 'SET NULL' }),
    JoinColumn({ name: 'templateId' }),
    __metadata("design:type", SmsTemplate)
], SmsLog.prototype, "template", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "provider", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "variables", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "providerResponse", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], SmsLog.prototype, "segments", void 0);
__decorate([
    Column({ type: 'decimal', precision: 10, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], SmsLog.prototype, "cost", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "currency", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SmsLog.prototype, "ipAddress", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], SmsLog.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], SmsLog.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], SmsLog.prototype, "deliveredAt", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], SmsLog.prototype, "createdById", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SmsLog.prototype, "metadata", void 0);
SmsLog = __decorate([
    Entity('sms_logs')
], SmsLog);
export { SmsLog };
//# sourceMappingURL=sms-log.entity.js.map