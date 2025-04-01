var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, Index, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContactRelationship } from './contact-relationship.entity';
export var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["EMERGENCY_CONTACT"] = "EMERGENCY_CONTACT";
    ContactType["FAMILY_MEMBER"] = "FAMILY_MEMBER";
    ContactType["OTHER"] = "OTHER";
})(ContactType || (ContactType = {}));
export var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
    Gender["PREFER_NOT_TO_SAY"] = "PREFER_NOT_TO_SAY";
})(Gender || (Gender = {}));
export var BloodType;
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
})(BloodType || (BloodType = {}));
let Contact = class Contact {
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
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Contact.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "status", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "metadata", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'enum', enum: ContactType, default: ContactType.PATIENT }),
    __metadata("design:type", String)
], Contact.prototype, "type", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "firstName", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "lastName", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "middleName", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "preferredName", void 0);
__decorate([
    ApiProperty(),
    Column({ unique: true, nullable: true }),
    Index(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "phoneNumber", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "alternativePhoneNumber", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'enum', enum: Gender, nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "gender", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "dateOfBirth", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'enum', enum: BloodType, default: BloodType.UNKNOWN }),
    __metadata("design:type", String)
], Contact.prototype, "bloodType", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "address", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "emergencyContact", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Contact.prototype, "allergies", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Contact.prototype, "medications", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "occupation", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "notes", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "customFields", void 0);
__decorate([
    ApiProperty(),
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Contact.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "lastVisitDate", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Contact.prototype, "nextAppointmentDate", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "createdById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Contact.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Contact.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Contact.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne('Organization'),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Object)
], Contact.prototype, "organization", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Object)
], Contact.prototype, "createdBy", void 0);
__decorate([
    ManyToOne('User'),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Object)
], Contact.prototype, "updatedBy", void 0);
__decorate([
    OneToMany('Appointment', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "appointments", void 0);
__decorate([
    OneToMany('Document', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "documents", void 0);
__decorate([
    OneToMany('MedicalHistory', 'contact'),
    __metadata("design:type", Array)
], Contact.prototype, "medicalHistory", void 0);
__decorate([
    OneToMany(() => ContactRelationship, relationship => relationship.contact),
    __metadata("design:type", Array)
], Contact.prototype, "relationships", void 0);
__decorate([
    ManyToMany('Contact'),
    JoinTable({
        name: 'contact_merged_records',
        joinColumn: { name: 'primary_contact_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'merged_contact_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Contact.prototype, "mergedRecords", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Contact.prototype, "fullName", null);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Contact.prototype, "age", null);
Contact = __decorate([
    Entity('contacts'),
    Index(['organizationId', 'email']),
    Index(['organizationId', 'phoneNumber'])
], Contact);
export { Contact };
//# sourceMappingURL=contact.entity.js.map