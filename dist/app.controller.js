var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getInfo() {
        return {
            name: 'Patient Relationship Manager',
            version: process.env.APP_VERSION || '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
        };
    }
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
    ping() {
        return { message: 'pong', timestamp: new Date().toISOString() };
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Get application info' }),
    ApiResponse({ status: 200, description: 'Application info retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getInfo", null);
__decorate([
    Get('health'),
    ApiOperation({ summary: 'Health check endpoint' }),
    ApiResponse({ status: 200, description: 'System is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "healthCheck", null);
__decorate([
    Get('ping'),
    ApiOperation({ summary: 'Simple ping endpoint' }),
    ApiResponse({ status: 200, description: 'Pong' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ping", null);
AppController = __decorate([
    ApiTags('System'),
    Controller(),
    __metadata("design:paramtypes", [AppService])
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map