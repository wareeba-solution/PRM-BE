import { MigrationInterface, QueryRunner } from "typeorm";

export class CheckUsersTableColumns1710000000006 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Count the number of columns in the users table
        const result = await queryRunner.query(`
            SELECT COUNT(*) as column_count
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'users';
        `);
        
        console.log(`Users table has ${result[0].column_count} columns`);
        
        // List all columns in the users table
        const columns = await queryRunner.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'users'
            ORDER BY ordinal_position;
        `);
        
        console.log('Columns in users table:');
        columns.forEach((col: any) => {
            console.log(`- ${col.column_name} (${col.data_type}, ${col.is_nullable === 'YES' ? 'nullable' : 'not nullable'})`);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // This migration is read-only, so there's nothing to revert
    }
} 