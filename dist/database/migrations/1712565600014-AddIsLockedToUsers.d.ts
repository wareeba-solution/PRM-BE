import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsLockedToUsers1712565600014 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
