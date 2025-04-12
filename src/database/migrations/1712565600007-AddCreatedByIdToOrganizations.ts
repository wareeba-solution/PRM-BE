import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedByIdToOrganizations1712565600007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add createdById column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "createdById" uuid,
      ADD CONSTRAINT "FK_organizations_created_by" 
      FOREIGN KEY ("createdById") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the createdById column and its foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP CONSTRAINT IF EXISTS "FK_organizations_created_by",
      DROP COLUMN IF EXISTS "createdById"
    `);
  }
} 