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
exports.DocumentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Document DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class DocumentDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this document belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact ID this document is related to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document title or name',
        example: 'Medical History Report'
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type',
        example: 'MEDICAL_RECORD',
        enum: ['MEDICAL_RECORD', 'LAB_RESULT', 'PRESCRIPTION', 'CONSENT_FORM', 'INSURANCE', 'OTHER']
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document description',
        example: 'Annual physical examination results',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File path or storage location',
        example: 'documents/550e8400-e29b-41d4-a716-446655440000/medical_history.pdf'
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File size in bytes',
        example: 1024000
    }),
    __metadata("design:type", Number)
], DocumentDto.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'MIME type of the document',
        example: 'application/pdf'
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document status',
        example: 'ACTIVE',
        enum: ['DRAFT', 'ACTIVE', 'ARCHIVED', 'DELETED'],
        default: 'ACTIVE'
    }),
    __metadata("design:type", String)
], DocumentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Version number of the document',
        example: 1,
        default: 1
    }),
    __metadata("design:type", Number)
], DocumentDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the document is confidential',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], DocumentDto.prototype, "isConfidential", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the document was issued',
        example: '2023-05-15T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], DocumentDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the document expires',
        example: '2024-05-15T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], DocumentDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags associated with the document',
        example: ['medical', 'annual', 'physical'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], DocumentDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the document',
        example: {
            author: 'Dr. Jane Smith',
            department: 'Cardiology',
            pageCount: 5,
            signatureRequired: true
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], DocumentDto.prototype, "metadata", void 0);
exports.DocumentDto = DocumentDto;
//# sourceMappingURL=document.dto.js.map