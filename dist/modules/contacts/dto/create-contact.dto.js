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
exports.CreateContactResponseDto = exports.CreateContactDto = exports.CommunicationPrefsDto = exports.InsuranceInfoDto = exports.MedicalInfoDto = exports.EmergencyContactDto = exports.ContactAddressDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/create-contact.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const gender_enum_1 = require("../enums/gender.enum");
const marital_status_enum_1 = require("../enums/marital-status.enum");
const blood_group_enum_1 = require("../enums/blood-group.enum");
class ContactAddressDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { street: { required: true, type: () => String, maxLength: 100 }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, createdBy: { required: false }, street2: { required: false, type: () => String, maxLength: 100 }, city: { required: true, type: () => String, maxLength: 50 }, state: { required: true, type: () => String, maxLength: 50 }, postalCode: { required: true, type: () => String, maxLength: 20 }, country: { required: true, type: () => String, maxLength: 50 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "street2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContactAddressDto.prototype, "country", void 0);
exports.ContactAddressDto = ContactAddressDto;
class EmergencyContactDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 50 }, relationship: { required: true, type: () => String, maxLength: 50 }, phone: { required: true, type: () => String }, email: { required: false, type: () => String, format: "email" } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmergencyContactDto.prototype, "email", void 0);
exports.EmergencyContactDto = EmergencyContactDto;
class MedicalInfoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bloodGroup: { required: false, enum: require("../enums/blood-group.enum").BloodGroup }, allergies: { required: false, type: () => [String] }, medications: { required: false, type: () => [String] }, conditions: { required: false, type: () => [String] }, surgicalHistory: { required: false, type: () => String, maxLength: 1000 }, familyHistory: { required: false, type: () => String, maxLength: 1000 } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: blood_group_enum_1.BloodGroup }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "bloodGroup", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "medications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MedicalInfoDto.prototype, "conditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "surgicalHistory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], MedicalInfoDto.prototype, "familyHistory", void 0);
exports.MedicalInfoDto = MedicalInfoDto;
class InsuranceInfoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { provider: { required: true, type: () => String }, policyNumber: { required: true, type: () => String }, groupNumber: { required: false, type: () => String }, validFrom: { required: true, type: () => Date }, validTo: { required: true, type: () => Date } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "policyNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsuranceInfoDto.prototype, "groupNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InsuranceInfoDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InsuranceInfoDto.prototype, "validTo", void 0);
exports.InsuranceInfoDto = InsuranceInfoDto;
class CommunicationPrefsDto {
    constructor() {
        this.allowEmail = true;
        this.allowSMS = true;
        this.allowWhatsApp = true;
        this.allowPush = true;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { allowEmail: { required: true, type: () => Boolean, default: true }, allowSMS: { required: true, type: () => Boolean, default: true }, allowWhatsApp: { required: true, type: () => Boolean, default: true }, allowPush: { required: true, type: () => Boolean, default: true }, preferredLanguage: { required: false, type: () => String }, preferredContactTime: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowSMS", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowWhatsApp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CommunicationPrefsDto.prototype, "allowPush", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommunicationPrefsDto.prototype, "preferredLanguage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommunicationPrefsDto.prototype, "preferredContactTime", void 0);
exports.CommunicationPrefsDto = CommunicationPrefsDto;
class CreateContactDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String, minLength: 2, maxLength: 50 }, lastName: { required: true, type: () => String, minLength: 2, maxLength: 50 }, email: { required: true, type: () => String, format: "email" }, phone: { required: true, type: () => String }, whatsapp: { required: false, type: () => String }, dateOfBirth: { required: true, type: () => Date }, gender: { required: true, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, address: { required: true, type: () => require("./create-contact.dto").ContactAddressDto }, emergencyContact: { required: true, type: () => require("./create-contact.dto").EmergencyContactDto }, medicalInfo: { required: false, type: () => require("./create-contact.dto").MedicalInfoDto }, insuranceInfo: { required: false, type: () => require("./create-contact.dto").InsuranceInfoDto }, communicationPrefs: { required: true, type: () => require("./create-contact.dto").CommunicationPrefsDto }, notes: { required: false, type: () => String, maxLength: 500 }, documents: { required: false, type: () => [String], format: "uri" }, tags: { required: false, type: () => [String] }, groups: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the contact',
        example: 'John',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateContactDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the contact',
        example: 'Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateContactDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'WhatsApp number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '1990-01-01',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateContactDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender',
        enum: gender_enum_1.Gender,
    }),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], CreateContactDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Marital status',
        enum: marital_status_enum_1.MaritalStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus),
    __metadata("design:type", String)
], CreateContactDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact address',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ContactAddressDto),
    __metadata("design:type", ContactAddressDto)
], CreateContactDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emergency contact information',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EmergencyContactDto),
    __metadata("design:type", EmergencyContactDto)
], CreateContactDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Medical information',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MedicalInfoDto),
    __metadata("design:type", MedicalInfoDto)
], CreateContactDto.prototype, "medicalInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Insurance information',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => InsuranceInfoDto),
    __metadata("design:type", InsuranceInfoDto)
], CreateContactDto.prototype, "insuranceInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Communication preferences',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CommunicationPrefsDto),
    __metadata("design:type", CommunicationPrefsDto)
], CreateContactDto.prototype, "communicationPrefs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateContactDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Document URLs',
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact tags',
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact group IDs',
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateContactDto.prototype, "groups", void 0);
exports.CreateContactDto = CreateContactDto;
class CreateContactResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, createdBy: { required: true, type: () => String } };
    }
}
exports.CreateContactResponseDto = CreateContactResponseDto;
//# sourceMappingURL=create-contact.dto.js.map