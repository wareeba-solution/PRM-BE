import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../modules/auth/guards/roles.guard';
export const AUTH_ROLES_KEY = 'roles';
export const AUTH_ORG_KEY = 'requireOrganization';
export function Auth(options = {}) {
    const { roles = [], requireOrganization = true } = options;
    return applyDecorators(SetMetadata(AUTH_ROLES_KEY, roles), SetMetadata(AUTH_ORG_KEY, requireOrganization), UseGuards(JwtAuthGuard, RolesGuard), ApiBearerAuth(), ApiUnauthorizedResponse({ description: 'Unauthorized' }));
}
export function Public() {
    return SetMetadata('isPublic', true);
}
export function RequireOrganization() {
    return SetMetadata(AUTH_ORG_KEY, true);
}
import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});
export const CurrentOrganization = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const organization = request.organization;
    return data ? organization === null || organization === void 0 ? void 0 : organization[data] : organization;
});
//# sourceMappingURL=auth.decorator.js.map