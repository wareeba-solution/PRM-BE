"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSlugToOrganizations1712565600005 = void 0;
class AddSlugToOrganizations1712565600005 {
    async up(queryRunner) {
        // Add slug column to organizations table
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      ADD COLUMN IF NOT EXISTS "slug" character varying(100)
    `);
        // Create a unique index on the slug column
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "IDX_organizations_slug" ON "organizations" ("slug")
    `);
    }
    async down(queryRunner) {
        // Drop the unique index first
        await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_organizations_slug"
    `);
        // Remove the slug column
        await queryRunner.query(`
      ALTER TABLE "organizations" 
      DROP COLUMN IF EXISTS "slug"
    `);
    }
}
exports.AddSlugToOrganizations1712565600005 = AddSlugToOrganizations1712565600005;
//# sourceMappingURL=1712565600005-AddSlugToOrganizations.js.map