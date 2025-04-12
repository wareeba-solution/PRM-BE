import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionToOrganizations1712565600001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add description column to organizations table if it doesn't exist
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "description" text;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove description column from organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "description";
    `);
  }
} 