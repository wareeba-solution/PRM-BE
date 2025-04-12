-- Create tenant status enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tenant_status_enum') THEN
        CREATE TYPE tenant_status_enum AS ENUM ('active', 'inactive', 'suspended', 'pending');
    END IF;
END$$;

-- Create plan type enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type_enum') THEN
        CREATE TYPE plan_type_enum AS ENUM ('basic', 'premium', 'enterprise');
    END IF;
END$$;

-- Create tenants table if it doesn't exist
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    subdomain VARCHAR(100) NOT NULL UNIQUE,
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

-- Create indexes on tenants table
CREATE INDEX IF NOT EXISTS IDX_tenants_status ON tenants (status);
CREATE UNIQUE INDEX IF NOT EXISTS IDX_tenants_subdomain ON tenants (subdomain);

-- Add tenant_id column to organizations table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'tenantId'
    ) THEN
        ALTER TABLE organizations ADD COLUMN "tenantId" UUID;
        
        -- Add foreign key constraint
        ALTER TABLE organizations 
        ADD CONSTRAINT FK_organizations_tenants 
        FOREIGN KEY ("tenantId") 
        REFERENCES tenants(id) 
        ON DELETE CASCADE;
    END IF;
END$$;

-- Add tenant_id column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'tenantId'
    ) THEN
        ALTER TABLE users ADD COLUMN "tenantId" UUID;
        
        -- Add foreign key constraint
        ALTER TABLE users 
        ADD CONSTRAINT FK_users_tenants 
        FOREIGN KEY ("tenantId") 
        REFERENCES tenants(id) 
        ON DELETE CASCADE;
    END IF;
END$$;

-- Add tenant_id column to departments table if it exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'departments'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'departments' AND column_name = 'tenantId'
    ) THEN
        ALTER TABLE departments ADD COLUMN "tenantId" UUID;
        
        -- Add foreign key constraint
        ALTER TABLE departments 
        ADD CONSTRAINT FK_departments_tenants 
        FOREIGN KEY ("tenantId") 
        REFERENCES tenants(id) 
        ON DELETE CASCADE;
    END IF;
END$$;

-- Add tenant_id column to contacts table if it exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'contacts'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'contacts' AND column_name = 'tenantId'
    ) THEN
        ALTER TABLE contacts ADD COLUMN "tenantId" UUID;
        
        -- Add foreign key constraint
        ALTER TABLE contacts 
        ADD CONSTRAINT FK_contacts_tenants 
        FOREIGN KEY ("tenantId") 
        REFERENCES tenants(id) 
        ON DELETE CASCADE;
    END IF;
END$$;

-- Make sure uuid-ossp extension is available for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
