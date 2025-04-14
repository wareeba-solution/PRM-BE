"use strict";
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
var AttachOrgMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachOrgMiddleware = void 0;
// src/common/middleware/attach-org.middleware.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../../modules/organizations/entities/organization.entity");
const common_2 = require("@nestjs/common");
let AttachOrgMiddleware = AttachOrgMiddleware_1 = class AttachOrgMiddleware {
    constructor(organizationRepo) {
        this.organizationRepo = organizationRepo;
        this.logger = new common_2.Logger(AttachOrgMiddleware_1.name);
    }
    async use(req, res, next) {
        try {
            if (req.user && req.user.organizationId) {
                const org = await this.organizationRepo.findOne({
                    where: { id: req.user.organizationId },
                    select: ['id', 'name', 'status', 'subscriptionTier', 'isSubscriptionActive']
                });
                if (org) {
                    req.organization = org;
                }
            }
        }
        catch (error) {
            this.logger.error(`Error attaching organization: ${error.message}`);
            // Continue even if org attach fails
        }
        next();
    }
};
AttachOrgMiddleware = AttachOrgMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttachOrgMiddleware);
exports.AttachOrgMiddleware = AttachOrgMiddleware;
//# sourceMappingURL=attach-org.middleware.js.map