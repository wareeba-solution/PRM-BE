"use strict";
// src/common/interceptors/transform.interceptor.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode || common_1.HttpStatus.OK;
        return next.handle().pipe((0, operators_1.map)(data => {
            // Handle null or undefined data
            if (data === null || data === undefined) {
                return this.buildResponse(null, status, request);
            }
            // Transform class instances to plain objects
            const transformedData = this.transformData(data);
            // Handle paginated responses
            if (this.isPaginatedResponse(transformedData)) {
                return this.buildPaginatedResponse(transformedData, status, request);
            }
            // Handle regular responses
            return this.buildResponse(transformedData, status, request);
        }));
    }
    buildResponse(data, status, request, paginationMeta) {
        return {
            statusCode: status,
            message: this.getStatusMessage(status),
            data,
            metadata: Object.assign({ timestamp: new Date().toISOString(), path: request.url, version: process.env.API_VERSION || '1.0' }, (paginationMeta && { pagination: paginationMeta })),
        };
    }
    buildPaginatedResponse(data, status, request) {
        const { items } = data, paginationMeta = __rest(data, ["items"]);
        return this.buildResponse(items, status, request, paginationMeta);
    }
    transformData(data) {
        // Transform class instances to plain objects
        if (data && typeof data === 'object') {
            return (0, class_transformer_1.classToPlain)(data, {
                excludePrefixes: ['_'],
                enableCircularCheck: true,
            });
        }
        return data;
    }
    isPaginatedResponse(data) {
        return (data &&
            Array.isArray(data.items) &&
            typeof data.page === 'number' &&
            typeof data.limit === 'number' &&
            typeof data.total === 'number' &&
            typeof data.totalPages === 'number');
    }
    getStatusMessage(status) {
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
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
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