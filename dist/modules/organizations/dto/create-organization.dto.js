var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, IsOptional, IsEnum, IsObject, ValidateNested, IsArray, IsPhoneNumber, MaxLength, MinLength, Matches, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var OrganizationType;
(function (OrganizationType) {
    OrganizationType["HOSPITAL"] = "HOSPITAL";
    OrganizationType["CLINIC"] = "CLINIC";
    OrganizationType["PRACTICE"] = "PRACTICE";
    OrganizationType["LABORATORY"] = "LABORATORY";
    OrganizationType["PHARMACY"] = "PHARMACY";
    OrganizationType["OTHER"] = "OTHER";
})(OrganizationType || (OrganizationType = {}));
export var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["STARTER"] = "STARTER";
    SubscriptionPlan["PROFESSIONAL"] = "PROFESSIONAL";
    SubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlan || (SubscriptionPlan = {}));
export class Address {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
export class Contact {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], Contact.prototype, "position", void 0);
__decorate([
    ApiProperty(),
    IsEmail(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
export class CreateOrganizationDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(2),
    MaxLength(100),
    Matches(/^[a-zA-Z0-9\s\-_]+$/),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ enum: OrganizationType }),
    IsEnum(OrganizationType),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "description", void 0);
__decorate([
    ApiProperty(),
    IsEmail(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    Matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "domain", void 0);
__decorate([
    ApiProperty(),
    ValidateNested(),
    Type(() => Address),
    __metadata("design:type", Address)
], CreateOrganizationDto.prototype, "address", void 0);
__decorate([
    ApiProperty(),
    ValidateNested(),
    Type(() => Contact),
    __metadata("design:type", Contact)
], CreateOrganizationDto.prototype, "primaryContact", void 0);
__decorate([
    ApiPropertyOptional({ type: [Contact] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => Contact),
    __metadata("design:type", Array)
], CreateOrganizationDto.prototype, "additionalContacts", void 0);
__decorate([
    ApiProperty({ enum: SubscriptionPlan }),
    IsEnum(SubscriptionPlan),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "subscriptionPlan", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "taxId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "registrationNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "licenseNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateOrganizationDto.prototype, "settings", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateOrganizationDto.prototype, "metadata", void 0);
//# sourceMappingURL=create-organization.dto.js.map