import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddLastLoginAtToUsers1712565600015 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
