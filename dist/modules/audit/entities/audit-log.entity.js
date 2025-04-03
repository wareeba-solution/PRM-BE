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
exports.AuditLog = exports.AuditLogStatus = exports.AuditLogSeverity = exports.AuditLogType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var AuditLogType;
(function (AuditLogType) {
    AuditLogType["AUTHENTICATION"] = "authentication";
    AuditLogType["AUTHORIZATION"] = "authorization";
    AuditLogType["DATA_ACCESS"] = "data_access";
    AuditLogType["DATA_MODIFICATION"] = "data_modification";
    AuditLogType["SYSTEM"] = "system";
    AuditLogType["SECURITY"] = "security";
    AuditLogType["COMPLIANCE"] = "compliance";
    AuditLogType["BUSINESS"] = "business";
})(AuditLogType = exports.AuditLogType || (exports.AuditLogType = {}));
var AuditLogSeverity;
(function (AuditLogSeverity) {
    AuditLogSeverity["INFO"] = "info";
    AuditLogSeverity["WARNING"] = "warning";
    AuditLogSeverity["ERROR"] = "error";
    AuditLogSeverity["CRITICAL"] = "critical";
})(AuditLogSeverity = exports.AuditLogSeverity || (exports.AuditLogSeverity = {}));
var AuditLogStatus;
(function (AuditLogStatus) {
    AuditLogStatus["SUCCESS"] = "success";
    AuditLogStatus["FAILURE"] = "failure";
    AuditLogStatus["PENDING"] = "pending";
    AuditLogStatus["CANCELLED"] = "cancelled";
})(AuditLogStatus = exports.AuditLogStatus || (exports.AuditLogStatus = {}));
let AuditLog = class AuditLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, enum: require("./audit-log.entity").AuditLogType }, severity: { required: true, enum: require("./audit-log.entity").AuditLogSeverity }, organizationId: { required: true, type: () => String }, status: { required: true, enum: require("./audit-log.entity").AuditLogStatus }, action: { required: true, type: () => String }, description: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, actorId: { required: true, type: () => String }, actorType: { required: true, type: () => String }, actor: { required: true, type: () => require("../../users/entities/user.entity").User }, entityId: { required: true, type: () => String }, entityType: { required: true, type: () => String }, changes: { required: true, type: () => ({ before: { required: true, type: () => Object }, after: { required: true, type: () => Object } }) }, ipAddress: { required: true, type: () => String }, userAgent: { required: true, type: () => String }, requestId: { required: true, type: () => String }, sessionId: { required: true, type: () => String }, origin: { required: true, type: () => String }, timestamp: { required: true, type: () => Date }, duration: { required: true, type: () => Number }, location: { required: true, type: () => ({ country: { required: false, type: () => String }, region: { required: false, type: () => String }, city: { required: false, type: () => String }, coordinates: { required: false, type: () => ({ latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number } }) } }) }, securityContext: { required: true, type: () => ({ permissions: { required: false, type: () => [String] }, roles: { required: false, type: () => [String] }, authenticationType: { required: false, type: () => String }, authenticationMethod: { required: false, type: () => String }, mfaUsed: { required: false, type: () => Boolean } }) }, complianceMetadata: { required: true, type: () => ({ regulations: { required: false, type: () => [String] }, dataClassification: { required: false, type: () => String }, retentionPeriod: { required: false, type: () => Number }, piiInvolved: { required: false, type: () => Boolean }, dlpPolicies: { required: false, type: () => [String] } }) }, error: { required: true, type: () => ({ code: { required: false, type: () => String }, message: { required: false, type: () => String }, stack: { required: false, type: () => String }, details: { required: false, type: () => Object } }) }, tags: { required: true, type: () => [String] }, riskAssessment: { required: true, type: () => ({ level: { required: false, type: () => Object }, factors: { required: false, type: () => [String] }, score: { required: false, type: () => Number }, mitigations: { required: false, type: () => [String] } }) }, businessContext: { required: true, type: () => ({ process: { required: false, type: () => String }, department: { required: false, type: () => String }, costCenter: { required: false, type: () => String }, projectId: { required: false, type: () => String } }) }, systemContext: { required: true, type: () => ({ environment: { required: false, type: () => String }, version: { required: false, type: () => String }, component: { required: false, type: () => String }, hostname: { required: false, type: () => String } }) }, lastModified: { required: true, type: () => Date }, expiresAt: { required: true, type: () => Date }, archived: { required: true, type: () => Boolean }, archivedAt: { required: true, type: () => Date }, redacted: { required: true, type: () => Boolean }, redactedAt: { required: true, type: () => Date }, customMetadata: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AuditLogType,
        default: AuditLogType.SYSTEM
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AuditLog.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AuditLogSeverity,
        default: AuditLogSeverity.INFO
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AuditLog.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AuditLogStatus,
        default: AuditLogStatus.SUCCESS
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AuditLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AuditLog.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "actorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "actorType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'actorId' }),
    __metadata("design:type", user_entity_1.User)
], AuditLog.prototype, "actor", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "changes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], AuditLog.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AuditLog.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "securityContext", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "complianceMetadata", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Array)
], AuditLog.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "riskAssessment", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "businessContext", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "systemContext", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AuditLog.prototype, "lastModified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], AuditLog.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "archivedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], AuditLog.prototype, "redacted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "redactedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "customMetadata", void 0);
AuditLog = __decorate([
    (0, typeorm_1.Entity)('audit_logs'),
    (0, typeorm_1.Index)(['entityType', 'entityId']),
    (0, typeorm_1.Index)(['actorType', 'actorId']),
    (0, typeorm_1.Index)(['timestamp', 'type'])
], AuditLog);
exports.AuditLog = AuditLog;
//# sourceMappingURL=audit-log.entity.js.map