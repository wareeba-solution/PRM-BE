import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Organization } from '@/modules/organizations/entities/organization.entity';
export declare class AttachOrgMiddleware implements NestMiddleware {
    private readonly organizationRepo;
    private readonly logger;
    constructor(organizationRepo: Repository<Organization>);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
