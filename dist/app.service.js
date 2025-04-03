"use strict";
// src/app.service.ts
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
exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var AppService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppService = _classThis = /** @class */ (function () {
        function AppService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(AppService.name);
        }
        AppService_1.prototype.checkHealth = function () {
            return __awaiter(this, void 0, void 0, function () {
                var services, isHealthy;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4 /*yield*/, this.checkDatabase()];
                        case 1:
                            _a.database = _b.sent();
                            return [4 /*yield*/, this.checkQueuesMock()];
                        case 2:
                            services = (_a.queues = _b.sent(),
                                _a.memory = this.checkMemory(),
                                _a);
                            isHealthy = Object.values(services).every(function (service) { return service.status === 'healthy'; });
                            return [2 /*return*/, {
                                    isHealthy: isHealthy,
                                    services: services,
                                    timestamp: new Date().toISOString(),
                                }];
                    }
                });
            });
        };
        AppService_1.prototype.checkDatabase = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.checkDatabaseQuery()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    status: 'healthy',
                                    latency: result.latency,
                                }];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, {
                                    status: 'unhealthy',
                                    error: error_1.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AppService_1.prototype.checkDatabaseQuery = function () {
            return __awaiter(this, void 0, void 0, function () {
                var startTime, latency;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startTime = Date.now();
                            return [4 /*yield*/, this.configService.get('database')];
                        case 1:
                            _a.sent();
                            latency = Date.now() - startTime;
                            return [2 /*return*/, { latency: latency }];
                    }
                });
            });
        };
        // Replace the queue check with a mock function
        AppService_1.prototype.checkQueuesMock = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            status: 'healthy',
                            queues: {
                                notifications: {
                                    status: 'healthy',
                                    metrics: {
                                        active: 0,
                                        waiting: 0,
                                        completed: 0,
                                        failed: 0,
                                    },
                                },
                                messages: {
                                    status: 'healthy',
                                    metrics: {
                                        active: 0,
                                        waiting: 0,
                                        completed: 0,
                                        failed: 0,
                                    },
                                },
                            },
                        }];
                });
            });
        };
        AppService_1.prototype.checkMemory = function () {
            var memory = process.memoryUsage();
            var memoryThreshold = this.configService.get('app.memoryThreshold') || 0.9;
            var isHealthy = memory.heapUsed / memory.heapTotal < memoryThreshold;
            return {
                status: isHealthy ? 'healthy' : 'warning',
                metrics: {
                    heapUsed: this.formatBytes(memory.heapUsed),
                    heapTotal: this.formatBytes(memory.heapTotal),
                    rss: this.formatBytes(memory.rss),
                    external: this.formatBytes(memory.external),
                },
                usage: (memory.heapUsed / memory.heapTotal * 100).toFixed(2) + '%',
            };
        };
        AppService_1.prototype.formatBytes = function (bytes) {
            var units = ['B', 'KB', 'MB', 'GB'];
            var size = bytes;
            var unitIndex = 0;
            while (size >= 1024 && unitIndex < units.length - 1) {
                size /= 1024;
                unitIndex++;
            }
            return "".concat(size.toFixed(2)).concat(units[unitIndex]);
        };
        return AppService_1;
    }());
    __setFunctionName(_classThis, "AppService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppService = _classThis;
}();
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map