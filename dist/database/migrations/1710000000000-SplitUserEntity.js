"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitUserEntity1710000000000 = void 0;
class SplitUserEntity1710000000000 {
    async up(queryRunner) {
        // Create user_profiles table
        await queryRunner.query(`
            CREATE TABLE "user_profiles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "title" character varying,
                "department" character varying,
                "employeeId" character varying,
                "address" jsonb,
                "emergencyContact" jsonb,
                "licenseNumber" character varying,
                "specialization" character varying,
                "qualifications" text,
                "certifications" text,
                "isOnCall" boolean NOT NULL DEFAULT false,
                "languages" text,
                "preferences" jsonb,
                "metadata" jsonb,
                "avatar" character varying,
                "signature" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_profiles" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_profiles_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
        // Create user_verifications table
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
                "emailVerificationToken" character varying,
                "phoneVerificationToken" character varying,
                "emailVerificationExpires" TIMESTAMP,
                "phoneVerificationExpires" TIMESTAMP,
                "deviceTokens" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_verifications" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_verifications_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
        // Migrate data from users to user_profiles
        await queryRunner.query(`
            INSERT INTO "user_profiles" (
                "userId", "title", "department", "employeeId", "address", 
                "emergencyContact", "licenseNumber", "specialization", 
                "qualifications", "certifications", "isOnCall", "languages", 
                "preferences", "metadata", "avatar", "signature"
            )
            SELECT 
                "id", "title", "department", "employeeId", "address",
                "emergencyContact", "licenseNumber", "specialization",
                "qualifications", "certifications", "isOnCall", "languages",
                "preferences", "metadata", "avatar", "signature"
            FROM "users"
        `);
        // Migrate data from users to user_verifications
        await queryRunner.query(`
            INSERT INTO "user_verifications" (
                "userId", "isEmailVerified", "isPhoneVerified", "deviceTokens"
            )
            SELECT 
                "id", "isEmailVerified", "isPhoneVerified", "deviceTokens"
            FROM "users"
        `);
        // Drop columns from users table
        await queryRunner.query(`
            ALTER TABLE "users" 
            DROP COLUMN "title",
            DROP COLUMN "department",
            DROP COLUMN "employeeId",
            DROP COLUMN "address",
            DROP COLUMN "emergencyContact",
            DROP COLUMN "licenseNumber",
            DROP COLUMN "specialization",
            DROP COLUMN "qualifications",
            DROP COLUMN "certifications",
            DROP COLUMN "isOnCall",
            DROP COLUMN "languages",
            DROP COLUMN "preferences",
            DROP COLUMN "metadata",
            DROP COLUMN "avatar",
            DROP COLUMN "signature",
            DROP COLUMN "isEmailVerified",
            DROP COLUMN "isPhoneVerified",
            DROP COLUMN "deviceTokens"
        `);
        // Create indexes
        await queryRunner.query(`
            CREATE INDEX "IDX_user_profiles_userId" ON "user_profiles" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_user_verifications_userId" ON "user_verifications" ("userId")
        `);
    }
    async down(queryRunner) {
        // Add columns back to users table
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "title" character varying,
            ADD COLUMN "department" character varying,
            ADD COLUMN "employeeId" character varying,
            ADD COLUMN "address" jsonb,
            ADD COLUMN "emergencyContact" jsonb,
            ADD COLUMN "licenseNumber" character varying,
            ADD COLUMN "specialization" character varying,
            ADD COLUMN "qualifications" text,
            ADD COLUMN "certifications" text,
            ADD COLUMN "isOnCall" boolean NOT NULL DEFAULT false,
            ADD COLUMN "languages" text,
            ADD COLUMN "preferences" jsonb,
            ADD COLUMN "metadata" jsonb,
            ADD COLUMN "avatar" character varying,
            ADD COLUMN "signature" character varying,
            ADD COLUMN "isEmailVerified" boolean NOT NULL DEFAULT false,
            ADD COLUMN "isPhoneVerified" boolean NOT NULL DEFAULT false,
            ADD COLUMN "deviceTokens" text
        `);
        // Migrate data back from user_profiles to users
        await queryRunner.query(`
            UPDATE "users" u
            SET 
                "title" = up."title",
                "department" = up."department",
                "employeeId" = up."employeeId",
                "address" = up."address",
                "emergencyContact" = up."emergencyContact",
                "licenseNumber" = up."licenseNumber",
                "specialization" = up."specialization",
                "qualifications" = up."qualifications",
                "certifications" = up."certifications",
                "isOnCall" = up."isOnCall",
                "languages" = up."languages",
                "preferences" = up."preferences",
                "metadata" = up."metadata",
                "avatar" = up."avatar",
                "signature" = up."signature"
            FROM "user_profiles" up
            WHERE u."id" = up."userId"
        `);
        // Migrate data back from user_verifications to users
        await queryRunner.query(`
            UPDATE "users" u
            SET 
                "isEmailVerified" = uv."isEmailVerified",
                "isPhoneVerified" = uv."isPhoneVerified",
                "deviceTokens" = uv."deviceTokens"
            FROM "user_verifications" uv
            WHERE u."id" = uv."userId"
        `);
        // Drop the new tables
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TABLE "user_verifications"`);
    }
}
exports.SplitUserEntity1710000000000 = SplitUserEntity1710000000000;
//# sourceMappingURL=1710000000000-SplitUserEntity.js.map