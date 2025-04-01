var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmailStatus } from '../enums/email-status.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { EmailTemplate } from './email-template.entity';
let EmailLog = class EmailLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], EmailLog.prototype, "organization", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "templateId", void 0);
__decorate([
    ManyToOne(() => EmailTemplate),
    JoinColumn({ name: 'templateId' }),
    __metadata("design:type", EmailTemplate)
], EmailLog.prototype, "template", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailLog.prototype, "recipient", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "subject", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "htmlContent", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "textContent", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailLog.prototype, "metadata", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: EmailStatus,
        default: EmailStatus.PENDING
    }),
    __metadata("design:type", String)
], EmailLog.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "error", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "messageId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "providerResponse", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], EmailLog.prototype, "createdAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "sentAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "deliveredAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "openedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "clickedAt", void 0);
EmailLog = __decorate([
    Entity('email_logs')
], EmailLog);
export { EmailLog };
//# sourceMappingURL=email-log.entity.js.map