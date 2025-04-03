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
exports.UpdateContactResponseDto = exports.UpdateContactDto = exports.UpdateCommunicationPrefsDto = exports.UpdateInsuranceInfoDto = exports.UpdateMedicalInfoDto = exports.UpdateEmergencyContactDto = exports.UpdateContactAddressDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/contacts/dto/update-contact.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var gender_enum_1 = require("../enums/gender.enum");
var marital_status_enum_1 = require("../enums/marital-status.enum");
var blood_group_enum_1 = require("../enums/blood-group.enum");
var UpdateContactAddressDto = function () {
    var _a;
    var _street_decorators;
    var _street_initializers = [];
    var _street_extraInitializers = [];
    var _street2_decorators;
    var _street2_initializers = [];
    var _street2_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _state_extraInitializers = [];
    var _postalCode_decorators;
    var _postalCode_initializers = [];
    var _postalCode_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateContactAddressDto() {
                this.street = __runInitializers(this, _street_initializers, void 0);
                this.street2 = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _street2_initializers, void 0));
                this.city = (__runInitializers(this, _street2_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.postalCode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.country = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                __runInitializers(this, _country_extraInitializers);
            }
            UpdateContactAddressDto._OPENAPI_METADATA_FACTORY = function () {
                return { street: { required: true, type: function () { return String; }, maxLength: 100 }, street2: { required: false, type: function () { return String; }, maxLength: 100 }, city: { required: true, type: function () { return String; }, maxLength: 50 }, state: { required: true, type: function () { return String; }, maxLength: 50 }, postalCode: { required: true, type: function () { return String; }, maxLength: 20 }, country: { required: true, type: function () { return String; }, maxLength: 50 } };
            };
            return UpdateContactAddressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _street_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _street2_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _city_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _state_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _postalCode_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
            _country_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: function (obj) { return "street" in obj; }, get: function (obj) { return obj.street; }, set: function (obj, value) { obj.street = value; } }, metadata: _metadata }, _street_initializers, _street_extraInitializers);
            __esDecorate(null, null, _street2_decorators, { kind: "field", name: "street2", static: false, private: false, access: { has: function (obj) { return "street2" in obj; }, get: function (obj) { return obj.street2; }, set: function (obj, value) { obj.street2 = value; } }, metadata: _metadata }, _street2_initializers, _street2_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateContactAddressDto = UpdateContactAddressDto;
var UpdateEmergencyContactDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _relationship_decorators;
    var _relationship_initializers = [];
    var _relationship_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateEmergencyContactDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.relationship = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _relationship_initializers, void 0));
                this.phone = (__runInitializers(this, _relationship_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                __runInitializers(this, _email_extraInitializers);
            }
            UpdateEmergencyContactDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, minLength: 2, maxLength: 50 }, relationship: { required: true, type: function () { return String; }, maxLength: 50 }, phone: { required: true, type: function () { return String; } }, email: { required: false, type: function () { return String; }, format: "email" } };
            };
            return UpdateEmergencyContactDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _relationship_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _relationship_decorators, { kind: "field", name: "relationship", static: false, private: false, access: { has: function (obj) { return "relationship" in obj; }, get: function (obj) { return obj.relationship; }, set: function (obj, value) { obj.relationship = value; } }, metadata: _metadata }, _relationship_initializers, _relationship_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateEmergencyContactDto = UpdateEmergencyContactDto;
var UpdateMedicalInfoDto = function () {
    var _a;
    var _bloodGroup_decorators;
    var _bloodGroup_initializers = [];
    var _bloodGroup_extraInitializers = [];
    var _allergies_decorators;
    var _allergies_initializers = [];
    var _allergies_extraInitializers = [];
    var _medications_decorators;
    var _medications_initializers = [];
    var _medications_extraInitializers = [];
    var _conditions_decorators;
    var _conditions_initializers = [];
    var _conditions_extraInitializers = [];
    var _surgicalHistory_decorators;
    var _surgicalHistory_initializers = [];
    var _surgicalHistory_extraInitializers = [];
    var _familyHistory_decorators;
    var _familyHistory_initializers = [];
    var _familyHistory_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateMedicalInfoDto() {
                this.bloodGroup = __runInitializers(this, _bloodGroup_initializers, void 0);
                this.allergies = (__runInitializers(this, _bloodGroup_extraInitializers), __runInitializers(this, _allergies_initializers, void 0));
                this.medications = (__runInitializers(this, _allergies_extraInitializers), __runInitializers(this, _medications_initializers, void 0));
                this.conditions = (__runInitializers(this, _medications_extraInitializers), __runInitializers(this, _conditions_initializers, void 0));
                this.surgicalHistory = (__runInitializers(this, _conditions_extraInitializers), __runInitializers(this, _surgicalHistory_initializers, void 0));
                this.familyHistory = (__runInitializers(this, _surgicalHistory_extraInitializers), __runInitializers(this, _familyHistory_initializers, void 0));
                __runInitializers(this, _familyHistory_extraInitializers);
            }
            UpdateMedicalInfoDto._OPENAPI_METADATA_FACTORY = function () {
                return { bloodGroup: { required: false, enum: require("../enums/blood-group.enum").BloodGroup }, allergies: { required: false, type: function () { return [String]; } }, medications: { required: false, type: function () { return [String]; } }, conditions: { required: false, type: function () { return [String]; } }, surgicalHistory: { required: false, type: function () { return String; }, maxLength: 1000 }, familyHistory: { required: false, type: function () { return String; }, maxLength: 1000 } };
            };
            return UpdateMedicalInfoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _bloodGroup_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: blood_group_enum_1.BloodGroup }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(blood_group_enum_1.BloodGroup)];
            _allergies_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _medications_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _conditions_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _surgicalHistory_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            _familyHistory_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _bloodGroup_decorators, { kind: "field", name: "bloodGroup", static: false, private: false, access: { has: function (obj) { return "bloodGroup" in obj; }, get: function (obj) { return obj.bloodGroup; }, set: function (obj, value) { obj.bloodGroup = value; } }, metadata: _metadata }, _bloodGroup_initializers, _bloodGroup_extraInitializers);
            __esDecorate(null, null, _allergies_decorators, { kind: "field", name: "allergies", static: false, private: false, access: { has: function (obj) { return "allergies" in obj; }, get: function (obj) { return obj.allergies; }, set: function (obj, value) { obj.allergies = value; } }, metadata: _metadata }, _allergies_initializers, _allergies_extraInitializers);
            __esDecorate(null, null, _medications_decorators, { kind: "field", name: "medications", static: false, private: false, access: { has: function (obj) { return "medications" in obj; }, get: function (obj) { return obj.medications; }, set: function (obj, value) { obj.medications = value; } }, metadata: _metadata }, _medications_initializers, _medications_extraInitializers);
            __esDecorate(null, null, _conditions_decorators, { kind: "field", name: "conditions", static: false, private: false, access: { has: function (obj) { return "conditions" in obj; }, get: function (obj) { return obj.conditions; }, set: function (obj, value) { obj.conditions = value; } }, metadata: _metadata }, _conditions_initializers, _conditions_extraInitializers);
            __esDecorate(null, null, _surgicalHistory_decorators, { kind: "field", name: "surgicalHistory", static: false, private: false, access: { has: function (obj) { return "surgicalHistory" in obj; }, get: function (obj) { return obj.surgicalHistory; }, set: function (obj, value) { obj.surgicalHistory = value; } }, metadata: _metadata }, _surgicalHistory_initializers, _surgicalHistory_extraInitializers);
            __esDecorate(null, null, _familyHistory_decorators, { kind: "field", name: "familyHistory", static: false, private: false, access: { has: function (obj) { return "familyHistory" in obj; }, get: function (obj) { return obj.familyHistory; }, set: function (obj, value) { obj.familyHistory = value; } }, metadata: _metadata }, _familyHistory_initializers, _familyHistory_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateMedicalInfoDto = UpdateMedicalInfoDto;
var UpdateInsuranceInfoDto = function () {
    var _a;
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _policyNumber_decorators;
    var _policyNumber_initializers = [];
    var _policyNumber_extraInitializers = [];
    var _groupNumber_decorators;
    var _groupNumber_initializers = [];
    var _groupNumber_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validTo_decorators;
    var _validTo_initializers = [];
    var _validTo_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateInsuranceInfoDto() {
                this.provider = __runInitializers(this, _provider_initializers, void 0);
                this.policyNumber = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _policyNumber_initializers, void 0));
                this.groupNumber = (__runInitializers(this, _policyNumber_extraInitializers), __runInitializers(this, _groupNumber_initializers, void 0));
                this.validFrom = (__runInitializers(this, _groupNumber_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
                this.validTo = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validTo_initializers, void 0));
                __runInitializers(this, _validTo_extraInitializers);
            }
            UpdateInsuranceInfoDto._OPENAPI_METADATA_FACTORY = function () {
                return { provider: { required: true, type: function () { return String; } }, policyNumber: { required: true, type: function () { return String; } }, groupNumber: { required: false, type: function () { return String; } }, validFrom: { required: false, type: function () { return Date; } }, validTo: { required: false, type: function () { return Date; } } };
            };
            return UpdateInsuranceInfoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _provider_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _policyNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _groupNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _validFrom_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _validTo_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _policyNumber_decorators, { kind: "field", name: "policyNumber", static: false, private: false, access: { has: function (obj) { return "policyNumber" in obj; }, get: function (obj) { return obj.policyNumber; }, set: function (obj, value) { obj.policyNumber = value; } }, metadata: _metadata }, _policyNumber_initializers, _policyNumber_extraInitializers);
            __esDecorate(null, null, _groupNumber_decorators, { kind: "field", name: "groupNumber", static: false, private: false, access: { has: function (obj) { return "groupNumber" in obj; }, get: function (obj) { return obj.groupNumber; }, set: function (obj, value) { obj.groupNumber = value; } }, metadata: _metadata }, _groupNumber_initializers, _groupNumber_extraInitializers);
            __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
            __esDecorate(null, null, _validTo_decorators, { kind: "field", name: "validTo", static: false, private: false, access: { has: function (obj) { return "validTo" in obj; }, get: function (obj) { return obj.validTo; }, set: function (obj, value) { obj.validTo = value; } }, metadata: _metadata }, _validTo_initializers, _validTo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateInsuranceInfoDto = UpdateInsuranceInfoDto;
var UpdateCommunicationPrefsDto = function () {
    var _a;
    var _allowEmail_decorators;
    var _allowEmail_initializers = [];
    var _allowEmail_extraInitializers = [];
    var _allowSMS_decorators;
    var _allowSMS_initializers = [];
    var _allowSMS_extraInitializers = [];
    var _allowWhatsApp_decorators;
    var _allowWhatsApp_initializers = [];
    var _allowWhatsApp_extraInitializers = [];
    var _allowPush_decorators;
    var _allowPush_initializers = [];
    var _allowPush_extraInitializers = [];
    var _preferredLanguage_decorators;
    var _preferredLanguage_initializers = [];
    var _preferredLanguage_extraInitializers = [];
    var _preferredContactTime_decorators;
    var _preferredContactTime_initializers = [];
    var _preferredContactTime_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateCommunicationPrefsDto() {
                this.allowEmail = __runInitializers(this, _allowEmail_initializers, void 0);
                this.allowSMS = (__runInitializers(this, _allowEmail_extraInitializers), __runInitializers(this, _allowSMS_initializers, void 0));
                this.allowWhatsApp = (__runInitializers(this, _allowSMS_extraInitializers), __runInitializers(this, _allowWhatsApp_initializers, void 0));
                this.allowPush = (__runInitializers(this, _allowWhatsApp_extraInitializers), __runInitializers(this, _allowPush_initializers, void 0));
                this.preferredLanguage = (__runInitializers(this, _allowPush_extraInitializers), __runInitializers(this, _preferredLanguage_initializers, void 0));
                this.preferredContactTime = (__runInitializers(this, _preferredLanguage_extraInitializers), __runInitializers(this, _preferredContactTime_initializers, void 0));
                __runInitializers(this, _preferredContactTime_extraInitializers);
            }
            UpdateCommunicationPrefsDto._OPENAPI_METADATA_FACTORY = function () {
                return { allowEmail: { required: false, type: function () { return Boolean; } }, allowSMS: { required: false, type: function () { return Boolean; } }, allowWhatsApp: { required: false, type: function () { return Boolean; } }, allowPush: { required: false, type: function () { return Boolean; } }, preferredLanguage: { required: false, type: function () { return String; } }, preferredContactTime: { required: false, type: function () { return String; } } };
            };
            return UpdateCommunicationPrefsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _allowEmail_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _allowSMS_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _allowWhatsApp_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _allowPush_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _preferredLanguage_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _preferredContactTime_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _allowEmail_decorators, { kind: "field", name: "allowEmail", static: false, private: false, access: { has: function (obj) { return "allowEmail" in obj; }, get: function (obj) { return obj.allowEmail; }, set: function (obj, value) { obj.allowEmail = value; } }, metadata: _metadata }, _allowEmail_initializers, _allowEmail_extraInitializers);
            __esDecorate(null, null, _allowSMS_decorators, { kind: "field", name: "allowSMS", static: false, private: false, access: { has: function (obj) { return "allowSMS" in obj; }, get: function (obj) { return obj.allowSMS; }, set: function (obj, value) { obj.allowSMS = value; } }, metadata: _metadata }, _allowSMS_initializers, _allowSMS_extraInitializers);
            __esDecorate(null, null, _allowWhatsApp_decorators, { kind: "field", name: "allowWhatsApp", static: false, private: false, access: { has: function (obj) { return "allowWhatsApp" in obj; }, get: function (obj) { return obj.allowWhatsApp; }, set: function (obj, value) { obj.allowWhatsApp = value; } }, metadata: _metadata }, _allowWhatsApp_initializers, _allowWhatsApp_extraInitializers);
            __esDecorate(null, null, _allowPush_decorators, { kind: "field", name: "allowPush", static: false, private: false, access: { has: function (obj) { return "allowPush" in obj; }, get: function (obj) { return obj.allowPush; }, set: function (obj, value) { obj.allowPush = value; } }, metadata: _metadata }, _allowPush_initializers, _allowPush_extraInitializers);
            __esDecorate(null, null, _preferredLanguage_decorators, { kind: "field", name: "preferredLanguage", static: false, private: false, access: { has: function (obj) { return "preferredLanguage" in obj; }, get: function (obj) { return obj.preferredLanguage; }, set: function (obj, value) { obj.preferredLanguage = value; } }, metadata: _metadata }, _preferredLanguage_initializers, _preferredLanguage_extraInitializers);
            __esDecorate(null, null, _preferredContactTime_decorators, { kind: "field", name: "preferredContactTime", static: false, private: false, access: { has: function (obj) { return "preferredContactTime" in obj; }, get: function (obj) { return obj.preferredContactTime; }, set: function (obj, value) { obj.preferredContactTime = value; } }, metadata: _metadata }, _preferredContactTime_initializers, _preferredContactTime_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateCommunicationPrefsDto = UpdateCommunicationPrefsDto;
var UpdateContactDto = function () {
    var _a;
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
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateContactDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
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
                this.isActive = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                __runInitializers(this, _isActive_extraInitializers);
            }
            UpdateContactDto._OPENAPI_METADATA_FACTORY = function () {
                return { firstName: { required: false, type: function () { return String; }, minLength: 2, maxLength: 50 }, lastName: { required: false, type: function () { return String; }, minLength: 2, maxLength: 50 }, email: { required: false, type: function () { return String; }, format: "email" }, phone: { required: false, type: function () { return String; } }, whatsapp: { required: false, type: function () { return String; } }, dateOfBirth: { required: false, type: function () { return Date; } }, gender: { required: false, enum: require("../enums/gender.enum").Gender }, maritalStatus: { required: false, enum: require("../enums/marital-status.enum").MaritalStatus }, address: { required: false, type: function () { return require("./update-contact.dto").UpdateContactAddressDto; } }, emergencyContact: { required: false, type: function () { return require("./update-contact.dto").UpdateEmergencyContactDto; } }, medicalInfo: { required: false, type: function () { return require("./update-contact.dto").UpdateMedicalInfoDto; } }, insuranceInfo: { required: false, type: function () { return require("./update-contact.dto").UpdateInsuranceInfoDto; } }, communicationPrefs: { required: false, type: function () { return require("./update-contact.dto").UpdateCommunicationPrefsDto; } }, notes: { required: false, type: function () { return String; }, maxLength: 500 }, documents: { required: false, type: function () { return [String]; }, format: "uri" }, tags: { required: false, type: function () { return [String]; } }, groups: { required: false, type: function () { return [String]; } }, isActive: { required: false, type: function () { return Boolean; } } };
            };
            return UpdateContactDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _lastName_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _whatsapp_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _dateOfBirth_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _gender_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: gender_enum_1.Gender }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(gender_enum_1.Gender)];
            _maritalStatus_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: marital_status_enum_1.MaritalStatus }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatus)];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UpdateContactAddressDto; })];
            _emergencyContact_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UpdateEmergencyContactDto; })];
            _medicalInfo_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UpdateMedicalInfoDto; })];
            _insuranceInfo_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UpdateInsuranceInfoDto; })];
            _communicationPrefs_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UpdateCommunicationPrefsDto; })];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _documents_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)({}, { each: true }), (0, class_validator_1.IsArray)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _groups_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsArray)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
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
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateContactDto = UpdateContactDto;
var UpdateContactResponseDto = /** @class */ (function () {
    function UpdateContactResponseDto() {
    }
    UpdateContactResponseDto._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: true, type: function () { return String; } }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, updatedAt: { required: true, type: function () { return Date; } }, updatedBy: { required: true, type: function () { return String; } } };
    };
    return UpdateContactResponseDto;
}());
exports.UpdateContactResponseDto = UpdateContactResponseDto;
//# sourceMappingURL=update-contact.dto.js.map