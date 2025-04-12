"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastActiveAtToUsers1712565600016 = void 0;
class AddLastActiveAtToUsers1712565600016 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "lastActiveAt" timestamp;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "lastActiveAt";
    `);
    }
}
exports.AddLastActiveAtToUsers1712565600016 = AddLastActiveAtToUsers1712565600016;
//# sourceMappingURL=1712565600016-AddLastActiveAtToUsers.js.map