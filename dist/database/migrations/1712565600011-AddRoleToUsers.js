"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoleToUsers1712565600011 = void 0;
class AddRoleToUsers1712565600011 {
    async up(queryRunner) {
        // First create the role enum type
        await queryRunner.query(`
      CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'USER', 'SUPER_ADMIN');
    `);
        // Add role column to users table
        await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "role" user_role_enum NOT NULL DEFAULT 'USER';
    `);
    }
    async down(queryRunner) {
        // Remove the role column
        await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "role";
    `);
        // Drop the enum type
        await queryRunner.query(`
      DROP TYPE IF EXISTS user_role_enum;
    `);
    }
}
exports.AddRoleToUsers1712565600011 = AddRoleToUsers1712565600011;
//# sourceMappingURL=1712565600011-AddRoleToUsers.js.map