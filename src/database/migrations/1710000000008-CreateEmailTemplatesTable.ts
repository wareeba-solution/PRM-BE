import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailTemplatesTable1710000000008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'email_templates',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'htmlContent',
                        type: 'text',
                        isNullable: false,
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
                        name: 'organizationId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
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
                    {
                        name: 'deletedAt',
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
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email_templates');
    }
} 