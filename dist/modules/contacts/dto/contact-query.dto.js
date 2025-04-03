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
exports.ContactQueryDto = exports.DateRangeDto = exports.SortField = exports.SortOrder = exports.ContactType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/contact-query.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const gender_enum_1 = require("../enums/gender.enum");
const marital_status_enum_1 = require("../enums/marital-status.enum");
const blood_group_enum_1 = require("../enums/blood-group.enum");
var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["PROVIDER"] = "PROVIDER";
    ContactType["STAFF"] = "STAFF";
    ContactType["VENDOR"] = "VENDOR";
    ContactType["OTHER"] = "OTHER";
})(ContactType = exports.ContactType || (exports.ContactType = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var SortField;
(function (SortField) {
    SortField["FIRST_NAME"] = "firstName";
    SortField["LAST_NAME"] = "lastName";
    SortField["EMAIL"] = "email";
    SortField["PHONE"] = "phone";
    SortField["DATE_OF_BIRTH"] = "dateOfBirth";
    SortField["CREATED_AT"] = "createdAt";
    SortField["UPDATED_AT"] = "updatedAt";
})(SortField = exports.SortField || (exports.SortField = {}));
class DateRangeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { from: { required: false, type: () => String }, to: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filtering' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date for filtering' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "to", void 0);
exports.DateRangeDto = DateRangeDto;
class ContactQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String }, type: { required: false, enum: require("./contact-query.dto").ContactType }, gender: { required: false, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, bloodGroup: { required: false, enum: require("../enums/blood-group.enum").BloodGroup }, isActive: { required: false, type: () => Boolean }, tags: { required: false, type: () => [String] }, groups: { required: false, type: () => [String] }, createdAt: { required: false, type: () => require("./contact-query.dto").DateRangeDto }, updatedAt: { required: false, type: () => require("./contact-query.dto").DateRangeDto }, dateOfBirth: { required: false, type: () => require("./contact-query.dto").DateRangeDto }, city: { required: false, type: () => String }, state: { required: false, type: () => String }, country: { required: false, type: () => String }, postalCode: { required: false, type: () => String }, email: { required: false, type: () => String, format: "email" }, phone: { required: false, type: () => String }, insuranceProvider: { required: false, type: () => String }, medicalConditions: { required: false, type: () => [String] }, allergies: { required: false, type: () => [String] }, createdBy: { required: false, type: () => String }, updatedBy: { required: false, type: () => String }, page: { required: false, type: () => Number, minimum: 1 }, limit: { required: false, type: () => Number, minimum: 1, maximum: 100 }, sortBy: { required: false, enum: require("./contact-query.dto").SortField, enum: Object.values(SortField) }, sortOrder: { required: false, enum: require("./contact-query.dto").SortOrder, enum: Object.values(SortOrder) }, includeInactive: { required: false, type: () => Boolean }, hasUpcomingAppointments: { required: false, type: () => Boolean }, recentActivityDays: { required: false, type: () => Number, minimum: 1 }, allowsEmail: { required: false, type: () => Boolean }, allowsSMS: { required: false, type: () => Boolean }, hasDocuments: { required: false, type: () => Boolean }, hasMedicalHistory: { required: false, type: () => Boolean }, preferredLanguage: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search term to look in firstName, lastName, email, and phone',
        example: 'john',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of contact',
        enum: ContactType,
        example: ContactType.PATIENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ContactType),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by gender',
        enum: gender_enum_1.Gender,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by marital status',
        enum: marital_status_enum_1.MaritalStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by blood group',
        enum: blood_group_enum_1.BloodGroup,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by active status',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by specific tags',
        type: [String],
        example: ['vip', 'recurring'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by group IDs',
        type: [String],
        example: ['group1', 'group2'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by creation date range',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by update date range',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by date of birth range',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by city',
        example: 'New York',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by state',
        example: 'NY',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by country',
        example: 'USA',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by postal code',
        example: '10001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by email',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by insurance provider',
        example: 'Blue Cross',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "insuranceProvider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by medical conditions',
        type: [String],
        example: ['diabetes', 'hypertension'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "medicalConditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by allergies',
        type: [String],
        example: ['penicillin', 'peanuts'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by created by user ID',
        example: 'user123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by updated by user ID',
        example: 'user123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number for pagination',
        minimum: 1,
        default: 1,
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 10,
        example: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Field to sort by',
        enum: SortField,
        default: SortField.CREATED_AT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(SortField)),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: SortOrder,
        default: SortOrder.DESC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(SortOrder)),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Include inactive contacts in results',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "includeInactive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Include contacts with upcoming appointments',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasUpcomingAppointments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only include contacts with recent activity',
        example: 30, // Last 30 days
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "recentActivityDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only include contacts with specific communication preferences',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "allowsEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only include contacts that allow SMS',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "allowsSMS", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only include contacts with documents',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasDocuments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only include contacts with medical history',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasMedicalHistory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Preferred language for filtering',
        example: 'en',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "preferredLanguage", void 0);
exports.ContactQueryDto = ContactQueryDto;
//# sourceMappingURL=contact-query.dto.js.map