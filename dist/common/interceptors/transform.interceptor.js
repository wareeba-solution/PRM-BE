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
import { Injectable, HttpStatus, } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode || HttpStatus.OK;
        return next.handle().pipe(map(data => {
            if (data === null || data === undefined) {
                return this.buildResponse(null, status, request);
            }
            const transformedData = this.transformData(data);
            if (this.isPaginatedResponse(transformedData)) {
                return this.buildPaginatedResponse(transformedData, status, request);
            }
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
        if (data && typeof data === 'object') {
            return classToPlain(data, {
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
            case HttpStatus.OK:
                return 'Success';
            case HttpStatus.CREATED:
                return 'Created successfully';
            case HttpStatus.ACCEPTED:
                return 'Request accepted';
            case HttpStatus.NO_CONTENT:
                return 'No content';
            case HttpStatus.PARTIAL_CONTENT:
                return 'Partial content';
            default:
                return 'Operation completed';
        }
    }
};
TransformInterceptor = __decorate([
    Injectable()
], TransformInterceptor);
export { TransformInterceptor };
//# sourceMappingURL=transform.interceptor.js.map