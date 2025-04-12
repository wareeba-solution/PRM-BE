import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactInfoToOrganizations1712565600010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add contactInfo column to organizations table
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "contactInfo" jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the contactInfo column
    await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "contactInfo";
    `);
  }
} 