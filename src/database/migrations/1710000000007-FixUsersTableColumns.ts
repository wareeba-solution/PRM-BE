import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUsersTableColumns1710000000007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, let's check what columns actually exist in the users table
        await queryRunner.query(`
            DO $$ 
            DECLARE
                column_count integer;
            BEGIN
                -- Get the current column count
                SELECT COUNT(*) INTO column_count
                FROM information_schema.columns
                WHERE table_name = 'users';

                -- Log the column count for debugging
                RAISE NOTICE 'Current column count in users table: %', column_count;

                -- If we have too many columns, we need to clean up
                IF column_count > 100 THEN
                    -- Drop unnecessary columns that might have been added incorrectly
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'preferences') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "preferences";
                    END IF;

                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'settings') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "settings";
                    END IF;

                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'config') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "config";
                    END IF;

                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'options') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "options";
                    END IF;

                    -- Drop any duplicate columns that might have been created with different cases
                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'organization_id') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "organization_id";
                    END IF;

                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'created_by') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "created_by";
                    END IF;

                    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_by') THEN
                        ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_by";
                    END IF;
                END IF;

                -- Ensure we have the correct columns with the right names
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'organizationId') THEN
                    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "organizationId" uuid;
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'createdById') THEN
                    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "createdById" uuid;
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updatedById') THEN
                    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "updatedById" uuid;
                END IF;
            END $$;
        `);

        // Ensure foreign key constraints are correct
        await queryRunner.query(`
            DO $$ 
            BEGIN
                -- Drop existing foreign key constraints if they exist
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_organization' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_organization";
                END IF;

                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_created_by' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_created_by";
                END IF;

                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_updated_by' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_updated_by";
                END IF;

                -- Add the correct foreign key constraints only if the columns exist
                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'organizationId') THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_organization" 
                    FOREIGN KEY ("organizationId") 
                    REFERENCES "organizations"("id") 
                    ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;

                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'createdById') THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_created_by" 
                    FOREIGN KEY ("createdById") 
                    REFERENCES "users"("id") 
                    ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;

                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updatedById') THEN
                    ALTER TABLE "users" 
                    ADD CONSTRAINT "FK_users_updated_by" 
                    FOREIGN KEY ("updatedById") 
                    REFERENCES "users"("id") 
                    ON DELETE NO ACTION ON UPDATE NO ACTION;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_organization' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_organization";
                END IF;

                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_created_by' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_created_by";
                END IF;

                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_users_updated_by' 
                    AND table_name = 'users'
                ) THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_users_updated_by";
                END IF;
            END $$;
        `);
    }
} 