import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUsers1712565600011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First create the role enum type
    await queryRunner.query(`
      CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'USER', 'SUPER_ADMIN');
    `);

    // Add role column to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "role" user_role_enum NOT NULL DEFAULT 'USER';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the role column
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "role";
    `);

    // Drop the enum type
    await queryRunner.query(`
      DROP TYPE IF EXISTS user_role_enum;
    `);
  }
} 