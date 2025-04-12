// src/database/run-migrations.ts

import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
config();

// Create a connection to the database
const dataSource = new DataSource({
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
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Close the connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

// Run the migrations
runMigrations();
