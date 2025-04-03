"use strict";
// src/modules/auth/decorators/current-user.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
/**
 * Current user decorator
 * Use this decorator to extract the current user from the request
 * Example: @CurrentUser() user: User
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map