import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddLastActiveAtToUsers1712565600016 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
