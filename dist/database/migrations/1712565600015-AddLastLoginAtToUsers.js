"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastLoginAtToUsers1712565600015 = void 0;
class AddLastLoginAtToUsers1712565600015 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "lastLoginAt" timestamp;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastLoginAt";
    `);
    }
}
exports.AddLastLoginAtToUsers1712565600015 = AddLastLoginAtToUsers1712565600015;
//# sourceMappingURL=1712565600015-AddLastLoginAtToUsers.js.map