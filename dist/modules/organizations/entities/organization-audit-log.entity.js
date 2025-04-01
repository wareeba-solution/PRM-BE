var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';
let OrganizationAuditLog = class OrganizationAuditLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], OrganizationAuditLog.prototype, "organization", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "eventType", void 0);
__decorate([
    Column('jsonb'),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "data", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedBy", void 0);
__decorate([
    CreateDateColumn(),
    Index(),
    __metadata("design:type", Date)
], OrganizationAuditLog.prototype, "timestamp", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "metadata", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "userAgent", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceType", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceId", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "actionType", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "status", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "errorMessage", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "changes", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], OrganizationAuditLog.prototype, "tags", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], OrganizationAuditLog.prototype, "isSensitive", void 0);
__decorate([
    Column('int', { nullable: true }),
    __metadata("design:type", Number)
], OrganizationAuditLog.prototype, "duration", void 0);
__decorate([
    Column('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "sessionId", void 0);
__decorate([
    Column('varchar', { length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "requestId", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "environment", void 0);
__decorate([
    Column('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "version", void 0);
__decorate([
    Column('varchar', { length: 255, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedByEmail", void 0);
__decorate([
    Column('varchar', { length: 100, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "performedByRole", void 0);
__decorate([
    Column('varchar', { length: 255, nullable: true }),
    Index(),
    __metadata("design:type", String)
], OrganizationAuditLog.prototype, "resourceName", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], OrganizationAuditLog.prototype, "retainOnDelete", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationAuditLog.prototype, "complianceMetadata", void 0);
OrganizationAuditLog = __decorate([
    Entity('organization_audit_logs')
], OrganizationAuditLog);
export { OrganizationAuditLog };
//# sourceMappingURL=organization-audit-log.entity.js.map