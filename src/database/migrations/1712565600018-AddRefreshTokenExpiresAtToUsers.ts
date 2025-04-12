import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenExpiresAtToUsers1712565600018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" timestamp;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "refreshTokenExpiresAt";
    `);
  }
} 