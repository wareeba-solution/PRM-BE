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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentAuditLog } from '../entities/department-audit-log.entity';
import { Department } from '../entities/department.entity';
let DepartmentAuditService = class DepartmentAuditService {
    constructor(auditLogRepository, departmentRepository) {
        this.auditLogRepository = auditLogRepository;
        this.departmentRepository = departmentRepository;
    }
    async log(options) {
        var _a, _b;
        const auditLog = this.auditLogRepository.create({
            departmentId: options.departmentId,
            organizationId: options.organizationId,
            action: options.action,
            performedById: options.performedById,
            changes: options.changes,
            metadata: options.metadata,
            affectedUserId: options.affectedUserId,
            ipAddress: (_a = options.request) === null || _a === void 0 ? void 0 : _a.ip,
            userAgent: (_b = options.request) === null || _b === void 0 ? void 0 : _b.headers['user-agent'],
        });
        return this.auditLogRepository.save(auditLog);
    }
    async getDepartmentAuditTrail(departmentId, options = {}) {
        var _a;
        const queryBuilder = this.auditLogRepository
            .createQueryBuilder('audit')
            .leftJoinAndSelect('audit.performedBy', 'performer')
            .leftJoinAndSelect('audit.affectedUser', 'affected')
            .where('audit.departmentId = :departmentId', { departmentId });
        if (options.startDate) {
            queryBuilder.andWhere('audit.createdAt >= :startDate', {
                startDate: options.startDate
            });
        }
        if (options.endDate) {
            queryBuilder.andWhere('audit.createdAt <= :endDate', {
                endDate: options.endDate
            });
        }
        if ((_a = options.actions) === null || _a === void 0 ? void 0 : _a.length) {
            queryBuilder.andWhere('audit.action IN (:...actions)', {
                actions: options.actions
            });
        }
        return queryBuilder
            .orderBy('audit.createdAt', 'DESC')
            .take(options.limit || 50)
            .skip(options.offset || 0)
            .getManyAndCount();
    }
    async getUserDepartmentActivity(userId, options = {}) {
        var _a;
        const queryBuilder = this.auditLogRepository
            .createQueryBuilder('audit')
            .where('(audit.performedById = :userId OR audit.affectedUserId = :userId)', { userId });
        if ((_a = options.departmentIds) === null || _a === void 0 ? void 0 : _a.length) {
            queryBuilder.andWhere('audit.departmentId IN (:...departmentIds)', {
                departmentIds: options.departmentIds
            });
        }
        if (options.startDate) {
            queryBuilder.andWhere('audit.createdAt >= :startDate', {
                startDate: options.startDate
            });
        }
        if (options.endDate) {
            queryBuilder.andWhere('audit.createdAt <= :endDate', {
                endDate: options.endDate
            });
        }
        return queryBuilder
            .orderBy('audit.createdAt', 'DESC')
            .take(options.limit || 50)
            .skip(options.offset || 0)
            .getManyAndCount();
    }
    compareChanges(oldData, newData) {
        const changes = {};
        for (const key of Object.keys(newData)) {
            if (oldData[key] !== undefined &&
                JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
                changes[key] = {
                    old: oldData[key],
                    new: newData[key]
                };
            }
        }
        return changes;
    }
    async cleanupOldLogs(retentionDays = 365) {
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
DepartmentAuditService = __decorate([
    Injectable(),
    __param(0, InjectRepository(DepartmentAuditLog)),
    __param(1, InjectRepository(Department)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], DepartmentAuditService);
export { DepartmentAuditService };
//# sourceMappingURL=department-audit.service.js.map