"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDescriptionToOrganizations1712565600001 = void 0;
class AddDescriptionToOrganizations1712565600001 {
    async up(queryRunner) {
        // Add description column to organizations table if it doesn't exist
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "description" text;
    `);
    }
    async down(queryRunner) {
        // Remove description column from organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "description";
    `);
    }
}
exports.AddDescriptionToOrganizations1712565600001 = AddDescriptionToOrganizations1712565600001;
//# sourceMappingURL=1712565600001-AddDescriptionToOrganizations.js.map