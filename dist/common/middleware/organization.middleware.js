"use strict";
// src/common/middleware/organization.middleware.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrganizationMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../../modules/organizations/entities/organization.entity");
let OrganizationMiddleware = OrganizationMiddleware_1 = class OrganizationMiddleware {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
        this.logger = new common_1.Logger(OrganizationMiddleware_1.name);
    }
    async use(req, res, next) {
        try {
            // Add more debugging to trace the flow
            this.logger.debug(`OrganizationMiddleware running for: ${req.method} ${req.url}`);
            this.logger.debug(`User in request: ${req.user ? 'Yes' : 'No'}`);
            if (req.user && req.user.organizationId) {
                this.logger.debug(`Loading organization for ID: ${req.user.organizationId}`);
                // Try a simpler findOne first for debugging
                const organization = await this.organizationRepository.findOne({
                    where: { id: req.user.organizationId }
                });
                if (organization) {
                    this.logger.debug(`Organization found: ${organization.id}`);
                    // Attach organization to request
                    req.organization = organization;
                }
                else {
                    this.logger.warn(`Organization not found for ID: ${req.user.organizationId}`);
                }
            }
            else if (req.headers.authorization) {
                // If the request has an auth header but no user, maybe the middleware ran before JWT auth
                this.logger.warn('Auth header present but no user. Middleware might be running before JWT auth.');
            }
            next();
        }
        catch (error) {
            this.logger.error(`Error in organization middleware: ${error.message}`);
            // Continue even if there's an error, let the controllers handle missing organization
            next();
        }
    }
};
OrganizationMiddleware = OrganizationMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganizationMiddleware);
exports.OrganizationMiddleware = OrganizationMiddleware;
//# sourceMappingURL=organization.middleware.js.map