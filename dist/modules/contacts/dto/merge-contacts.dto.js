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
import { IsNotEmpty, IsString, IsUUID, IsArray, IsOptional, IsEmail, IsPhoneNumber, IsDate, IsEnum, IsBoolean, MinLength, MaxLength, ValidateNested, IsUrl, ArrayMinSize, } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { UpdateContactAddressDto, UpdateEmergencyContactDto, UpdateMedicalInfoDto, UpdateInsuranceInfoDto, UpdateCommunicationPrefsDto } from './update-contact.dto';
export class MergeContactsDto {
}
__decorate([
    ApiProperty({ description: 'Primary contact ID that will be kept' }),
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "primaryContactId", void 0);
__decorate([
    ApiProperty({ description: 'Secondary contact IDs that will be merged into the primary contact', type: [String] }),
    IsArray(),
    IsUUID('4', { each: true }),
    ArrayMinSize(1),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "secondaryContactIds", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "firstName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "lastName", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsPhoneNumber(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "whatsapp", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], MergeContactsDto.prototype, "dateOfBirth", void 0);
__decorate([
    ApiPropertyOptional({ enum: Gender }),
    IsOptional(),
    IsEnum(Gender),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({ enum: MaritalStatus }),
    IsOptional(),
    IsEnum(MaritalStatus),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "maritalStatus", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateContactAddressDto),
    __metadata("design:type", UpdateContactAddressDto)
], MergeContactsDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateEmergencyContactDto),
    __metadata("design:type", UpdateEmergencyContactDto)
], MergeContactsDto.prototype, "emergencyContact", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateMedicalInfoDto),
    __metadata("design:type", UpdateMedicalInfoDto)
], MergeContactsDto.prototype, "medicalInfo", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateInsuranceInfoDto),
    __metadata("design:type", UpdateInsuranceInfoDto)
], MergeContactsDto.prototype, "insuranceInfo", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    ValidateNested(),
    Type(() => UpdateCommunicationPrefsDto),
    __metadata("design:type", UpdateCommunicationPrefsDto)
], MergeContactsDto.prototype, "communicationPrefs", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUrl({}, { each: true }),
    IsArray(),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "documents", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString({ each: true }),
    IsArray(),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "groups", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to keep the history of the merged contacts' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MergeContactsDto.prototype, "keepHistory", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Whether to delete the secondary contacts after merging' }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MergeContactsDto.prototype, "deleteSecondaryContacts", void 0);
export class MergeContactsResponseDto {
}
//# sourceMappingURL=merge-contacts.dto.js.map