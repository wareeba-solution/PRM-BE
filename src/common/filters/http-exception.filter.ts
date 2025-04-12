// src/common/filters/http-exception.filter.ts

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error: string;
    path: string;
    timestamp: string;
    method: string;
    correlationId?: string;
}

// Define a proper type for HttpException response object
interface HttpExceptionResponse {
    message: string | string[];
    error?: string;
    statusCode?: number;
    [key: string]: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Check if headers are already sent to prevent "Cannot set headers after they are sent" error
        if (response.headersSent) {
            this.logger.error(`Headers already sent, cannot send exception response for ${request.method} ${request.url}`);
            return;
        }

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Internal server error';
        let error = 'Internal Server Error';

        // Handle different types of exceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse() as HttpExceptionResponse;

            if (typeof errorResponse === 'object' && 'message' in errorResponse) {
                message = errorResponse.message;
                error = errorResponse.error || this.getErrorName(status);
            } else {
                message = exception.message;
                error = this.getErrorName(status);
            }
        } else if (exception instanceof QueryFailedError) {
            // Handle database errors
            status = HttpStatus.BAD_REQUEST;
            message = 'Database operation failed';
            error = 'Database Error';

            // Check for unique constraint violations
            if ((exception.message as string).includes('duplicate key')) {
                message = 'A record with this value already exists';
                error = 'Duplicate Entry';
            }

            // Check for specific database errors - column not found errors
            if ((exception.message as string).includes('column') && (exception.message as string).includes('does not exist')) {
                const match = (exception.message as string).match(/column ["']?([^"']+)["']? of relation ["']?([^"']+)["']?/);
                if (match) {
                    const [, column, table] = match;
                    message = `Database schema error: column "${column}" does not exist in table "${table}"`;
                }
            }
        } else if (exception instanceof Error) {
            message = exception.message;

            // Special handling for common errors
            if (exception.name === 'TypeError' && exception.message.includes('headers')) {
                this.logger.error('Headers-related error:', exception);
                message = 'A request handling error occurred';
            }
        }

        // Create the error response
        const errorResponse: ErrorResponse = {
            statusCode: status,
            message,
            error,
            path: request.url,
            timestamp: new Date().toISOString(),
            method: request.method,
            correlationId: request.headers['x-correlation-id'] as string,
        };

        // Log the error with useful context
        this.logError(errorResponse, exception, request);

        try {
            // Send the response
            response
                .status(status)
                .json(errorResponse);
        } catch (sendError) {
            // Handle errors that occur while sending the response
            this.logger.error(
                `Failed to send error response: ${sendError instanceof Error ? sendError.message : 'Unknown error'}`,
                sendError instanceof Error ? sendError.stack : undefined
            );
        }
    }

    private getErrorName(status: number): string {
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

    private logError(errorResponse: ErrorResponse, exception: unknown, request: Request) {
        const tenant = request['tenantId'] ? `tenant: ${request['tenantId']}` : 'no tenant';

        // Fix the user property access to avoid TypeScript errors
        let userInfo = 'unauthenticated';
        if (request['user'] && typeof request['user'] === 'object' && 'id' in request['user']) {
            userInfo = `user: ${request['user'].id}`;
        }

        const logMessage = {
            ...errorResponse,
            stack: exception instanceof Error ? exception.stack : undefined,
            context: `${tenant}, ${userInfo}`,
            headers: this.sanitizeHeaders(request.headers),
        };

        if (errorResponse.statusCode >= 500) {
            this.logger.error(`Server error for ${request.method} ${request.url}`, JSON.stringify(logMessage));
        } else {
            this.logger.warn(`Client error for ${request.method} ${request.url}`, JSON.stringify(logMessage));
        }
    }

    private sanitizeHeaders(headers: Record<string, any>): Record<string, any> {
        // Create a sanitized copy of headers, removing sensitive information
        const sanitized = { ...headers };
        if (sanitized.authorization) sanitized.authorization = 'REDACTED';
        if (sanitized.cookie) sanitized.cookie = 'REDACTED';
        return sanitized;
    }
}