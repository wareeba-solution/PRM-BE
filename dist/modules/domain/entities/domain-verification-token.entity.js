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
exports.DomainVerificationToken = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const domain_verification_status_enum_1 = require("../enums/domain-verification-status.enum");
const domain_verification_method_enum_1 = require("../enums/domain-verification-method.enum");
let DomainVerificationToken = class DomainVerificationToken {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, domainId: { required: true, type: () => String }, domain: { required: true, type: () => require("./domain.entity").Domain }, token: { required: true, type: () => String }, method: { required: true, enum: require("../enums/domain-verification-method.enum").DomainVerificationMethod }, status: { required: true, enum: require("../enums/domain-verification-status.enum").DomainVerificationStatus }, verificationRecord: { required: true, type: () => ({ type: { required: true, type: () => String }, name: { required: true, type: () => String }, value: { required: true, type: () => String }, ttl: { required: false, type: () => Number } }) }, expiresAt: { required: true, type: () => Date }, verifiedAt: { required: false, type: () => Date }, attempts: { required: true, type: () => Number }, lastAttemptAt: { required: false, type: () => Date }, verificationResults: { required: false }, metadata: { required: false, type: () => ({ generatedBy: { required: false, type: () => String }, source: { required: false, type: () => String }, clientIp: { required: false, type: () => String }, userAgent: { required: false, type: () => String } }) }, isRevoked: { required: true, type: () => Boolean }, revokedAt: { required: false, type: () => Date }, revokedBy: { required: false, type: () => String }, revokeReason: { required: false, type: () => String }, retryPolicy: { required: false, type: () => ({ maxAttempts: { required: true, type: () => Number }, backoffPeriod: { required: true, type: () => Number }, timeoutPeriod: { required: true, type: () => Number } }) }, isActive: { required: true, type: () => Boolean }, validationRules: { required: false, type: () => ({ requiredRecords: { required: false, type: () => [String] }, propagationTime: { required: false, type: () => Number }, requiredNameservers: { required: false, type: () => [String] } }) }, alternativeTokens: { required: false, type: () => [String] }, customValidation: { required: false, type: () => ({ type: { required: true, type: () => String }, config: { required: true, type: () => Object }, results: { required: false, type: () => Object } }) }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, createdBy: { required: false, type: () => String }, updatedBy: { required: false, type: () => String }, history: { required: false }, notes: { required: false, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "domainId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Domain', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'domainId' }),
    __metadata("design:type", Function)
], DomainVerificationToken.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_verification_method_enum_1.DomainVerificationMethod
    }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_verification_status_enum_1.DomainVerificationStatus,
        default: domain_verification_status_enum_1.DomainVerificationStatus.PENDING
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "verificationRecord", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], DomainVerificationToken.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "verificationResults", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DomainVerificationToken.prototype, "isRevoked", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "revokedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "revokeReason", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "retryPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], DomainVerificationToken.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "validationRules", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "alternativeTokens", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DomainVerificationToken.prototype, "customValidation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DomainVerificationToken.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DomainVerificationToken.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DomainVerificationToken.prototype, "notes", void 0);
DomainVerificationToken = __decorate([
    (0, typeorm_1.Entity)('domain_verification_tokens'),
    (0, typeorm_1.Index)(['domainId', 'token']),
    (0, typeorm_1.Index)(['domainId', 'status'])
], DomainVerificationToken);
exports.DomainVerificationToken = DomainVerificationToken;
//# sourceMappingURL=domain-verification-token.entity.js.map