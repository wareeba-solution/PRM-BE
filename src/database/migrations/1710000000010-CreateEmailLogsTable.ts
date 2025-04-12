import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailLogsTable1710000000010 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'email_logs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'jobId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'to',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cc',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'bcc',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'template',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'context',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        default: "'QUEUED'",
                    },
                    {
                        name: 'error',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'organizationId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'sentAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['organizationId'],
                        referencedTableName: 'organizations',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email_logs');
    }
} 