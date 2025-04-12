"use strict";
// src/common/decorators/auth.decorator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentOrganization = exports.CurrentUser = exports.RequireOrganization = exports.Public = exports.Auth = exports.AUTH_ORG_KEY = exports.AUTH_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../modules/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../modules/auth/guards/roles.guard");
exports.AUTH_ROLES_KEY = 'roles';
exports.AUTH_ORG_KEY = 'requireOrganization';
function Auth(options = {}) {
    const { roles = [], requireOrganization = true } = options;
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.AUTH_ROLES_KEY, roles), (0, common_1.SetMetadata)(exports.AUTH_ORG_KEY, requireOrganization), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard));
}
exports.Auth = Auth;
// Public routes decorator
function Public() {
    return (0, common_1.SetMetadata)('isPublic', true);
}
exports.Public = Public;
// Organization required decorator
function RequireOrganization() {
    return (0, common_1.SetMetadata)(exports.AUTH_ORG_KEY, true);
}
exports.RequireOrganization = RequireOrganization;
// Current user decorator
const common_2 = require("@nestjs/common");
exports.CurrentUser = (0, common_2.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});
// Current organization decorator
exports.CurrentOrganization = (0, common_2.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const organization = request.organization;
    return data ? organization === null || organization === void 0 ? void 0 : organization[data] : organization;
});
// Example usage:
/*
@Auth({ roles: [Role.ADMIN] })
@Get('admin-only')
adminOnlyEndpoint() {
    return 'Only admins can access this';
}

@Auth({ roles: [Role.DOCTOR, Role.ADMIN] })
@Get('doctors-and-admins')
doctorsAndAdminsEndpoint() {
    return 'Doctors and admins can access this';
}

@Public()
@Get('public')
publicEndpoint() {
    return 'Anyone can access this';
}

@Get('user-info')
getUserInfo(@CurrentUser() user: User) {
    return user;
}

@Get('org-info')
getOrgInfo(@CurrentOrganization() organization: Organization) {
    return organization;
}
*/ 
//# sourceMappingURL=auth.decorator.js.map