"use strict";
// src/modules/auth/decorators/roles.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
};
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map