var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
import { Catch, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        if (exception instanceof HttpException) {
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
        else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Database operation failed';
            error = 'Database Error';
            if (exception.message.includes('duplicate key')) {
                message = 'A record with this value already exists';
                error = 'Duplicate Entry';
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        const errorResponse = {
            statusCode: status,
            message,
            error,
            path: request.url,
            timestamp: new Date().toISOString(),
            method: request.method,
            correlationId: request.headers['x-correlation-id'],
        };
        this.logError(errorResponse, exception);
        response
            .status(status)
            .json(errorResponse);
    }
    getErrorName(status) {
        switch (status) {
            case HttpStatus.BAD_REQUEST:
                return 'Bad Request';
            case HttpStatus.UNAUTHORIZED:
                return 'Unauthorized';
            case HttpStatus.FORBIDDEN:
                return 'Forbidden';
            case HttpStatus.NOT_FOUND:
                return 'Not Found';
            case HttpStatus.CONFLICT:
                return 'Conflict';
            case HttpStatus.UNPROCESSABLE_ENTITY:
                return 'Unprocessable Entity';
            case HttpStatus.TOO_MANY_REQUESTS:
                return 'Too Many Requests';
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
            case HttpStatus.BAD_GATEWAY:
                return 'Bad Gateway';
            case HttpStatus.SERVICE_UNAVAILABLE:
                return 'Service Unavailable';
            default:
                return 'Error';
        }
    }
    logError(errorResponse, exception) {
        const logMessage = Object.assign(Object.assign({}, errorResponse), { stack: exception instanceof Error ? exception.stack : undefined });
        if (errorResponse.statusCode >= 500) {
            this.logger.error(JSON.stringify(logMessage));
        }
        else {
            this.logger.warn(JSON.stringify(logMessage));
        }
    }
};
HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    Catch()
], HttpExceptionFilter);
export { HttpExceptionFilter };
//# sourceMappingURL=http-exception.filter.js.map