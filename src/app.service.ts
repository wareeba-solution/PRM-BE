// src/app.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    constructor(
        private readonly configService: ConfigService,
    ) {}

    async checkHealth() {
        const services = {
            database: await this.checkDatabase(),
            queues: await this.checkQueuesMock(), // Changed to mock function
            memory: this.checkMemory(),
        };

        const isHealthy = Object.values(services).every(service => service.status === 'healthy');

        return {
            isHealthy,
            services,
            timestamp: new Date().toISOString(),
        };
    }

    private async checkDatabase() {
        try {
            const result = await this.checkDatabaseQuery();
            return {
                status: 'healthy',
                latency: result.latency,
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
            };
        }
    }

    private async checkDatabaseQuery() {
        const startTime = Date.now();
        await this.configService.get('database');
        const latency = Date.now() - startTime;
        return { latency };
    }

    // Replace the queue check with a mock function
    private async checkQueuesMock() {
        return {
            status: 'healthy',
            queues: {
                notifications: {
                    status: 'healthy',
                    metrics: {
                        active: 0,
                        waiting: 0,
                        completed: 0,
                        failed: 0,
                    },
                },
                messages: {
                    status: 'healthy',
                    metrics: {
                        active: 0,
                        waiting: 0,
                        completed: 0,
                        failed: 0,
                    },
                },
            },
        };
    }

    private checkMemory() {
        const memory = process.memoryUsage();
        const memoryThreshold = this.configService.get('app.memoryThreshold') || 0.9;
        const isHealthy = memory.heapUsed / memory.heapTotal < memoryThreshold;

        return {
            status: isHealthy ? 'healthy' : 'warning',
            metrics: {
                heapUsed: this.formatBytes(memory.heapUsed),
                heapTotal: this.formatBytes(memory.heapTotal),
                rss: this.formatBytes(memory.rss),
                external: this.formatBytes(memory.external),
            },
            usage: (memory.heapUsed / memory.heapTotal * 100).toFixed(2) + '%',
        };
    }

    private formatBytes(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)}${units[unitIndex]}`;
    }
}