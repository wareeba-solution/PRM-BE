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
var TicketActivityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const ticket_activity_entity_1 = require("../entities/ticket-activity.entity");
const ticket_entity_1 = require("../entities/ticket.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_activity_type_enum_1 = require("../enums/ticket-activity-type.enum");
let TicketActivityService = TicketActivityService_1 = class TicketActivityService {
    constructor(activityRepository, ticketRepository, userRepository, eventEmitter) {
        this.activityRepository = activityRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(TicketActivityService_1.name);
    }
    async logActivity(options) {
        try {
            // Verify ticket exists
            const ticket = await this.ticketRepository.findOne({
                where: { id: options.ticketId }
            });
            if (!ticket) {
                throw new Error(`Ticket ${options.ticketId} not found`);
            }
            // Create activity record
            const activity = this.activityRepository.create({
                ticketId: options.ticketId,
                performedById: options.performedById,
                type: options.type,
                data: this.sanitizeActivityData(options.data || {}),
                metadata: options.metadata || {},
                timestamp: new Date()
            });
            await this.activityRepository.save(activity);
            // Emit activity event
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
            // Apply filters
            if ((_a = options.types) === null || _a === void 0 ? void 0 : _a.length) {
                queryBuilder.andWhere('activity.type IN (:...types)', { types: options.types });
            }
            if (options.startDate) {
                queryBuilder.andWhere('activity.timestamp >= :startDate', { startDate: options.startDate });
            }
            if (options.endDate) {
                queryBuilder.andWhere('activity.timestamp <= :endDate', { endDate: options.endDate });
            }
            // Add relations
            queryBuilder
                .leftJoinAndSelect('activity.performedBy', 'user')
                .orderBy('activity.timestamp', 'DESC');
            // Apply pagination
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
            // Add relations
            queryBuilder
                .leftJoinAndSelect('activity.ticket', 'ticket')
                .orderBy('activity.timestamp', 'DESC');
            // Apply pagination
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
            // Convert to record
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
        // Recursively sanitize sensitive data
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
            // Group activities by date
            const groupedActivities = activities.reduce((acc, activity) => {
                const date = activity.timestamp.toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(activity);
                return acc;
            }, {});
            // Calculate statistics
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
    async recordActivity(data) {
        const activity = this.activityRepository.create({
            ticketId: data.ticketId,
            organizationId: data.organizationId,
            performedById: data.userId,
            type: ticket_activity_type_enum_1.TicketActivityType.STATUS_CHANGED,
            data: data.details
        });
        return this.activityRepository.save(activity);
    }
};
TicketActivityService = TicketActivityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_activity_entity_1.TicketActivity)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], TicketActivityService);
exports.TicketActivityService = TicketActivityService;
function Between(startDate, endDate) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=ticket-activity.service.js.map