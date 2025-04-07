import { BaseDto } from '../base.dto';
/**
 * Department DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class DepartmentDto extends BaseDto {
    organizationId: string;
    name: string;
    description?: string;
    managerId?: string;
    email?: string;
    phoneNumber?: string;
    location?: string;
    isActive: boolean;
    code?: string;
    parentDepartmentId?: string;
    workingHours?: Record<string, {
        start: string;
        end: string;
    } | null>;
    metadata?: Record<string, any>;
    tags?: string[];
}
