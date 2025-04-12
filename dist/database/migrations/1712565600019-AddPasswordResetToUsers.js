"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPasswordResetToUsers1712565600019 = void 0;
class AddPasswordResetToUsers1712565600019 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "passwordResetToken" text,
      ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" timestamp;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "passwordResetToken",
      DROP COLUMN IF EXISTS "passwordResetExpiresAt";
    `);
    }
}
exports.AddPasswordResetToUsers1712565600019 = AddPasswordResetToUsers1712565600019;
//# sourceMappingURL=1712565600019-AddPasswordResetToUsers.js.map