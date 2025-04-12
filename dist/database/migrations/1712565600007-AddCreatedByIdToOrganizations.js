"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCreatedByIdToOrganizations1712565600007 = void 0;
class AddCreatedByIdToOrganizations1712565600007 {
    async up(queryRunner) {
        // Add createdById column to organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "createdById" uuid,
      ADD CONSTRAINT "FK_organizations_created_by" 
      FOREIGN KEY ("createdById") 
      REFERENCES "users"("id") 
      ON DELETE SET NULL
    `);
    }
    async down(queryRunner) {
        // Remove the createdById column and its foreign key constraint
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP CONSTRAINT IF EXISTS "FK_organizations_created_by",
      DROP COLUMN IF EXISTS "createdById"
    `);
    }
}
exports.AddCreatedByIdToOrganizations1712565600007 = AddCreatedByIdToOrganizations1712565600007;
//# sourceMappingURL=1712565600007-AddCreatedByIdToOrganizations.js.map