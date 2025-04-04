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
exports.Contact = exports.BloodType = exports.Gender = exports.ContactType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/contacts/entities/contact.entity.ts
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const contact_relationship_entity_1 = require("./contact-relationship.entity");
var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["EMERGENCY_CONTACT"] = "EMERGENCY_CONTACT";
    ContactType["FAMILY_MEMBER"] = "FAMILY_MEMBER";
    ContactType["OTHER"] = "OTHER";
})(ContactType = exports.ContactType || (exports.ContactType = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
    Gender["PREFER_NOT_TO_SAY"] = "PREFER_NOT_TO_SAY";
})(Gender = exports.Gender || (exports.Gender = {}));
var BloodType;
(function (BloodType) {
    BloodType["A_POSITIVE"] = "A+";
    BloodType["A_NEGATIVE"] = "A-";
    BloodType["B_POSITIVE"] = "B+";
    BloodType["B_NEGATIVE"] = "B-";
    BloodType["O_POSITIVE"] = "O+";
    BloodType["O_NEGATIVE"] = "O-";
    BloodType["AB_POSITIVE"] = "AB+";
    BloodType["AB_NEGATIVE"] = "AB-";
    BloodType["UNKNOWN"] = "UNKNOWN";
})(BloodType = exports.BloodType || (exports.BloodType = {}));
let Contact = class Contact {
    // Virtual properties
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get age() {
        if (!this.dateOfBirth)
            return null;
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, status: { required: true, type: () => String }, metadata: { required: false, type: () => Object }, phone: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, type: { required: true, enum: require("./contact.entity").ContactType }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, middleName: { required: false, type: () => String }, preferredName: { required: false, type: () => String }, email: { required: false, type: () => String }, phoneNumber: { required: false, type: () => String }, alternativePhoneNumber: { required: false, type: () => String }, gender: { required: false, enum: require("./contact.entity").Gender }, dateOfBirth: { required: false, type: () => Date }, bloodType: { required: true, enum: require("./contact.entity").BloodType }, address: { required: false, type: () => ({ street: { required: true, type: () => String }, city: { required: true, type: () => String }, state: { required: true, type: () => String }, postalCode: { required: true, type: () => String }, country: { required: true, type: () => String } }) }, emergencyContact: { required: false, type: () => ({ name: { required: true, type: () => String }, relationship: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, address: { required: false, type: () => String } }) }, allergies: { required: false, type: () => [String] }, medications: { required: false, type: () => [String] }, occupation: { required: false, type: () => String }, notes: { required: false, type: () => String }, customFields: { required: false, type: () => Object }, isActive: { required: true, type: () => Boolean }, lastVisitDate: { required: false, type: () => Date }, nextAppointmentDate: { required: false, type: () => Date }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => Object }, createdBy: { required: true, type: () => Object }, updatedBy: { required: true, type: () => Object }, appointments: { required: true, type: () => [Object] }, documents: { required: true, type: () => [Object] }, medicalHistory: { required: true, type: () => [Object] }, relationships: { required: true, type: () => [require("./contact-relationship.entity").ContactRelationship] }, mergedRecords: { required: true, type: () => [Object] } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Contact.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'enum', enum: ContactType, default: ContactType.PATIENT }),
    __metadata("design:type", String)
], Contact.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "preferredName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "alternativePhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender, nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'enum', enum: BloodType, default: BloodType.UNKNOWN }),
    __metadata("design:type", String)
], Contact.prototype, "bloodType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Contact.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Contact.prototype, "medications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "occupation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "customFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Contact.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "lastVisitDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "nextAppointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Contact.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Contact.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Contact.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Organization'),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Contact.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Contact.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Contact.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Appointment', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Document', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('MedicalHistory', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "medicalHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_relationship_entity_1.ContactRelationship, relationship => relationship.contact),
    __metadata("design:type", Array)
], Contact.prototype, "relationships", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)('Contact'),
    (0, typeorm_1.JoinTable)({
        name: 'contact_merged_records',
        joinColumn: { name: 'primary_contact_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'merged_contact_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Contact.prototype, "mergedRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Contact.prototype, "fullName", null);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Contact.prototype, "age", null);
Contact = __decorate([
    (0, typeorm_1.Entity)('contacts'),
    (0, typeorm_1.Index)(['organizationId', 'email']),
    (0, typeorm_1.Index)(['organizationId', 'phoneNumber'])
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map