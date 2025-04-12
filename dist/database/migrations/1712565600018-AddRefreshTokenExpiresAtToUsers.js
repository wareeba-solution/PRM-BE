"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRefreshTokenExpiresAtToUsers1712565600018 = void 0;
class AddRefreshTokenExpiresAtToUsers1712565600018 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" timestamp;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "refreshTokenExpiresAt";
    `);
    }
}
exports.AddRefreshTokenExpiresAtToUsers1712565600018 = AddRefreshTokenExpiresAtToUsers1712565600018;
//# sourceMappingURL=1712565600018-AddRefreshTokenExpiresAtToUsers.js.map