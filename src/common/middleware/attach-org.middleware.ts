// src/common/middleware/attach-org.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '@/modules/organizations/entities/organization.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class AttachOrgMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AttachOrgMiddleware.name);

    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepo: Repository<Organization>,
    ) {}

    async use(req: any, res: Response, next: NextFunction) {
        try {
            if (req.user && req.user.organizationId) {
                const org = await this.organizationRepo.findOne({
                    where: { id: req.user.organizationId },
                    select: ['id', 'name', 'status', 'subscriptionTier', 'isSubscriptionActive']
                });

                if (org) {
                    req.organization = org;
                }
            }
        } catch (error) {
            this.logger.error(`Error attaching organization: ${error.message}`);
            // Continue even if org attach fails
        }

        next();
    }
}