"use strict";
// src/common/middleware/logger.middleware.ts
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var chalk = require("chalk");
var LoggerMiddleware = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoggerMiddleware = _classThis = /** @class */ (function () {
        function LoggerMiddleware_1() {
            this.logger = new common_1.Logger('HTTP');
        }
        LoggerMiddleware_1.prototype.use = function (request, response, next) {
            var _this = this;
            var _a, _b;
            var ip = request.ip, method = request.method, url = request.originalUrl;
            var userAgent = request.get('user-agent') || '';
            var correlationId = (0, uuid_1.v4)();
            var startTime = Date.now();
            // Add correlation ID to request headers
            request.headers['x-correlation-id'] = correlationId;
            // Prepare log object
            var requestLog = {
                correlationId: correlationId,
                timestamp: new Date().toISOString(),
                method: method,
                url: url,
                userAgent: userAgent,
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
            response.on('finish', function () {
                var statusCode = response.statusCode;
                var contentLength = response.get('content-length');
                var responseTime = Date.now() - startTime;
                requestLog.statusCode = statusCode;
                requestLog.responseTime = responseTime;
                _this.logResponse(__assign(__assign({}, requestLog), { contentLength: contentLength, statusCode: statusCode, responseTime: responseTime }));
                // Store metrics if needed
                _this.storeMetrics(requestLog);
            });
            // Handle errors
            response.on('error', function (error) {
                requestLog.error = error;
                _this.logError(requestLog);
            });
            next();
        };
        LoggerMiddleware_1.prototype.getClientIp = function (request) {
            var forwardedFor = request.headers['x-forwarded-for'];
            if (forwardedFor) {
                return Array.isArray(forwardedFor)
                    ? forwardedFor[0]
                    : forwardedFor.split(',')[0];
            }
            return request.ip || ''; // Add fallback empty string in case ip is undefined
        };
        LoggerMiddleware_1.prototype.sanitizeRequestBody = function (body) {
            if (!body)
                return body;
            var sensitiveFields = ['password', 'token', 'secret', 'creditCard'];
            var sanitized = __assign({}, body);
            for (var _i = 0, sensitiveFields_1 = sensitiveFields; _i < sensitiveFields_1.length; _i++) {
                var field = sensitiveFields_1[_i];
                if (field in sanitized) {
                    sanitized[field] = '***';
                }
            }
            return sanitized;
        };
        LoggerMiddleware_1.prototype.logRequest = function (log) {
            var message = chalk.blue("Incoming Request") +
                chalk.gray(" [".concat(log.correlationId, "]")) +
                "\n  ".concat(chalk.green(log.method), " ").concat(log.url) +
                "\n  User-Agent: ".concat(log.userAgent) +
                "\n  IP: ".concat(log.ip);
            this.logger.log(message);
            if (log.requestBody) {
                this.logger.debug("Request Body: ".concat(JSON.stringify(log.requestBody)));
            }
        };
        LoggerMiddleware_1.prototype.logResponse = function (log) {
            var statusColor = this.getStatusColor(log.statusCode);
            var message = chalk.blue("Response Sent") +
                chalk.gray(" [".concat(log.correlationId, "]")) +
                "\n  ".concat(log.method, " ").concat(log.url) +
                "\n  Status: ".concat(statusColor(log.statusCode)) +
                "\n  Time: ".concat(log.responseTime, "ms") +
                (log.contentLength ? "\n  Size: ".concat(log.contentLength, "b") : '');
            if (log.statusCode >= 400) {
                this.logger.warn(message);
            }
            else {
                this.logger.log(message);
            }
        };
        LoggerMiddleware_1.prototype.logError = function (log) {
            var message = chalk.red("Error in Request") +
                chalk.gray(" [".concat(log.correlationId, "]")) +
                "\n  ".concat(log.method, " ").concat(log.url) +
                "\n  Error: ".concat(log.error.message);
            this.logger.error(message, log.error.stack);
        };
        LoggerMiddleware_1.prototype.getStatusColor = function (status) {
            if (status >= 500)
                return chalk.red;
            if (status >= 400)
                return chalk.yellow;
            if (status >= 300)
                return chalk.cyan;
            if (status >= 200)
                return chalk.green;
            return chalk.gray;
        };
        LoggerMiddleware_1.prototype.storeMetrics = function (log) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
                            this.logger.warn("Slow Request [".concat(log.correlationId, "]: ").concat(log.method, " ").concat(log.url, " took ").concat(log.responseTime, "ms"));
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
                    return [2 /*return*/];
                });
            });
        };
        return LoggerMiddleware_1;
    }());
    __setFunctionName(_classThis, "LoggerMiddleware");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoggerMiddleware = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoggerMiddleware = _classThis;
}();
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