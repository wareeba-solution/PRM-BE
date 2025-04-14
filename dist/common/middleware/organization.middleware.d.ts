import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Organization } from '../../modules/organizations/entities/organization.entity';
export declare class OrganizationMiddleware implements NestMiddleware {
    private readonly organizationRepository;
    private readonly logger;
    constructor(organizationRepository: Repository<Organization>);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
