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
exports.OrganizationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
const organization_status_enum_1 = require("../../../modules/organizations/enums/organization-status.enum");
const subscription_tier_enum_1 = require("../../../modules/organizations/enums/subscription-tier.enum");
/**
 * Organization DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class OrganizationDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization name',
        example: 'Acme Healthcare',
        maxLength: 100
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization description',
        example: 'Leading healthcare provider in the region',
        maxLength: 255,
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization unique slug',
        example: 'acme-healthcare',
        maxLength: 100
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to organization logo',
        example: 'https://example.com/logo.png',
        maxLength: 255,
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization domain name',
        example: 'acmehealthcare.com',
        maxLength: 100,
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the domain has been verified',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isDomainVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization status',
        enum: organization_status_enum_1.OrganizationStatus,
        example: organization_status_enum_1.OrganizationStatus.ACTIVE,
        default: organization_status_enum_1.OrganizationStatus.PENDING,
        enumName: 'OrganizationStatus'
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization subscription tier',
        enum: subscription_tier_enum_1.SubscriptionTier,
        example: subscription_tier_enum_1.SubscriptionTier.PROFESSIONAL,
        default: subscription_tier_enum_1.SubscriptionTier.FREE,
        enumName: 'SubscriptionTier'
    }),
    __metadata("design:type", String)
], OrganizationDto.prototype, "subscriptionTier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription start date',
        example: '2023-01-01T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], OrganizationDto.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subscription end date',
        example: '2024-01-01T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], OrganizationDto.prototype, "subscriptionEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the subscription is currently active',
        example: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isSubscriptionActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization settings',
        example: {
            ticketPriorities: ['Low', 'Medium', 'High', 'Critical'],
            ticketCategories: ['Technical', 'Billing', 'General'],
            customFields: [
                { name: 'patientId', type: 'string', required: true }
            ],
            notificationSettings: {
                emailNotifications: true,
                smsNotifications: false
            },
            brandingSettings: {
                primaryColor: '#4A90E2',
                secondaryColor: '#50E3C2'
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], OrganizationDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of users allowed',
        example: 10,
        default: 0
    }),
    __metadata("design:type", Number)
], OrganizationDto.prototype, "maxUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum storage allowed in MB',
        example: 5000,
        default: 0
    }),
    __metadata("design:type", Number)
], OrganizationDto.prototype, "maxStorage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata about the organization',
        example: {
            industry: 'Healthcare',
            size: '50-100',
            location: 'New York',
            timezone: 'America/New_York'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], OrganizationDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization contact information',
        example: {
            email: 'contact@acmehealthcare.com',
            phone: '+1-555-123-4567',
            address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10001'
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], OrganizationDto.prototype, "contactInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of allowed email domains for auto-verification',
        example: ['acmehealthcare.com', 'acme-health.org'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], OrganizationDto.prototype, "allowedDomains", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether email verification is required for new users',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isEmailVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether two-factor authentication is required for users',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isTwoFactorAuthRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Audit log configuration',
        example: {
            enableAuditLog: true,
            retentionPeriod: 90,
            logLevel: 'info'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], OrganizationDto.prototype, "auditConfig", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the organization is active',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the organization has a premium subscription',
        example: true,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the organization has an enterprise subscription',
        example: false,
        readOnly: true
    }),
    __metadata("design:type", Boolean)
], OrganizationDto.prototype, "isEnterprise", void 0);
exports.OrganizationDto = OrganizationDto;
//# sourceMappingURL=organization.dto.js.map