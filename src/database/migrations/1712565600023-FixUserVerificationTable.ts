import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserVerificationTable1712565600023 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user_verifications"`);
    }
} 