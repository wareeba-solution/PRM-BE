"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRequirePasswordChangeToUsers1712565600013 = void 0;
class AddRequirePasswordChangeToUsers1712565600013 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "requirePasswordChange" boolean NOT NULL DEFAULT false;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "requirePasswordChange";
    `);
    }
}
exports.AddRequirePasswordChangeToUsers1712565600013 = AddRequirePasswordChangeToUsers1712565600013;
//# sourceMappingURL=1712565600013-AddRequirePasswordChangeToUsers.js.map