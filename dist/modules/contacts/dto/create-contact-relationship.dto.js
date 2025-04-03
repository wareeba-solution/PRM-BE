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
exports.ContactRelationshipResponseDto = exports.UpdateContactRelationshipDto = exports.CreateContactRelationshipDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/create-contact-relationship.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const contact_relationship_entity_1 = require("../entities/contact-relationship.entity");
class CreateContactRelationshipDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { relatedContactId: { required: true, type: () => String, format: "uuid" }, type: { required: true, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: () => String, maxLength: 500 }, isPrimary: { required: false, type: () => Boolean }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the related contact',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "relatedContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of relationship',
        enum: contact_relationship_entity_1.RelationshipType,
        example: contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT,
    }),
    (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Inverse type of relationship (from the related contact\'s perspective)',
        enum: contact_relationship_entity_1.RelationshipType,
        example: contact_relationship_entity_1.RelationshipType.DEPENDENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "inverseType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes about the relationship',
        example: 'Primary emergency contact, lives nearby',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this is a primary relationship',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateContactRelationshipDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date of the relationship (if applicable)',
        example: '2023-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateContactRelationshipDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date of the relationship (if applicable)',
        example: '2023-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateContactRelationshipDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata for the relationship',
        example: {
            custodyPercentage: 50,
            legalAuthority: true,
            additionalInfo: 'Shared custody arrangement'
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateContactRelationshipDto.prototype, "metadata", void 0);
exports.CreateContactRelationshipDto = CreateContactRelationshipDto;
class UpdateContactRelationshipDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: () => String, maxLength: 500 }, isPrimary: { required: false, type: () => Boolean }, isActive: { required: false, type: () => Boolean }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of relationship',
        enum: contact_relationship_entity_1.RelationshipType,
        example: contact_relationship_entity_1.RelationshipType.EMERGENCY_CONTACT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Inverse type of relationship (from the related contact\'s perspective)',
        enum: contact_relationship_entity_1.RelationshipType,
        example: contact_relationship_entity_1.RelationshipType.DEPENDENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contact_relationship_entity_1.RelationshipType),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "inverseType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes about the relationship',
        example: 'Primary emergency contact, lives nearby',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this is a primary relationship',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateContactRelationshipDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this relationship is active',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateContactRelationshipDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date of the relationship (if applicable)',
        example: '2023-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateContactRelationshipDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date of the relationship (if applicable)',
        example: '2023-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateContactRelationshipDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata for the relationship',
        example: {
            custodyPercentage: 50,
            legalAuthority: true,
            additionalInfo: 'Shared custody arrangement'
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateContactRelationshipDto.prototype, "metadata", void 0);
exports.UpdateContactRelationshipDto = UpdateContactRelationshipDto;
class ContactRelationshipResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, contactId: { required: true, type: () => String }, relatedContactId: { required: true, type: () => String }, relatedContact: { required: true, type: () => ({ id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, type: { required: true, type: () => String } }) }, type: { required: true, enum: require("../entities/contact-relationship.entity").RelationshipType }, inverseType: { required: false, enum: require("../entities/contact-relationship.entity").RelationshipType }, notes: { required: false, type: () => String }, isPrimary: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.ContactRelationshipResponseDto = ContactRelationshipResponseDto;
//# sourceMappingURL=create-contact-relationship.dto.js.map