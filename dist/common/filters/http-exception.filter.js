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
        }
        else if (exception instanceof Error) {
            message = exception.message;
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
        // Log the error
        this.logError(errorResponse, exception);
        // Send the response
        response
            .status(status)
            .json(errorResponse);
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
    logError(errorResponse, exception) {
        const logMessage = Object.assign(Object.assign({}, errorResponse), { stack: exception instanceof Error ? exception.stack : undefined });
        if (errorResponse.statusCode >= 500) {
            this.logger.error(JSON.stringify(logMessage));
        }
        else {
            this.logger.warn(JSON.stringify(logMessage));
        }
        // If you're using error monitoring service like Sentry
        // Sentry.captureException(exception, {
        //     extra: errorResponse,
        //     tags: {
        //         path: errorResponse.path,
        //         method: errorResponse.method,
        //     },
        // });
    }
};
HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
// Example usage in main.ts:
/*
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // Apply the filter globally
    app.useGlobalFilters(new HttpExceptionFilter());
    
    await app.listen(3000);
}
*/
// Example custom exceptions:
/*
export class ValidationException extends HttpException {
    constructor(message: string | string[]) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                error: 'Validation Error',
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}

export class NotFoundException extends HttpException {
    constructor(resource: string) {
        super(
            {
                statusCode: HttpStatus.NOT_FOUND,
                message: `${resource} not found`,
                error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
*/ 
//# sourceMappingURL=http-exception.filter.js.map