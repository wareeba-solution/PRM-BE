var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.redis = new Redis({
            host: this.configService.get('redis.host'),
            port: this.configService.get('redis.port'),
            password: this.configService.get('redis.password'),
        });
    }
    async checkHealth() {
        const services = {
            database: await this.checkDatabase(),
            redis: await this.checkRedis(),
            queues: await this.checkQueuesMock(),
            memory: this.checkMemory(),
        };
        const isHealthy = Object.values(services).every(service => service.status === 'healthy');
        return {
            isHealthy,
            services,
            timestamp: new Date().toISOString(),
        };
    }
    async checkDatabase() {
        try {
            const result = await this.checkDatabaseQuery();
            return {
                status: 'healthy',
                latency: result.latency,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
            };
        }
    }
    async checkDatabaseQuery() {
        const startTime = Date.now();
        await this.configService.get('database');
        const latency = Date.now() - startTime;
        return { latency };
    }
    async checkRedis() {
        try {
            const startTime = Date.now();
            await this.redis.ping();
            const latency = Date.now() - startTime;
            return {
                status: 'healthy',
                latency,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
            };
        }
    }
    async checkQueuesMock() {
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
    checkMemory() {
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
    formatBytes(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)}${units[unitIndex]}`;
    }
};
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map