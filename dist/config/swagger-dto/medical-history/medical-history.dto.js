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
exports.MedicalHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Medical History DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class MedicalHistoryDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this medical history belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact ID this medical history is for',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of medical history entry',
        example: 'DIAGNOSIS',
        enum: ['DIAGNOSIS', 'PROCEDURE', 'MEDICATION', 'ALLERGY', 'IMMUNIZATION', 'LAB_RESULT', 'VITAL_SIGN', 'OTHER']
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title or name of the medical history entry',
        example: 'Hypertension Diagnosis'
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description or details of the medical history entry',
        example: 'Patient diagnosed with Stage 1 Hypertension',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the medical event occurred',
        example: '2023-03-15T14:30:00.000Z',
        format: 'date-time'
    }),
    __metadata("design:type", Date)
], MedicalHistoryDto.prototype, "eventDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider or doctor who recorded this entry',
        example: 'Dr. Jane Smith',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location where the medical event occurred',
        example: 'Main Hospital, Room 305',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the medical history entry',
        example: 'ACTIVE',
        enum: ['ACTIVE', 'RESOLVED', 'CHRONIC', 'INACTIVE'],
        default: 'ACTIVE'
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Severity level of the condition',
        example: 'MODERATE',
        enum: ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING', 'NOT_APPLICABLE'],
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Related document IDs',
        example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], MedicalHistoryDto.prototype, "documentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Medical codes (e.g., ICD-10, CPT)',
        example: {
            'ICD-10': 'I10',
            'SNOMED-CT': '38341003'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], MedicalHistoryDto.prototype, "medicalCodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Follow-up actions required',
        example: 'Schedule follow-up appointment in 3 months',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "followUp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when follow-up is due',
        example: '2023-06-15T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], MedicalHistoryDto.prototype, "followUpDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes',
        example: 'Patient reported feeling dizzy before diagnosis',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], MedicalHistoryDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata',
        example: {
            bloodPressure: '140/90',
            heartRate: 85,
            familyHistory: true,
            treatmentPlan: 'Lifestyle changes and monitoring'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], MedicalHistoryDto.prototype, "metadata", void 0);
exports.MedicalHistoryDto = MedicalHistoryDto;
//# sourceMappingURL=medical-history.dto.js.map