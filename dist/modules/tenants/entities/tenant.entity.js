"use strict";
// src/modules/tenants/entities/tenant.entity.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = exports.PlanType = exports.TenantStatus = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
var TenantStatus;
(function (TenantStatus) {
    TenantStatus["ACTIVE"] = "active";
    TenantStatus["INACTIVE"] = "inactive";
    TenantStatus["SUSPENDED"] = "suspended";
    TenantStatus["PENDING"] = "pending";
})(TenantStatus = exports.TenantStatus || (exports.TenantStatus = {}));
var PlanType;
(function (PlanType) {
    PlanType["BASIC"] = "basic";
    PlanType["PREMIUM"] = "premium";
    PlanType["ENTERPRISE"] = "enterprise";
})(PlanType = exports.PlanType || (exports.PlanType = {}));
let Tenant = class Tenant {
    // Helper methods
    get isActive() {
        return this.status === TenantStatus.ACTIVE;
    }
    get isPremium() {
        return this.planType === PlanType.PREMIUM || this.planType === PlanType.ENTERPRISE;
    }
    get isEnterprise() {
        return this.planType === PlanType.ENTERPRISE;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Tenant.prototype, "subdomain", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PlanType,
        default: PlanType.BASIC
    }),
    __metadata("design:type", String)
], Tenant.prototype, "planType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TenantStatus,
        default: TenantStatus.PENDING
    }),
    __metadata("design:type", String)
], Tenant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Tenant.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Tenant.prototype, "subscriptionEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 5 }),
    __metadata("design:type", Number)
], Tenant.prototype, "maxOrganizations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 10 }),
    __metadata("design:type", Number)
], Tenant.prototype, "maxUsersPerOrganization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1024 }),
    __metadata("design:type", Number)
], Tenant.prototype, "maxStoragePerOrganization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organization_entity_1.Organization, organization => organization.tenant, { lazy: true }),
    __metadata("design:type", Promise)
], Tenant.prototype, "organizations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tenant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Tenant.prototype, "deletedAt", void 0);
Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants'),
    (0, typeorm_1.Index)(['subdomain'], { unique: true }),
    (0, typeorm_1.Index)(['status'])
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.entity.js.map