import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddRequirePasswordChangeToUsers1712565600013 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
