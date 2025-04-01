var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { DomainVerificationStatus } from '../enums/domain-verification-status.enum';
import { DomainVerificationMethod } from '../enums/domain-verification-method.enum';
let DomainVerificationToken = class DomainVerificationToken {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "domainId", void 0);
__decorate([
    ManyToOne('Domain', { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'domainId' }),
    __metadata("design:type", Function)
], DomainVerificationToken.prototype, "domain", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "token", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DomainVerificationMethod
    }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "method", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DomainVerificationStatus,
        default: DomainVerificationStatus.PENDING
    }),
    Index(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "status", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "verificationRecord", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "expiresAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "verifiedAt", void 0);
__decorate([
    Column('int', { default: 0 }),
    __metadata("design:type", Number)
], DomainVerificationToken.prototype, "attempts", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "lastAttemptAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "verificationResults", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "metadata", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DomainVerificationToken.prototype, "isRevoked", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "revokedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "revokedBy", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "revokeReason", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "retryPolicy", void 0);
__decorate([
    Column('boolean', { default: true }),
    __metadata("design:type", Boolean)
], DomainVerificationToken.prototype, "isActive", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "validationRules", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "alternativeTokens", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "customValidation", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "updatedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "createdBy", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "updatedBy", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "history", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "notes", void 0);
DomainVerificationToken = __decorate([
    Entity('domain_verification_tokens'),
    Index(['domainId', 'token']),
    Index(['domainId', 'status'])
], DomainVerificationToken);
export { DomainVerificationToken };
//# sourceMappingURL=domain-verification-token.entity.js.map