import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugToOrganizations1712565600005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add slug column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "slug" character varying(100)
    `);

    // Create a unique index on the slug column
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "IDX_organizations_slug" ON "organizations" ("slug")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique index first
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_organizations_slug"
    `);

    // Remove the slug column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "slug"
    `);
  }
} 