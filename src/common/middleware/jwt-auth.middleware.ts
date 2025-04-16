// src/common/middleware/jwt-auth.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/services/users.service';

// Define the JWT payload interface if it doesn't exist
interface JwtPayload {
    sub: string;
    email?: string;
    role?: string;
    organizationId?: string;
    tenantId?: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    private readonly logger = new Logger(JwtAuthMiddleware.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    async use(req: any, res: Response, next: NextFunction) {
        this.logger.debug(`JWT middleware running for: ${req.method} ${req.url}`);

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            try {
                const payload = this.jwtService.verify<JwtPayload>(token, {
                    secret: this.configService.get('jwt.secret')
                });

                if (payload && payload.sub) {
                    // Get user from database - pass the organizationId as the second argument
                    // Check if your findOne method requires a second parameter
                    const user = await this.usersService.findOne(
                        payload.sub,
                        payload.organizationId || undefined
                    );

                    if (user) {
                        // Attach user and other data to request
                        req.user = user;
                        if (payload.organizationId) {
                            req.user.organizationId = payload.organizationId;
                        }
                        if (payload.tenantId) {
                            req.user.tenantId = payload.tenantId;
                        }

                        this.logger.debug(`User authenticated: ${user.id}, Organization: ${payload.organizationId || 'none'}`);
                    }
                }
            } catch (error) {
                this.logger.warn(`JWT validation failed: ${error.message}`);
                // Don't throw an error, just continue without a user
            }
        }

        next();
    }
}