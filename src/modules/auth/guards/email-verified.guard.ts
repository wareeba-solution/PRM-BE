// src/modules/auth/guards/email-verified.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { SKIP_EMAIL_VERIFICATION } from '../decorators/skip-email-verification.decorator';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Check if endpoint is public or should skip email verification
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const skipVerification = this.reflector.getAllAndOverride<boolean>(
            SKIP_EMAIL_VERIFICATION,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic || skipVerification) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // If no user, let other guards handle authentication
        if (!user) {
            return true;
        }

        if (!user.isEmailVerified) {
            throw new UnauthorizedException('Email verification required. Please verify your email before continuing.');
        }

        return true;
    }
}