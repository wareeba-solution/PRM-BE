var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsBoolean, IsString, IsObject, Min, Max, ValidateNested, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { SubscriptionTier } from '../entities/organization.entity';
export class BillingDetailsDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "billingEmail", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "billingAddress", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "taxId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], BillingDetailsDto.prototype, "paymentMethod", void 0);
export class FeatureLimitsDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxProjects", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxTeams", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxIntegrations", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxCustomFields", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], FeatureLimitsDto.prototype, "maxApiCalls", void 0);
export class UpdateSubscriptionDto {
}
__decorate([
    ApiProperty({ enum: SubscriptionTier, description: 'Subscription tier level' }),
    IsEnum(SubscriptionTier),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "tier", void 0);
__decorate([
    ApiProperty({ description: 'Subscription start date' }),
    IsDateString(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "startDate", void 0);
__decorate([
    ApiProperty({ description: 'Subscription end date' }),
    IsDateString(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "endDate", void 0);
__decorate([
    ApiProperty({ description: 'Maximum number of users allowed' }),
    IsInt(),
    Min(1),
    Max(10000),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "maxUsers", void 0);
__decorate([
    ApiProperty({ description: 'Maximum storage in MB' }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "maxStorage", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Auto-renewal enabled' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateSubscriptionDto.prototype, "autoRenew", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Trial period enabled' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateSubscriptionDto.prototype, "isTrial", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Trial end date' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "trialEndDate", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => BillingDetailsDto),
    __metadata("design:type", BillingDetailsDto)
], UpdateSubscriptionDto.prototype, "billingDetails", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => FeatureLimitsDto),
    __metadata("design:type", FeatureLimitsDto)
], UpdateSubscriptionDto.prototype, "featureLimits", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Billing cycle in months' }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(12),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "billingCycle", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Price per user' }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "pricePerUser", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Base price for subscription' }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "basePrice", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Discount percentage' }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "discountPercentage", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom features enabled' }),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "features", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Additional customization options' }),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "customization", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Support level included' }),
    IsOptional(),
    IsEnum(['BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE']),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "supportLevel", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], UpdateSubscriptionDto.prototype, "metadata", void 0);
//# sourceMappingURL=update-subscription.dto.js.map