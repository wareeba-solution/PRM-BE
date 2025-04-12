import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenantColumns1712566000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tenants table
    await queryRunner.query(`
      CREATE TABLE "tenants" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "subdomain" character varying(100) NOT NULL,
        "planType" character varying NOT NULL DEFAULT 'basic',
        "status" character varying NOT NULL DEFAULT 'pending',
        "settings" jsonb,
        "contactInfo" jsonb,
        "subscriptionStartDate" TIMESTAMP,
        "subscriptionEndDate" TIMESTAMP,
        "isSubscriptionActive" boolean NOT NULL DEFAULT false,
        "maxOrganizations" integer NOT NULL DEFAULT 5,
        "maxUsersPerOrganization" integer NOT NULL DEFAULT 10,
        "maxStoragePerOrganization" integer NOT NULL DEFAULT 1024,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_tenants" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_tenants_subdomain" UNIQUE ("subdomain")
      )
    `);

    // Create index on subdomain
    await queryRunner.query(`
      CREATE INDEX "IDX_tenants_subdomain" ON "tenants" ("subdomain")
    `);

    // Create index on status
    await queryRunner.query(`
      CREATE INDEX "IDX_tenants_status" ON "tenants" ("status")
    `);

    // Create a default tenant for existing data
    await queryRunner.query(`
      INSERT INTO "tenants" (
        "id", "name", "subdomain", "planType", "status", "isSubscriptionActive"
      ) VALUES (
        '00000000-0000-0000-0000-000000000000', 'Default Tenant', 'default', 'enterprise', 'active', true
      )
    `);

    // Add tenantId column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing organizations
    await queryRunner.query(`
      UPDATE "organizations" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_organizations_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in organizations
    await queryRunner.query(`
      CREATE INDEX "IDX_organizations_tenantId" ON "organizations" ("tenantId")
    `);

    // Add tenantId column to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing users
    await queryRunner.query(`
      UPDATE "users" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_users_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in users
    await queryRunner.query(`
      CREATE INDEX "IDX_users_tenantId" ON "users" ("tenantId")
    `);

    // Add tenantId column to contacts table
    await queryRunner.query(`
      ALTER TABLE "contacts" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing contacts
    await queryRunner.query(`
      UPDATE "contacts" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "contacts" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_contacts_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in contacts
    await queryRunner.query(`
      CREATE INDEX "IDX_contacts_tenantId" ON "contacts" ("tenantId")
    `);

    // Add tenantId column to departments table
    await queryRunner.query(`
      ALTER TABLE "departments" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing departments
    await queryRunner.query(`
      UPDATE "departments" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "departments" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_departments_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in departments
    await queryRunner.query(`
      CREATE INDEX "IDX_departments_tenantId" ON "departments" ("tenantId")
    `);

    // Add tenantId column to tickets table
    await queryRunner.query(`
      ALTER TABLE "tickets" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing tickets
    await queryRunner.query(`
      UPDATE "tickets" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "tickets" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_tickets_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in tickets
    await queryRunner.query(`
      CREATE INDEX "IDX_tickets_tenantId" ON "tickets" ("tenantId")
    `);

    // Add tenantId column to appointments table
    await queryRunner.query(`
      ALTER TABLE "appointments" 
      ADD COLUMN "tenantId" uuid
    `);

    // Set default tenant for existing appointments
    await queryRunner.query(`
      UPDATE "appointments" 
      SET "tenantId" = '00000000-0000-0000-0000-000000000000'
      WHERE "tenantId" IS NULL
    `);

    // Make tenantId not nullable and add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "appointments" 
      ALTER COLUMN "tenantId" SET NOT NULL,
      ADD CONSTRAINT "FK_appointments_tenants" 
      FOREIGN KEY ("tenantId") 
      REFERENCES "tenants"("id") 
      ON DELETE CASCADE
    `);

    // Create index on tenantId in appointments
    await queryRunner.query(`
      CREATE INDEX "IDX_appointments_tenantId" ON "appointments" ("tenantId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints and tenantId columns from all tables
    await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_appointments_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_appointments_tenantId"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "tenantId"`);

    await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_tickets_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_tickets_tenantId"`);
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "tenantId"`);

    await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_departments_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_departments_tenantId"`);
    await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "tenantId"`);

    await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_contacts_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_contacts_tenantId"`);
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "tenantId"`);

    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_users_tenantId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tenantId"`);

    await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_organizations_tenants"`);
    await queryRunner.query(`DROP INDEX "IDX_organizations_tenantId"`);
    await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "tenantId"`);

    // Drop the tenants table
    await queryRunner.query(`DROP TABLE "tenants"`);
  }
}
