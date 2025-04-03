"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistory = exports.HealthcareProviderType = exports.EncounterType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/medical-history/entities/medical-history.entity.ts
var typeorm_1 = require("typeorm");
var contact_entity_1 = require("../contacts/entities/contact.entity");
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
})(EncounterType || (exports.EncounterType = EncounterType = {}));
var HealthcareProviderType;
(function (HealthcareProviderType) {
    HealthcareProviderType["PRIMARY_CARE"] = "PRIMARY_CARE";
    HealthcareProviderType["SPECIALIST"] = "SPECIALIST";
    HealthcareProviderType["DENTIST"] = "DENTIST";
    HealthcareProviderType["NURSE"] = "NURSE";
    HealthcareProviderType["THERAPIST"] = "THERAPIST";
    HealthcareProviderType["PHARMACIST"] = "PHARMACIST";
    HealthcareProviderType["OTHER"] = "OTHER";
})(HealthcareProviderType || (exports.HealthcareProviderType = HealthcareProviderType = {}));
var MedicalHistory = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('medical_histories'), (0, typeorm_1.Index)(['organizationId', 'contact'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _contact_decorators;
    var _contact_initializers = [];
    var _contact_extraInitializers = [];
    var _encounterType_decorators;
    var _encounterType_initializers = [];
    var _encounterType_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _diagnosis_decorators;
    var _diagnosis_initializers = [];
    var _diagnosis_extraInitializers = [];
    var _treatment_decorators;
    var _treatment_initializers = [];
    var _treatment_extraInitializers = [];
    var _medications_decorators;
    var _medications_initializers = [];
    var _medications_extraInitializers = [];
    var _symptoms_decorators;
    var _symptoms_initializers = [];
    var _symptoms_extraInitializers = [];
    var _vitalSigns_decorators;
    var _vitalSigns_initializers = [];
    var _vitalSigns_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _referrals_decorators;
    var _referrals_initializers = [];
    var _referrals_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _labResults_decorators;
    var _labResults_initializers = [];
    var _labResults_extraInitializers = [];
    var _isFlagged_decorators;
    var _isFlagged_initializers = [];
    var _isFlagged_extraInitializers = [];
    var _flaggedReason_decorators;
    var _flaggedReason_initializers = [];
    var _flaggedReason_extraInitializers = [];
    var _requiresFollowUp_decorators;
    var _requiresFollowUp_initializers = [];
    var _requiresFollowUp_extraInitializers = [];
    var _followUpDate_decorators;
    var _followUpDate_initializers = [];
    var _followUpDate_extraInitializers = [];
    var _providerName_decorators;
    var _providerName_initializers = [];
    var _providerName_extraInitializers = [];
    var _providerType_decorators;
    var _providerType_initializers = [];
    var _providerType_extraInitializers = [];
    var _facilityName_decorators;
    var _facilityName_initializers = [];
    var _facilityName_extraInitializers = [];
    var _facilityLocation_decorators;
    var _facilityLocation_initializers = [];
    var _facilityLocation_extraInitializers = [];
    var _isInsuranceClaim_decorators;
    var _isInsuranceClaim_initializers = [];
    var _isInsuranceClaim_extraInitializers = [];
    var _insuranceClaimNumber_decorators;
    var _insuranceClaimNumber_initializers = [];
    var _insuranceClaimNumber_extraInitializers = [];
    var _costAmount_decorators;
    var _costAmount_initializers = [];
    var _costAmount_extraInitializers = [];
    var _costCurrency_decorators;
    var _costCurrency_initializers = [];
    var _costCurrency_extraInitializers = [];
    var _customFields_decorators;
    var _customFields_initializers = [];
    var _customFields_extraInitializers = [];
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
    var MedicalHistory = _classThis = /** @class */ (function () {
        function MedicalHistory_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.contactId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.contact = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
            this.encounterType = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _encounterType_initializers, void 0));
            this.date = (__runInitializers(this, _encounterType_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.description = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.diagnosis = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _diagnosis_initializers, void 0));
            this.treatment = (__runInitializers(this, _diagnosis_extraInitializers), __runInitializers(this, _treatment_initializers, void 0));
            this.medications = (__runInitializers(this, _treatment_extraInitializers), __runInitializers(this, _medications_initializers, void 0));
            this.symptoms = (__runInitializers(this, _medications_extraInitializers), __runInitializers(this, _symptoms_initializers, void 0));
            this.vitalSigns = (__runInitializers(this, _symptoms_extraInitializers), __runInitializers(this, _vitalSigns_initializers, void 0));
            this.notes = (__runInitializers(this, _vitalSigns_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.referrals = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _referrals_initializers, void 0));
            this.attachments = (__runInitializers(this, _referrals_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
            this.labResults = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _labResults_initializers, void 0));
            this.isFlagged = (__runInitializers(this, _labResults_extraInitializers), __runInitializers(this, _isFlagged_initializers, void 0));
            this.flaggedReason = (__runInitializers(this, _isFlagged_extraInitializers), __runInitializers(this, _flaggedReason_initializers, void 0));
            this.requiresFollowUp = (__runInitializers(this, _flaggedReason_extraInitializers), __runInitializers(this, _requiresFollowUp_initializers, void 0));
            this.followUpDate = (__runInitializers(this, _requiresFollowUp_extraInitializers), __runInitializers(this, _followUpDate_initializers, void 0));
            this.providerName = (__runInitializers(this, _followUpDate_extraInitializers), __runInitializers(this, _providerName_initializers, void 0));
            this.providerType = (__runInitializers(this, _providerName_extraInitializers), __runInitializers(this, _providerType_initializers, void 0));
            this.facilityName = (__runInitializers(this, _providerType_extraInitializers), __runInitializers(this, _facilityName_initializers, void 0));
            this.facilityLocation = (__runInitializers(this, _facilityName_extraInitializers), __runInitializers(this, _facilityLocation_initializers, void 0));
            this.isInsuranceClaim = (__runInitializers(this, _facilityLocation_extraInitializers), __runInitializers(this, _isInsuranceClaim_initializers, void 0));
            this.insuranceClaimNumber = (__runInitializers(this, _isInsuranceClaim_extraInitializers), __runInitializers(this, _insuranceClaimNumber_initializers, void 0));
            this.costAmount = (__runInitializers(this, _insuranceClaimNumber_extraInitializers), __runInitializers(this, _costAmount_initializers, void 0));
            this.costCurrency = (__runInitializers(this, _costAmount_extraInitializers), __runInitializers(this, _costCurrency_initializers, void 0));
            this.customFields = (__runInitializers(this, _costCurrency_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
            this.createdById = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        MedicalHistory_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, contactId: { required: true, type: function () { return String; } }, contact: { required: true, type: function () { return require("../contacts/entities/contact.entity").Contact; } }, encounterType: { required: true, enum: require("./medical-history.entity").EncounterType }, date: { required: true, type: function () { return Date; } }, description: { required: true, type: function () { return String; } }, diagnosis: { required: true, type: function () { return String; } }, treatment: { required: true, type: function () { return String; } }, medications: { required: true, type: function () { return String; } }, symptoms: { required: true, type: function () { return String; } }, vitalSigns: { required: true, type: function () { return ({ bloodPressure: { required: false, type: function () { return String; } }, temperature: { required: false, type: function () { return Number; } }, heartRate: { required: false, type: function () { return Number; } }, respiratoryRate: { required: false, type: function () { return Number; } }, oxygenSaturation: { required: false, type: function () { return Number; } }, height: { required: false, type: function () { return Number; } }, weight: { required: false, type: function () { return Number; } }, bmi: { required: false, type: function () { return Number; } } }); } }, notes: { required: true, type: function () { return String; } }, referrals: { required: true }, attachments: { required: true }, labResults: { required: true }, isFlagged: { required: true, type: function () { return Boolean; } }, flaggedReason: { required: true, type: function () { return String; } }, requiresFollowUp: { required: true, type: function () { return Boolean; } }, followUpDate: { required: true, type: function () { return Date; } }, providerName: { required: true, type: function () { return String; } }, providerType: { required: true, enum: require("./medical-history.entity").HealthcareProviderType }, facilityName: { required: true, type: function () { return String; } }, facilityLocation: { required: true, type: function () { return String; } }, isInsuranceClaim: { required: true, type: function () { return Boolean; } }, insuranceClaimNumber: { required: true, type: function () { return String; } }, costAmount: { required: true, type: function () { return Number; } }, costCurrency: { required: true, type: function () { return String; } }, customFields: { required: true, type: function () { return Object; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: true, type: function () { return Date; } } };
        };
        return MedicalHistory_1;
    }());
    __setFunctionName(_classThis, "MedicalHistory");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _contactId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _contact_decorators = [(0, typeorm_1.ManyToOne)(function () { return contact_entity_1.Contact; }, function (contact) { return contact.medicalHistory; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'contactId' })];
        _encounterType_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: EncounterType,
                default: EncounterType.CONSULTATION,
            })];
        _date_decorators = [(0, typeorm_1.Column)({ type: 'date' }), (0, typeorm_1.Index)()];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _diagnosis_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _treatment_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _medications_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _symptoms_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _vitalSigns_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _referrals_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _attachments_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _labResults_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isFlagged_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _flaggedReason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _requiresFollowUp_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _followUpDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _providerName_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _providerType_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: HealthcareProviderType,
                nullable: true,
            })];
        _facilityName_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _facilityLocation_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _isInsuranceClaim_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _insuranceClaimNumber_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _costAmount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _costCurrency_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
        _customFields_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: function (obj) { return "contact" in obj; }, get: function (obj) { return obj.contact; }, set: function (obj, value) { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
        __esDecorate(null, null, _encounterType_decorators, { kind: "field", name: "encounterType", static: false, private: false, access: { has: function (obj) { return "encounterType" in obj; }, get: function (obj) { return obj.encounterType; }, set: function (obj, value) { obj.encounterType = value; } }, metadata: _metadata }, _encounterType_initializers, _encounterType_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _diagnosis_decorators, { kind: "field", name: "diagnosis", static: false, private: false, access: { has: function (obj) { return "diagnosis" in obj; }, get: function (obj) { return obj.diagnosis; }, set: function (obj, value) { obj.diagnosis = value; } }, metadata: _metadata }, _diagnosis_initializers, _diagnosis_extraInitializers);
        __esDecorate(null, null, _treatment_decorators, { kind: "field", name: "treatment", static: false, private: false, access: { has: function (obj) { return "treatment" in obj; }, get: function (obj) { return obj.treatment; }, set: function (obj, value) { obj.treatment = value; } }, metadata: _metadata }, _treatment_initializers, _treatment_extraInitializers);
        __esDecorate(null, null, _medications_decorators, { kind: "field", name: "medications", static: false, private: false, access: { has: function (obj) { return "medications" in obj; }, get: function (obj) { return obj.medications; }, set: function (obj, value) { obj.medications = value; } }, metadata: _metadata }, _medications_initializers, _medications_extraInitializers);
        __esDecorate(null, null, _symptoms_decorators, { kind: "field", name: "symptoms", static: false, private: false, access: { has: function (obj) { return "symptoms" in obj; }, get: function (obj) { return obj.symptoms; }, set: function (obj, value) { obj.symptoms = value; } }, metadata: _metadata }, _symptoms_initializers, _symptoms_extraInitializers);
        __esDecorate(null, null, _vitalSigns_decorators, { kind: "field", name: "vitalSigns", static: false, private: false, access: { has: function (obj) { return "vitalSigns" in obj; }, get: function (obj) { return obj.vitalSigns; }, set: function (obj, value) { obj.vitalSigns = value; } }, metadata: _metadata }, _vitalSigns_initializers, _vitalSigns_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _referrals_decorators, { kind: "field", name: "referrals", static: false, private: false, access: { has: function (obj) { return "referrals" in obj; }, get: function (obj) { return obj.referrals; }, set: function (obj, value) { obj.referrals = value; } }, metadata: _metadata }, _referrals_initializers, _referrals_extraInitializers);
        __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
        __esDecorate(null, null, _labResults_decorators, { kind: "field", name: "labResults", static: false, private: false, access: { has: function (obj) { return "labResults" in obj; }, get: function (obj) { return obj.labResults; }, set: function (obj, value) { obj.labResults = value; } }, metadata: _metadata }, _labResults_initializers, _labResults_extraInitializers);
        __esDecorate(null, null, _isFlagged_decorators, { kind: "field", name: "isFlagged", static: false, private: false, access: { has: function (obj) { return "isFlagged" in obj; }, get: function (obj) { return obj.isFlagged; }, set: function (obj, value) { obj.isFlagged = value; } }, metadata: _metadata }, _isFlagged_initializers, _isFlagged_extraInitializers);
        __esDecorate(null, null, _flaggedReason_decorators, { kind: "field", name: "flaggedReason", static: false, private: false, access: { has: function (obj) { return "flaggedReason" in obj; }, get: function (obj) { return obj.flaggedReason; }, set: function (obj, value) { obj.flaggedReason = value; } }, metadata: _metadata }, _flaggedReason_initializers, _flaggedReason_extraInitializers);
        __esDecorate(null, null, _requiresFollowUp_decorators, { kind: "field", name: "requiresFollowUp", static: false, private: false, access: { has: function (obj) { return "requiresFollowUp" in obj; }, get: function (obj) { return obj.requiresFollowUp; }, set: function (obj, value) { obj.requiresFollowUp = value; } }, metadata: _metadata }, _requiresFollowUp_initializers, _requiresFollowUp_extraInitializers);
        __esDecorate(null, null, _followUpDate_decorators, { kind: "field", name: "followUpDate", static: false, private: false, access: { has: function (obj) { return "followUpDate" in obj; }, get: function (obj) { return obj.followUpDate; }, set: function (obj, value) { obj.followUpDate = value; } }, metadata: _metadata }, _followUpDate_initializers, _followUpDate_extraInitializers);
        __esDecorate(null, null, _providerName_decorators, { kind: "field", name: "providerName", static: false, private: false, access: { has: function (obj) { return "providerName" in obj; }, get: function (obj) { return obj.providerName; }, set: function (obj, value) { obj.providerName = value; } }, metadata: _metadata }, _providerName_initializers, _providerName_extraInitializers);
        __esDecorate(null, null, _providerType_decorators, { kind: "field", name: "providerType", static: false, private: false, access: { has: function (obj) { return "providerType" in obj; }, get: function (obj) { return obj.providerType; }, set: function (obj, value) { obj.providerType = value; } }, metadata: _metadata }, _providerType_initializers, _providerType_extraInitializers);
        __esDecorate(null, null, _facilityName_decorators, { kind: "field", name: "facilityName", static: false, private: false, access: { has: function (obj) { return "facilityName" in obj; }, get: function (obj) { return obj.facilityName; }, set: function (obj, value) { obj.facilityName = value; } }, metadata: _metadata }, _facilityName_initializers, _facilityName_extraInitializers);
        __esDecorate(null, null, _facilityLocation_decorators, { kind: "field", name: "facilityLocation", static: false, private: false, access: { has: function (obj) { return "facilityLocation" in obj; }, get: function (obj) { return obj.facilityLocation; }, set: function (obj, value) { obj.facilityLocation = value; } }, metadata: _metadata }, _facilityLocation_initializers, _facilityLocation_extraInitializers);
        __esDecorate(null, null, _isInsuranceClaim_decorators, { kind: "field", name: "isInsuranceClaim", static: false, private: false, access: { has: function (obj) { return "isInsuranceClaim" in obj; }, get: function (obj) { return obj.isInsuranceClaim; }, set: function (obj, value) { obj.isInsuranceClaim = value; } }, metadata: _metadata }, _isInsuranceClaim_initializers, _isInsuranceClaim_extraInitializers);
        __esDecorate(null, null, _insuranceClaimNumber_decorators, { kind: "field", name: "insuranceClaimNumber", static: false, private: false, access: { has: function (obj) { return "insuranceClaimNumber" in obj; }, get: function (obj) { return obj.insuranceClaimNumber; }, set: function (obj, value) { obj.insuranceClaimNumber = value; } }, metadata: _metadata }, _insuranceClaimNumber_initializers, _insuranceClaimNumber_extraInitializers);
        __esDecorate(null, null, _costAmount_decorators, { kind: "field", name: "costAmount", static: false, private: false, access: { has: function (obj) { return "costAmount" in obj; }, get: function (obj) { return obj.costAmount; }, set: function (obj, value) { obj.costAmount = value; } }, metadata: _metadata }, _costAmount_initializers, _costAmount_extraInitializers);
        __esDecorate(null, null, _costCurrency_decorators, { kind: "field", name: "costCurrency", static: false, private: false, access: { has: function (obj) { return "costCurrency" in obj; }, get: function (obj) { return obj.costCurrency; }, set: function (obj, value) { obj.costCurrency = value; } }, metadata: _metadata }, _costCurrency_initializers, _costCurrency_extraInitializers);
        __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: function (obj) { return "customFields" in obj; }, get: function (obj) { return obj.customFields; }, set: function (obj, value) { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MedicalHistory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MedicalHistory = _classThis;
}();
exports.MedicalHistory = MedicalHistory;
//# sourceMappingURL=medical-history.entity.js.map