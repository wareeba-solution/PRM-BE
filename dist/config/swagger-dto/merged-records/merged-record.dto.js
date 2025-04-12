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
exports.MergedRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Merged Record DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class MergedRecordDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this merged record belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MergedRecordDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the primary contact that remains after merging',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MergedRecordDto.prototype, "primaryContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the secondary contact that was merged into the primary',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MergedRecordDto.prototype, "secondaryContactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for the merge',
        example: 'Duplicate contact identified',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MergedRecordDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the merge',
        example: 'COMPLETED',
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'REVERTED'],
        default: 'COMPLETED'
    }),
    __metadata("design:type", String)
], MergedRecordDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fields that were merged',
        example: ['firstName', 'lastName', 'email', 'phoneNumber'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], MergedRecordDto.prototype, "mergedFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conflicts encountered during merge',
        example: {
            email: {
                primary: 'john.doe@example.com',
                secondary: 'johndoe@gmail.com',
                resolution: 'KEPT_PRIMARY'
            },
            phoneNumber: {
                primary: '+1-555-123-4567',
                secondary: '+1-555-987-6543',
                resolution: 'KEPT_SECONDARY'
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], MergedRecordDto.prototype, "conflicts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the merge can be undone',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], MergedRecordDto.prototype, "isReversible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the merge was completed',
        example: '2023-05-15T14:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MergedRecordDto.prototype, "mergedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the merge was reverted (if applicable)',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MergedRecordDto.prototype, "revertedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata about the merge',
        example: {
            automaticMerge: false,
            confidenceScore: 0.95,
            relatedRecords: {
                appointments: 3,
                documents: 5,
                medicalHistory: 2
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], MergedRecordDto.prototype, "metadata", void 0);
exports.MergedRecordDto = MergedRecordDto;
//# sourceMappingURL=merged-record.dto.js.map