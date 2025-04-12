import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
export declare class TenantsService {
    private readonly tenantRepository;
    private readonly logger;
    constructor(tenantRepository: Repository<Tenant>);
    create(createTenantDto: CreateTenantDto): Promise<Tenant>;
    findAll(): Promise<Tenant[]>;
    findOne(id: string): Promise<Tenant>;
    findBySubdomain(subdomain: string): Promise<Tenant>;
    update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant>;
    activate(id: string): Promise<Tenant>;
    deactivate(id: string): Promise<Tenant>;
    suspend(id: string): Promise<Tenant>;
    remove(id: string): Promise<void>;
}
