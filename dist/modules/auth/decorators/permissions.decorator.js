"use strict";
// src/decorators/permissions.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.PERMISSIONS_KEY = void 0;
var common_1 = require("@nestjs/common");
/**
 * Permissions required for this route
 * @param permissions list of permissions required
 * @returns decorator function
 */
exports.PERMISSIONS_KEY = 'permissions';
var Permissions = function () {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions);
};
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.decorator.js.map