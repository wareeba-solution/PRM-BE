import { INestApplication } from '@nestjs/common';
/**
 * Configures Swagger and ReDoc for the application
 * Implements a safe configuration to avoid circular dependency issues
 */
/**
 * Sets up Swagger documentation for the application
 */
export declare function setupSwagger(app: INestApplication): void;
