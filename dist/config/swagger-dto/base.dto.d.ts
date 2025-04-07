/**
 * Base DTO class with common properties for Swagger documentation
 * Using DTOs instead of entity classes helps avoid circular dependency issues
 */
export declare class BaseDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
