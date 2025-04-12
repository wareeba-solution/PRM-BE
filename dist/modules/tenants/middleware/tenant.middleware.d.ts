import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantsService } from '../services/tenants.service';
declare global {
    namespace Express {
        interface Request {
            tenantId?: string;
            tenant?: any;
        }
    }
}
export declare class TenantMiddleware implements NestMiddleware {
    private readonly tenantsService;
    private readonly logger;
    private readonly jwtService;
    constructor(tenantsService: TenantsService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private isSystemRoute;
    private isAuthRoute;
}
