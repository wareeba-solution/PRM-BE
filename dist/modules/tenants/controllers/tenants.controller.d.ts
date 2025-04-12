/// <reference types="node" />
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { Request } from 'express';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    testSubdomain(req: Request): Promise<{
        host: string;
        extractedSubdomain: string;
        headers: import("http").IncomingHttpHeaders;
    }>;
    private extractSubdomain;
    create(createTenantDto: CreateTenantDto): Promise<{
        message: string;
        data: import("../entities/tenant.entity").Tenant;
    }>;
    findAll(): Promise<{
        data: import("../entities/tenant.entity").Tenant[];
    }>;
    findOne(id: string): Promise<{
        data: import("../entities/tenant.entity").Tenant;
    }>;
    findBySubdomain(subdomain: string): Promise<{
        data: import("../entities/tenant.entity").Tenant;
    }>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<{
        message: string;
        data: import("../entities/tenant.entity").Tenant;
    }>;
    activate(id: string): Promise<{
        message: string;
        data: import("../entities/tenant.entity").Tenant;
    }>;
    deactivate(id: string): Promise<{
        message: string;
        data: import("../entities/tenant.entity").Tenant;
    }>;
    suspend(id: string): Promise<{
        message: string;
        data: import("../entities/tenant.entity").Tenant;
    }>;
    remove(id: string): Promise<void>;
}
