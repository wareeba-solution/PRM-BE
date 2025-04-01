var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmailStatus } from '../enums/email-status.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { EmailTemplate } from './email-template.entity';
let EmailQueue = class EmailQueue {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], EmailQueue.prototype, "id", void 0);
__decorate([
    Column(),
    Column(),
    __metadata("design:type", Number)
], EmailQueue.prototype, "priority", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], EmailQueue.prototype, "attempts", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], EmailQueue.prototype, "maxAttempts", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailQueue.prototype, "lastError", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], EmailQueue.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], EmailQueue.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailQueue.prototype, "sentAt", void 0);
__decorate([
    Column('json'),
    __metadata("design:type", Object)
], EmailQueue.prototype, "data", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], EmailQueue.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], EmailQueue.prototype, "organization", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], EmailQueue.prototype, "templateId", void 0);
__decorate([
    ManyToOne(() => EmailTemplate),
    JoinColumn({ name: 'templateId' }),
    __metadata("design:type", EmailTemplate)
], EmailQueue.prototype, "template", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailQueue.prototype, "recipient", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailQueue.prototype, "subject", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], EmailQueue.prototype, "htmlContent", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], EmailQueue.prototype, "textContent", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailQueue.prototype, "variables", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailQueue.prototype, "metadata", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: EmailStatus,
        default: EmailStatus.PENDING
    }),
    __metadata("design:type", String)
], EmailQueue.prototype, "status", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EmailQueue.prototype, "scheduledFor", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailQueue.prototype, "processedAt", void 0);
EmailQueue = __decorate([
    Entity('email_queue')
], EmailQueue);
export { EmailQueue };
//# sourceMappingURL=email-queue.entity.js.map