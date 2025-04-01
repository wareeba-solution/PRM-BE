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
var UserActivityService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from '../entities/user-activity.entity';
import { User } from '../entities/user.entity';
export var ActivityType;
(function (ActivityType) {
    ActivityType["LOGIN"] = "LOGIN";
    ActivityType["LOGOUT"] = "LOGOUT";
    ActivityType["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    ActivityType["PROFILE_UPDATE"] = "PROFILE_UPDATE";
    ActivityType["MFA_ENABLED"] = "MFA_ENABLED";
    ActivityType["MFA_DISABLED"] = "MFA_DISABLED";
    ActivityType["API_ACCESS"] = "API_ACCESS";
    ActivityType["SETTINGS_CHANGE"] = "SETTINGS_CHANGE";
    ActivityType["ROLE_CHANGE"] = "ROLE_CHANGE";
    ActivityType["DEPARTMENT_ASSIGNMENT"] = "DEPARTMENT_ASSIGNMENT";
    ActivityType["PERMISSION_CHANGE"] = "PERMISSION_CHANGE";
    ActivityType["EXPORT_DATA"] = "EXPORT_DATA";
    ActivityType["BULK_ACTION"] = "BULK_ACTION";
})(ActivityType || (ActivityType = {}));
let UserActivityService = UserActivityService_1 = class UserActivityService {
    constructor(activityRepository, userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.logger = new Logger(UserActivityService_1.name);
    }
    async logActivity(options) {
        try {
            const activity = this.activityRepository.create({
                userId: options.userId,
                organizationId: options.organizationId,
                type: options.type,
                description: options.description,
                metadata: options.metadata,
                ipAddress: options.ip,
                userAgent: options.userAgent,
                referrer: options.referrer,
                status: options.status || 'SUCCESS',
                failureReason: options.failureReason
            });
            const savedActivity = await this.activityRepository.save(activity);
            return Array.isArray(savedActivity) ? savedActivity[0] : savedActivity;
        }
        catch (error) {
            this.logger.error(`Failed to log activity for user ${options.userId}:`, error);
            throw error;
        }
    }
    async getUserActivity(userId, options = {}) {
        var _a;
        const queryBuilder = this.activityRepository
            .createQueryBuilder('activity')
            .where('activity.userId = :userId', { userId })
            .orderBy('activity.createdAt', 'DESC');
        if (options.startDate) {
            queryBuilder.andWhere('activity.createdAt >= :startDate', {
                startDate: options.startDate
            });
        }
        if (options.endDate) {
            queryBuilder.andWhere('activity.createdAt <= :endDate', {
                endDate: options.endDate
            });
        }
        if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
            queryBuilder.andWhere('activity.type IN (:...types)', {
                types: options.types
            });
        }
        if (options.status) {
            queryBuilder.andWhere('activity.status = :status', {
                status: options.status
            });
        }
        return queryBuilder
            .take(options.limit || 50)
            .skip(options.offset || 0)
            .getManyAndCount();
    }
    async getOrganizationActivity(organizationId, options = {}) {
        var _a, _b;
        const queryBuilder = this.activityRepository
            .createQueryBuilder('activity')
            .where('activity.organizationId = :organizationId', { organizationId })
            .orderBy('activity.createdAt', 'DESC');
        if (options.startDate) {
            queryBuilder.andWhere('activity.createdAt >= :startDate', {
                startDate: options.startDate
            });
        }
        if (options.endDate) {
            queryBuilder.andWhere('activity.createdAt <= :endDate', {
                endDate: options.endDate
            });
        }
        if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
            queryBuilder.andWhere('activity.type IN (:...types)', {
                types: options.types
            });
        }
        if ((_b = options.userIds) === null || _b === void 0 ? void 0 : _b.length) {
            queryBuilder.andWhere('activity.userId IN (:...userIds)', {
                userIds: options.userIds
            });
        }
        if (options.status) {
            queryBuilder.andWhere('activity.status = :status', {
                status: options.status
            });
        }
        return queryBuilder
            .take(options.limit || 50)
            .skip(options.offset || 0)
            .getManyAndCount();
    }
    async getUserActivitySummary(userId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const activities = await this.activityRepository
            .createQueryBuilder('activity')
            .select('activity.type')
            .addSelect('COUNT(*)', 'count')
            .where('activity.userId = :userId', { userId })
            .andWhere('activity.createdAt >= :startDate', { startDate })
            .groupBy('activity.type')
            .getRawMany();
        return activities.reduce((acc, curr) => {
            acc[curr.activity_type] = parseInt(curr.count);
            return acc;
        }, {});
    }
    async getMostActiveUsers(organizationId, options = {}) {
        const queryBuilder = this.activityRepository
            .createQueryBuilder('activity')
            .select('activity.userId')
            .addSelect('COUNT(*)', 'count')
            .where('activity.organizationId = :organizationId', { organizationId });
        if (options.startDate) {
            queryBuilder.andWhere('activity.createdAt >= :startDate', {
                startDate: options.startDate
            });
        }
        if (options.endDate) {
            queryBuilder.andWhere('activity.createdAt <= :endDate', {
                endDate: options.endDate
            });
        }
        const results = await queryBuilder
            .groupBy('activity.userId')
            .orderBy('count', 'DESC')
            .limit(options.limit || 10)
            .getRawMany();
        return results.map(result => ({
            userId: result.activity_userId,
            count: parseInt(result.count)
        }));
    }
    async cleanupOldLogs(retentionDays = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        const result = await this.activityRepository
            .createQueryBuilder()
            .delete()
            .where('createdAt < :cutoffDate', { cutoffDate })
            .execute();
        return result.affected || 0;
    }
};
UserActivityService = UserActivityService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(UserActivity)),
    __param(1, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], UserActivityService);
export { UserActivityService };
//# sourceMappingURL=user-activity.service.js.map