"use strict";
// // src/modules/tenants/middleware/tenant.middleware.ts
//
// import { Injectable, NestMiddleware, NotFoundException, Logger } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { TenantsService } from '../services/tenants.service';
// import { JwtService } from '@nestjs/jwt';
//
//
// declare global {
//   namespace Express {
//     interface Request {
//       tenantId?: string;
//       tenant?: any;
//     }
//   }
// }
//
// @Injectable()
// export class TenantMiddleware implements NestMiddleware {
//   private readonly logger = new Logger(TenantMiddleware.name);
//
//   constructor(private readonly tenantsService: TenantsService) {}
//
//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Skip tenant check for system-level routes
//       if (this.isSystemRoute(req.path)) {
//         this.logger.debug(`Skipping tenant check for system route: ${req.path}`);
//         return next();
//       }
//
//       // For authenticated non-auth routes, try to get tenant from JWT first
//       if (!this.isAuthRoute(req.path) && req.headers.authorization) {
//         if (req.headers.authorization.startsWith('Bearer ')) {
//           try {
//             const token = req.headers.authorization.substring(7);
//             const payload = this.jwtService.verify(token);
//
//             if (payload && payload.tenantId) {
//               this.logger.debug(`Using tenant from JWT: ${payload.tenantId}`);
//               const tenant = await this.tenantsService.findOne(payload.tenantId);
//
//               if (tenant && tenant.isActive) {
//                 req.tenantId = tenant.id;
//                 req.tenant = tenant;
//                 return next();
//               }
//             }
//           } catch (error) {
//             this.logger.debug(`Failed to extract tenant from JWT: ${error.message}`);
//             // Continue to other methods if JWT extraction fails
//           }
//         }
//       }
//
//       // For authentication routes, we need special handling
//       if (this.isAuthRoute(req.path)) {
//         this.logger.debug(`Processing auth route: ${req.path}`);
//         let tenant = null;
//
//         // First try X-Tenant-ID header (prioritize this)
//         const tenantIdHeader = req.headers['x-tenant-id'] as string;
//         if (tenantIdHeader) {
//           this.logger.debug(`Trying to find tenant by X-Tenant-ID header: ${tenantIdHeader}`);
//           try {
//             tenant = await this.tenantsService.findOne(tenantIdHeader);
//           } catch (err) {
//             this.logger.warn(`Failed to find tenant by header ID: ${tenantIdHeader}`, err);
//           }
//         }
//
//         // If still no tenant, try tenantId from request body
//         if (!tenant && req.body?.tenantId) {
//           this.logger.debug(`Trying to find tenant by body tenantId: ${req.body.tenantId}`);
//           try {
//             tenant = await this.tenantsService.findOne(req.body.tenantId);
//           } catch (err) {
//             this.logger.warn(`Failed to find tenant by body ID: ${req.body.tenantId}`, err);
//           }
//         }
//
//         if (!tenant || !tenant.isActive) {
//           this.logger.warn(`No valid tenant found for auth route: ${req.path}`);
//           // For auth routes, don't throw an exception - let the controller handle this
//           req.tenantId = null;
//           req.tenant = null;
//           return next();
//         }
//
//         this.logger.debug(`Setting tenant context: ${tenant.id} (${tenant.subdomain || 'no-subdomain'})`);
//         req.tenantId = tenant.id;
//         req.tenant = tenant;
//         return next();
//       }
//
//       // For non-auth routes without JWT, fallback to header
//       let tenant = null;
//
//       // Try X-Tenant-ID header
//       const tenantIdHeader = req.headers['x-tenant-id'] as string;
//       if (tenantIdHeader) {
//         try {
//           tenant = await this.tenantsService.findOne(tenantIdHeader);
//         } catch (err) {
//           this.logger.warn(`Failed to find tenant by header ID: ${tenantIdHeader}`, err);
//         }
//       }
//
//       // Validate tenant
//       if (!tenant) {
//         this.logger.warn(`No tenant found for request to ${req.path}`);
//         throw new NotFoundException('Tenant not found. Please provide a valid X-Tenant-ID header or use a valid JWT token.');
//       }
//
//       if (!tenant.isActive) {
//         this.logger.warn(`Inactive tenant access attempt: ${tenant.id}`);
//         throw new NotFoundException(`Tenant is inactive: ${tenant.id}`);
//       }
//
//       // Attach tenant info to request
//       req.tenantId = tenant.id;
//       req.tenant = tenant;
//
//       this.logger.debug(`Request to ${req.path} processed for tenant: ${tenant.id}`);
//       next();
//     } catch (error) {
//       this.logger.error(`Error processing tenant middleware for ${req.path}:`, error);
//       next(error);
//     }
//   }
//
//   private extractSubdomain(host: string): string | null {
//     try {
//       // Handle empty or invalid host
//       if (!host || typeof host !== 'string') {
//         this.logger.warn('Invalid host provided for subdomain extraction');
//         return null;
//       }
//
//       // Handle localhost and IP addresses
//       if (host.includes('localhost') || /\d+\.\d+\.\d+\.\d+/.test(host)) {
//         this.logger.debug(`Skipping subdomain extraction for localhost/IP: ${host}`);
//         return null;
//       }
//
//       // Remove port if present
//       const hostWithoutPort = host.split(':')[0];
//
//       // Split by dots and filter out empty parts
//       const parts = hostWithoutPort.split('.').filter(part => part.length > 0);
//
//       // We need at least 3 parts for a valid subdomain (e.g., tenant.example.com)
//       if (parts.length < 3) {
//         this.logger.debug(`No subdomain found in host: ${host}`);
//         return null;
//       }
//
//       // The subdomain is the first part
//       const subdomain = parts[0];
//
//       // Validate subdomain format
//       if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(subdomain)) {
//         this.logger.warn(`Invalid subdomain format: ${subdomain}`);
//         return null;
//       }
//
//       this.logger.debug(`Extracted subdomain: ${subdomain} from host: ${host}`);
//       return subdomain;
//     } catch (error) {
//       this.logger.error(`Error extracting subdomain from host: ${host}`, error);
//       return null;
//     }
//   }
//
//   private isSystemRoute(path: string): boolean {
//     // List of system-level routes that don't require tenant context
//     const systemRoutes = [
//       '/tenants', // Tenant management
//       '/tenant-onboarding', // Tenant onboarding
//       '/health', // Health checks
//       '/docs', // Swagger docs
//       '/api-docs', // Alternate docs path
//     ];
//
//     return systemRoutes.some(route => path.startsWith(route));
//   }
//
//   private isAuthRoute(path: string): boolean {
//     // List of authentication endpoints
//     const authEndpoints = [
//       '/login',
//       '/register',
//       '/forgot-password',
//       '/reset-password',
//       '/verify-email',
//     ];
//
//     // Check if path ends with any of the auth endpoints
//     return path.includes('/auth/') &&
//         authEndpoints.some(endpoint => path.endsWith(endpoint));
//   }
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TenantMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMiddleware = void 0;
// src/modules/tenants/middleware/tenant.middleware.ts
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("../services/tenants.service");
const jwt_1 = require("@nestjs/jwt");
let TenantMiddleware = TenantMiddleware_1 = class TenantMiddleware {
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
        this.logger = new common_1.Logger(TenantMiddleware_1.name);
        // Create JwtService instance with secret from environment
        this.jwtService = new jwt_1.JwtService({
            secret: process.env.JWT_SECRET
        });
    }
    async use(req, res, next) {
        var _a;
        try {
            // Skip tenant check for system-level routes
            if (this.isSystemRoute(req.path)) {
                this.logger.debug(`Skipping tenant check for system route: ${req.path}`);
                return next();
            }
            // For authenticated non-auth routes, try to get tenant from JWT first
            if (!this.isAuthRoute(req.path) && req.headers.authorization) {
                if (req.headers.authorization.startsWith('Bearer ')) {
                    try {
                        const token = req.headers.authorization.substring(7);
                        const payload = this.jwtService.verify(token);
                        if (payload && payload.tenantId) {
                            this.logger.debug(`Using tenant from JWT: ${payload.tenantId}`);
                            const tenant = await this.tenantsService.findOne(payload.tenantId);
                            if (tenant && tenant.isActive) {
                                req.tenantId = tenant.id;
                                req.tenant = tenant;
                                return next();
                            }
                        }
                    }
                    catch (error) {
                        this.logger.debug(`Failed to extract tenant from JWT: ${error.message}`);
                        // Continue to other methods if JWT extraction fails
                    }
                }
            }
            // For authentication routes, we need special handling
            if (this.isAuthRoute(req.path)) {
                this.logger.debug(`Processing auth route: ${req.path}`);
                let tenant = null;
                // First try X-Tenant-ID header (prioritize this)
                const tenantIdHeader = req.headers['x-tenant-id'];
                if (tenantIdHeader) {
                    this.logger.debug(`Trying to find tenant by X-Tenant-ID header: ${tenantIdHeader}`);
                    try {
                        tenant = await this.tenantsService.findOne(tenantIdHeader);
                    }
                    catch (err) {
                        this.logger.warn(`Failed to find tenant by header ID: ${tenantIdHeader}`, err);
                    }
                }
                // If still no tenant, try tenantId from request body
                if (!tenant && ((_a = req.body) === null || _a === void 0 ? void 0 : _a.tenantId)) {
                    this.logger.debug(`Trying to find tenant by body tenantId: ${req.body.tenantId}`);
                    try {
                        tenant = await this.tenantsService.findOne(req.body.tenantId);
                    }
                    catch (err) {
                        this.logger.warn(`Failed to find tenant by body ID: ${req.body.tenantId}`, err);
                    }
                }
                if (!tenant || !tenant.isActive) {
                    this.logger.warn(`No valid tenant found for auth route: ${req.path}`);
                    // For auth routes, don't throw an exception - let the controller handle this
                    req.tenantId = null;
                    req.tenant = null;
                    return next();
                }
                this.logger.debug(`Setting tenant context: ${tenant.id} (${tenant.subdomain || 'no-subdomain'})`);
                req.tenantId = tenant.id;
                req.tenant = tenant;
                return next();
            }
            // For non-auth routes without JWT, fallback to header
            let tenant = null;
            // Try X-Tenant-ID header
            const tenantIdHeader = req.headers['x-tenant-id'];
            if (tenantIdHeader) {
                try {
                    tenant = await this.tenantsService.findOne(tenantIdHeader);
                }
                catch (err) {
                    this.logger.warn(`Failed to find tenant by header ID: ${tenantIdHeader}`, err);
                }
            }
            // Validate tenant
            if (!tenant) {
                this.logger.warn(`No tenant found for request to ${req.path}`);
                throw new common_1.NotFoundException('Tenant not found. Please provide a valid X-Tenant-ID header or use a valid JWT token.');
            }
            if (!tenant.isActive) {
                this.logger.warn(`Inactive tenant access attempt: ${tenant.id}`);
                throw new common_1.NotFoundException(`Tenant is inactive: ${tenant.id}`);
            }
            // Attach tenant info to request
            req.tenantId = tenant.id;
            req.tenant = tenant;
            this.logger.debug(`Request to ${req.path} processed for tenant: ${tenant.id}`);
            next();
        }
        catch (error) {
            this.logger.error(`Error processing tenant middleware for ${req.path}:`, error);
            next(error);
        }
    }
    isSystemRoute(path) {
        // List of system-level routes that don't require tenant context
        const systemRoutes = [
            '/tenants',
            '/tenant-onboarding',
            '/health',
            '/docs',
            '/api-docs', // Alternate docs path
        ];
        return systemRoutes.some(route => path.startsWith(route));
    }
    isAuthRoute(path) {
        // List of authentication endpoints
        const authEndpoints = [
            '/login',
            '/register',
            '/forgot-password',
            '/reset-password',
            '/verify-email',
        ];
        // Check if path ends with any of the auth endpoints
        return path.includes('/auth/') &&
            authEndpoints.some(endpoint => path.endsWith(endpoint));
    }
};
TenantMiddleware = TenantMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantMiddleware);
exports.TenantMiddleware = TenantMiddleware;
//# sourceMappingURL=tenant.middleware.js.map