/**
 * Re-export file to fix module resolution in production
 * This file ensures that the import from './swagger-dto' in swagger.config.ts works correctly
 */
export * from './swagger-dto/index';
