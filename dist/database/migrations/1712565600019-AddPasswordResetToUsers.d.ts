import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddPasswordResetToUsers1712565600019 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
