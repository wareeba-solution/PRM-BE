"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanupUsersTable1710000000001 = void 0;
class CleanupUsersTable1710000000001 {
    async up(queryRunner) {
        // First, let's check if we have any duplicate or unnecessary columns
        // We'll keep only the essential columns and move others to appropriate tables
        // 1. Drop any unnecessary columns from users table if they exist
        await queryRunner.query(`
            DO $$ 
            BEGIN
                -- Drop columns if they exist
                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'preferences') THEN
                    ALTER TABLE "users" DROP COLUMN "preferences";
                END IF;

                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'settings') THEN
                    ALTER TABLE "users" DROP COLUMN "settings";
                END IF;

                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'config') THEN
                    ALTER TABLE "users" DROP COLUMN "config";
                END IF;

                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'options') THEN
                    ALTER TABLE "users" DROP COLUMN "options";
                END IF;
            END $$;
        `);
        // 2. Create a new table for user settings if it doesn't exist
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_settings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "theme" character varying DEFAULT 'light',
                "language" character varying DEFAULT 'en',
                "timezone" character varying DEFAULT 'UTC',
                "notificationPreferences" jsonb DEFAULT '{"email": true, "sms": false, "inApp": true, "push": false}'::jsonb,
                "phone" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_settings" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_settings_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
        // 3. Create an index on userId for better performance
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_user_settings_userId" ON "user_settings" ("userId")
        `);
        // 4. Create default settings for all users and migrate phone numbers if they exist
        await queryRunner.query(`
            INSERT INTO "user_settings" ("userId", "phone")
            SELECT 
                u."id",
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = 'users' 
                        AND column_name = 'phone'
                    ) THEN u."phone"
                    WHEN EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = 'users' 
                        AND column_name = 'phoneNumber'
                    ) THEN u."phoneNumber"
                    ELSE NULL
                END
            FROM "users" u
            WHERE NOT EXISTS (
                SELECT 1 FROM "user_settings" us WHERE us."userId" = u."id"
            )
        `);
        // 5. Drop the phone column from users table if it exists
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF EXISTS (
                    SELECT 1 
                    FROM information_schema.columns 
                    WHERE table_name = 'users' 
                    AND column_name = 'phone'
                ) THEN
                    ALTER TABLE "users" DROP COLUMN "phone";
                END IF;
            END $$;
        `);
    }
    async down(queryRunner) {
        // Add back the columns we dropped
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN IF NOT EXISTS "preferences" jsonb,
            ADD COLUMN IF NOT EXISTS "settings" jsonb,
            ADD COLUMN IF NOT EXISTS "config" jsonb,
            ADD COLUMN IF NOT EXISTS "options" jsonb,
            ADD COLUMN IF NOT EXISTS "phone" character varying
        `);
        // Migrate data back from user_settings to users
        await queryRunner.query(`
            UPDATE "users" u
            SET 
                "preferences" = jsonb_build_object(
                    'theme', us."theme",
                    'language', us."language",
                    'timezone', us."timezone",
                    'notifications', us."notificationPreferences"
                ),
                "phone" = us."phone"
            FROM "user_settings" us
            WHERE u."id" = us."userId"
        `);
        // Drop the user_settings table
        await queryRunner.query(`DROP TABLE IF EXISTS "user_settings"`);
    }
}
exports.CleanupUsersTable1710000000001 = CleanupUsersTable1710000000001;
//# sourceMappingURL=1710000000001-CleanupUsersTable.js.map