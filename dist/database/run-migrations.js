"use strict";
// src/database/run-migrations.ts
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
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Load environment variables
(0, dotenv_1.config)();
// Create a connection to the database
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA || 'public',
    ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
    } : false,
});
async function runMigrations() {
    try {
        // Initialize the connection
        await dataSource.initialize();
        console.log('Database connection established');
        // Run the tenant tables migration
        console.log('Running tenant tables migration...');
        const tenantSqlPath = path.join(__dirname, 'create-tenant-tables.sql');
        const tenantSql = fs.readFileSync(tenantSqlPath, 'utf8');
        await dataSource.query(tenantSql);
        console.log('Tenant tables migration completed');
        // Run the notification subject column migration
        console.log('Running notification subject column migration...');
        const notificationSubjectSqlPath = path.join(__dirname, 'migrations', 'add-subject-to-notifications.sql');
        const notificationSubjectSql = fs.readFileSync(notificationSubjectSqlPath, 'utf8');
        await dataSource.query(notificationSubjectSql);
        console.log('Notification subject column migration completed');
        // Run the notification templateId column migration
        console.log('Running notification templateId column migration...');
        const notificationTemplateSqlPath = path.join(__dirname, 'migrations', 'add-template-id-to-notifications.sql');
        const notificationTemplateSql = fs.readFileSync(notificationTemplateSqlPath, 'utf8');
        await dataSource.query(notificationTemplateSql);
        console.log('Notification templateId column migration completed');
        console.log('All migrations completed successfully');
    }
    catch (error) {
        console.error('Error running migrations:', error);
    }
    finally {
        // Close the connection
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Database connection closed');
        }
    }
}
// Run the migrations
runMigrations();
//# sourceMappingURL=run-migrations.js.map