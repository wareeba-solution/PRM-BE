"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContactInfoToOrganizations1712565600010 = void 0;
class AddContactInfoToOrganizations1712565600010 {
    async up(queryRunner) {
        // Add contactInfo column to organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "contactInfo" jsonb;
    `);
    }
    async down(queryRunner) {
        // Remove the contactInfo column
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "contactInfo";
    `);
    }
}
exports.AddContactInfoToOrganizations1712565600010 = AddContactInfoToOrganizations1712565600010;
//# sourceMappingURL=1712565600010-AddContactInfoToOrganizations.js.map