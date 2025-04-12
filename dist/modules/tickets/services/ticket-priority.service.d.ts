import { Repository } from 'typeorm';
import { TicketPriority as TicketPriorityEntity } from '../entities/ticket-priority.entity';
import { CreateTicketPriorityDto } from '../dto/create-ticket-priority.dto';
export declare class TicketPriorityService {
    private readonly ticketPriorityRepository;
    constructor(ticketPriorityRepository: Repository<TicketPriorityEntity>);
    create(organizationId: string, createDto: CreateTicketPriorityDto, createdById: string): Promise<TicketPriorityEntity>;
    findAll(organizationId: string): Promise<TicketPriorityEntity[]>;
    findOne(id: string, organizationId: string): Promise<TicketPriorityEntity>;
    update(id: string, organizationId: string, updateDto: Partial<CreateTicketPriorityDto>): Promise<TicketPriorityEntity>;
    remove(id: string, organizationId: string): Promise<void>;
    initializeDefaultPriorities(organizationId: string, createdById: string): Promise<TicketPriorityEntity[]>;
    determinePriority(organizationId: string, criteria: {
        patientCondition?: string;
        timeSensitivity?: number;
        impactLevel?: number;
    }): Promise<TicketPriorityEntity>;
}
