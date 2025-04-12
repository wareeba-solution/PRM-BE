"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserVerificationTable1712565600023 = void 0;
class FixUserVerificationTable1712565600023 {
    async up(queryRunner) {
        // Drop the existing table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS "user_verification"`);
        // Create the table with the correct name and all columns
        await queryRunner.query(`
            CREATE TABLE "user_verifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "isEmailVerified" boolean NOT NULL DEFAULT false,
                "isPhoneVerified" boolean NOT NULL DEFAULT false,
                "emailVerifiedAt" TIMESTAMP,
                "phoneVerifiedAt" TIMESTAMP,
                "lastEmailVerificationSent" TIMESTAMP,
                "lastPhoneVerificationSent" TIMESTAMP,
                "emailVerificationToken" text,
                "phoneVerificationToken" text,
                "emailVerificationExpires" TIMESTAMP,
                "phoneVerificationExpires" TIMESTAMP,
                "deviceTokens" text[],
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_verifications" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_verifications_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "user_verifications"`);
    }
}
exports.FixUserVerificationTable1712565600023 = FixUserVerificationTable1712565600023;
//# sourceMappingURL=1712565600023-FixUserVerificationTable.js.map