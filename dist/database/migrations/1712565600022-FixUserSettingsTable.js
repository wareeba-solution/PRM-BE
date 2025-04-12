"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserSettingsTable1712565600022 = void 0;
class FixUserSettingsTable1712565600022 {
    async up(queryRunner) {
        // Drop the existing table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS "user_settings"`);
        // Recreate the table with the correct structure
        await queryRunner.query(`
            CREATE TABLE "user_settings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "theme" text,
                "language" text,
                "timezone" text,
                "phone" text,
                "notificationPreferences" jsonb,
                "metadata" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_settings" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_settings_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "user_settings"`);
    }
}
exports.FixUserSettingsTable1712565600022 = FixUserSettingsTable1712565600022;
//# sourceMappingURL=1712565600022-FixUserSettingsTable.js.map