import { BaseDto } from '../base.dto';
/**
 * User DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class UserDto extends BaseDto {
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    permissions: string[];
    isActive: boolean;
    isLocked: boolean;
    isEmailVerified: boolean;
    requirePasswordChange: boolean;
    lastLoginAt?: Date;
    lastActiveAt?: Date;
    fullName: string;
    isAvailable: boolean;
}
