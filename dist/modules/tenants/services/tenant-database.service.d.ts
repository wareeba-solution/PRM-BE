import { Request } from 'express';
import { Repository, SelectQueryBuilder } from 'typeorm';
export declare class TenantDatabaseService {
    private readonly request;
    private tenantId;
    constructor(request: Request);
    /**
     * Creates a tenant-aware repository that automatically filters by tenant ID
     * @param repository The TypeORM repository to wrap
     * @returns A tenant-aware repository
     */
    createTenantAwareRepository<T>(repository: Repository<T>): Repository<T>;
    /**
     * Adds tenant filter to an existing query builder
     * @param queryBuilder The query builder to add tenant filter to
     * @param alias The entity alias used in the query builder
     * @returns The modified query builder with tenant filter
     */
    addTenantFilter<T>(queryBuilder: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T>;
    /**
     * Gets the current tenant ID from the request
     * @returns The current tenant ID or null if not set
     */
    getCurrentTenantId(): string | null;
    /**
     * Prepares an entity for creation by setting the tenant ID
     * @param entity The entity to prepare
     * @returns The entity with tenant ID set
     */
    prepareEntityForCreate<T extends {
        tenantId?: string;
    }>(entity: T): T;
}
