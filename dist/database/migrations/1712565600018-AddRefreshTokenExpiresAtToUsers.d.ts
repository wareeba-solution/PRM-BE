import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddRefreshTokenExpiresAtToUsers1712565600018 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
