// src/modules/auth/guards/jwt-auth.guard.ts

import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Check if the endpoint is marked as public
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        // Log request details for debugging
        const request = context.switchToHttp().getRequest();
        this.logger.debug(`JWT Auth Guard - Incoming request to: ${request.method} ${request.url}`);
        this.logger.debug(`Has Authorization Header: ${!!request.headers.authorization}`);

        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        // Enhanced logging for debugging
        this.logger.debug(`Token present: ${!!token}`);
        this.logger.debug(`JWT Strategy error: ${err?.message || 'No error'}`);
        this.logger.debug(`User from JWT Strategy: ${JSON.stringify(user) || 'No user'}`);
        this.logger.debug(`Info from JWT Strategy: ${JSON.stringify(info) || 'No info'}`);

        // If there's an error or no user, throw an error with detailed info
        if (err || !user) {
            this.logger.warn(`Authentication failed: ${err?.message || 'No user found'}`);

            // For debugging - log the token info
            if (token) {
                try {
                    const tokenParts = token.split('.');
                    if (tokenParts.length === 3) {
                        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
                        this.logger.debug(`Token payload: ${JSON.stringify(payload)}`);
                        this.logger.debug(`Token expiry: ${new Date(payload.exp * 1000).toISOString()}`);
                        this.logger.debug(`Current time: ${new Date().toISOString()}`);
                    }
                } catch (e) {
                    this.logger.debug(`Failed to decode token: ${e.message}`);
                }
            }

            throw new UnauthorizedException(
                err?.message || 'Invalid or expired token',
            );
        }

        // TEMPORARILY SIMPLIFY - skip additional validations for debugging
        /*
        // Check if user is active
        if (!user.isActive) {
            this.logger.warn(`Inactive user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('User account is inactive');
        }

        // Check if user's email is verified
        if (user.verification && !user.isEmailVerified) {
            this.logger.warn(`Unverified user ${user.id} attempted to access the system`);
            throw new UnauthorizedException('Email verification required');
        }
        */

        // Add token metadata to request
        request.tokenMetadata = {
            token,
            iat: user.iat,
            exp: user.exp,
        };

        // Log successful authentication
        this.logger.debug(`User ${user.id} successfully authenticated`);

        return user;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}