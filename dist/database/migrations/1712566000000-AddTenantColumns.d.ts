import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddTenantColumns1712566000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
