"use strict";
// src/common/middleware/logger.middleware.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const chalk = __importStar(require("chalk"));
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        var _a, _b;
        const { ip, method, originalUrl: url } = request;
        const userAgent = request.get('user-agent') || '';
        const correlationId = (0, uuid_1.v4)();
        const startTime = Date.now();
        // Add correlation ID to request headers
        request.headers['x-correlation-id'] = correlationId;
        // Prepare log object
        const requestLog = {
            correlationId,
            timestamp: new Date().toISOString(),
            method,
            url,
            userAgent,
            ip: this.getClientIp(request),
            userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id,
            organizationId: (_b = request.user) === null || _b === void 0 ? void 0 : _b.organizationId,
        };
        // Log request body for POST/PUT/PATCH methods
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            requestLog.requestBody = this.sanitizeRequestBody(request.body);
        }
        // Log when request starts
        this.logRequest(requestLog);
        // Handle response
        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const responseTime = Date.now() - startTime;
            requestLog.statusCode = statusCode;
            requestLog.responseTime = responseTime;
            this.logResponse(Object.assign(Object.assign({}, requestLog), { contentLength,
                statusCode,
                responseTime }));
            // Store metrics if needed
            this.storeMetrics(requestLog);
        });
        // Handle errors
        response.on('error', (error) => {
            requestLog.error = error;
            this.logError(requestLog);
        });
        next();
    }
    getClientIp(request) {
        const forwardedFor = request.headers['x-forwarded-for'];
        if (forwardedFor) {
            return Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : forwardedFor.split(',')[0];
        }
        return request.ip || ''; // Add fallback empty string in case ip is undefined
    }
    sanitizeRequestBody(body) {
        if (!body)
            return body;
        const sensitiveFields = ['password', 'token', 'secret', 'creditCard'];
        const sanitized = Object.assign({}, body);
        for (const field of sensitiveFields) {
            if (field in sanitized) {
                sanitized[field] = '***';
            }
        }
        return sanitized;
    }
    logRequest(log) {
        const message = chalk.blue(`Incoming Request`) +
            chalk.gray(` [${log.correlationId}]`) +
            `\n  ${chalk.green(log.method)} ${log.url}` +
            `\n  User-Agent: ${log.userAgent}` +
            `\n  IP: ${log.ip}`;
        this.logger.log(message);
        if (log.requestBody) {
            this.logger.debug(`Request Body: ${JSON.stringify(log.requestBody)}`);
        }
    }
    logResponse(log) {
        const statusColor = this.getStatusColor(log.statusCode);
        const message = chalk.blue(`Response Sent`) +
            chalk.gray(` [${log.correlationId}]`) +
            `\n  ${log.method} ${log.url}` +
            `\n  Status: ${statusColor(log.statusCode)}` +
            `\n  Time: ${log.responseTime}ms` +
            (log.contentLength ? `\n  Size: ${log.contentLength}b` : '');
        if (log.statusCode >= 400) {
            this.logger.warn(message);
        }
        else {
            this.logger.log(message);
        }
    }
    logError(log) {
        const message = chalk.red(`Error in Request`) +
            chalk.gray(` [${log.correlationId}]`) +
            `\n  ${log.method} ${log.url}` +
            `\n  Error: ${log.error.message}`;
        this.logger.error(message, log.error.stack);
    }
    getStatusColor(status) {
        if (status >= 500)
            return chalk.red;
        if (status >= 400)
            return chalk.yellow;
        if (status >= 300)
            return chalk.cyan;
        if (status >= 200)
            return chalk.green;
        return chalk.gray;
    }
    async storeMetrics(log) {
        try {
            // Example: Store metrics in Redis or other monitoring service
            // await this.metricsService.store({
            //     timestamp: log.timestamp,
            //     path: log.url,
            //     method: log.method,
            //     responseTime: log.responseTime,
            //     statusCode: log.statusCode,
            //     organizationId: log.organizationId,
            // });
            // Example: Monitor slow requests
            if (log.responseTime > 1000) {
                this.logger.warn(`Slow Request [${log.correlationId}]: ${log.method} ${log.url} took ${log.responseTime}ms`);
            }
            // Example: Monitor error rates
            if (log.statusCode >= 500) {
                // Alert if error rate exceeds threshold
                // await this.alertingService.checkErrorRate(log.url);
            }
        }
        catch (error) {
            this.logger.error('Failed to store metrics', error);
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
// Usage in AppModule:
/*
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
*/ 
//# sourceMappingURL=logger.middleware.js.map