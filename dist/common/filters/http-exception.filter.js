"use strict";
// src/common/filters/http-exception.filter.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var HttpExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpExceptionFilter = _classThis = /** @class */ (function () {
        function HttpExceptionFilter_1() {
            this.logger = new common_1.Logger(HttpExceptionFilter.name);
        }
        HttpExceptionFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            var request = ctx.getRequest();
            var status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            var message = 'Internal server error';
            var error = 'Internal Server Error';
            // Handle different types of exceptions
            if (exception instanceof common_1.HttpException) {
                status = exception.getStatus();
                var errorResponse_1 = exception.getResponse();
                if (typeof errorResponse_1 === 'object' && 'message' in errorResponse_1) {
                    message = errorResponse_1.message;
                    error = errorResponse_1.error || this.getErrorName(status);
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
            var errorResponse = {
                statusCode: status,
                message: message,
                error: error,
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
        };
        HttpExceptionFilter_1.prototype.getErrorName = function (status) {
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
        };
        HttpExceptionFilter_1.prototype.logError = function (errorResponse, exception) {
            var logMessage = __assign(__assign({}, errorResponse), { stack: exception instanceof Error ? exception.stack : undefined });
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
        };
        return HttpExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "HttpExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpExceptionFilter = _classThis;
}();
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