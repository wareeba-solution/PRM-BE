"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsLockedToUsers1712565600014 = void 0;
class AddIsLockedToUsers1712565600014 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "isLocked" boolean NOT NULL DEFAULT false;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "isLocked";
    `);
    }
}
exports.AddIsLockedToUsers1712565600014 = AddIsLockedToUsers1712565600014;
//# sourceMappingURL=1712565600014-AddIsLockedToUsers.js.map