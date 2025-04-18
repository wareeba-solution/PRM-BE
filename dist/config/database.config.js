"use strict";
// src/config/database.config.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.typeOrmConfigSync = exports.typeOrmConfig = exports.databaseConfigValidationSchema = void 0;
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
const typeorm_1 = require("typeorm");
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
const config = (0, config_1.registerAs)('database', () => ({
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
}));
exports.default = config;
// TypeORM configuration factory
const typeOrmConfig = async () => {
    const dbConfig = config();
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
        entities: ['dist/**/*.entity.js', 'dist/entities/UserSpecialization.js'],
        migrations: [`${dbConfig.migrations.directory}/*.{ts,js}`],
        migrationsTableName: dbConfig.migrations.tableName,
        migrationsRun: dbConfig.migrations.enabled,
        poolSize: dbConfig.maxConnections,
        connectTimeoutMS: dbConfig.connectionTimeout,
        extra: {
            max: dbConfig.maxConnections,
            min: dbConfig.minConnections,
        },
        autoLoadEntities: true,
    };
};
exports.typeOrmConfig = typeOrmConfig;
// Create a non-async version of typeOrmConfig for the DataSource
const typeOrmConfigSync = () => {
    const dbConfig = config();
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
        entities: ['src/**/*.entity.ts', 'src/entities/UserSpecialization.ts'],
        migrations: [`${dbConfig.migrations.directory}/*.ts`],
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