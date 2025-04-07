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
exports.ContactRelationshipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Contact Relationship DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class ContactRelationshipDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this relationship belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the primary contact in the relationship',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the related contact',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "relatedContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of relationship',
        example: 'FAMILY',
        enum: ['FAMILY', 'EMERGENCY_CONTACT', 'CAREGIVER', 'DOCTOR', 'INSURANCE', 'OTHER']
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Specific relationship description',
        example: 'Parent',
        enum: ['Parent', 'Child', 'Spouse', 'Sibling', 'Friend', 'Doctor', 'Caregiver', 'Other']
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is a primary relationship',
        example: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], ContactRelationshipDto.prototype, "isPrimary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this is an emergency contact relationship',
        example: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], ContactRelationshipDto.prototype, "isEmergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the relationship',
        example: 'Primary caregiver who should be contacted first',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the relationship',
        example: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'ARCHIVED'],
        default: 'ACTIVE'
    }),
    __metadata("design:type", String)
], ContactRelationshipDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the relationship',
        example: {
            legalGuardian: true,
            powerOfAttorney: false,
            contactPreference: 'Phone'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], ContactRelationshipDto.prototype, "metadata", void 0);
exports.ContactRelationshipDto = ContactRelationshipDto;
//# sourceMappingURL=contact-relationship.dto.js.map