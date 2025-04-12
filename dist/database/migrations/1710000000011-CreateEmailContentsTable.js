"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailContentsTable1710000000011 = void 0;
const typeorm_1 = require("typeorm");
class CreateEmailContentsTable1710000000011 {
    async up(queryRunner) {
        // Create email_contents table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'email_contents',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'emailLogId',
                    type: 'uuid',
                    isNullable: false,
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
            ],
        }), true);
        // Add foreign key constraint
        await queryRunner.createForeignKey('email_contents', new typeorm_1.TableForeignKey({
            columnNames: ['emailLogId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'email_logs',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        // Drop foreign key constraint
        const table = await queryRunner.getTable('email_contents');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('emailLogId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('email_contents', foreignKey);
        }
        // Drop email_contents table
        await queryRunner.dropTable('email_contents');
    }
}
exports.CreateEmailContentsTable1710000000011 = CreateEmailContentsTable1710000000011;
//# sourceMappingURL=1710000000011-CreateEmailContentsTable.js.map