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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = exports.SubscriptionTier = exports.OrganizationStatus = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("../../tickets/entities/ticket.entity");
const organization_status_enum_1 = require("../enums/organization-status.enum");
Object.defineProperty(exports, "OrganizationStatus", { enumerable: true, get: function () { return organization_status_enum_1.OrganizationStatus; } });
const subscription_tier_enum_1 = require("../enums/subscription-tier.enum");
Object.defineProperty(exports, "SubscriptionTier", { enumerable: true, get: function () { return subscription_tier_enum_1.SubscriptionTier; } });
let Organization = class Organization {
    get isActive() {
        return this.status === organization_status_enum_1.OrganizationStatus.ACTIVE;
    }
    get isPremium() {
        return this.subscriptionTier === subscription_tier_enum_1.SubscriptionTier.PROFESSIONAL || this.subscriptionTier === subscription_tier_enum_1.SubscriptionTier.ENTERPRISE;
    }
    get isEnterprise() {
        return this.subscriptionTier === subscription_tier_enum_1.SubscriptionTier.ENTERPRISE;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, slug: { required: true, type: () => String }, logo: { required: true, type: () => String }, domain: { required: true, type: () => String }, isDomainVerified: { required: true, type: () => Boolean }, status: { required: true, enum: require("../enums/organization-status.enum").OrganizationStatus }, subscriptionTier: { required: true, enum: require("../enums/subscription-tier.enum").SubscriptionTier }, subscriptionStartDate: { required: true, type: () => Date }, subscriptionEndDate: { required: true, type: () => Date }, isSubscriptionActive: { required: true, type: () => Boolean }, settings: { required: true, type: () => ({ ticketPriorities: { required: false, type: () => [String] }, ticketCategories: { required: false, type: () => [String] }, customFields: { required: false, type: () => [Object] }, notificationSettings: { required: false, type: () => Object }, brandingSettings: { required: false, type: () => Object } }) }, maxUsers: { required: true, type: () => Number }, maxStorage: { required: true, type: () => Number }, createdById: { required: true, type: () => String }, updatedById: { required: true, type: () => String }, createdBy: { required: true, type: () => require("../../users/entities/user.entity").User }, updatedBy: { required: true, type: () => require("../../users/entities/user.entity").User }, users: { required: true, type: () => [require("../../users/entities/user.entity").User] }, tickets: { required: true, type: () => [require("../../tickets/entities/ticket.entity").Ticket] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date }, metadata: { required: true, type: () => ({ industry: { required: false, type: () => String }, size: { required: false, type: () => String }, location: { required: false, type: () => String }, timezone: { required: false, type: () => String }, customAttributes: { required: false, type: () => Object } }) }, contactInfo: { required: true, type: () => ({ email: { required: false, type: () => String }, phone: { required: false, type: () => String }, address: { required: false, type: () => ({ street: { required: false, type: () => String }, city: { required: false, type: () => String }, state: { required: false, type: () => String }, country: { required: false, type: () => String }, postalCode: { required: false, type: () => String } }) } }) }, allowedDomains: { required: true, type: () => [String] }, isEmailVerificationRequired: { required: true, type: () => Boolean }, isTwoFactorAuthRequired: { required: true, type: () => Boolean }, auditConfig: { required: true, type: () => ({ enableAuditLog: { required: false, type: () => Boolean }, retentionPeriod: { required: false, type: () => Number }, logLevel: { required: false, type: () => String } }) } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Organization.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isDomainVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: organization_status_enum_1.OrganizationStatus,
        default: organization_status_enum_1.OrganizationStatus.PENDING
    }),
    __metadata("design:type", String)
], Organization.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: subscription_tier_enum_1.SubscriptionTier,
        default: subscription_tier_enum_1.SubscriptionTier.FREE
    }),
    __metadata("design:type", String)
], Organization.prototype, "subscriptionTier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "subscriptionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "maxUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "maxStorage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "updatedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Organization.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Organization.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.organization, { lazy: true }),
    __metadata("design:type", Promise)
], Organization.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.Ticket, ticket => ticket.organization, { lazy: true }),
    __metadata("design:type", Promise)
], Organization.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "contactInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Organization.prototype, "allowedDomains", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isEmailVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isTwoFactorAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "auditConfig", void 0);
Organization = __decorate([
    (0, typeorm_1.Entity)('organizations'),
    (0, typeorm_1.Index)(['domain']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['subscriptionTier'])
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=organization.entity.js.map