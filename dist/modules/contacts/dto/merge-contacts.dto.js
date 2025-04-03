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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeContactsResponseDto = exports.MergeContactsDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/merge-contacts.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var gender_enum_1 = require("../enums/gender.enum");
var marital_status_enum_1 = require("../enums/marital-status.enum");
var update_contact_dto_1 = require("./update-contact.dto");
var MergeContactsDto = function () {
    var _a;
    var _primaryContactId_decorators;
    var _primaryContactId_initializers = [];
    var _primaryContactId_extraInitializers = [];
    var _secondaryContactIds_decorators;
    var _secondaryContactIds_initializers = [];
    var _secondaryContactIds_extraInitializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _maritalStatus_decorators;
    var _maritalStatus_initializers = [];
    var _maritalStatus_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _emergencyContact_decorators;
    var _emergencyContact_initializers = [];
    var _emergencyContact_extraInitializers = [];
    var _medicalInfo_decorators;
    var _medicalInfo_initializers = [];
    var _medicalInfo_extraInitializers = [];
    var _insuranceInfo_decorators;
    var _insuranceInfo_initializers = [];
    var _insuranceInfo_extraInitializers = [];
    var _communicationPrefs_decorators;
    var _communicationPrefs_initializers = [];
    var _communicationPrefs_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _documents_decorators;
    var _documents_initializers = [];
    var _documents_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _groups_decorators;
    var _groups_initializers = [];
    var _groups_extraInitializers = [];
    var _keepHistory_decorators;
    var _keepHistory_initializers = [];
    var _keepHistory_extraInitializers = [];
    var _deleteSecondaryContacts_decorators;
    var _deleteSecondaryContacts_initializers = [];
    var _deleteSecondaryContacts_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MergeContactsDto() {
                this.primaryContactId = __runInitializers(this, _primaryContactId_initializers, void 0);
                this.secondaryContactId = __runInitializers(this, _primaryContactId_extraInitializers);
                this.secondaryContactIds = __runInitializers(this, _secondaryContactIds_initializers, void 0);
                this.firstName = (__runInitializers(this, _secondaryContactIds_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.whatsapp = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
                this.dateOfBirth = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
                this.gender = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
                this.maritalStatus = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _maritalStatus_initializers, void 0));
                this.address = (__runInitializers(this, _maritalStatus_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.emergencyContact = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _emergencyContact_initializers, void 0));
                this.medicalInfo = (__runInitializers(this, _emergencyContact_extraInitializers), __runInitializers(this, _medicalInfo_initializers, void 0));
                this.insuranceInfo = (__runInitializers(this, _medicalInfo_extraInitializers), __runInitializers(this, _insuranceInfo_initializers, void 0));
                this.communicationPrefs = (__runInitializers(this, _insuranceInfo_extraInitializers), __runInitializers(this, _communicationPrefs_initializers, void 0));
                this.notes = (__runInitializers(this, _communicationPrefs_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.documents = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _documents_initializers, void 0));
                this.tags = (__runInitializers(this, _documents_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.groups = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
                this.keepHistory = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _keepHistory_initializers, void 0));
                this.deleteSecondaryContacts = (__runInitializers(this, _keepHistory_extraInitializers), __runInitializers(this, _deleteSecondaryContacts_initializers, void 0));
                __runInitializers(this, _deleteSecondaryContacts_extraInitializers);
            }
            MergeContactsDto._OPENAPI_METADATA_FACTORY = function () {
                return { primaryContactId: { required: true, type: function () { return String; }, format: "uuid" }, secondaryContactId: { required: true, type: function () { return String; } }, secondaryContactIds: { required: true, type: function () { return [String]; }, format: "uuid", minItems: 1 }, firstName: { required: false, type: function () { return String; }, minLength: 2, maxLength: 50 }, lastName: { required: false, type: function () { return String; }, minLength: 2, maxLength: 50 }, email: { required: false, type: function () { return String; }, format: "email" }, phone: { required: false, type: function () { return String; } }, whatsapp: { required: false, type: function () { return String; } }, dateOfBirth: { required: false, type: function () { return Date; } }, gender: { required: false, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, address: { required: false, type: function () { return require("./update-contact.dto").UpdateContactAddressDto; } }, emergencyContact: { required: false, type: function () { return require("./update-contact.dto").UpdateEmergencyContactDto; } }, medicalInfo: { required: false, type: function () { return require("./update-contact.dto").UpdateMedicalInfoDto; } }, insuranceInfo: { required: false, type: function () { return require("./update-contact.dto").UpdateInsuranceInfoDto; } }, communicationPrefs: { required: false, type: function () { return require("./update-contact.dto").UpdateCommunicationPrefsDto; } }, notes: { required: false, type: function () { return String; }, maxLength: 500 }, documents: { required: false, type: function () { return [String]; }, format: "uri" }, tags: { required: false, type: function () { return [String]; } }, groups: { required: false, type: function () { return [String]; } }, keepHistory: { required: false, type: function () { return Boolean; } }, deleteSecondaryContacts: { required: false, type: function () { return Boolean; } } };
            };
            return MergeContactsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _primaryContactId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Primary contact ID that will be kept' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)()];
            _secondaryContactIds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Secondary contact IDs that will be merged into the primary contact', type: [String] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.ArrayMinSize)(1)];
            _firstName_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _lastName_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _whatsapp_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _dateOfBirth_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _gender_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: gender_enum_1.Gender }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(gender_enum_1.Gender)];
            _maritalStatus_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: marital_status_enum_1.MaritalStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus)];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return update_contact_dto_1.UpdateContactAddressDto; })];
            _emergencyContact_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return update_contact_dto_1.UpdateEmergencyContactDto; })];
            _medicalInfo_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return update_contact_dto_1.UpdateMedicalInfoDto; })];
            _insuranceInfo_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return update_contact_dto_1.UpdateInsuranceInfoDto; })];
            _communicationPrefs_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return update_contact_dto_1.UpdateCommunicationPrefsDto; })];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _documents_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)({}, { each: true }), (0, class_validator_1.IsArray)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _groups_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsArray)()];
            _keepHistory_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to keep the history of the merged contacts' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _deleteSecondaryContacts_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to delete the secondary contacts after merging' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _primaryContactId_decorators, { kind: "field", name: "primaryContactId", static: false, private: false, access: { has: function (obj) { return "primaryContactId" in obj; }, get: function (obj) { return obj.primaryContactId; }, set: function (obj, value) { obj.primaryContactId = value; } }, metadata: _metadata }, _primaryContactId_initializers, _primaryContactId_extraInitializers);
            __esDecorate(null, null, _secondaryContactIds_decorators, { kind: "field", name: "secondaryContactIds", static: false, private: false, access: { has: function (obj) { return "secondaryContactIds" in obj; }, get: function (obj) { return obj.secondaryContactIds; }, set: function (obj, value) { obj.secondaryContactIds = value; } }, metadata: _metadata }, _secondaryContactIds_initializers, _secondaryContactIds_extraInitializers);
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
            __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
            __esDecorate(null, null, _maritalStatus_decorators, { kind: "field", name: "maritalStatus", static: false, private: false, access: { has: function (obj) { return "maritalStatus" in obj; }, get: function (obj) { return obj.maritalStatus; }, set: function (obj, value) { obj.maritalStatus = value; } }, metadata: _metadata }, _maritalStatus_initializers, _maritalStatus_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _emergencyContact_decorators, { kind: "field", name: "emergencyContact", static: false, private: false, access: { has: function (obj) { return "emergencyContact" in obj; }, get: function (obj) { return obj.emergencyContact; }, set: function (obj, value) { obj.emergencyContact = value; } }, metadata: _metadata }, _emergencyContact_initializers, _emergencyContact_extraInitializers);
            __esDecorate(null, null, _medicalInfo_decorators, { kind: "field", name: "medicalInfo", static: false, private: false, access: { has: function (obj) { return "medicalInfo" in obj; }, get: function (obj) { return obj.medicalInfo; }, set: function (obj, value) { obj.medicalInfo = value; } }, metadata: _metadata }, _medicalInfo_initializers, _medicalInfo_extraInitializers);
            __esDecorate(null, null, _insuranceInfo_decorators, { kind: "field", name: "insuranceInfo", static: false, private: false, access: { has: function (obj) { return "insuranceInfo" in obj; }, get: function (obj) { return obj.insuranceInfo; }, set: function (obj, value) { obj.insuranceInfo = value; } }, metadata: _metadata }, _insuranceInfo_initializers, _insuranceInfo_extraInitializers);
            __esDecorate(null, null, _communicationPrefs_decorators, { kind: "field", name: "communicationPrefs", static: false, private: false, access: { has: function (obj) { return "communicationPrefs" in obj; }, get: function (obj) { return obj.communicationPrefs; }, set: function (obj, value) { obj.communicationPrefs = value; } }, metadata: _metadata }, _communicationPrefs_initializers, _communicationPrefs_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _documents_decorators, { kind: "field", name: "documents", static: false, private: false, access: { has: function (obj) { return "documents" in obj; }, get: function (obj) { return obj.documents; }, set: function (obj, value) { obj.documents = value; } }, metadata: _metadata }, _documents_initializers, _documents_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: function (obj) { return "groups" in obj; }, get: function (obj) { return obj.groups; }, set: function (obj, value) { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(null, null, _keepHistory_decorators, { kind: "field", name: "keepHistory", static: false, private: false, access: { has: function (obj) { return "keepHistory" in obj; }, get: function (obj) { return obj.keepHistory; }, set: function (obj, value) { obj.keepHistory = value; } }, metadata: _metadata }, _keepHistory_initializers, _keepHistory_extraInitializers);
            __esDecorate(null, null, _deleteSecondaryContacts_decorators, { kind: "field", name: "deleteSecondaryContacts", static: false, private: false, access: { has: function (obj) { return "deleteSecondaryContacts" in obj; }, get: function (obj) { return obj.deleteSecondaryContacts; }, set: function (obj, value) { obj.deleteSecondaryContacts = value; } }, metadata: _metadata }, _deleteSecondaryContacts_initializers, _deleteSecondaryContacts_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MergeContactsDto = MergeContactsDto;
var MergeContactsResponseDto = /** @class */ (function () {
    function MergeContactsResponseDto() {
    }
    MergeContactsResponseDto._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: true, type: function () { return String; } }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, phone: { required: true, type: function () { return String; } }, mergedContactIds: { required: true, type: function () { return [String]; } }, mergedAt: { required: true, type: function () { return Date; } }, mergedBy: { required: true, type: function () { return String; } } };
    };
    return MergeContactsResponseDto;
}());
exports.MergeContactsResponseDto = MergeContactsResponseDto;
//# sourceMappingURL=merge-contacts.dto.js.map