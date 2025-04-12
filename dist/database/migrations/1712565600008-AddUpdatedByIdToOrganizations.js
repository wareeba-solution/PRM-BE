"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpdatedByIdToOrganizations1712565600008 = void 0;
class AddUpdatedByIdToOrganizations1712565600008 {
    async up(queryRunner) {
        // Add updatedById column to organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "updatedById" uuid,
      ADD CONSTRAINT "FK_organizations_updated_by" 
      FOREIGN KEY ("updatedById") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL
    `);
    }
    async down(queryRunner) {
        // Remove the updatedById column and its foreign key constraint
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP CONSTRAINT IF EXISTS "FK_organizations_updated_by",
      DROP COLUMN IF EXISTS "updatedById"
    `);
    }
}
exports.AddUpdatedByIdToOrganizations1712565600008 = AddUpdatedByIdToOrganizations1712565600008;
//# sourceMappingURL=1712565600008-AddUpdatedByIdToOrganizations.js.map