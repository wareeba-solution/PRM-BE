"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailLogsTable1710000000010 = void 0;
const typeorm_1 = require("typeorm");
class CreateEmailLogsTable1710000000010 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('email_logs');
    }
}
exports.CreateEmailLogsTable1710000000010 = CreateEmailLogsTable1710000000010;
//# sourceMappingURL=1710000000010-CreateEmailLogsTable.js.map