// src/modules/tenants/guards/tenant.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        // Check if endpoint is marked as public (no tenant needed)
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }

        // Check if tenant context exists
        if (!request.tenantId || !request.tenant) {
            throw new UnauthorizedException('Tenant context is required');
        }

        // Check if tenant is active
        if (!request.tenant.isActive) {
            throw new UnauthorizedException('Tenant is inactive');
        }

        return true;
    }
}