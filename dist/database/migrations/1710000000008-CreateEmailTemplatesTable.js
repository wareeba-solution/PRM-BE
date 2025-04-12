"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailTemplatesTable1710000000008 = void 0;
const typeorm_1 = require("typeorm");
class CreateEmailTemplatesTable1710000000008 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('email_templates');
    }
}
exports.CreateEmailTemplatesTable1710000000008 = CreateEmailTemplatesTable1710000000008;
//# sourceMappingURL=1710000000008-CreateEmailTemplatesTable.js.map