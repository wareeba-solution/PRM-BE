import { BaseDto } from '../base.dto';
/**
 * Medical History DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class MedicalHistoryDto extends BaseDto {
    organizationId: string;
    contactId: string;
    type: string;
    title: string;
    description?: string;
    eventDate: Date;
    provider?: string;
    location?: string;
    status: string;
    severity?: string;
    documentIds?: string[];
    medicalCodes?: Record<string, string>;
    followUp?: string;
    followUpDate?: Date;
    notes?: string;
    metadata?: Record<string, any>;
}
