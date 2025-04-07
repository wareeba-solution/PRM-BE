import { BaseDto } from '../base.dto';
/**
 * Contact Relationship DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class ContactRelationshipDto extends BaseDto {
    organizationId: string;
    contactId: string;
    relatedContactId: string;
    type: string;
    relationship: string;
    isPrimary: boolean;
    isEmergencyContact: boolean;
    notes?: string;
    status: string;
    metadata?: Record<string, any>;
}
