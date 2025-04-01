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
import { IsString, IsEmail, IsPhoneNumber, IsDate, IsEnum, IsOptional, IsBoolean, MinLength, MaxLength, ValidateNested, IsArray, IsUrl, IsNotEmpty, } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';
export class ContactAddressDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(100),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "street", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "street2", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "city", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "state", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(20),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "postalCode", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "country", void 0);
export class EmergencyContactDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "relationship", void 0);
__decorate([
    ApiProperty(),
    IsPhoneNumber(),
    IsNotEmpty(),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "email", void 0);
export class MedicalInfoDto {
}
__decorate([
    ApiPropertyOptional({ enum: BloodGroup }),
    IsOptional(),
    IsEnum(BloodGroup),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "bloodGroup", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "allergies", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "medications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "conditions", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "surgicalHistory", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "familyHistory", void 0);
export class InsuranceInfoDto {
}
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "provider", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "policyNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "groupNumber", void 0);
__decorate([
    ApiProperty(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], InsuranceInfoDto.prototype, "validFrom", void 0);
__decorate([
    ApiProperty(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], InsuranceInfoDto.prototype, "validTo", void 0);
export class CommunicationPrefsDto {
    constructor() {
        this.allowEmail = true;
        this.allowSMS = true;
        this.allowWhatsApp = true;
        this.allowPush = true;
    }
}
__decorate([
    ApiProperty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowEmail", void 0);
__decorate([
    ApiProperty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowSMS", void 0);
__decorate([
    ApiProperty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowWhatsApp", void 0);
__decorate([
    ApiProperty(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowPush", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CommunicationPrefsDto.prototype, "preferredLanguage", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CommunicationPrefsDto.prototype, "preferredContactTime", void 0);
export class CreateContactDto {
}
__decorate([
    ApiProperty({
        description: 'First name of the contact',
        example: 'John',
    }),
    IsString(),
    IsNotEmpty(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], CreateContactDto.prototype, "firstName", void 0);
__decorate([
    ApiProperty({
        description: 'Last name of the contact',
        example: 'Doe',
    }),
    IsString(),
    IsNotEmpty(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], CreateContactDto.prototype, "lastName", void 0);
__decorate([
    ApiProperty({
        description: 'Email address',
        example: 'john.doe@example.com',
    }),
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    ApiProperty({
        description: 'Phone number',
        example: '+1234567890',
    }),
    IsPhoneNumber(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'WhatsApp number',
        example: '+1234567890',
    }),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "whatsapp", void 0);
__decorate([
    ApiProperty({
        description: 'Date of birth',
        example: '1990-01-01',
    }),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], CreateContactDto.prototype, "dateOfBirth", void 0);
__decorate([
    ApiProperty({
        description: 'Gender',
        enum: Gender,
    }),
    IsEnum(Gender),
    __metadata("design:type", String)
], CreateContactDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Marital status',
        enum: MaritalStatus,
    }),
    IsOptional(),
    IsEnum(MaritalStatus),
    __metadata("design:type", String)
], CreateContactDto.prototype, "maritalStatus", void 0);
__decorate([
    ApiProperty({
        description: 'Contact address',
    }),
    ValidateNested(),
    Type(() => ContactAddressDto),
    __metadata("design:type", ContactAddressDto)
], CreateContactDto.prototype, "address", void 0);
__decorate([
    ApiProperty({
        description: 'Emergency contact information',
    }),
    ValidateNested(),
    Type(() => EmergencyContactDto),
    __metadata("design:type", EmergencyContactDto)
], CreateContactDto.prototype, "emergencyContact", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Medical information',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => MedicalInfoDto),
    __metadata("design:type", MedicalInfoDto)
], CreateContactDto.prototype, "medicalInfo", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Insurance information',
    }),
    IsOptional(),
    ValidateNested(),
    Type(() => InsuranceInfoDto),
    __metadata("design:type", InsuranceInfoDto)
], CreateContactDto.prototype, "insuranceInfo", void 0);
__decorate([
    ApiProperty({
        description: 'Communication preferences',
    }),
    ValidateNested(),
    Type(() => CommunicationPrefsDto),
    __metadata("design:type", CommunicationPrefsDto)
], CreateContactDto.prototype, "communicationPrefs", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional notes',
    }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateContactDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Document URLs',
        type: [String],
    }),
    IsOptional(),
    IsUrl({}, { each: true }),
    IsArray(),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "documents", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Contact tags',
        type: [String],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Contact group IDs',
        type: [String],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "groups", void 0);
export class CreateContactResponseDto {
}
//# sourceMappingURL=create-contact.dto.js.map