"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVoipTables1634567890123 = void 0;
var typeorm_1 = require("typeorm");
var AddVoipTables1634567890123 = /** @class */ (function () {
    function AddVoipTables1634567890123() {
    }
    AddVoipTables1634567890123.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Create VoIP config table
                    return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
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
                        }), true)];
                    case 1:
                        // Create VoIP config table
                        _a.sent();
                        // Create call logs table
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
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
                            }), true)];
                    case 2:
                        // Create call logs table
                        _a.sent();
                        // Create indexes for faster lookup
                        return [4 /*yield*/, queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
                                name: 'IDX_CALL_UUID',
                                columnNames: ['call_uuid'],
                            }))];
                    case 3:
                        // Create indexes for faster lookup
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
                                name: 'IDX_APPOINTMENT_ID',
                                columnNames: ['appointment_id'],
                            }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createIndex('call_logs', new typeorm_1.TableIndex({
                                name: 'IDX_CONTACT_ID',
                                columnNames: ['contact_id'],
                            }))];
                    case 5:
                        _a.sent();
                        // Add foreign key to appointments table
                        return [4 /*yield*/, queryRunner.createForeignKey('call_logs', new typeorm_1.TableForeignKey({
                                name: 'FK_CALL_LOGS_APPOINTMENT',
                                columnNames: ['appointment_id'],
                                referencedTableName: 'appointments',
                                referencedColumnNames: ['id'],
                                onDelete: 'SET NULL',
                            }))];
                    case 6:
                        // Add foreign key to appointments table
                        _a.sent();
                        // Add foreign key to contacts table
                        return [4 /*yield*/, queryRunner.createForeignKey('call_logs', new typeorm_1.TableForeignKey({
                                name: 'FK_CALL_LOGS_CONTACT',
                                columnNames: ['contact_id'],
                                referencedTableName: 'contacts',
                                referencedColumnNames: ['id'],
                                onDelete: 'SET NULL',
                            }))];
                    case 7:
                        // Add foreign key to contacts table
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddVoipTables1634567890123.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Drop foreign keys first
                    return [4 /*yield*/, queryRunner.dropForeignKey('call_logs', 'FK_CALL_LOGS_APPOINTMENT')];
                    case 1:
                        // Drop foreign keys first
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropForeignKey('call_logs', 'FK_CALL_LOGS_CONTACT')];
                    case 2:
                        _a.sent();
                        // Drop indexes
                        return [4 /*yield*/, queryRunner.dropIndex('call_logs', 'IDX_CALL_UUID')];
                    case 3:
                        // Drop indexes
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropIndex('call_logs', 'IDX_APPOINTMENT_ID')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropIndex('call_logs', 'IDX_CONTACT_ID')];
                    case 5:
                        _a.sent();
                        // Drop tables
                        return [4 /*yield*/, queryRunner.dropTable('call_logs')];
                    case 6:
                        // Drop tables
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable('voip_configs')];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddVoipTables1634567890123;
}());
exports.AddVoipTables1634567890123 = AddVoipTables1634567890123;
//# sourceMappingURL=1743079120-add-voip-tables.js.map