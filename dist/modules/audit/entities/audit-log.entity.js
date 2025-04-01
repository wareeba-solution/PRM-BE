var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export var AuditLogType;
(function (AuditLogType) {
    AuditLogType["AUTHENTICATION"] = "authentication";
    AuditLogType["AUTHORIZATION"] = "authorization";
    AuditLogType["DATA_ACCESS"] = "data_access";
    AuditLogType["DATA_MODIFICATION"] = "data_modification";
    AuditLogType["SYSTEM"] = "system";
    AuditLogType["SECURITY"] = "security";
    AuditLogType["COMPLIANCE"] = "compliance";
    AuditLogType["BUSINESS"] = "business";
})(AuditLogType || (AuditLogType = {}));
export var AuditLogSeverity;
(function (AuditLogSeverity) {
    AuditLogSeverity["INFO"] = "info";
    AuditLogSeverity["WARNING"] = "warning";
    AuditLogSeverity["ERROR"] = "error";
    AuditLogSeverity["CRITICAL"] = "critical";
})(AuditLogSeverity || (AuditLogSeverity = {}));
export var AuditLogStatus;
(function (AuditLogStatus) {
    AuditLogStatus["SUCCESS"] = "success";
    AuditLogStatus["FAILURE"] = "failure";
    AuditLogStatus["PENDING"] = "pending";
    AuditLogStatus["CANCELLED"] = "cancelled";
})(AuditLogStatus || (AuditLogStatus = {}));
let AuditLog = class AuditLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AuditLog.prototype, "id", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AuditLogType,
        default: AuditLogType.SYSTEM
    }),
    Index(),
    __metadata("design:type", String)
], AuditLog.prototype, "type", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AuditLogSeverity,
        default: AuditLogSeverity.INFO
    }),
    Index(),
    __metadata("design:type", String)
], AuditLog.prototype, "severity", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: AuditLogStatus,
        default: AuditLogStatus.SUCCESS
    }),
    Index(),
    __metadata("design:type", String)
], AuditLog.prototype, "status", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], AuditLog.prototype, "description", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "metadata", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "actorId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "actorType", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    JoinColumn({ name: 'actorId' }),
    __metadata("design:type", User)
], AuditLog.prototype, "actor", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityType", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "changes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "userAgent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "requestId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "sessionId", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "origin", void 0);
__decorate([
    CreateDateColumn(),
    Index(),
    __metadata("design:type", Date)
], AuditLog.prototype, "timestamp", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], AuditLog.prototype, "duration", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "location", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "securityContext", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "complianceMetadata", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "error", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    Index(),
    __metadata("design:type", Array)
], AuditLog.prototype, "tags", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "riskAssessment", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "businessContext", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "systemContext", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], AuditLog.prototype, "lastModified", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "expiresAt", void 0);
__decorate([
    Column({ default: false }),
    Index(),
    __metadata("design:type", Boolean)
], AuditLog.prototype, "archived", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "archivedAt", void 0);
__decorate([
    Column({ default: false }),
    Index(),
    __metadata("design:type", Boolean)
], AuditLog.prototype, "redacted", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], AuditLog.prototype, "redactedAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "customMetadata", void 0);
AuditLog = __decorate([
    Entity('audit_logs'),
    Index(['entityType', 'entityId']),
    Index(['actorType', 'actorId']),
    Index(['timestamp', 'type'])
], AuditLog);
export { AuditLog };
//# sourceMappingURL=audit-log.entity.js.map