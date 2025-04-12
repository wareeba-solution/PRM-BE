"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTenantSubscriptionColumns1712565600004 = void 0;
class AddTenantSubscriptionColumns1712565600004 {
    async up(queryRunner) {
        // Add subscription-related columns to tenants table
        await queryRunner.query(`
      ALTER TABLE "tenants" 
      ADD COLUMN IF NOT EXISTS "subscriptionStartDate" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "subscriptionEndDate" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "isSubscriptionActive" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "maxOrganizations" integer DEFAULT 1,
      ADD COLUMN IF NOT EXISTS "maxUsersPerOrganization" integer DEFAULT 10,
      ADD COLUMN IF NOT EXISTS "maxStoragePerOrganization" integer DEFAULT 1024
    `);
    }
    async down(queryRunner) {
        // Remove subscription-related columns
        await queryRunner.query(`
      ALTER TABLE "tenants" 
      DROP COLUMN IF EXISTS "subscriptionStartDate",
      DROP COLUMN IF EXISTS "subscriptionEndDate",
      DROP COLUMN IF EXISTS "isSubscriptionActive",
      DROP COLUMN IF EXISTS "maxOrganizations",
      DROP COLUMN IF EXISTS "maxUsersPerOrganization",
      DROP COLUMN IF EXISTS "maxStoragePerOrganization"
    `);
    }
}
exports.AddTenantSubscriptionColumns1712565600004 = AddTenantSubscriptionColumns1712565600004;
//# sourceMappingURL=1712565600004-AddTenantSubscriptionColumns.js.map