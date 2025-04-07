"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailContentsTable1710000000009 = void 0;
const typeorm_1 = require("typeorm");
class CreateEmailContentsTable1710000000009 {
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
        // Remove htmlContent and textContent columns from email_logs table
        await queryRunner.dropColumn('email_logs', 'htmlContent');
        await queryRunner.dropColumn('email_logs', 'textContent');
    }
    async down(queryRunner) {
        // Add back htmlContent and textContent columns to email_logs table
        await queryRunner.addColumn('email_logs', new typeorm_1.TableColumn({
            name: 'htmlContent',
            type: 'text',
            isNullable: true,
        }));
        await queryRunner.addColumn('email_logs', new typeorm_1.TableColumn({
            name: 'textContent',
            type: 'text',
            isNullable: true,
        }));
        // Drop foreign key constraint
        const table = await queryRunner.getTable('email_contents');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('emailLogId') !== -1);
        await queryRunner.dropForeignKey('email_contents', foreignKey);
        // Drop email_contents table
        await queryRunner.dropTable('email_contents');
    }
}
exports.CreateEmailContentsTable1710000000009 = CreateEmailContentsTable1710000000009;
//# sourceMappingURL=1710000000009-CreateEmailContentsTable.js.map