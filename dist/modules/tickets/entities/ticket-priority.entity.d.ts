import { Organization } from '../../../modules/organizations/entities/organization.entity';
import { User } from '../../../modules/users/entities/user.entity';
export declare enum PriorityLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare class TicketPriority {
    id: string;
    name: string;
    level: PriorityLevel;
    description: string;
    responseTimeHours: number;
    resolutionTimeHours: number;
    isActive: boolean;
    organizationId: string;
    organization: Organization;
    createdById: string;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
