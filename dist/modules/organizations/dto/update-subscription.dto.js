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
exports.UpdateSubscriptionDto = exports.FeatureLimitsDto = exports.BillingDetailsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const organization_entity_1 = require("../entities/organization.entity");
class BillingDetailsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { billingEmail: { required: false, type: () => String }, billingAddress: { required: false, type: () => String }, taxId: { required: false, type: () => String }, paymentMethod: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "billingEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "billingAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "paymentMethod", void 0);
exports.BillingDetailsDto = BillingDetailsDto;
class FeatureLimitsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { maxProjects: { required: false, type: () => Number, minimum: 0 }, maxTeams: { required: false, type: () => Number, minimum: 0 }, maxIntegrations: { required: false, type: () => Number, minimum: 0 }, maxCustomFields: { required: false, type: () => Number, minimum: 0 }, maxApiCalls: { required: false, type: () => Number, minimum: 0 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxProjects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxTeams", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxIntegrations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxCustomFields", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxApiCalls", void 0);
exports.FeatureLimitsDto = FeatureLimitsDto;
class UpdateSubscriptionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tier: { required: true, enum: require("../enums/subscription-tier.enum").SubscriptionTier }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String }, maxUsers: { required: true, type: () => Number, minimum: 1, maximum: 10000 }, maxStorage: { required: true, type: () => Number, minimum: 1 }, autoRenew: { required: false, type: () => Boolean }, isTrial: { required: false, type: () => Boolean }, trialEndDate: { required: false, type: () => String }, billingDetails: { required: false, type: () => require("./update-subscription.dto").BillingDetailsDto }, featureLimits: { required: false, type: () => require("./update-subscription.dto").FeatureLimitsDto }, billingCycle: { required: false, type: () => Number, minimum: 1, maximum: 12 }, pricePerUser: { required: false, type: () => Number, minimum: 0 }, basePrice: { required: false, type: () => Number, minimum: 0 }, discountPercentage: { required: false, type: () => Number, minimum: 0, maximum: 100 }, features: { required: false, type: () => ({ customDomain: { required: false, type: () => Boolean }, ssoEnabled: { required: false, type: () => Boolean }, apiAccess: { required: false, type: () => Boolean }, advancedReporting: { required: false, type: () => Boolean }, customBranding: { required: false, type: () => Boolean }, prioritySupport: { required: false, type: () => Boolean }, dataExport: { required: false, type: () => Boolean }, auditLogs: { required: false, type: () => Boolean } }) }, customization: { required: false, type: () => ({ theme: { required: false, type: () => String }, modules: { required: false, type: () => [String] }, restrictions: { required: false, type: () => [String] }, customFields: { required: false, type: () => [Object] } }) }, supportLevel: { required: false, type: () => Object }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: organization_entity_1.SubscriptionTier, description: 'Subscription tier level' }),
    (0, class_validator_1.IsEnum)(organization_entity_1.SubscriptionTier),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "tier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subscription start date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subscription end date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum number of users allowed' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "maxUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximum storage in MB' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "maxStorage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Auto-renewal enabled' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSubscriptionDto.prototype, "autoRenew", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trial period enabled' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSubscriptionDto.prototype, "isTrial", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Trial end date' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "trialEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BillingDetailsDto),
    __metadata("design:type", BillingDetailsDto)
], UpdateSubscriptionDto.prototype, "billingDetails", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FeatureLimitsDto),
    __metadata("design:type", FeatureLimitsDto)
], UpdateSubscriptionDto.prototype, "featureLimits", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Billing cycle in months' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "billingCycle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Price per user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "pricePerUser", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Base price for subscription' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Discount percentage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom features enabled' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional customization options' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "customization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Support level included' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE']),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "supportLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "metadata", void 0);
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
//# sourceMappingURL=update-subscription.dto.js.map