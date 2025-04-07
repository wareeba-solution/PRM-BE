import { BaseDto } from '../base.dto';
/**
 * Merged Record DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class MergedRecordDto extends BaseDto {
    organizationId: string;
    primaryContactId: string;
    secondaryContactId: string;
    reason?: string;
    status: string;
    mergedFields?: string[];
    conflicts?: Record<string, {
        primary: any;
        secondary: any;
        resolution: string;
    }>;
    isReversible: boolean;
    mergedAt?: Date;
    revertedAt?: Date;
    metadata?: Record<string, any>;
}
