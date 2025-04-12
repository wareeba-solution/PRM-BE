"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRefreshTokenToUsers1712565600017 = void 0;
class AddRefreshTokenToUsers1712565600017 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "refreshToken" text;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "refreshToken";
    `);
    }
}
exports.AddRefreshTokenToUsers1712565600017 = AddRefreshTokenToUsers1712565600017;
//# sourceMappingURL=1712565600017-AddRefreshTokenToUsers.js.map