"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedCurrentUser = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
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
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return null;
    }
    if (!data) {
        return user;
    }
    // Handle nested properties using dot notation
    return data.split('.').reduce((obj, key) => {
        return obj === null || obj === void 0 ? void 0 : obj[key];
    }, user);
});
/**
 * Type-safe version of CurrentUser decorator
 *
 * @example
 * @TypedCurrentUser<{id: string}>('id') userId: string
 */
const TypedCurrentUser = (propertyPath) => (0, exports.CurrentUser)(propertyPath);
exports.TypedCurrentUser = TypedCurrentUser;
//# sourceMappingURL=current-user.decorator.js.map