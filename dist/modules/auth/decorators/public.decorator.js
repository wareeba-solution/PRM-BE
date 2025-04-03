"use strict";
// src/modules/auth/decorators/public.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
var common_1 = require("@nestjs/common");
/**
 * Public route decorator
 * Use this decorator to mark a route as public (no authentication required)
 * Example: @Public()
 */
exports.IS_PUBLIC_KEY = 'isPublic';
var Public = function () { return (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true); };
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map