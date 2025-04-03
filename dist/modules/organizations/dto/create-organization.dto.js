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
exports.CreateOrganizationDto = exports.Contact = exports.Address = exports.SubscriptionPlan = exports.OrganizationType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/organizations/dto/create-organization.dto.ts
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["HOSPITAL"] = "HOSPITAL";
    OrganizationType["CLINIC"] = "CLINIC";
    OrganizationType["PRACTICE"] = "PRACTICE";
    OrganizationType["LABORATORY"] = "LABORATORY";
    OrganizationType["PHARMACY"] = "PHARMACY";
    OrganizationType["OTHER"] = "OTHER";
})(OrganizationType = exports.OrganizationType || (exports.OrganizationType = {}));
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["STARTER"] = "STARTER";
    SubscriptionPlan["PROFESSIONAL"] = "PROFESSIONAL";
    SubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlan = exports.SubscriptionPlan || (exports.SubscriptionPlan = {}));
class Address {
    static _OPENAPI_METADATA_FACTORY() {
        return { street: { required: true, type: () => String, maxLength: 100 }, city: { required: true, type: () => String, maxLength: 100 }, state: { required: true, type: () => String, maxLength: 100 }, postalCode: { required: true, type: () => String, maxLength: 20 }, country: { required: true, type: () => String, maxLength: 100 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
exports.Address = Address;
class Contact {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 100 }, position: { required: true, type: () => String, maxLength: 100 }, email: { required: true, type: () => String, format: "email" }, phone: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], Contact.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
exports.Contact = Contact;
class CreateOrganizationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 100, pattern: "/^[a-zA-Z0-9\\s\\-_]+$/" }, type: { required: true, enum: require("./create-organization.dto").OrganizationType }, description: { required: false, type: () => String, maxLength: 200 }, email: { required: true, type: () => String, format: "email" }, phone: { required: true, type: () => String }, domain: { required: false, type: () => String, pattern: "/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$/" }, address: { required: true, type: () => require("./create-organization.dto").Address }, primaryContact: { required: true, type: () => require("./create-organization.dto").Contact }, additionalContacts: { required: false, type: () => [require("./create-organization.dto").Contact] }, subscriptionPlan: { required: true, enum: require("./create-organization.dto").SubscriptionPlan }, taxId: { required: false, type: () => String, maxLength: 50 }, registrationNumber: { required: false, type: () => String, maxLength: 50 }, licenseNumber: { required: false, type: () => String, maxLength: 50 }, settings: { required: false, type: () => ({ timezone: { required: false, type: () => String }, dateFormat: { required: false, type: () => String }, timeFormat: { required: false, type: () => String }, currency: { required: false, type: () => String }, language: { required: false, type: () => String }, notificationSettings: { required: false, type: () => ({ email: { required: false, type: () => Boolean }, sms: { required: false, type: () => Boolean }, push: { required: false, type: () => Boolean } }) }, branding: { required: false, type: () => ({ logo: { required: false, type: () => String }, colors: { required: false, type: () => ({ primary: { required: false, type: () => String }, secondary: { required: false, type: () => String } }) } }) } }) }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-_]+$/),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: OrganizationType }),
    (0, class_validator_1.IsEnum)(OrganizationType),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Address),
    __metadata("design:type", Address)
], CreateOrganizationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Contact),
    __metadata("design:type", Contact)
], CreateOrganizationDto.prototype, "primaryContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Contact] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Contact),
    __metadata("design:type", Array)
], CreateOrganizationDto.prototype, "additionalContacts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SubscriptionPlan }),
    (0, class_validator_1.IsEnum)(SubscriptionPlan),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "subscriptionPlan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOrganizationDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOrganizationDto.prototype, "metadata", void 0);
exports.CreateOrganizationDto = CreateOrganizationDto;
//# sourceMappingURL=create-organization.dto.js.map