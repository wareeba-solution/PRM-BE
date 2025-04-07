// src/app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getInfo() {
        return {
            name: 'Patient Relationship Manager',
            version: process.env.APP_VERSION || '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
        };
    }



    @Get('health')
    async healthCheck() {
        const health = await this.appService.checkHealth();
        return {
            status: health.isHealthy ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            services: health.services,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        };
    }

    @Get('ping')
    ping() {
        return { message: 'pong', timestamp: new Date().toISOString() };
    }
}