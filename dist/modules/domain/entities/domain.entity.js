var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { DomainVerificationStatus } from '../enums/domain-verification-status.enum';
import { DomainStatus } from '../enums/domain-status.enum';
let Domain = class Domain {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Domain.prototype, "id", void 0);
__decorate([
    Column(),
    Index({ unique: true }),
    __metadata("design:type", String)
], Domain.prototype, "name", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], Domain.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], Domain.prototype, "organization", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DomainStatus,
        default: DomainStatus.PENDING
    }),
    Index(),
    __metadata("design:type", String)
], Domain.prototype, "status", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DomainVerificationStatus,
        default: DomainVerificationStatus.PENDING
    }),
    Index(),
    __metadata("design:type", String)
], Domain.prototype, "verificationStatus", void 0);
__decorate([
    OneToMany('DomainVerificationToken', 'domain'),
    __metadata("design:type", Array)
], Domain.prototype, "verificationTokens", void 0);
__decorate([
    OneToMany('DnsRecord', 'domain'),
    __metadata("design:type", Array)
], Domain.prototype, "dnsRecords", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "verifiedAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "verificationDetails", void 0);
__decorate([
    Column('boolean', { default: true }),
    __metadata("design:type", Boolean)
], Domain.prototype, "isDefault", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Domain.prototype, "isPrimary", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "dnsConfiguration", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "settings", void 0);
__decorate([
    Column('date', { nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "expiresAt", void 0);
__decorate([
    Column('date', { nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "renewalDate", void 0);
__decorate([
    Column('boolean', { default: false }),
    Index(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isExpired", void 0);
__decorate([
    Column('boolean', { default: false }),
    Index(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isLocked", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "registrarInfo", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "sslCertificate", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "monitoring", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    Index(),
    __metadata("design:type", Array)
], Domain.prototype, "tags", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "usage", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "securitySettings", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "compliance", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "analytics", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "notes", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Domain.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Domain.prototype, "updatedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "createdBy", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "updatedBy", void 0);
__decorate([
    Column('boolean', { default: false }),
    Index(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isDeleted", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "deletedBy", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "deletedAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Domain.prototype, "history", void 0);
Domain = __decorate([
    Entity('domains')
], Domain);
export { Domain };
//# sourceMappingURL=domain.entity.js.map