"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSpecializationsTable1683300000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserSpecializationsTable1683300000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_specializations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'specialization',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('user_specializations', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user_specializations');
    }
}
exports.CreateUserSpecializationsTable1683300000000 = CreateUserSpecializationsTable1683300000000;
//# sourceMappingURL=1683300000000-CreateUserSpecializationsTable.js.map