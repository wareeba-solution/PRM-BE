import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedByIdToOrganizations1712565600008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add updatedById column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "updatedById" uuid,
      ADD CONSTRAINT "FK_organizations_updated_by" 
      FOREIGN KEY ("updatedById") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the updatedById column and its foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP CONSTRAINT IF EXISTS "FK_organizations_updated_by",
      DROP COLUMN IF EXISTS "updatedById"
    `);
  }
} 