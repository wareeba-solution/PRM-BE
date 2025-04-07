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
exports.Domain = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
const domain_status_enum_1 = require("../enums/domain-status.enum");
let Domain = class Domain {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Domain.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], Domain.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Domain.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], Domain.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_status_enum_1.DomainStatus,
        default: domain_status_enum_1.DomainStatus.PENDING
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Domain.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_verification_status_enum_1.DomainVerificationStatus,
        default: domain_verification_status_enum_1.DomainVerificationStatus.PENDING
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Domain.prototype, "verificationStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('DomainVerificationToken', 'domain'),
    __metadata("design:type", Array)
], Domain.prototype, "verificationTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('DnsRecord', 'domain'),
    __metadata("design:type", Array)
], Domain.prototype, "dnsRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "verificationDetails", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], Domain.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Domain.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "dnsConfiguration", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "renewalDate", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isExpired", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "registrarInfo", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "sslCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "monitoring", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], Domain.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "usage", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "securitySettings", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "compliance", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Domain.prototype, "analytics", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Domain.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Domain.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Domain.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Domain.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Domain.prototype, "history", void 0);
Domain = __decorate([
    (0, typeorm_1.Entity)('domains')
], Domain);
exports.Domain = Domain;
//# sourceMappingURL=domain.entity.js.map