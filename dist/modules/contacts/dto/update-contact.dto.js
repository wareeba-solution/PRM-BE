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
import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsDate, IsEnum, IsBoolean, MinLength, MaxLength, ValidateNested, IsArray, IsUrl, } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { BloodGroup } from '../enums/blood-group.enum';
export class UpdateContactAddressDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "street", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "street2", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "city", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "state", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "postalCode", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateContactAddressDto.prototype, "country", void 0);
export class UpdateEmergencyContactDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateEmergencyContactDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateEmergencyContactDto.prototype, "relationship", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], UpdateEmergencyContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], UpdateEmergencyContactDto.prototype, "email", void 0);
export class UpdateMedicalInfoDto {
}
__decorate([
    ApiPropertyOptional({ enum: BloodGroup }),
    IsOptional(),
    IsEnum(BloodGroup),
    __metadata("design:type", String)
], UpdateMedicalInfoDto.prototype, "bloodGroup", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateMedicalInfoDto.prototype, "allergies", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateMedicalInfoDto.prototype, "medications", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateMedicalInfoDto.prototype, "conditions", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateMedicalInfoDto.prototype, "surgicalHistory", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateMedicalInfoDto.prototype, "familyHistory", void 0);
export class UpdateInsuranceInfoDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateInsuranceInfoDto.prototype, "provider", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateInsuranceInfoDto.prototype, "policyNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateInsuranceInfoDto.prototype, "groupNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], UpdateInsuranceInfoDto.prototype, "validFrom", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], UpdateInsuranceInfoDto.prototype, "validTo", void 0);
export class UpdateCommunicationPrefsDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateCommunicationPrefsDto.prototype, "allowEmail", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateCommunicationPrefsDto.prototype, "allowSMS", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateCommunicationPrefsDto.prototype, "allowWhatsApp", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateCommunicationPrefsDto.prototype, "allowPush", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateCommunicationPrefsDto.prototype, "preferredLanguage", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateCommunicationPrefsDto.prototype, "preferredContactTime", void 0);
export class UpdateContactDto {
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "firstName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "lastName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "whatsapp", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], UpdateContactDto.prototype, "dateOfBirth", void 0);
__decorate([
    ApiPropertyOptional({ enum: Gender }),
    IsOptional(),
    IsEnum(Gender),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({ enum: MaritalStatus }),
    IsOptional(),
    IsEnum(MaritalStatus),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "maritalStatus", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateContactAddressDto),
    __metadata("design:type", UpdateContactAddressDto)
], UpdateContactDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateEmergencyContactDto),
    __metadata("design:type", UpdateEmergencyContactDto)
], UpdateContactDto.prototype, "emergencyContact", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateMedicalInfoDto),
    __metadata("design:type", UpdateMedicalInfoDto)
], UpdateContactDto.prototype, "medicalInfo", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateInsuranceInfoDto),
    __metadata("design:type", UpdateInsuranceInfoDto)
], UpdateContactDto.prototype, "insuranceInfo", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateCommunicationPrefsDto),
    __metadata("design:type", UpdateCommunicationPrefsDto)
], UpdateContactDto.prototype, "communicationPrefs", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUrl({}, { each: true }),
    IsArray(),
    __metadata("design:type", Array)
], UpdateContactDto.prototype, "documents", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], UpdateContactDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString({ each: true }),
    IsArray(),
    __metadata("design:type", Array)
], UpdateContactDto.prototype, "groups", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateContactDto.prototype, "isActive", void 0);
export class UpdateContactResponseDto {
}
//# sourceMappingURL=update-contact.dto.js.map