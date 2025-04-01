var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RateLimitGuard_1;
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
let RateLimitGuard = RateLimitGuard_1 = class RateLimitGuard {
    constructor() {
        this.maxRequests = 100;
        this.windowMs = 15 * 60 * 1000;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const ip = this.getIp(request);
        const key = `${ip}`;
        const now = Date.now();
        const data = RateLimitGuard_1.store[key] || { count: 0, lastRequest: now };
        if (now - data.lastRequest > this.windowMs) {
            data.count = 0;
            data.lastRequest = now;
        }
        data.count += 1;
        RateLimitGuard_1.store[key] = data;
        const response = context.switchToHttp().getResponse();
        response.header('X-RateLimit-Limit', this.maxRequests);
        response.header('X-RateLimit-Remaining', Math.max(0, this.maxRequests - data.count));
        if (data.count > this.maxRequests) {
            const resetTime = new Date(data.lastRequest + this.windowMs);
            response.header('X-RateLimit-Reset', resetTime.toISOString());
            throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
        }
        return true;
    }
    getIp(request) {
        const forwardedFor = request.headers['x-forwarded-for'];
        if (forwardedFor) {
            return Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : forwardedFor.split(',')[0].trim();
        }
        return request.ip || 'unknown';
    }
};
RateLimitGuard.store = {};
RateLimitGuard = RateLimitGuard_1 = __decorate([
    Injectable()
], RateLimitGuard);
export { RateLimitGuard };
//# sourceMappingURL=rate-limit.guard.js.map