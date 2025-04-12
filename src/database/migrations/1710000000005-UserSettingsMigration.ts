import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserSettingsMigration1710000000005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing constraints and indexes if they exist
        await queryRunner.query(`
            DO $$ BEGIN
                -- Drop foreign key if exists
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name = 'FK_user_settings_user' 
                    AND table_name = 'user_settings'
                ) THEN
                    ALTER TABLE user_settings DROP CONSTRAINT "FK_user_settings_user";
                END IF;

                -- Drop index if exists
                IF EXISTS (
                    SELECT 1 FROM pg_indexes 
                    WHERE indexname = 'IDX_USER_SETTINGS_USER_ID'
                ) THEN
                    DROP INDEX "IDX_USER_SETTINGS_USER_ID";
                END IF;
            END $$;
        `);

        // Drop the table if it exists and create it fresh
        await queryRunner.query(`DROP TABLE IF EXISTS user_settings CASCADE;`);

        // Create user_settings table
        await queryRunner.createTable(
            new Table({
                name: "user_settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "userid",
                        type: "uuid",
                    },
                    {
                        name: "theme",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "language",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "timezone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "notificationpreferences",
                        type: "jsonb",
                        isNullable: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdat",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedat",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE user_settings
            ADD CONSTRAINT "FK_user_settings_user"
            FOREIGN KEY ("userid")
            REFERENCES users(id)
            ON DELETE CASCADE;
        `);

        // Create index on userid
        await queryRunner.query(`
            CREATE INDEX "IDX_USER_SETTINGS_USER_ID"
            ON user_settings ("userid");
        `);

        // Migrate phone numbers from users table to user_settings only if phone column exists
        const userTable = await queryRunner.getTable("users");
        if (userTable && userTable.findColumnByName('phone')) {
            await queryRunner.query(`
                INSERT INTO user_settings (userid, phone)
                SELECT id, phone
                FROM users u
                WHERE NOT EXISTS (
                    SELECT 1 FROM user_settings us WHERE us.userid = u.id
                )
                AND phone IS NOT NULL;
            `);
        } else {
            // If phone column doesn't exist, just create empty settings for each user
            await queryRunner.query(`
                INSERT INTO user_settings (userid)
                SELECT id
                FROM users u
                WHERE NOT EXISTS (
                    SELECT 1 FROM user_settings us WHERE us.userid = u.id
                );
            `);
        }

        // Drop unnecessary columns from users table if they exist
        if (userTable) {
            const columnsToRemove = ['phone', 'phoneNumber', 'preferences', 'settings', 'config', 'options'];
            for (const columnName of columnsToRemove) {
                const column = userTable.findColumnByName(columnName);
                if (column) {
                    await queryRunner.dropColumn("users", columnName);
                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add back columns to users table
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS phone varchar,
            ADD COLUMN IF NOT EXISTS phoneNumber varchar,
            ADD COLUMN IF NOT EXISTS preferences jsonb,
            ADD COLUMN IF NOT EXISTS settings jsonb,
            ADD COLUMN IF NOT EXISTS config jsonb,
            ADD COLUMN IF NOT EXISTS options jsonb;
        `);

        // Migrate data back from user_settings to users
        await queryRunner.query(`
            UPDATE users u
            SET phone = us.phone
            FROM user_settings us
            WHERE u.id = us.userid;
        `);

        // Drop user_settings table
        await queryRunner.dropTable("user_settings", true);
    }
} 