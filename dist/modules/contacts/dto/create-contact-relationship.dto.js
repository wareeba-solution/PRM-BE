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
import { IsString, IsUUID, IsEnum, IsOptional, IsBoolean, IsDate, IsNotEmpty, MaxLength, } from 'class-validator';
import { Type } from 'class-transformer';
import { RelationshipType } from '../entities/contact-relationship.entity';
export class CreateContactRelationshipDto {
}
__decorate([
    ApiProperty({
        description: 'ID of the related contact',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    IsUUID(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "relatedContactId", void 0);
__decorate([
    ApiProperty({
        description: 'Type of relationship',
        enum: RelationshipType,
        example: RelationshipType.EMERGENCY_CONTACT,
    }),
    IsEnum(RelationshipType),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Inverse type of relationship (from the related contact\'s perspective)',
        enum: RelationshipType,
        example: RelationshipType.DEPENDENT,
    }),
    IsOptional(),
    IsEnum(RelationshipType),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "inverseType", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional notes about the relationship',
        example: 'Primary emergency contact, lives nearby',
    }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateContactRelationshipDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether this is a primary relationship',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateContactRelationshipDto.prototype, "isPrimary", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Start date of the relationship (if applicable)',
        example: '2023-01-01',
    }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], CreateContactRelationshipDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'End date of the relationship (if applicable)',
        example: '2023-12-31',
    }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], CreateContactRelationshipDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional metadata for the relationship',
        example: {
            custodyPercentage: 50,
            legalAuthority: true,
            additionalInfo: 'Shared custody arrangement'
        },
    }),
    IsOptional(),
    __metadata("design:type", Object)
], CreateContactRelationshipDto.prototype, "metadata", void 0);
export class UpdateContactRelationshipDto {
}
__decorate([
    ApiPropertyOptional({
        description: 'Type of relationship',
        enum: RelationshipType,
        example: RelationshipType.EMERGENCY_CONTACT,
    }),
    IsOptional(),
    IsEnum(RelationshipType),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Inverse type of relationship (from the related contact\'s perspective)',
        enum: RelationshipType,
        example: RelationshipType.DEPENDENT,
    }),
    IsOptional(),
    IsEnum(RelationshipType),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "inverseType", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional notes about the relationship',
        example: 'Primary emergency contact, lives nearby',
    }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], UpdateContactRelationshipDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether this is a primary relationship',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateContactRelationshipDto.prototype, "isPrimary", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Whether this relationship is active',
        example: true,
    }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateContactRelationshipDto.prototype, "isActive", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Start date of the relationship (if applicable)',
        example: '2023-01-01',
    }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], UpdateContactRelationshipDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'End date of the relationship (if applicable)',
        example: '2023-12-31',
    }),
    IsOptional(),
    IsDate(),
    Type(() => Date),
    __metadata("design:type", Date)
], UpdateContactRelationshipDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Additional metadata for the relationship',
        example: {
            custodyPercentage: 50,
            legalAuthority: true,
            additionalInfo: 'Shared custody arrangement'
        },
    }),
    IsOptional(),
    __metadata("design:type", Object)
], UpdateContactRelationshipDto.prototype, "metadata", void 0);
export class ContactRelationshipResponseDto {
}
//# sourceMappingURL=create-contact-relationship.dto.js.map