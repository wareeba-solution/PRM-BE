import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketPriority as TicketPriorityEntity, PriorityLevel } from '../entities/ticket-priority.entity';
import { CreateTicketPriorityDto } from '../dto/create-ticket-priority.dto';
import { UpdateTicketPriorityDto } from '../dto/update-ticket-priority.dto';
import { TicketPriority } from '../enums/ticket-priority.enum';

@Injectable()
export class TicketPriorityService {
    constructor(
        @InjectRepository(TicketPriorityEntity)
        private readonly ticketPriorityRepository: Repository<TicketPriorityEntity>,
    ) {}

    async create(organizationId: string, createDto: CreateTicketPriorityDto, createdById: string): Promise<TicketPriorityEntity> {
        const priority = this.ticketPriorityRepository.create({
            name: createDto.name,
            level: createDto.level as unknown as PriorityLevel,
            description: createDto.description || '',
            organizationId,
            createdById,
            isActive: true,
            responseTimeHours: createDto.responseTimeThreshold || 24,
            resolutionTimeHours: createDto.resolutionTimeThreshold || 48,
        });
        return this.ticketPriorityRepository.save(priority);
    }

    async findAll(organizationId: string): Promise<TicketPriorityEntity[]> {
        return this.ticketPriorityRepository.find({
            where: { organizationId, deletedAt: null },
            order: { responseTimeHours: 'ASC' },
        });
    }

    async findOne(id: string, organizationId: string): Promise<TicketPriorityEntity> {
        const priority = await this.ticketPriorityRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });
        if (!priority) {
            throw new NotFoundException('Ticket priority not found');
        }
        return priority;
    }

    async update(id: string, organizationId: string, updateDto: Partial<CreateTicketPriorityDto>): Promise<TicketPriorityEntity> {
        const priority = await this.findOne(id, organizationId);
        Object.assign(priority, {
            name: updateDto.name || priority.name,
            level: (updateDto.level as unknown as PriorityLevel) || priority.level,
            description: updateDto.description || priority.description,
            responseTimeHours: updateDto.responseTimeThreshold || priority.responseTimeHours,
            resolutionTimeHours: updateDto.resolutionTimeThreshold || priority.resolutionTimeHours,
        });
        return this.ticketPriorityRepository.save(priority);
    }

    async remove(id: string, organizationId: string): Promise<void> {
        const priority = await this.findOne(id, organizationId);
        await this.ticketPriorityRepository.softRemove(priority);
    }

    async initializeDefaultPriorities(organizationId: string, createdById: string): Promise<TicketPriorityEntity[]> {
        const defaultPriorities = [
            {
                name: 'Low',
                level: PriorityLevel.LOW,
                description: 'Low priority tickets with flexible response and resolution times',
                responseTimeHours: 48,
                resolutionTimeHours: 72,
                organizationId,
                createdById
            },
            {
                name: 'Medium',
                level: PriorityLevel.MEDIUM,
                description: 'Standard priority tickets with moderate response and resolution times',
                responseTimeHours: 24,
                resolutionTimeHours: 48,
                organizationId,
                createdById
            },
            {
                name: 'High',
                level: PriorityLevel.HIGH,
                description: 'High priority tickets requiring prompt attention',
                responseTimeHours: 12,
                resolutionTimeHours: 24,
                organizationId,
                createdById
            },
            {
                name: 'Urgent',
                level: PriorityLevel.URGENT,
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
                    level: priority.level as unknown as PriorityLevel,
                    deletedAt: null,
                },
            });

            if (!existingPriority) {
                const createdPriority = await this.create(organizationId, priority as unknown as CreateTicketPriorityDto, createdById);
                createdPriorities.push(createdPriority);
            }
        }
        return createdPriorities;
    }

    async determinePriority(
        organizationId: string,
        criteria: {
            patientCondition?: string;
            timeSensitivity?: number;
            impactLevel?: number;
        }
    ): Promise<TicketPriorityEntity> {
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
        let priorityLevel: PriorityLevel;
        if (score >= 8) {
            priorityLevel = PriorityLevel.URGENT;
        } else if (score >= 6) {
            priorityLevel = PriorityLevel.HIGH;
        } else if (score >= 4) {
            priorityLevel = PriorityLevel.MEDIUM;
        } else {
            priorityLevel = PriorityLevel.LOW;
        }
        
        // Find the priority entity with the determined level
        const priority = priorities.find(p => p.level === priorityLevel);
        if (!priority) {
            throw new Error(`No priority found for level ${priorityLevel}`);
        }
        
        return priority;
    }
} 