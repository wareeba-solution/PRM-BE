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
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
const domain_status_enum_1 = require("../enums/domain-status.enum");
let Domain = class Domain {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, status: { required: true, enum: require("../enums/domain-status.enum").DomainStatus }, verificationStatus: { required: true, enum: require("../enums/domain-verification-status.enum").DomainVerificationStatus }, verificationTokens: { required: true, type: () => [Object] }, dnsRecords: { required: true, type: () => [Object] }, verifiedAt: { required: false, type: () => Date }, verificationDetails: { required: false, type: () => ({ method: { required: true, type: () => String }, value: { required: true, type: () => String }, checkedAt: { required: true, type: () => Date }, attempts: { required: true, type: () => Number }, lastAttemptAt: { required: false, type: () => Date }, error: { required: false, type: () => String } }) }, isDefault: { required: true, type: () => Boolean }, isPrimary: { required: true, type: () => Boolean }, dnsConfiguration: { required: false, type: () => ({ mx: { required: false, type: () => ({ records: { required: true, type: () => [String] }, verified: { required: true, type: () => Boolean }, lastChecked: { required: false, type: () => Date } }) }, spf: { required: false, type: () => ({ record: { required: true, type: () => String }, verified: { required: true, type: () => Boolean }, lastChecked: { required: false, type: () => Date } }) }, dkim: { required: false, type: () => ({ selector: { required: true, type: () => String }, publicKey: { required: true, type: () => String }, verified: { required: true, type: () => Boolean }, lastChecked: { required: false, type: () => Date } }) }, dmarc: { required: false, type: () => ({ record: { required: true, type: () => String }, verified: { required: true, type: () => Boolean }, lastChecked: { required: false, type: () => Date } }) } }) }, settings: { required: false, type: () => ({ customNameservers: { required: false, type: () => [String] }, autoRenew: { required: false, type: () => Boolean }, lockEnabled: { required: false, type: () => Boolean }, privacyEnabled: { required: false, type: () => Boolean }, emailForwarding: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, rules: { required: false } }) } }) }, expiresAt: { required: false, type: () => Date }, renewalDate: { required: false, type: () => Date }, isExpired: { required: true, type: () => Boolean }, isLocked: { required: true, type: () => Boolean }, registrarInfo: { required: false, type: () => ({ registrar: { required: true, type: () => String }, registrarId: { required: false, type: () => String }, whoisServer: { required: false, type: () => String }, referralUrl: { required: false, type: () => String }, createdDate: { required: false, type: () => Date }, updatedDate: { required: false, type: () => Date }, registrantContact: { required: false, type: () => ({ name: { required: false, type: () => String }, organization: { required: false, type: () => String }, email: { required: false, type: () => String }, phone: { required: false, type: () => String } }) } }) }, sslCertificate: { required: false, type: () => ({ provider: { required: false, type: () => String }, issuer: { required: false, type: () => String }, validFrom: { required: false, type: () => Date }, validTo: { required: false, type: () => Date }, type: { required: false, type: () => String }, status: { required: false, type: () => String }, autoRenew: { required: false, type: () => Boolean }, lastRenewal: { required: false, type: () => Date } }) }, monitoring: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, lastCheck: { required: false, type: () => Date }, status: { required: false, type: () => String }, uptime: { required: false, type: () => Number }, alerts: { required: false, type: () => ({ email: { required: false, type: () => [String] }, webhook: { required: false, type: () => [String] } }) } }) }, tags: { required: false, type: () => [String] }, usage: { required: false, type: () => ({ emailEnabled: { required: false, type: () => Boolean }, webEnabled: { required: false, type: () => Boolean }, services: { required: false, type: () => [String] } }) }, securitySettings: { required: false, type: () => ({ transferLock: { required: false, type: () => Boolean }, registrarLock: { required: false, type: () => Boolean }, dnssec: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, keys: { required: false, type: () => [String] } }) }, twoFactorAuth: { required: false, type: () => Boolean } }) }, compliance: { required: false, type: () => ({ gdpr: { required: false, type: () => ({ compliant: { required: true, type: () => Boolean }, lastCheck: { required: false, type: () => Date }, issues: { required: false, type: () => [String] } }) }, privacyShield: { required: false, type: () => Boolean }, industryStandards: { required: false, type: () => [String] } }) }, analytics: { required: false, type: () => ({ lastUpdated: { required: false, type: () => Date }, metrics: { required: false, type: () => ({ emailVolume: { required: false, type: () => Number }, webTraffic: { required: false, type: () => Number }, bounceRate: { required: false, type: () => Number } }) } }) }, notes: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, createdBy: { required: false, type: () => String }, updatedBy: { required: false, type: () => String }, isDeleted: { required: true, type: () => Boolean }, deletedBy: { required: false, type: () => String }, deletedAt: { required: false, type: () => Date }, history: { required: false } };
    }
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