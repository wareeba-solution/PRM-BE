"use strict";
// src/common/filters/http-exception.filter.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        // Check if headers are already sent to prevent "Cannot set headers after they are sent" error
        if (response.headersSent) {
            this.logger.error(`Headers already sent, cannot send exception response for ${request.method} ${request.url}`);
            return;
        }
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        // Handle different types of exceptions
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            if (typeof errorResponse === 'object' && 'message' in errorResponse) {
                message = errorResponse.message;
                error = errorResponse.error || this.getErrorName(status);
            }
            else {
                message = exception.message;
                error = this.getErrorName(status);
            }
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            // Handle database errors
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Database operation failed';
            error = 'Database Error';
            // Check for unique constraint violations
            if (exception.message.includes('duplicate key')) {
                message = 'A record with this value already exists';
                error = 'Duplicate Entry';
            }
            // Check for specific database errors - column not found errors
            if (exception.message.includes('column') && exception.message.includes('does not exist')) {
                const match = exception.message.match(/column ["']?([^"']+)["']? of relation ["']?([^"']+)["']?/);
                if (match) {
                    const [, column, table] = match;
                    message = `Database schema error: column "${column}" does not exist in table "${table}"`;
                }
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
            // Special handling for common errors
            if (exception.name === 'TypeError' && exception.message.includes('headers')) {
                this.logger.error('Headers-related error:', exception);
                message = 'A request handling error occurred';
            }
        }
        // Create the error response
        const errorResponse = {
            statusCode: status,
            message,
            error,
            path: request.url,
            timestamp: new Date().toISOString(),
            method: request.method,
            correlationId: request.headers['x-correlation-id'],
        };
        // Log the error with useful context
        this.logError(errorResponse, exception, request);
        try {
            // Send the response
            response
                .status(status)
                .json(errorResponse);
        }
        catch (sendError) {
            // Handle errors that occur while sending the response
            this.logger.error(`Failed to send error response: ${sendError instanceof Error ? sendError.message : 'Unknown error'}`, sendError instanceof Error ? sendError.stack : undefined);
        }
    }
    getErrorName(status) {
        switch (status) {
            case common_1.HttpStatus.BAD_REQUEST:
                return 'Bad Request';
            case common_1.HttpStatus.UNAUTHORIZED:
                return 'Unauthorized';
            case common_1.HttpStatus.FORBIDDEN:
                return 'Forbidden';
            case common_1.HttpStatus.NOT_FOUND:
                return 'Not Found';
            case common_1.HttpStatus.CONFLICT:
                return 'Conflict';
            case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                return 'Unprocessable Entity';
            case common_1.HttpStatus.TOO_MANY_REQUESTS:
                return 'Too Many Requests';
            case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
            case common_1.HttpStatus.BAD_GATEWAY:
                return 'Bad Gateway';
            case common_1.HttpStatus.SERVICE_UNAVAILABLE:
                return 'Service Unavailable';
            default:
                return 'Error';
        }
    }
    logError(errorResponse, exception, request) {
        const tenant = request['tenantId'] ? `tenant: ${request['tenantId']}` : 'no tenant';
        // Fix the user property access to avoid TypeScript errors
        let userInfo = 'unauthenticated';
        if (request['user'] && typeof request['user'] === 'object' && 'id' in request['user']) {
            userInfo = `user: ${request['user'].id}`;
        }
        const logMessage = Object.assign(Object.assign({}, errorResponse), { stack: exception instanceof Error ? exception.stack : undefined, context: `${tenant}, ${userInfo}`, headers: this.sanitizeHeaders(request.headers) });
        if (errorResponse.statusCode >= 500) {
            this.logger.error(`Server error for ${request.method} ${request.url}`, JSON.stringify(logMessage));
        }
        else {
            this.logger.warn(`Client error for ${request.method} ${request.url}`, JSON.stringify(logMessage));
        }
    }
    sanitizeHeaders(headers) {
        // Create a sanitized copy of headers, removing sensitive information
        const sanitized = Object.assign({}, headers);
        if (sanitized.authorization)
            sanitized.authorization = 'REDACTED';
        if (sanitized.cookie)
            sanitized.cookie = 'REDACTED';
        return sanitized;
    }
};
HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map