/**
 * Simplified User DTO for API responses
 * This provides a clean representation of user data
 */
export declare class SimpleUserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
}
