import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogoColumn1712565600003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add logo column if it doesn't exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'organizations' AND column_name = 'logo'
        ) THEN
          ALTER TABLE "organizations" 
          ADD COLUMN "logo" character varying(255);
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove logo column if it exists
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'organizations' AND column_name = 'logo'
        ) THEN
          ALTER TABLE "organizations" 
          DROP COLUMN "logo";
        END IF;
      END $$;
    `);
  }
} 