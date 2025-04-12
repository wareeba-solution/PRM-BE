import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailQueueTable1710000000009 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'email_queue',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'priority',
                        type: 'integer',
                        default: 1,
                    },
                    {
                        name: 'attempts',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'maxAttempts',
                        type: 'integer',
                        default: 3,
                    },
                    {
                        name: 'lastError',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'data',
                        type: 'jsonb',
                        isNullable: false,
                    },
                    {
                        name: 'organizationId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'templateId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'recipient',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'htmlContent',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'textContent',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'variables',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'metadata',
                        type: 'jsonb',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        default: "'PENDING'",
                    },
                    {
                        name: 'scheduledFor',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'processedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'sentAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
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
                        columnNames: ['templateId'],
                        referencedTableName: 'email_templates',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email_queue');
    }
} 