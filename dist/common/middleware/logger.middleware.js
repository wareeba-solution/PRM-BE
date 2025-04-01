var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as chalk from 'chalk';
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new Logger('HTTP');
    }
    use(request, response, next) {
        var _a, _b;
        const { ip, method, originalUrl: url } = request;
        const userAgent = request.get('user-agent') || '';
        const correlationId = uuidv4();
        const startTime = Date.now();
        request.headers['x-correlation-id'] = correlationId;
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
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            requestLog.requestBody = this.sanitizeRequestBody(request.body);
        }
        this.logRequest(requestLog);
        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const responseTime = Date.now() - startTime;
            requestLog.statusCode = statusCode;
            requestLog.responseTime = responseTime;
            this.logResponse(Object.assign(Object.assign({}, requestLog), { contentLength,
                statusCode,
                responseTime }));
            this.storeMetrics(requestLog);
        });
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
        return request.ip || '';
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
            if (log.responseTime > 1000) {
                this.logger.warn(`Slow Request [${log.correlationId}]: ${log.method} ${log.url} took ${log.responseTime}ms`);
            }
            if (log.statusCode >= 500) {
            }
        }
        catch (error) {
            this.logger.error('Failed to store metrics', error);
        }
    }
};
LoggerMiddleware = __decorate([
    Injectable()
], LoggerMiddleware);
export { LoggerMiddleware };
//# sourceMappingURL=logger.middleware.js.map