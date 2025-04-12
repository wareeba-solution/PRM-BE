import { BaseDto } from '../base.dto';
/**
 * Document DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class DocumentDto extends BaseDto {
    organizationId: string;
    contactId?: string;
    title: string;
    type: string;
    description?: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    status: string;
    version: number;
    isConfidential: boolean;
    issuedAt?: Date;
    expiresAt?: Date;
    tags?: string[];
    metadata?: Record<string, any>;
}
