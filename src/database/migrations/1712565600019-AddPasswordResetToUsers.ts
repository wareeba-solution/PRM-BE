import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordResetToUsers1712565600019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "passwordResetToken" text,
      ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" timestamp;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "passwordResetToken",
      DROP COLUMN IF EXISTS "passwordResetExpiresAt";
    `);
  }
} 