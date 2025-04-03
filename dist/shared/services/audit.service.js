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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entity_1 = require("../../modules/audit/entities/audit-log.entity");
let AuditService = class AuditService {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    /**
     * Create a new audit log entry
     */
    async log(dto, request) {
        var _a, _b;
        const auditLog = this.auditLogRepository.create({
            action: dto.action,
            entityType: dto.entityType,
            entityId: dto.entityId.toString(),
            changes: dto.changes || {},
            metadata: Object.assign(Object.assign({}, dto.metadata), { ipAddress: dto.ipAddress || (request === null || request === void 0 ? void 0 : request.ip), userAgent: dto.userAgent || (request === null || request === void 0 ? void 0 : request.headers['user-agent']), timestamp: new Date() }),
            actorId: (_a = dto.actorId) === null || _a === void 0 ? void 0 : _a.toString(),
            organizationId: (_b = dto.organizationId) === null || _b === void 0 ? void 0 : _b.toString(),
        });
        return this.auditLogRepository.save(auditLog);
    }
    /**
     * Get audit logs for a specific entity
     */
    async getEntityAuditLogs(entityType, entityId, options = {}) {
        var _a;
        const query = this.auditLogRepository
            .createQueryBuilder('audit_log')
            .where('audit_log.entityType = :entityType', { entityType })
            .andWhere('audit_log.entityId = :entityId', { entityId: entityId.toString() });
        if (options.startDate) {
            query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
        }
        if (options.endDate) {
            query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
        }
        if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
            query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
        }
        query
            .orderBy('audit_log.createdAt', 'DESC')
            .skip(options.offset || 0)
            .take(options.limit || 50);
        return query.getManyAndCount();
    }
    /**
     * Get audit logs for a specific user
     */
    async getUserAuditLogs(actorId, // Changed from userId to actorId
    options = {}) {
        var _a, _b;
        const query = this.auditLogRepository
            .createQueryBuilder('audit_log')
            .where('audit_log.actorId = :actorId', { actorId: actorId.toString() }); // Changed from userId to actorId
        if (options.startDate) {
            query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
        }
        if (options.endDate) {
            query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
        }
        if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
            query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
        }
        if ((_b = options.entityTypes) === null || _b === void 0 ? void 0 : _b.length) {
            query.andWhere('audit_log.entityType IN (:...entityTypes)', { entityTypes: options.entityTypes });
        }
        query
            .orderBy('audit_log.createdAt', 'DESC')
            .skip(options.offset || 0)
            .take(options.limit || 50);
        return query.getManyAndCount();
    }
    /**
     * Get audit logs for an organization
     */
    async getOrganizationAuditLogs(organizationId, options = {}) {
        var _a, _b, _c;
        const query = this.auditLogRepository
            .createQueryBuilder('audit_log')
            .where('audit_log.organizationId = :organizationId', { organizationId: organizationId.toString() });
        if (options.startDate) {
            query.andWhere('audit_log.createdAt >= :startDate', { startDate: options.startDate });
        }
        if (options.endDate) {
            query.andWhere('audit_log.createdAt <= :endDate', { endDate: options.endDate });
        }
        if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
            query.andWhere('audit_log.action IN (:...actions)', { actions: options.actions });
        }
        if ((_b = options.entityTypes) === null || _b === void 0 ? void 0 : _b.length) {
            query.andWhere('audit_log.entityType IN (:...entityTypes)', { entityTypes: options.entityTypes });
        }
        if ((_c = options.actorIds) === null || _c === void 0 ? void 0 : _c.length) { // Changed from userIds to actorIds
            query.andWhere('audit_log.actorId IN (:...actorIds)', {
                actorIds: options.actorIds.map(id => id.toString()), // Changed from userIds to actorIds
            });
        }
        query
            .orderBy('audit_log.createdAt', 'DESC')
            .skip(options.offset || 0)
            .take(options.limit || 50);
        return query.getManyAndCount();
    }
    /**
     * Clean up old audit logs
     */
    async cleanupOldLogs(retentionDays = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        const result = await this.auditLogRepository
            .createQueryBuilder()
            .delete()
            .where('createdAt < :cutoffDate', { cutoffDate })
            .execute();
        return result.affected || 0;
    }
};
AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditService);
exports.AuditService = AuditService;
//# sourceMappingURL=audit.service.js.map