import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1712565600021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types first
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "user_role_enum" AS ENUM ('ADMIN', 'USER', 'SUPER_ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "tenant_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "plan_type_enum" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create tenants table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tenants" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "domain" character varying,
        "status" tenant_status_enum NOT NULL DEFAULT 'ACTIVE',
        "planType" plan_type_enum NOT NULL DEFAULT 'FREE',
        "planStartDate" TIMESTAMP,
        "planEndDate" TIMESTAMP,
        "maxUsers" integer,
        "maxStorage" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_tenants" PRIMARY KEY ("id")
      );
    `);

    // Create organizations table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "organizations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tenantId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "description" text,
        "email" character varying,
        "phone" character varying,
        "address" text,
        "website" character varying,
        "logo" text,
        "slug" character varying,
        "status" character varying,
        "contactInfo" jsonb,
        "createdById" uuid,
        "updatedById" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_organizations" PRIMARY KEY ("id"),
        CONSTRAINT "FK_organizations_tenant" FOREIGN KEY ("tenantId") 
          REFERENCES "tenants"("id") ON DELETE CASCADE
      );
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tenantId" uuid NOT NULL,
        "organizationId" uuid NOT NULL,
        "firstName" character varying(50) NOT NULL,
        "lastName" character varying(50) NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" user_role_enum NOT NULL DEFAULT 'USER',
        "permissions" text[],
        "isActive" boolean NOT NULL DEFAULT true,
        "isLocked" boolean NOT NULL DEFAULT false,
        "isEmailVerified" boolean NOT NULL DEFAULT false,
        "requirePasswordChange" boolean NOT NULL DEFAULT true,
        "lastLoginAt" TIMESTAMP,
        "lastActiveAt" TIMESTAMP,
        "refreshToken" text,
        "refreshTokenExpiresAt" TIMESTAMP,
        "passwordResetToken" text,
        "passwordResetExpiresAt" TIMESTAMP,
        "createdById" uuid NOT NULL,
        "updatedById" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "FK_users_tenant" FOREIGN KEY ("tenantId") 
          REFERENCES "tenants"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_users_organization" FOREIGN KEY ("organizationId") 
          REFERENCES "organizations"("id") ON DELETE CASCADE
      );
    `);

    // Add foreign key constraints for organizations that reference users
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "organizations" 
        ADD CONSTRAINT "FK_organizations_created_by" 
        FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "organizations" 
        ADD CONSTRAINT "FK_organizations_updated_by" 
        FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create user_settings table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_settings" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "theme" text,
        "language" text,
        "timezone" text,
        "phone" text,
        "notificationPreferences" jsonb,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_settings" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_settings_user" FOREIGN KEY ("userId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create user_profile table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_profile" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "avatar" text,
        "bio" text,
        "dateOfBirth" date,
        "gender" text,
        "address" text,
        "city" text,
        "country" text,
        "postalCode" text,
        "phoneNumber" text,
        "emergencyContact" jsonb,
        "socialLinks" jsonb,
        "preferences" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_profile" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_profile_user" FOREIGN KEY ("userId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create user_verification table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_verification" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "verificationToken" text,
        "verificationTokenExpiresAt" TIMESTAMP,
        "verifiedAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_verification" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_verification_user" FOREIGN KEY ("userId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create user_activity table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_activity" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "type" text NOT NULL,
        "description" text,
        "metadata" jsonb,
        "ipAddress" text,
        "userAgent" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_activity" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_activity_user" FOREIGN KEY ("userId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create user_session table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_session" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "token" text NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "ipAddress" text,
        "userAgent" text,
        "metadata" jsonb,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_session" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_session_user" FOREIGN KEY ("userId") 
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query('DROP TABLE IF EXISTS "user_session";');
    await queryRunner.query('DROP TABLE IF EXISTS "user_activity";');
    await queryRunner.query('DROP TABLE IF EXISTS "user_verification";');
    await queryRunner.query('DROP TABLE IF EXISTS "user_profile";');
    await queryRunner.query('DROP TABLE IF EXISTS "user_settings";');
    
    // Remove foreign key constraints from organizations
    await queryRunner.query('ALTER TABLE "organizations" DROP CONSTRAINT IF EXISTS "FK_organizations_created_by";');
    await queryRunner.query('ALTER TABLE "organizations" DROP CONSTRAINT IF EXISTS "FK_organizations_updated_by";');
    
    await queryRunner.query('DROP TABLE IF EXISTS "users";');
    await queryRunner.query('DROP TABLE IF EXISTS "organizations";');
    await queryRunner.query('DROP TABLE IF EXISTS "tenants";');
    
    // Drop enum types
    await queryRunner.query('DROP TYPE IF EXISTS "user_role_enum";');
    await queryRunner.query('DROP TYPE IF EXISTS "tenant_status_enum";');
    await queryRunner.query('DROP TYPE IF EXISTS "plan_type_enum";');
  }
} 