import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantTables1712565600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if tenant_status_enum exists
    const tenantStatusEnumExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'tenant_status_enum'
      );
    `);

    if (!tenantStatusEnumExists[0].exists) {
      // Create tenant status enum
      await queryRunner.query(`
        CREATE TYPE "tenant_status_enum" AS ENUM (
          'active', 
          'inactive', 
          'suspended', 
          'pending'
        )
      `);
    }

    // Check if plan_type_enum exists
    const planTypeEnumExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'plan_type_enum'
      );
    `);

    if (!planTypeEnumExists[0].exists) {
      // Create plan type enum
      await queryRunner.query(`
        CREATE TYPE "plan_type_enum" AS ENUM (
          'basic', 
          'premium', 
          'enterprise'
        )
      `);
    }

    // Create tenants table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tenants" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "subdomain" character varying(100) NOT NULL,
        "planType" "plan_type_enum" NOT NULL DEFAULT 'basic',
        "status" "tenant_status_enum" NOT NULL DEFAULT 'pending',
        "settings" jsonb,
        "contactInfo" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_tenants" PRIMARY KEY ("id")
      )
    `);

    // Add unique constraint on subdomain if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE indexname = 'IDX_tenants_subdomain'
        ) THEN
          CREATE UNIQUE INDEX "IDX_tenants_subdomain" ON "tenants" ("subdomain");
        END IF;
      END $$;
    `);

    // Add index on status if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE indexname = 'IDX_tenants_status'
        ) THEN
          CREATE INDEX "IDX_tenants_status" ON "tenants" ("status");
        END IF;
      END $$;
    `);

    // Add tenant_id column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "tenantId" uuid
    `);

    // Add foreign key constraint if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint 
          WHERE conname = 'FK_organizations_tenants'
        ) THEN
          ALTER TABLE "organizations" 
          ADD CONSTRAINT "FK_organizations_tenants" 
          FOREIGN KEY ("tenantId") 
          REFERENCES "tenants"("id") 
          ON DELETE CASCADE;
        END IF;
      END $$;
    `);

    // Add tenant_id column to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "tenantId" uuid
    `);

    // Add foreign key constraint if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint 
          WHERE conname = 'FK_users_tenants'
        ) THEN
          ALTER TABLE "users" 
          ADD CONSTRAINT "FK_users_tenants" 
          FOREIGN KEY ("tenantId") 
          REFERENCES "tenants"("id") 
          ON DELETE CASCADE;
        END IF;
      END $$;
    `);

    // Check if departments table exists before adding tenant_id
    const departmentsTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'departments'
      );
    `);

    if (departmentsTableExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE "departments" 
        ADD COLUMN IF NOT EXISTS "tenantId" uuid
      `);

      await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'FK_departments_tenants'
          ) THEN
            ALTER TABLE "departments" 
            ADD CONSTRAINT "FK_departments_tenants" 
            FOREIGN KEY ("tenantId") 
            REFERENCES "tenants"("id") 
            ON DELETE CASCADE;
          END IF;
        END $$;
      `);
    }

    // Check if contacts table exists before adding tenant_id
    const contactsTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contacts'
      );
    `);

    if (contactsTableExists[0].exists) {
      await queryRunner.query(`
        ALTER TABLE "contacts" 
        ADD COLUMN IF NOT EXISTS "tenantId" uuid
      `);

      await queryRunner.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'FK_contacts_tenants'
          ) THEN
            ALTER TABLE "contacts" 
            ADD CONSTRAINT "FK_contacts_tenants" 
            FOREIGN KEY ("tenantId") 
            REFERENCES "tenants"("id") 
            ON DELETE CASCADE;
          END IF;
        END $$;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraints
    try {
      await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT IF EXISTS "FK_contacts_tenants"`);
    } catch (error) {}

    try {
      await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT IF EXISTS "FK_departments_tenants"`);
    } catch (error) {}

    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "FK_users_tenants"`);
    await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT IF EXISTS "FK_organizations_tenants"`);

    // Remove tenant_id columns
    try {
      await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN IF EXISTS "tenantId"`);
    } catch (error) {}

    try {
      await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN IF EXISTS "tenantId"`);
    } catch (error) {}

    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "tenantId"`);
    await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN IF EXISTS "tenantId"`);

    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_tenants_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_tenants_subdomain"`);

    // Drop tenants table
    await queryRunner.query(`DROP TABLE IF EXISTS "tenants"`);

    // Drop enums
    await queryRunner.query(`DROP TYPE IF EXISTS "plan_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "tenant_status_enum"`);
  }
}
