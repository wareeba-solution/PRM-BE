"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.BloodType = exports.Gender = exports.ContactType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/entities/contact.entity.ts
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var contact_relationship_entity_1 = require("./contact-relationship.entity");
var ContactType;
(function (ContactType) {
    ContactType["PATIENT"] = "PATIENT";
    ContactType["EMERGENCY_CONTACT"] = "EMERGENCY_CONTACT";
    ContactType["FAMILY_MEMBER"] = "FAMILY_MEMBER";
    ContactType["OTHER"] = "OTHER";
})(ContactType || (exports.ContactType = ContactType = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
    Gender["PREFER_NOT_TO_SAY"] = "PREFER_NOT_TO_SAY";
})(Gender || (exports.Gender = Gender = {}));
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
})(BloodType || (exports.BloodType = BloodType = {}));
var Contact = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('contacts'), (0, typeorm_1.Index)(['organizationId', 'email']), (0, typeorm_1.Index)(['organizationId', 'phoneNumber'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _middleName_decorators;
    var _middleName_initializers = [];
    var _middleName_extraInitializers = [];
    var _preferredName_decorators;
    var _preferredName_initializers = [];
    var _preferredName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _alternativePhoneNumber_decorators;
    var _alternativePhoneNumber_initializers = [];
    var _alternativePhoneNumber_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    var _bloodType_decorators;
    var _bloodType_initializers = [];
    var _bloodType_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _emergencyContact_decorators;
    var _emergencyContact_initializers = [];
    var _emergencyContact_extraInitializers = [];
    var _allergies_decorators;
    var _allergies_initializers = [];
    var _allergies_extraInitializers = [];
    var _medications_decorators;
    var _medications_initializers = [];
    var _medications_extraInitializers = [];
    var _occupation_decorators;
    var _occupation_initializers = [];
    var _occupation_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _lastVisitDate_decorators;
    var _lastVisitDate_initializers = [];
    var _lastVisitDate_extraInitializers = [];
    var _nextAppointmentDate_decorators;
    var _nextAppointmentDate_initializers = [];
    var _nextAppointmentDate_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _appointments_decorators;
    var _appointments_initializers = [];
    var _appointments_extraInitializers = [];
    var _documents_decorators;
    var _documents_initializers = [];
    var _documents_extraInitializers = [];
    var _medicalHistory_decorators;
    var _medicalHistory_initializers = [];
    var _medicalHistory_extraInitializers = [];
    var _relationships_decorators;
    var _relationships_initializers = [];
    var _relationships_extraInitializers = [];
    var _mergedRecords_decorators;
    var _mergedRecords_initializers = [];
    var _mergedRecords_extraInitializers = [];
    var _get_fullName_decorators;
    var _get_age_decorators;
    var Contact = _classThis = /** @class */ (function () {
        function Contact_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.status = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.metadata = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.phone = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.organizationId = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.type = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.firstName = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
            this.middleName = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _middleName_initializers, void 0));
            this.preferredName = (__runInitializers(this, _middleName_extraInitializers), __runInitializers(this, _preferredName_initializers, void 0));
            this.email = (__runInitializers(this, _preferredName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.alternativePhoneNumber = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _alternativePhoneNumber_initializers, void 0));
            this.gender = (__runInitializers(this, _alternativePhoneNumber_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
            this.dateOfBirth = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
            this.bloodType = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _bloodType_initializers, void 0));
            this.address = (__runInitializers(this, _bloodType_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.emergencyContact = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _emergencyContact_initializers, void 0));
            this.allergies = (__runInitializers(this, _emergencyContact_extraInitializers), __runInitializers(this, _allergies_initializers, void 0));
            this.medications = (__runInitializers(this, _allergies_extraInitializers), __runInitializers(this, _medications_initializers, void 0));
            this.occupation = (__runInitializers(this, _medications_extraInitializers), __runInitializers(this, _occupation_initializers, void 0));
            this.notes = (__runInitializers(this, _occupation_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.customFields = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
            this.isActive = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.lastVisitDate = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _lastVisitDate_initializers, void 0));
            this.nextAppointmentDate = (__runInitializers(this, _lastVisitDate_extraInitializers), __runInitializers(this, _nextAppointmentDate_initializers, void 0));
            this.createdById = (__runInitializers(this, _nextAppointmentDate_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations - all using string references to avoid circular dependencies
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.createdBy = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.appointments = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _appointments_initializers, void 0));
            this.documents = (__runInitializers(this, _appointments_extraInitializers), __runInitializers(this, _documents_initializers, void 0));
            this.medicalHistory = (__runInitializers(this, _documents_extraInitializers), __runInitializers(this, _medicalHistory_initializers, void 0));
            this.relationships = (__runInitializers(this, _medicalHistory_extraInitializers), __runInitializers(this, _relationships_initializers, void 0));
            this.mergedRecords = (__runInitializers(this, _relationships_extraInitializers), __runInitializers(this, _mergedRecords_initializers, void 0));
            __runInitializers(this, _mergedRecords_extraInitializers);
        }
        Object.defineProperty(Contact_1.prototype, "fullName", {
            // Virtual properties
            get: function () {
                return "".concat(this.firstName, " ").concat(this.lastName);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Contact_1.prototype, "age", {
            get: function () {
                if (!this.dateOfBirth)
                    return null;
                var today = new Date();
                var birthDate = new Date(this.dateOfBirth);
                var age = today.getFullYear() - birthDate.getFullYear();
                var monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            },
            enumerable: false,
            configurable: true
        });
        Contact_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, status: { required: true, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } }, phone: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, type: { required: true, enum: require("./contact.entity").ContactType }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, middleName: { required: false, type: function () { return String; } }, preferredName: { required: false, type: function () { return String; } }, email: { required: false, type: function () { return String; } }, phoneNumber: { required: false, type: function () { return String; } }, alternativePhoneNumber: { required: false, type: function () { return String; } }, gender: { required: false, enum: require("./contact.entity").Gender }, dateOfBirth: { required: false, type: function () { return Date; } }, bloodType: { required: true, enum: require("./contact.entity").BloodType }, address: { required: false, type: function () { return ({ street: { required: true, type: function () { return String; } }, city: { required: true, type: function () { return String; } }, state: { required: true, type: function () { return String; } }, postalCode: { required: true, type: function () { return String; } }, country: { required: true, type: function () { return String; } } }); } }, emergencyContact: { required: false, type: function () { return ({ name: { required: true, type: function () { return String; } }, relationship: { required: true, type: function () { return String; } }, phoneNumber: { required: true, type: function () { return String; } }, address: { required: false, type: function () { return String; } } }); } }, allergies: { required: false, type: function () { return [String]; } }, medications: { required: false, type: function () { return [String]; } }, occupation: { required: false, type: function () { return String; } }, notes: { required: false, type: function () { return String; } }, customFields: { required: false, type: function () { return Object; } }, isActive: { required: true, type: function () { return Boolean; } }, lastVisitDate: { required: false, type: function () { return Date; } }, nextAppointmentDate: { required: false, type: function () { return Date; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return Object; } }, createdBy: { required: true, type: function () { return Object; } }, updatedBy: { required: true, type: function () { return Object; } }, appointments: { required: true, type: function () { return [Object]; } }, documents: { required: true, type: function () { return [Object]; } }, medicalHistory: { required: true, type: function () { return [Object]; } }, relationships: { required: true, type: function () { return [require("./contact-relationship.entity").ContactRelationship]; } }, mergedRecords: { required: true, type: function () { return [Object]; } } };
        };
        return Contact_1;
    }());
    __setFunctionName(_classThis, "Contact");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _status_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _phone_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _type_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'enum', enum: ContactType, default: ContactType.PATIENT })];
        _firstName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _lastName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _middleName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _preferredName_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _email_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ unique: true, nullable: true }), (0, typeorm_1.Index)()];
        _phoneNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _alternativePhoneNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _gender_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'enum', enum: Gender, nullable: true })];
        _dateOfBirth_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _bloodType_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'enum', enum: BloodType, default: BloodType.UNKNOWN })];
        _address_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _emergencyContact_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _allergies_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _medications_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _occupation_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _notes_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _customFields_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isActive_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: true })];
        _lastVisitDate_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _nextAppointmentDate_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)('Organization'), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _appointments_decorators = [(0, typeorm_1.OneToMany)('Appointment', 'contact')];
        _documents_decorators = [(0, typeorm_1.OneToMany)('Document', 'contact')];
        _medicalHistory_decorators = [(0, typeorm_1.OneToMany)('MedicalHistory', 'contact')];
        _relationships_decorators = [(0, typeorm_1.OneToMany)(function () { return contact_relationship_entity_1.ContactRelationship; }, function (relationship) { return relationship.contact; })];
        _mergedRecords_decorators = [(0, typeorm_1.ManyToMany)('Contact'), (0, typeorm_1.JoinTable)({
                name: 'contact_merged_records',
                joinColumn: { name: 'primary_contact_id', referencedColumnName: 'id' },
                inverseJoinColumn: { name: 'merged_contact_id', referencedColumnName: 'id' },
            })];
        _get_fullName_decorators = [(0, swagger_1.ApiProperty)()];
        _get_age_decorators = [(0, swagger_1.ApiProperty)()];
        __esDecorate(_classThis, null, _get_fullName_decorators, { kind: "getter", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_age_decorators, { kind: "getter", name: "age", static: false, private: false, access: { has: function (obj) { return "age" in obj; }, get: function (obj) { return obj.age; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _middleName_decorators, { kind: "field", name: "middleName", static: false, private: false, access: { has: function (obj) { return "middleName" in obj; }, get: function (obj) { return obj.middleName; }, set: function (obj, value) { obj.middleName = value; } }, metadata: _metadata }, _middleName_initializers, _middleName_extraInitializers);
        __esDecorate(null, null, _preferredName_decorators, { kind: "field", name: "preferredName", static: false, private: false, access: { has: function (obj) { return "preferredName" in obj; }, get: function (obj) { return obj.preferredName; }, set: function (obj, value) { obj.preferredName = value; } }, metadata: _metadata }, _preferredName_initializers, _preferredName_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _alternativePhoneNumber_decorators, { kind: "field", name: "alternativePhoneNumber", static: false, private: false, access: { has: function (obj) { return "alternativePhoneNumber" in obj; }, get: function (obj) { return obj.alternativePhoneNumber; }, set: function (obj, value) { obj.alternativePhoneNumber = value; } }, metadata: _metadata }, _alternativePhoneNumber_initializers, _alternativePhoneNumber_extraInitializers);
        __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
        __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
        __esDecorate(null, null, _bloodType_decorators, { kind: "field", name: "bloodType", static: false, private: false, access: { has: function (obj) { return "bloodType" in obj; }, get: function (obj) { return obj.bloodType; }, set: function (obj, value) { obj.bloodType = value; } }, metadata: _metadata }, _bloodType_initializers, _bloodType_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _emergencyContact_decorators, { kind: "field", name: "emergencyContact", static: false, private: false, access: { has: function (obj) { return "emergencyContact" in obj; }, get: function (obj) { return obj.emergencyContact; }, set: function (obj, value) { obj.emergencyContact = value; } }, metadata: _metadata }, _emergencyContact_initializers, _emergencyContact_extraInitializers);
        __esDecorate(null, null, _allergies_decorators, { kind: "field", name: "allergies", static: false, private: false, access: { has: function (obj) { return "allergies" in obj; }, get: function (obj) { return obj.allergies; }, set: function (obj, value) { obj.allergies = value; } }, metadata: _metadata }, _allergies_initializers, _allergies_extraInitializers);
        __esDecorate(null, null, _medications_decorators, { kind: "field", name: "medications", static: false, private: false, access: { has: function (obj) { return "medications" in obj; }, get: function (obj) { return obj.medications; }, set: function (obj, value) { obj.medications = value; } }, metadata: _metadata }, _medications_initializers, _medications_extraInitializers);
        __esDecorate(null, null, _occupation_decorators, { kind: "field", name: "occupation", static: false, private: false, access: { has: function (obj) { return "occupation" in obj; }, get: function (obj) { return obj.occupation; }, set: function (obj, value) { obj.occupation = value; } }, metadata: _metadata }, _occupation_initializers, _occupation_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _lastVisitDate_decorators, { kind: "field", name: "lastVisitDate", static: false, private: false, access: { has: function (obj) { return "lastVisitDate" in obj; }, get: function (obj) { return obj.lastVisitDate; }, set: function (obj, value) { obj.lastVisitDate = value; } }, metadata: _metadata }, _lastVisitDate_initializers, _lastVisitDate_extraInitializers);
        __esDecorate(null, null, _nextAppointmentDate_decorators, { kind: "field", name: "nextAppointmentDate", static: false, private: false, access: { has: function (obj) { return "nextAppointmentDate" in obj; }, get: function (obj) { return obj.nextAppointmentDate; }, set: function (obj, value) { obj.nextAppointmentDate = value; } }, metadata: _metadata }, _nextAppointmentDate_initializers, _nextAppointmentDate_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _appointments_decorators, { kind: "field", name: "appointments", static: false, private: false, access: { has: function (obj) { return "appointments" in obj; }, get: function (obj) { return obj.appointments; }, set: function (obj, value) { obj.appointments = value; } }, metadata: _metadata }, _appointments_initializers, _appointments_extraInitializers);
        __esDecorate(null, null, _documents_decorators, { kind: "field", name: "documents", static: false, private: false, access: { has: function (obj) { return "documents" in obj; }, get: function (obj) { return obj.documents; }, set: function (obj, value) { obj.documents = value; } }, metadata: _metadata }, _documents_initializers, _documents_extraInitializers);
        __esDecorate(null, null, _medicalHistory_decorators, { kind: "field", name: "medicalHistory", static: false, private: false, access: { has: function (obj) { return "medicalHistory" in obj; }, get: function (obj) { return obj.medicalHistory; }, set: function (obj, value) { obj.medicalHistory = value; } }, metadata: _metadata }, _medicalHistory_initializers, _medicalHistory_extraInitializers);
        __esDecorate(null, null, _relationships_decorators, { kind: "field", name: "relationships", static: false, private: false, access: { has: function (obj) { return "relationships" in obj; }, get: function (obj) { return obj.relationships; }, set: function (obj, value) { obj.relationships = value; } }, metadata: _metadata }, _relationships_initializers, _relationships_extraInitializers);
        __esDecorate(null, null, _mergedRecords_decorators, { kind: "field", name: "mergedRecords", static: false, private: false, access: { has: function (obj) { return "mergedRecords" in obj; }, get: function (obj) { return obj.mergedRecords; }, set: function (obj, value) { obj.mergedRecords = value; } }, metadata: _metadata }, _mergedRecords_initializers, _mergedRecords_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Contact = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Contact = _classThis;
}();
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map