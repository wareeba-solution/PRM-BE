import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CleanupUsersTable1710000000001 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
