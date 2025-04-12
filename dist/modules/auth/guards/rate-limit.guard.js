"use strict";
// src/modules/auth/guards/rate-limit.guard.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RateLimitGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
let RateLimitGuard = RateLimitGuard_1 = class RateLimitGuard {
    constructor() {
        // Rate limit configuration
        this.maxRequests = 100; // Maximum requests per window
        this.windowMs = 15 * 60 * 1000; // 15 minutes window
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        // Generate a key based on IP address
        const ip = this.getIp(request);
        const key = `${ip}`;
        // Initialize or get the rate limit data for this key
        const now = Date.now();
        const data = RateLimitGuard_1.store[key] || { count: 0, lastRequest: now };
        // Reset count if outside window
        if (now - data.lastRequest > this.windowMs) {
            data.count = 0;
            data.lastRequest = now;
        }
        // Increment request count
        data.count += 1;
        // Update store
        RateLimitGuard_1.store[key] = data;
        // Set headers to inform client about rate limits
        const response = context.switchToHttp().getResponse();
        response.header('X-RateLimit-Limit', this.maxRequests);
        response.header('X-RateLimit-Remaining', Math.max(0, this.maxRequests - data.count));
        // Check if rate limit is exceeded
        if (data.count > this.maxRequests) {
            const resetTime = new Date(data.lastRequest + this.windowMs);
            response.header('X-RateLimit-Reset', resetTime.toISOString());
            throw new common_1.HttpException('Too Many Requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return true;
    }
    /**
     * Get IP address from request, handling proxies
     */
    getIp(request) {
        // Try X-Forwarded-For header first (for proxied requests)
        const forwardedFor = request.headers['x-forwarded-for'];
        if (forwardedFor) {
            return Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : forwardedFor.split(',')[0].trim();
        }
        // Fall back to standard IP
        return request.ip || 'unknown';
    }
};
// Static store to track request counts across instances
RateLimitGuard.store = {};
RateLimitGuard = RateLimitGuard_1 = __decorate([
    (0, common_1.Injectable)()
], RateLimitGuard);
exports.RateLimitGuard = RateLimitGuard;
//# sourceMappingURL=rate-limit.guard.js.map