"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVoipTables1634567890123 = void 0;
const typeorm_1 = require("typeorm");
class AddVoipTables1634567890123 {
    async up(queryRunner) {
        // Create VoIP config table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'voip_configs',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    default: "'default'",
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    default: "'freeswitch'",
                },
                {
                    name: 'host',
                    type: 'varchar',
                    default: "'127.0.0.1'",
                },
                {
                    name: 'port',
                    type: 'int',
                    default: 8021,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    default: "'ClueCon'",
                },
                {
                    name: 'config_json',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
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
        }), true);
        // Create call logs table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'call_logs',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'call_uuid',
                    type: 'varchar',
                },
                {
                    name: 'caller_number',
                    type: 'varchar',
                },
                {
                    name: 'destination_number',
                    type: 'varchar',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'start_time',
                    type: 'timestamp',
                },
                {
                    name: 'answer_time',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'end_time',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'duration',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'hangup_cause',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'recording_url',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'call_direction',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'appointment_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'contact_id',
                    type: 'int',
                    isNullable: true,
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
        }), true);
        // Create indexes for faster lookup
        await queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
            name: 'IDX_CALL_UUID',
            columnNames: ['call_uuid'],
        }));
        await queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
            name: 'IDX_APPOINTMENT_ID',
            columnNames: ['appointment_id'],
        }));
        await queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
            name: 'IDX_CONTACT_ID',
            columnNames: ['contact_id'],
        }));
        // Add foreign key to appointments table
        await queryRunner.createForeignKey('call_logs', new typeorm_1.TableForeignKey({
            name: 'FK_CALL_LOGS_APPOINTMENT',
            columnNames: ['appointment_id'],
            referencedTableName: 'appointments',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        // Add foreign key to contacts table
        await queryRunner.createForeignKey('call_logs', new typeorm_1.TableForeignKey({
            name: 'FK_CALL_LOGS_CONTACT',
            columnNames: ['contact_id'],
            referencedTableName: 'contacts',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        // Drop foreign keys first
        await queryRunner.dropForeignKey('call_logs', 'FK_CALL_LOGS_APPOINTMENT');
        await queryRunner.dropForeignKey('call_logs', 'FK_CALL_LOGS_CONTACT');
        // Drop indexes
        await queryRunner.dropIndex('call_logs', 'IDX_CALL_UUID');
        await queryRunner.dropIndex('call_logs', 'IDX_APPOINTMENT_ID');
        await queryRunner.dropIndex('call_logs', 'IDX_CONTACT_ID');
        // Drop tables
        await queryRunner.dropTable('call_logs');
        await queryRunner.dropTable('voip_configs');
    }
}
exports.AddVoipTables1634567890123 = AddVoipTables1634567890123;
//# sourceMappingURL=1743079120-add-voip-tables.js.map