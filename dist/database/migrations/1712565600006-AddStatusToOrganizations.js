"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStatusToOrganizations1712565600006 = void 0;
class AddStatusToOrganizations1712565600006 {
    async up(queryRunner) {
        // Create organization_status_enum if it doesn't exist
        await queryRunner.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type 
          WHERE typname = 'organization_status_enum'
        ) THEN
          CREATE TYPE "organization_status_enum" AS ENUM (
            'ACTIVE',
            'INACTIVE',
            'SUSPENDED',
            'PENDING'
          );
        END IF;
      END $$;
    `);
        // Add status column to organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "status" "organization_status_enum" NOT NULL DEFAULT 'PENDING'
    `);
    }
    async down(queryRunner) {
        // Remove the status column
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "status"
    `);
        // Drop the enum type
        await queryRunner.query(`
      DROP TYPE IF EXISTS "organization_status_enum"
    `);
    }
}
exports.AddStatusToOrganizations1712565600006 = AddStatusToOrganizations1712565600006;
//# sourceMappingURL=1712565600006-AddStatusToOrganizations.js.map