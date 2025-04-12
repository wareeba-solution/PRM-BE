import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastActiveAtToUsers1712565600016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "lastActiveAt" timestamp;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastActiveAt";
    `);
  }
} 