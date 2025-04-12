"use strict";
// src/modules/tenants/init-tenant-schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTenantSchema = void 0;
/**
 * This script initializes the tenant schema in the database.
 * It should be run once during application startup to ensure the tenant tables exist.
 */
async function initTenantSchema(dataSource) {
    try {
        // Check if tenants table exists
        const tableExists = await dataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'tenants'
      );
    `);
        // If table doesn't exist, create it
        if (!tableExists[0].exists) {
            console.log('Creating tenants table...');
            // Create enum types if they don't exist
            await dataSource.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tenant_status_enum') THEN
            CREATE TYPE tenant_status_enum AS ENUM ('active', 'inactive', 'suspended', 'pending');
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type_enum') THEN
            CREATE TYPE plan_type_enum AS ENUM ('basic', 'premium', 'enterprise');
          END IF;
        END$$;
      `);
            // Create tenants table
            await dataSource.query(`
        CREATE TABLE tenants (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(100) NOT NULL,
          subdomain VARCHAR(100) NOT NULL,
          "planType" plan_type_enum NOT NULL DEFAULT 'basic',
          status tenant_status_enum NOT NULL DEFAULT 'pending',
          settings JSONB,
          "contactInfo" JSONB,
          "maxOrganizations" INTEGER DEFAULT 5,
          "maxUsersPerOrganization" INTEGER DEFAULT 10,
          "maxStoragePerOrganization" INTEGER DEFAULT 1024,
          "subscriptionStartDate" TIMESTAMP,
          "subscriptionEndDate" TIMESTAMP,
          "isSubscriptionActive" BOOLEAN DEFAULT FALSE,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "deletedAt" TIMESTAMP
        );
        
        CREATE UNIQUE INDEX idx_tenant_subdomain ON tenants(subdomain);
        CREATE INDEX idx_tenant_status ON tenants(status);
      `);
            // Add tenant_id to organizations table if it doesn't exist
            await dataSource.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'organizations' AND column_name = 'tenantId'
          ) THEN
            ALTER TABLE organizations ADD COLUMN "tenantId" UUID;
            
            ALTER TABLE organizations 
            ADD CONSTRAINT fk_organizations_tenants 
            FOREIGN KEY ("tenantId") 
            REFERENCES tenants(id) 
            ON DELETE CASCADE;
          END IF;
        END$$;
      `);
            // Add tenant_id to users table if it doesn't exist
            await dataSource.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'tenantId'
          ) THEN
            ALTER TABLE users ADD COLUMN "tenantId" UUID;
            
            ALTER TABLE users 
            ADD CONSTRAINT fk_users_tenants 
            FOREIGN KEY ("tenantId") 
            REFERENCES tenants(id) 
            ON DELETE CASCADE;
          END IF;
        END$$;
      `);
            console.log('Tenant schema initialized successfully.');
        }
        else {
            console.log('Tenants table already exists.');
        }
    }
    catch (error) {
        console.error('Error initializing tenant schema:', error);
        throw error;
    }
}
exports.initTenantSchema = initTenantSchema;
//# sourceMappingURL=init-tenant-schema.js.map