import { DataSource } from 'typeorm';
/**
 * This script initializes the tenant schema in the database.
 * It should be run once during application startup to ensure the tenant tables exist.
 */
export declare function initTenantSchema(dataSource: DataSource): Promise<void>;
