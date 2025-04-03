"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisMockService = void 0;
// src/common/providers/redis-mock.service.ts
const common_1 = require("@nestjs/common");
let RedisMockService = class RedisMockService {
    constructor() {
        this.logger = new common_1.Logger('RedisMockService');
        this.cache = new Map();
        this.logger.log('Using Redis mock implementation');
    }
    // Basic Redis methods
    async get(key) {
        return this.cache.get(key) || null;
    }
    async set(key, value, ttl) {
        this.cache.set(key, value);
        if (ttl) {
            setTimeout(() => {
                this.cache.delete(key);
            }, ttl * 1000);
        }
        return 'OK';
    }
    async del(key) {
        return this.cache.delete(key) ? 1 : 0;
    }
    // Event handler
    on(event, callback) {
        return this;
    }
};
RedisMockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisMockService);
exports.RedisMockService = RedisMockService;
//# sourceMappingURL=redis-mock.service.js.map