"use strict";
// src/config/database.config.ts
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
exports.dataSource = exports.typeOrmConfigSync = exports.typeOrmConfig = exports.databaseConfigValidationSchema = void 0;
var config_1 = require("@nestjs/config");
var Joi = require("joi");
var typeorm_1 = require("typeorm");
exports.databaseConfigValidationSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_SCHEMA: Joi.string().default('public'),
    DB_SSL: Joi.boolean().default(false),
    DB_SYNC: Joi.boolean().default(false),
    DB_LOGGING: Joi.boolean().default(false),
    DB_MAX_CONNECTIONS: Joi.number().default(100),
    DB_MIN_CONNECTIONS: Joi.number().default(1),
    DB_CONNECTION_TIMEOUT: Joi.number().default(10000),
    DB_RETRY_ATTEMPTS: Joi.number().default(10),
    DB_RETRY_DELAY: Joi.number().default(3000),
    DB_MIGRATIONS_ENABLED: Joi.boolean().default(true),
    DB_MIGRATIONS_DIR: Joi.string().default('src/database/migrations'),
    DB_MIGRATIONS_TABLE: Joi.string().default('migrations'),
});
var config = (0, config_1.registerAs)('database', function () { return ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA || 'public',
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '100', 10),
    minConnections: parseInt(process.env.DB_MIN_CONNECTIONS || '1', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
    retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '10', 10),
    retryDelay: parseInt(process.env.DB_RETRY_DELAY || '3000', 10),
    migrations: {
        enabled: process.env.DB_MIGRATIONS_ENABLED === 'true',
        directory: process.env.DB_MIGRATIONS_DIR || 'src/database/migrations',
        tableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
    },
}); });
exports.default = config;
// TypeORM configuration factory
var typeOrmConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dbConfig;
    return __generator(this, function (_a) {
        dbConfig = config();
        return [2 /*return*/, {
                type: 'postgres',
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.database,
                schema: dbConfig.schema,
                ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
                synchronize: dbConfig.synchronize,
                logging: dbConfig.logging,
                entities: ['dist/**/*.entity.js'],
                migrations: ["".concat(dbConfig.migrations.directory, "/*.{ts,js}")],
                migrationsTableName: dbConfig.migrations.tableName,
                migrationsRun: dbConfig.migrations.enabled,
                poolSize: dbConfig.maxConnections,
                connectTimeoutMS: dbConfig.connectionTimeout,
                extra: {
                    max: dbConfig.maxConnections,
                    min: dbConfig.minConnections,
                },
                autoLoadEntities: true,
            }];
    });
}); };
exports.typeOrmConfig = typeOrmConfig;
// Create a non-async version of typeOrmConfig for the DataSource
var typeOrmConfigSync = function () {
    var dbConfig = config();
    return {
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        schema: dbConfig.schema,
        ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
        synchronize: dbConfig.synchronize,
        logging: dbConfig.logging,
        entities: ['src/**/*.entity.ts'],
        migrations: ["".concat(dbConfig.migrations.directory, "/*.ts")],
        migrationsTableName: dbConfig.migrations.tableName,
        migrationsRun: dbConfig.migrations.enabled,
        extra: {
            max: dbConfig.maxConnections,
            min: dbConfig.minConnections,
            connectionTimeout: dbConfig.connectionTimeout,
        },
    };
};
exports.typeOrmConfigSync = typeOrmConfigSync;
// Data source for TypeORM CLI
exports.dataSource = new typeorm_1.DataSource((0, exports.typeOrmConfigSync)());
// Example .env file:
/*
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=prm_db
DB_SCHEMA=public
DB_SSL=false
DB_SYNC=false
DB_LOGGING=true
DB_MAX_CONNECTIONS=100
DB_MIN_CONNECTIONS=1
DB_CONNECTION_TIMEOUT=10000
DB_RETRY_ATTEMPTS=10
DB_RETRY_DELAY=3000
DB_MIGRATIONS_ENABLED=true
DB_MIGRATIONS_DIR=src/database/migrations
DB_MIGRATIONS_TABLE=migrations
*/ 
//# sourceMappingURL=database.config.js.map