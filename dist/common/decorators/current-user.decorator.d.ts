import { User } from '../../modules/users/entities/user.entity';
/**
 * Custom decorator to extract the current user from the request
 *
 * @example
 * // Get entire user object
 * @CurrentUser() user: User
 *
 * @example
 * // Get specific user property
 * @CurrentUser('id') userId: string
 *
 * @example
 * // Get nested user property
 * @CurrentUser('organization.id') organizationId: string
 */
export declare const CurrentUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
/**
 * Type-safe version of CurrentUser decorator
 *
 * @example
 * @TypedCurrentUser<{id: string}>('id') userId: string
 */
export declare const TypedCurrentUser: <T = User>(propertyPath?: keyof T) => ParameterDecorator;
