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
exports.TicketPriorityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_priority_entity_1 = require("../entities/ticket-priority.entity");
let TicketPriorityService = class TicketPriorityService {
    constructor(ticketPriorityRepository) {
        this.ticketPriorityRepository = ticketPriorityRepository;
    }
    async create(organizationId, createDto, createdById) {
        const priority = this.ticketPriorityRepository.create({
            name: createDto.name,
            level: createDto.level,
            description: createDto.description || '',
            organizationId,
            createdById,
            isActive: true,
            responseTimeHours: createDto.responseTimeThreshold || 24,
            resolutionTimeHours: createDto.resolutionTimeThreshold || 48,
        });
        return this.ticketPriorityRepository.save(priority);
    }
    async findAll(organizationId) {
        return this.ticketPriorityRepository.find({
            where: { organizationId, deletedAt: null },
            order: { responseTimeHours: 'ASC' },
        });
    }
    async findOne(id, organizationId) {
        const priority = await this.ticketPriorityRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });
        if (!priority) {
            throw new common_1.NotFoundException('Ticket priority not found');
        }
        return priority;
    }
    async update(id, organizationId, updateDto) {
        const priority = await this.findOne(id, organizationId);
        Object.assign(priority, {
            name: updateDto.name || priority.name,
            level: updateDto.level || priority.level,
            description: updateDto.description || priority.description,
            responseTimeHours: updateDto.responseTimeThreshold || priority.responseTimeHours,
            resolutionTimeHours: updateDto.resolutionTimeThreshold || priority.resolutionTimeHours,
        });
        return this.ticketPriorityRepository.save(priority);
    }
    async remove(id, organizationId) {
        const priority = await this.findOne(id, organizationId);
        await this.ticketPriorityRepository.softRemove(priority);
    }
    async initializeDefaultPriorities(organizationId, createdById) {
        const defaultPriorities = [
            {
                name: 'Low',
                level: ticket_priority_entity_1.PriorityLevel.LOW,
                description: 'Low priority tickets with flexible response and resolution times',
                responseTimeHours: 48,
                resolutionTimeHours: 72,
                organizationId,
                createdById
            },
            {
                name: 'Medium',
                level: ticket_priority_entity_1.PriorityLevel.MEDIUM,
                description: 'Standard priority tickets with moderate response and resolution times',
                responseTimeHours: 24,
                resolutionTimeHours: 48,
                organizationId,
                createdById
            },
            {
                name: 'High',
                level: ticket_priority_entity_1.PriorityLevel.HIGH,
                description: 'High priority tickets requiring prompt attention',
                responseTimeHours: 12,
                resolutionTimeHours: 24,
                organizationId,
                createdById
            },
            {
                name: 'Urgent',
                level: ticket_priority_entity_1.PriorityLevel.URGENT,
                description: 'Urgent tickets requiring immediate attention',
                responseTimeHours: 2,
                resolutionTimeHours: 4,
                organizationId,
                createdById
            }
        ];
        const createdPriorities = [];
        for (const priority of defaultPriorities) {
            const existingPriority = await this.ticketPriorityRepository.findOne({
                where: {
                    organizationId,
                    level: priority.level,
                    deletedAt: null,
                },
            });
            if (!existingPriority) {
                const createdPriority = await this.create(organizationId, priority, createdById);
                createdPriorities.push(createdPriority);
            }
        }
        return createdPriorities;
    }
    async determinePriority(organizationId, criteria) {
        // Get all active priorities for the organization
        const priorities = await this.findAll(organizationId);
        // Calculate priority score based on criteria
        let score = 0;
        if (criteria.timeSensitivity) {
            score += criteria.timeSensitivity * 2; // Time sensitivity has higher weight
        }
        if (criteria.impactLevel) {
            score += criteria.impactLevel;
        }
        // Determine priority level based on score
        let priorityLevel;
        if (score >= 8) {
            priorityLevel = ticket_priority_entity_1.PriorityLevel.URGENT;
        }
        else if (score >= 6) {
            priorityLevel = ticket_priority_entity_1.PriorityLevel.HIGH;
        }
        else if (score >= 4) {
            priorityLevel = ticket_priority_entity_1.PriorityLevel.MEDIUM;
        }
        else {
            priorityLevel = ticket_priority_entity_1.PriorityLevel.LOW;
        }
        // Find the priority entity with the determined level
        const priority = priorities.find(p => p.level === priorityLevel);
        if (!priority) {
            throw new Error(`No priority found for level ${priorityLevel}`);
        }
        return priority;
    }
};
TicketPriorityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_priority_entity_1.TicketPriority)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TicketPriorityService);
exports.TicketPriorityService = TicketPriorityService;
//# sourceMappingURL=ticket-priority.service.js.map