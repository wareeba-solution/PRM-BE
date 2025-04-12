import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class FixUsersTablePermissions1710000000008 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
