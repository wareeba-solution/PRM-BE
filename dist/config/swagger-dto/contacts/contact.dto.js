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
exports.ContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Contact DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class ContactDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this contact belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of contact',
        example: 'PATIENT',
        enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER'],
        default: 'PATIENT'
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact status',
        example: 'ACTIVE',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name',
        example: 'John',
        maxLength: 100
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name',
        example: 'Doe',
        maxLength: 100
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Middle name',
        example: 'Robert',
        maxLength: 100,
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preferred name or nickname',
        example: 'Johnny',
        maxLength: 100,
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "preferredName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        example: 'john.doe@example.com',
        format: 'email',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Primary phone number',
        example: '+1-555-123-4567',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Alternative phone number',
        example: '+1-555-987-6543',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "alternativePhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender',
        example: 'MALE',
        enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'],
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '1980-01-15',
        format: 'date',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], ContactDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Blood type',
        example: 'O+',
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN'],
        default: 'UNKNOWN'
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address information',
        example: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'USA'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], ContactDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emergency contact information',
        example: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phoneNumber: '+1-555-789-0123',
            address: '123 Main St, New York, NY 10001'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], ContactDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of allergies',
        example: ['Penicillin', 'Peanuts', 'Latex'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], ContactDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of current medications',
        example: ['Lisinopril 10mg', 'Metformin 500mg', 'Vitamin D 1000IU'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], ContactDto.prototype, "medications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Occupation or profession',
        example: 'Software Engineer',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the contact',
        example: 'Prefers afternoon appointments. Has anxiety about dental procedures.',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Custom fields specific to the organization',
        example: {
            insuranceProvider: 'Blue Cross Blue Shield',
            policyNumber: 'XYZ123456789',
            preferredLanguage: 'Spanish',
            referredBy: 'Dr. Smith'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], ContactDto.prototype, "customFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the contact is active',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], ContactDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of last visit',
        example: '2023-03-15T14:30:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], ContactDto.prototype, "lastVisitDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of next scheduled appointment',
        example: '2023-06-15T10:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], ContactDto.prototype, "nextAppointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata',
        example: {
            importSource: 'CSV Import 2023-01-15',
            patientPortalActivated: true,
            communicationPreferences: {
                email: true,
                sms: true,
                phone: false
            }
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], ContactDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name (virtual property)',
        example: 'John Doe',
        readOnly: true
    }),
    __metadata("design:type", String)
], ContactDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Age calculated from date of birth (virtual property)',
        example: 42,
        readOnly: true,
        nullable: true
    }),
    __metadata("design:type", Number)
], ContactDto.prototype, "age", void 0);
exports.ContactDto = ContactDto;
//# sourceMappingURL=contact.dto.js.map