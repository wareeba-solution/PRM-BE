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
exports.MergeContactsResponseDto = exports.MergeContactsDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/merge-contacts.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const gender_enum_1 = require("../enums/gender.enum");
const marital_status_enum_1 = require("../enums/marital-status.enum");
const update_contact_dto_1 = require("./update-contact.dto");
class MergeContactsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { primaryContactId: { required: true, type: () => String, format: "uuid" }, secondaryContactId: { required: true, type: () => String }, secondaryContactIds: { required: true, type: () => [String], format: "uuid", minItems: 1 }, firstName: { required: false, type: () => String, minLength: 2, maxLength: 50 }, lastName: { required: false, type: () => String, minLength: 2, maxLength: 50 }, email: { required: false, type: () => String, format: "email" }, phone: { required: false, type: () => String }, whatsapp: { required: false, type: () => String }, dateOfBirth: { required: false, type: () => Date }, gender: { required: false, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, address: { required: false, type: () => require("./update-contact.dto").UpdateContactAddressDto }, emergencyContact: { required: false, type: () => require("./update-contact.dto").UpdateEmergencyContactDto }, medicalInfo: { required: false, type: () => require("./update-contact.dto").UpdateMedicalInfoDto }, insuranceInfo: { required: false, type: () => require("./update-contact.dto").UpdateInsuranceInfoDto }, communicationPrefs: { required: false, type: () => require("./update-contact.dto").UpdateCommunicationPrefsDto }, notes: { required: false, type: () => String, maxLength: 500 }, documents: { required: false, type: () => [String], format: "uri" }, tags: { required: false, type: () => [String] }, groups: { required: false, type: () => [String] }, keepHistory: { required: false, type: () => Boolean }, deleteSecondaryContacts: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Primary contact ID that will be kept' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "primaryContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Secondary contact IDs that will be merged into the primary contact', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "secondaryContactIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], MergeContactsDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: gender_enum_1.Gender }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(gender_enum_1.Gender),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: marital_status_enum_1.MaritalStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_contact_dto_1.UpdateContactAddressDto),
    __metadata("design:type", update_contact_dto_1.UpdateContactAddressDto)
], MergeContactsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_contact_dto_1.UpdateEmergencyContactDto),
    __metadata("design:type", update_contact_dto_1.UpdateEmergencyContactDto)
], MergeContactsDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_contact_dto_1.UpdateMedicalInfoDto),
    __metadata("design:type", update_contact_dto_1.UpdateMedicalInfoDto)
], MergeContactsDto.prototype, "medicalInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_contact_dto_1.UpdateInsuranceInfoDto),
    __metadata("design:type", update_contact_dto_1.UpdateInsuranceInfoDto)
], MergeContactsDto.prototype, "insuranceInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_contact_dto_1.UpdateCommunicationPrefsDto),
    __metadata("design:type", update_contact_dto_1.UpdateCommunicationPrefsDto)
], MergeContactsDto.prototype, "communicationPrefs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], MergeContactsDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MergeContactsDto.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to keep the history of the merged contacts' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MergeContactsDto.prototype, "keepHistory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether to delete the secondary contacts after merging' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MergeContactsDto.prototype, "deleteSecondaryContacts", void 0);
exports.MergeContactsDto = MergeContactsDto;
class MergeContactsResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, mergedContactIds: { required: true, type: () => [String] }, mergedAt: { required: true, type: () => Date }, mergedBy: { required: true, type: () => String } };
    }
}
exports.MergeContactsResponseDto = MergeContactsResponseDto;
//# sourceMappingURL=merge-contacts.dto.js.map