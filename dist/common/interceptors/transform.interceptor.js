"use strict";
// src/common/interceptors/transform.interceptor.ts
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var class_transformer_1 = require("class-transformer");
var TransformInterceptor = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransformInterceptor = _classThis = /** @class */ (function () {
        function TransformInterceptor_1() {
        }
        TransformInterceptor_1.prototype.intercept = function (context, next) {
            var _this = this;
            var request = context.switchToHttp().getRequest();
            var response = context.switchToHttp().getResponse();
            var status = response.statusCode || common_1.HttpStatus.OK;
            return next.handle().pipe((0, operators_1.map)(function (data) {
                // Handle null or undefined data
                if (data === null || data === undefined) {
                    return _this.buildResponse(null, status, request);
                }
                // Transform class instances to plain objects
                var transformedData = _this.transformData(data);
                // Handle paginated responses
                if (_this.isPaginatedResponse(transformedData)) {
                    return _this.buildPaginatedResponse(transformedData, status, request);
                }
                // Handle regular responses
                return _this.buildResponse(transformedData, status, request);
            }));
        };
        TransformInterceptor_1.prototype.buildResponse = function (data, status, request, paginationMeta) {
            return {
                statusCode: status,
                message: this.getStatusMessage(status),
                data: data,
                metadata: __assign({ timestamp: new Date().toISOString(), path: request.url, version: process.env.API_VERSION || '1.0' }, (paginationMeta && { pagination: paginationMeta })),
            };
        };
        TransformInterceptor_1.prototype.buildPaginatedResponse = function (data, status, request) {
            var items = data.items, paginationMeta = __rest(data, ["items"]);
            return this.buildResponse(items, status, request, paginationMeta);
        };
        TransformInterceptor_1.prototype.transformData = function (data) {
            // Transform class instances to plain objects
            if (data && typeof data === 'object') {
                return (0, class_transformer_1.classToPlain)(data, {
                    excludePrefixes: ['_'],
                    enableCircularCheck: true,
                });
            }
            return data;
        };
        TransformInterceptor_1.prototype.isPaginatedResponse = function (data) {
            return (data &&
                Array.isArray(data.items) &&
                typeof data.page === 'number' &&
                typeof data.limit === 'number' &&
                typeof data.total === 'number' &&
                typeof data.totalPages === 'number');
        };
        TransformInterceptor_1.prototype.getStatusMessage = function (status) {
            switch (status) {
                case common_1.HttpStatus.OK:
                    return 'Success';
                case common_1.HttpStatus.CREATED:
                    return 'Created successfully';
                case common_1.HttpStatus.ACCEPTED:
                    return 'Request accepted';
                case common_1.HttpStatus.NO_CONTENT:
                    return 'No content';
                case common_1.HttpStatus.PARTIAL_CONTENT:
                    return 'Partial content';
                default:
                    return 'Operation completed';
            }
        };
        return TransformInterceptor_1;
    }());
    __setFunctionName(_classThis, "TransformInterceptor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransformInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransformInterceptor = _classThis;
}();
exports.TransformInterceptor = TransformInterceptor;
// Example custom transformers:
/*
export class ExcludeNullTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => this.excludeNull(data)),
        );
    }

    private excludeNull(value: any): any {
        if (Array.isArray(value)) {
            return value.map(item => this.excludeNull(item));
        }
        if (value !== null && typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value)
                    .filter(([_, v]) => v !== null)
                    .map(([k, v]) => [k, this.excludeNull(v)])
            );
        }
        return value;
    }
}

export class DateTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => this.transformDates(data)),
        );
    }

    private transformDates(value: any): any {
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (Array.isArray(value)) {
            return value.map(item => this.transformDates(item));
        }
        if (value !== null && typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value).map(([k, v]) => [k, this.transformDates(v)])
            );
        }
        return value;
    }
}
*/
// Example usage in a controller:
/*
@Controller('api/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
    @Get()
    async findAll(): Promise<PaginatedResponse<User>> {
        const users = await this.usersService.findAll();
        return {
            items: users,
            page: 1,
            limit: 10,
            total: 100,
            totalPages: 10
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }
}
*/ 
//# sourceMappingURL=transform.interceptor.js.map