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
exports.OrganizationAuditLog = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("./organization.entity");
let OrganizationAuditLog = class OrganizationAuditLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("./organization.entity").Organization }, eventType: { required: true, type: () => String }, data: { required: true, type: () => Object }, performedBy: { required: true, type: () => String }, timestamp: { required: true, type: () => Date }, metadata: { required: false, type: () => Object }, ipAddress: { required: false, type: () => String }, userAgent: { required: false, type: () => String }, resourceType: { required: false, type: () => String }, resourceId: { required: false, type: () => String }, actionType: { required: false, type: () => String }, status: { required: false, type: () => Object }, errorMessage: { required: false, type: () => String }, changes: { required: false, type: () => ({ before: { required: true, type: () => Object }, after: { required: true, type: () => Object } }) }, tags: { required: false, type: () => [String] }, isSensitive: { required: true, type: () => Boolean }, duration: { required: false, type: () => Number }, sessionId: { required: false, type: () => String }, requestId: { required: false, type: () => String }, environment: { required: false, type: () => String }, version: { required: false, type: () => String }, performedByEmail: { required: false, type: () => String }, performedByRole: { required: false, type: () => String }, resourceName: { required: false, type: () => String }, retainOnDelete: { required: false, type: () => Boolean }, complianceMetadata: { required: false, type: () => ({ dataRetentionPeriod: { required: false, type: () => Number }, dataClassification: { required: false, type: () => String }, regulatoryRequirements: { required: false, type: () => [String] }, piiInvolved: { required: false, type: () => Boolean } }) } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], OrganizationAuditLog.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], OrganizationAuditLog.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "changes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], OrganizationAuditLog.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], OrganizationAuditLog.prototype, "isSensitive", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], OrganizationAuditLog.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "environment", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedByEmail", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedByRole", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceName", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], OrganizationAuditLog.prototype, "retainOnDelete", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "complianceMetadata", void 0);
OrganizationAuditLog = __decorate([
    (0, typeorm_1.Entity)('organization_audit_logs')
], OrganizationAuditLog);
exports.OrganizationAuditLog = OrganizationAuditLog;
//# sourceMappingURL=organization-audit-log.entity.js.map