import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrganizationStatus, SubscriptionTier } from '../../modules/organizations/entities/organization.entity';

export class AddMissingOrganizationColumns1712565600002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add logo column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "logo" character varying(255);
    `);

    // Add domain column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "domain" character varying(100);
    `);

    // Add isDomainVerified column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "isDomainVerified" boolean DEFAULT false;
    `);

    // Create subscription tier enum if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type 
          WHERE typname = 'subscription_tier_enum'
        ) THEN
          CREATE TYPE "subscription_tier_enum" AS ENUM (
            'FREE', 
            'BASIC', 
            'PROFESSIONAL', 
            'ENTERPRISE'
          );
        END IF;
      END $$;
    `);

    // Add subscription tier column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "subscriptionTier" "subscription_tier_enum" DEFAULT 'FREE';
    `);

    // Add subscription date columns
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "subscriptionStartDate" TIMESTAMP;
    `);

    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "subscriptionEndDate" TIMESTAMP;
    `);

    // Add isSubscriptionActive column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "isSubscriptionActive" boolean DEFAULT false;
    `);

    // Add settings column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "settings" jsonb;
    `);

    // Add max users and storage columns
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "maxUsers" integer DEFAULT 0;
    `);

    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "maxStorage" integer DEFAULT 0;
    `);

    // Add metadata column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "metadata" jsonb;
    `);

    // Add allowed domains column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "allowedDomains" text[];
    `);

    // Add email verification and 2FA columns
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "isEmailVerificationRequired" boolean DEFAULT true;
    `);

    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "isTwoFactorAuthRequired" boolean DEFAULT false;
    `);

    // Add audit config column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "auditConfig" jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove all added columns
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "logo",
      DROP COLUMN IF EXISTS "domain",
      DROP COLUMN IF EXISTS "isDomainVerified",
      DROP COLUMN IF EXISTS "subscriptionTier",
      DROP COLUMN IF EXISTS "subscriptionStartDate",
      DROP COLUMN IF EXISTS "subscriptionEndDate",
      DROP COLUMN IF EXISTS "isSubscriptionActive",
      DROP COLUMN IF EXISTS "settings",
      DROP COLUMN IF EXISTS "maxUsers",
      DROP COLUMN IF EXISTS "maxStorage",
      DROP COLUMN IF EXISTS "metadata",
      DROP COLUMN IF EXISTS "allowedDomains",
      DROP COLUMN IF EXISTS "isEmailVerificationRequired",
      DROP COLUMN IF EXISTS "isTwoFactorAuthRequired",
      DROP COLUMN IF EXISTS "auditConfig";
    `);

    // Drop the subscription tier enum
    await queryRunner.query(`
      DROP TYPE IF EXISTS "subscription_tier_enum";
    `);
  }
} 