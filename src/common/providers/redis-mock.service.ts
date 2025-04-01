// src/common/providers/redis-mock.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RedisMockService {
    private readonly logger = new Logger('RedisMockService');
    private cache = new Map<string, any>();

    constructor() {
        this.logger.log('Using Redis mock implementation');
    }

    // Basic Redis methods
    async get(key: string): Promise<any> {
        return this.cache.get(key) || null;
    }

    async set(key: string, value: any, ttl?: number): Promise<'OK'> {
        this.cache.set(key, value);

        if (ttl) {
            setTimeout(() => {
                this.cache.delete(key);
            }, ttl * 1000);
        }

        return 'OK';
    }

    async del(key: string): Promise<number> {
        return this.cache.delete(key) ? 1 : 0;
    }

    // Event handler
    on(event: string, callback: Function) {
        return this;
    }
}