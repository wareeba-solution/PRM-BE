// src/common/middleware/organization.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../../modules/organizations/entities/organization.entity';

@Injectable()
export class OrganizationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(OrganizationMiddleware.name);

    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async use(req: any, res: Response, next: NextFunction) {
        try {
            // Add more debugging to trace the flow
            this.logger.debug(`OrganizationMiddleware running for: ${req.method} ${req.url}`);
            this.logger.debug(`User in request: ${req.user ? 'Yes' : 'No'}`);

            if (req.user && req.user.organizationId) {
                this.logger.debug(`Loading organization for ID: ${req.user.organizationId}`);

                // Try a simpler findOne first for debugging
                const organization = await this.organizationRepository.findOne({
                    where: { id: req.user.organizationId }
                });

                if (organization) {
                    this.logger.debug(`Organization found: ${organization.id}`);
                    // Attach organization to request
                    req.organization = organization;
                } else {
                    this.logger.warn(`Organization not found for ID: ${req.user.organizationId}`);
                }
            } else if (req.headers.authorization) {
                // If the request has an auth header but no user, maybe the middleware ran before JWT auth
                this.logger.warn('Auth header present but no user. Middleware might be running before JWT auth.');
            }

            next();
        } catch (error) {
            this.logger.error(`Error in organization middleware: ${error.message}`);
            // Continue even if there's an error, let the controllers handle missing organization
            next();
        }
    }
}