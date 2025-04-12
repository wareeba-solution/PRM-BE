"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMissingColumns1710000000012 = void 0;
class AddMissingColumns1710000000012 {
    constructor() {
        this.name = 'AddMissingColumns1710000000012';
    }
    async up(queryRunner) {
        // Add contactId to messages table without foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "messages" 
            ADD COLUMN IF NOT EXISTS "contactId" uuid
        `);
        // Add retryCount to notifications table
        await queryRunner.query(`
            ALTER TABLE "notifications" 
            ADD COLUMN IF NOT EXISTS "retryCount" integer NOT NULL DEFAULT 0
        `);
        // Add slug to organizations table
        await queryRunner.query(`
            ALTER TABLE "organizations" 
            ADD COLUMN IF NOT EXISTS "slug" character varying NOT NULL DEFAULT ''
        `);
        // Update existing organizations to have a slug based on their name
        await queryRunner.query(`
            UPDATE "organizations" 
            SET "slug" = LOWER(REGEXP_REPLACE("name", '[^a-zA-Z0-9]+', '-', 'g'))
            WHERE "slug" = ''
        `);
    }
    async down(queryRunner) {
        // Remove contactId from messages table
        await queryRunner.query(`
            ALTER TABLE "messages" 
            DROP COLUMN IF EXISTS "contactId"
        `);
        // Remove retryCount from notifications table
        await queryRunner.query(`
            ALTER TABLE "notifications" 
            DROP COLUMN IF EXISTS "retryCount"
        `);
        // Remove slug from organizations table
        await queryRunner.query(`
            ALTER TABLE "organizations" 
            DROP COLUMN IF EXISTS "slug"
        `);
    }
}
exports.AddMissingColumns1710000000012 = AddMissingColumns1710000000012;
//# sourceMappingURL=1710000000012-AddMissingColumns.js.map