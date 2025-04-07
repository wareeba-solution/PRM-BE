"use strict";
// src/modules/medical-history/entities/medical-history.entity.ts
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
exports.MedicalHistory = exports.HealthcareProviderType = exports.EncounterType = void 0;
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("../contacts/entities/contact.entity");
var EncounterType;
(function (EncounterType) {
    EncounterType["CONSULTATION"] = "CONSULTATION";
    EncounterType["CHECKUP"] = "CHECKUP";
    EncounterType["PROCEDURE"] = "PROCEDURE";
    EncounterType["TREATMENT"] = "TREATMENT";
    EncounterType["FOLLOW_UP"] = "FOLLOW_UP";
    EncounterType["EMERGENCY"] = "EMERGENCY";
    EncounterType["LABORATORY"] = "LABORATORY";
    EncounterType["IMAGING"] = "IMAGING";
    EncounterType["TELEMEDICINE"] = "TELEMEDICINE";
    EncounterType["OTHER"] = "OTHER";
})(EncounterType = exports.EncounterType || (exports.EncounterType = {}));
var HealthcareProviderType;
(function (HealthcareProviderType) {
    HealthcareProviderType["PRIMARY_CARE"] = "PRIMARY_CARE";
    HealthcareProviderType["SPECIALIST"] = "SPECIALIST";
    HealthcareProviderType["DENTIST"] = "DENTIST";
    HealthcareProviderType["NURSE"] = "NURSE";
    HealthcareProviderType["THERAPIST"] = "THERAPIST";
    HealthcareProviderType["PHARMACIST"] = "PHARMACIST";
    HealthcareProviderType["OTHER"] = "OTHER";
})(HealthcareProviderType = exports.HealthcareProviderType || (exports.HealthcareProviderType = {}));
let MedicalHistory = class MedicalHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MedicalHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], MedicalHistory.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], MedicalHistory.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, contact => contact.medicalHistory, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'contactId' }),
    __metadata("design:type", contact_entity_1.Contact)
], MedicalHistory.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EncounterType,
        default: EncounterType.CONSULTATION,
    }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "encounterType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "diagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "treatment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "medications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "symptoms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MedicalHistory.prototype, "vitalSigns", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MedicalHistory.prototype, "referrals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MedicalHistory.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], MedicalHistory.prototype, "labResults", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MedicalHistory.prototype, "isFlagged", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "flaggedReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MedicalHistory.prototype, "requiresFollowUp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "followUpDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "providerName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HealthcareProviderType,
        nullable: true,
    }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "providerType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "facilityName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "facilityLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MedicalHistory.prototype, "isInsuranceClaim", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "insuranceClaimNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MedicalHistory.prototype, "costAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "costCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MedicalHistory.prototype, "customFields", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], MedicalHistory.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], MedicalHistory.prototype, "deletedAt", void 0);
MedicalHistory = __decorate([
    (0, typeorm_1.Entity)('medical_histories'),
    (0, typeorm_1.Index)(['organizationId', 'contact'])
], MedicalHistory);
exports.MedicalHistory = MedicalHistory;
//# sourceMappingURL=medical-history.entity.js.map