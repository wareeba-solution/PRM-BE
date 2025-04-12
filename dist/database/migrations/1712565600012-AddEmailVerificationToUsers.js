"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailVerificationToUsers1712565600012 = void 0;
class AddEmailVerificationToUsers1712565600012 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "isEmailVerified" boolean NOT NULL DEFAULT false;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "isEmailVerified";
    `);
    }
}
exports.AddEmailVerificationToUsers1712565600012 = AddEmailVerificationToUsers1712565600012;
//# sourceMappingURL=1712565600012-AddEmailVerificationToUsers.js.map