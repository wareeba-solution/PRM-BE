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
var TicketActivityService_1;
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
let TicketActivityService = TicketActivityService_1 = class TicketActivityService {
    recordActivity(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(activityRepository, ticketRepository, userRepository, eventEmitter) {
        this.activityRepository = activityRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(TicketActivityService_1.name);
    }
    async logActivity(options) {
        try {
            const ticket = await this.ticketRepository.findOne({
                where: { id: options.ticketId }
            });
            if (!ticket) {
                throw new Error(`Ticket ${options.ticketId} not found`);
            }
            const activity = this.activityRepository.create({
                ticketId: options.ticketId,
                performedById: options.performedById,
                type: options.type,
                data: this.sanitizeActivityData(options.data || {}),
                metadata: options.metadata || {},
                timestamp: new Date()
            });
            await this.activityRepository.save(activity);
            this.eventEmitter.emit('ticket.activity.created', {
                activity,
                ticket
            });
            return activity;
        }
        catch (error) {
            this.logger.error('Error logging ticket activity:', error);
            throw error;
        }
    }
    async getTicketActivities(ticketId, options = {}) {
        var _a;
        try {
            const queryBuilder = this.activityRepository
                .createQueryBuilder('activity')
                .where('activity.ticketId = :ticketId', { ticketId });
            if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
                queryBuilder.andWhere('activity.type IN (:...types)', { types: options.types });
            }
            if (options.startDate) {
                queryBuilder.andWhere('activity.timestamp >= :startDate', { startDate: options.startDate });
            }
            if (options.endDate) {
                queryBuilder.andWhere('activity.timestamp <= :endDate', { endDate: options.endDate });
            }
            queryBuilder
                .leftJoinAndSelect('activity.performedBy', 'user')
                .orderBy('activity.timestamp', 'DESC');
            if (options.limit) {
                queryBuilder.take(options.limit);
            }
            if (options.offset) {
                queryBuilder.skip(options.offset);
            }
            const [activities, total] = await queryBuilder.getManyAndCount();
            return { activities, total };
        }
        catch (error) {
            this.logger.error(`Error fetching activities for ticket ${ticketId}:`, error);
            throw error;
        }
    }
    async getUserActivities(userId, options = {}) {
        try {
            const queryBuilder = this.activityRepository
                .createQueryBuilder('activity')
                .where('activity.performedById = :userId', { userId });
            if (options.startDate) {
                queryBuilder.andWhere('activity.timestamp >= :startDate', { startDate: options.startDate });
            }
            if (options.endDate) {
                queryBuilder.andWhere('activity.timestamp <= :endDate', { endDate: options.endDate });
            }
            queryBuilder
                .leftJoinAndSelect('activity.ticket', 'ticket')
                .orderBy('activity.timestamp', 'DESC');
            if (options.limit) {
                queryBuilder.take(options.limit);
            }
            if (options.offset) {
                queryBuilder.skip(options.offset);
            }
            const [activities, total] = await queryBuilder.getManyAndCount();
            return { activities, total };
        }
        catch (error) {
            this.logger.error(`Error fetching activities for user ${userId}:`, error);
            throw error;
        }
    }
    async getActivityDetails(activityId) {
        try {
            const activity = await this.activityRepository.findOne({
                where: { id: activityId },
                relations: ['performedBy', 'ticket']
            });
            if (!activity) {
                throw new Error(`Activity ${activityId} not found`);
            }
            return activity;
        }
        catch (error) {
            this.logger.error(`Error fetching activity details for ${activityId}:`, error);
            throw error;
        }
    }
    async getActivitySummary(ticketId, startDate, endDate) {
        try {
            const activities = await this.activityRepository
                .createQueryBuilder('activity')
                .select('activity.type', 'type')
                .addSelect('COUNT(*)', 'count')
                .where('activity.ticketId = :ticketId', { ticketId })
                .andWhere('activity.timestamp BETWEEN :startDate AND :endDate', { startDate, endDate })
                .groupBy('activity.type')
                .getRawMany();
            return activities.reduce((acc, curr) => {
                acc[curr.type] = parseInt(curr.count, 10);
                return acc;
            }, {});
        }
        catch (error) {
            this.logger.error(`Error generating activity summary for ticket ${ticketId}:`, error);
            throw error;
        }
    }
    sanitizeActivityData(data) {
        const sensitiveFields = ['password', 'token', 'secret', 'key'];
        const sanitized = Object.assign({}, data);
        const sanitizeObject = (obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                    obj[key] = '[REDACTED]';
                }
                else if (typeof value === 'object' && value !== null) {
                    sanitizeObject(value);
                }
            }
        };
        sanitizeObject(sanitized);
        return sanitized;
    }
    async generateActivityReport(ticketId, startDate, endDate) {
        try {
            const activities = await this.activityRepository.find({
                where: {
                    ticketId,
                    timestamp: Between(startDate, endDate)
                },
                relations: ['performedBy'],
                order: { timestamp: 'ASC' }
            });
            const groupedActivities = activities.reduce((acc, activity) => {
                const date = activity.timestamp.toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(activity);
                return acc;
            }, {});
            const statistics = {
                totalActivities: activities.length,
                byType: this.calculateActivityTypeStats(activities),
                byUser: this.calculateUserActivityStats(activities),
                averageActivitiesPerDay: activities.length / ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
            };
            return {
                ticketId,
                period: { startDate, endDate },
                statistics,
                activities: groupedActivities,
            };
        }
        catch (error) {
            this.logger.error(`Error generating activity report for ticket ${ticketId}:`, error);
            throw error;
        }
    }
    calculateActivityTypeStats(activities) {
        return activities.reduce((acc, activity) => {
            acc[activity.type] = (acc[activity.type] || 0) + 1;
            return acc;
        }, {});
    }
    calculateUserActivityStats(activities) {
        return activities.reduce((acc, activity) => {
            const userId = activity.performedById;
            acc[userId] = (acc[userId] || 0) + 1;
            return acc;
        }, {});
    }
};
TicketActivityService = TicketActivityService_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(TicketActivity)),
    __param(1, InjectRepository(Ticket)),
    __param(2, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        EventEmitter2])
], TicketActivityService);
export { TicketActivityService };
function Between(startDate, endDate) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=ticket-activity.service.js.map