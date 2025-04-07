import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailQueueCcBcc1710000000010 implements MigrationInterface {
    name = 'AddEmailQueueCcBcc1710000000010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_queue" ADD "cc" text`);
        await queryRunner.query(`ALTER TABLE "email_queue" ADD "bcc" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_queue" DROP COLUMN "bcc"`);
        await queryRunner.query(`ALTER TABLE "email_queue" DROP COLUMN "cc"`);
    }
} 