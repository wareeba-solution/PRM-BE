var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsBoolean, IsDateString, IsArray, IsInt, Min, Max, IsIn, ValidateNested, IsEmail, IsPhoneNumber, } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';
export var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["PROVIDER"] = "PROVIDER";
    ContactType["STAFF"] = "STAFF";
    ContactType["VENDOR"] = "VENDOR";
    ContactType["OTHER"] = "OTHER";
})(ContactType || (ContactType = {}));
export var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
export var SortField;
(function (SortField) {
    SortField["FIRST_NAME"] = "firstName";
    SortField["LAST_NAME"] = "lastName";
    SortField["EMAIL"] = "email";
    SortField["PHONE"] = "phone";
    SortField["DATE_OF_BIRTH"] = "dateOfBirth";
    SortField["CREATED_AT"] = "createdAt";
    SortField["UPDATED_AT"] = "updatedAt";
})(SortField || (SortField = {}));
export class DateRangeDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Start date for filtering' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "from", void 0);
__decorate([
    ApiPropertyOptional({ description: 'End date for filtering' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], DateRangeDto.prototype, "to", void 0);
export class ContactQueryDto {
}
__decorate([
    ApiPropertyOptional({
        description: 'Search term to look in firstName, lastName, email, and phone',
        example: 'john',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Type of contact',
        enum: ContactType,
        example: ContactType.PATIENT,
    }),
    IsOptional(),
    IsEnum(ContactType),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by gender',
        enum: Gender,
    }),
    IsOptional(),
    IsEnum(Gender),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by marital status',
        enum: MaritalStatus,
    }),
    IsOptional(),
    IsEnum(MaritalStatus),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "maritalStatus", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by blood group',
        enum: BloodGroup,
    }),
    IsOptional(),
    IsEnum(BloodGroup),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "bloodGroup", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by active status',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "isActive", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by specific tags',
        type: [String],
        example: ['vip', 'recurring'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by group IDs',
        type: [String],
        example: ['group1', 'group2'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "groups", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by creation date range',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "createdAt", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by update date range',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "updatedAt", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by date of birth range',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => DateRangeDto),
    __metadata("design:type", DateRangeDto)
], ContactQueryDto.prototype, "dateOfBirth", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by city',
        example: 'New York',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "city", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by state',
        example: 'NY',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "state", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by country',
        example: 'USA',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "country", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by postal code',
        example: '10001',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "postalCode", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by email',
        example: 'john.doe@example.com',
    }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by phone number',
        example: '+1234567890',
    }),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by insurance provider',
        example: 'Blue Cross',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "insuranceProvider", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by medical conditions',
        type: [String],
        example: ['diabetes', 'hypertension'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "medicalConditions", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by allergies',
        type: [String],
        example: ['penicillin', 'peanuts'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], ContactQueryDto.prototype, "allergies", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by created by user ID',
        example: 'user123',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "createdBy", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Filter by updated by user ID',
        example: 'user123',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "updatedBy", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Page number for pagination',
        minimum: 1,
        default: 1,
        example: 1,
    }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 10,
        example: 20,
    }),
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Field to sort by',
        enum: SortField,
        default: SortField.CREATED_AT,
    }),
    IsOptional(),
    IsIn(Object.values(SortField)),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "sortBy", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Sort order',
        enum: SortOrder,
        default: SortOrder.DESC,
    }),
    IsOptional(),
    IsIn(Object.values(SortOrder)),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "sortOrder", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Include inactive contacts in results',
        default: false,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "includeInactive", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Include contacts with upcoming appointments',
        default: false,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasUpcomingAppointments", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only include contacts with recent activity',
        example: 30,
    }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ContactQueryDto.prototype, "recentActivityDays", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only include contacts with specific communication preferences',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "allowsEmail", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only include contacts that allow SMS',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "allowsSMS", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only include contacts with documents',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasDocuments", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Only include contacts with medical history',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], ContactQueryDto.prototype, "hasMedicalHistory", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Preferred language for filtering',
        example: 'en',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ContactQueryDto.prototype, "preferredLanguage", void 0);
//# sourceMappingURL=contact-query.dto.js.map