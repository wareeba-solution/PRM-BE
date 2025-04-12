import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastLoginAtToUsers1712565600015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "lastLoginAt" timestamp;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastLoginAt";
    `);
  }
} 