import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddEmailVerificationToUsers1712565600012 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
