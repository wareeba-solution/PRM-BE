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
exports.CreateOrganizationDto = exports.Contact = exports.Address = exports.SubscriptionPlan = exports.OrganizationType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/organizations/dto/create-organization.dto.ts
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["HOSPITAL"] = "HOSPITAL";
    OrganizationType["CLINIC"] = "CLINIC";
    OrganizationType["PRACTICE"] = "PRACTICE";
    OrganizationType["LABORATORY"] = "LABORATORY";
    OrganizationType["PHARMACY"] = "PHARMACY";
    OrganizationType["OTHER"] = "OTHER";
})(OrganizationType || (exports.OrganizationType = OrganizationType = {}));
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["STARTER"] = "STARTER";
    SubscriptionPlan["PROFESSIONAL"] = "PROFESSIONAL";
    SubscriptionPlan["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var Address = function () {
    var _a;
    var _street_decorators;
    var _street_initializers = [];
    var _street_extraInitializers = [];
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
            function Address() {
                this.street = __runInitializers(this, _street_initializers, void 0);
                this.city = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.postalCode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.country = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                __runInitializers(this, _country_extraInitializers);
            }
            Address._OPENAPI_METADATA_FACTORY = function () {
                return { street: { required: true, type: function () { return String; }, maxLength: 100 }, city: { required: true, type: function () { return String; }, maxLength: 100 }, state: { required: true, type: function () { return String; }, maxLength: 100 }, postalCode: { required: true, type: function () { return String; }, maxLength: 20 }, country: { required: true, type: function () { return String; }, maxLength: 100 } };
            };
            return Address;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _street_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _city_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _state_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _postalCode_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
            _country_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: function (obj) { return "street" in obj; }, get: function (obj) { return obj.street; }, set: function (obj, value) { obj.street = value; } }, metadata: _metadata }, _street_initializers, _street_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.Address = Address;
var Contact = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _position_decorators;
    var _position_initializers = [];
    var _position_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function Contact() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.position = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _position_initializers, void 0));
                this.email = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                __runInitializers(this, _phone_extraInitializers);
            }
            Contact._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, maxLength: 100 }, position: { required: true, type: function () { return String; }, maxLength: 100 }, email: { required: true, type: function () { return String; }, format: "email" }, phone: { required: true, type: function () { return String; } } };
            };
            return Contact;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _position_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _email_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsPhoneNumber)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: function (obj) { return "position" in obj; }, get: function (obj) { return obj.position; }, set: function (obj, value) { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.Contact = Contact;
var CreateOrganizationDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _domain_decorators;
    var _domain_initializers = [];
    var _domain_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _primaryContact_decorators;
    var _primaryContact_initializers = [];
    var _primaryContact_extraInitializers = [];
    var _additionalContacts_decorators;
    var _additionalContacts_initializers = [];
    var _additionalContacts_extraInitializers = [];
    var _subscriptionPlan_decorators;
    var _subscriptionPlan_initializers = [];
    var _subscriptionPlan_extraInitializers = [];
    var _taxId_decorators;
    var _taxId_initializers = [];
    var _taxId_extraInitializers = [];
    var _registrationNumber_decorators;
    var _registrationNumber_initializers = [];
    var _registrationNumber_extraInitializers = [];
    var _licenseNumber_decorators;
    var _licenseNumber_initializers = [];
    var _licenseNumber_extraInitializers = [];
    var _settings_decorators;
    var _settings_initializers = [];
    var _settings_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateOrganizationDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.type = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.description = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.email = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.domain = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _domain_initializers, void 0));
                this.address = (__runInitializers(this, _domain_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.primaryContact = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _primaryContact_initializers, void 0));
                this.additionalContacts = (__runInitializers(this, _primaryContact_extraInitializers), __runInitializers(this, _additionalContacts_initializers, void 0));
                this.subscriptionPlan = (__runInitializers(this, _additionalContacts_extraInitializers), __runInitializers(this, _subscriptionPlan_initializers, void 0));
                this.taxId = (__runInitializers(this, _subscriptionPlan_extraInitializers), __runInitializers(this, _taxId_initializers, void 0));
                this.registrationNumber = (__runInitializers(this, _taxId_extraInitializers), __runInitializers(this, _registrationNumber_initializers, void 0));
                this.licenseNumber = (__runInitializers(this, _registrationNumber_extraInitializers), __runInitializers(this, _licenseNumber_initializers, void 0));
                this.settings = (__runInitializers(this, _licenseNumber_extraInitializers), __runInitializers(this, _settings_initializers, void 0));
                this.metadata = (__runInitializers(this, _settings_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateOrganizationDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, minLength: 2, maxLength: 100, pattern: "/^[a-zA-Z0-9\\s\\-_]+$/" }, type: { required: true, enum: require("./create-organization.dto").OrganizationType }, description: { required: false, type: function () { return String; }, maxLength: 200 }, email: { required: true, type: function () { return String; }, format: "email" }, phone: { required: true, type: function () { return String; } }, domain: { required: false, type: function () { return String; }, pattern: "/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$/" }, address: { required: true, type: function () { return require("./create-organization.dto").Address; } }, primaryContact: { required: true, type: function () { return require("./create-organization.dto").Contact; } }, additionalContacts: { required: false, type: function () { return [require("./create-organization.dto").Contact]; } }, subscriptionPlan: { required: true, enum: require("./create-organization.dto").SubscriptionPlan }, taxId: { required: false, type: function () { return String; }, maxLength: 50 }, registrationNumber: { required: false, type: function () { return String; }, maxLength: 50 }, licenseNumber: { required: false, type: function () { return String; }, maxLength: 50 }, settings: { required: false, type: function () { return ({ timezone: { required: false, type: function () { return String; } }, dateFormat: { required: false, type: function () { return String; } }, timeFormat: { required: false, type: function () { return String; } }, currency: { required: false, type: function () { return String; } }, language: { required: false, type: function () { return String; } }, notificationSettings: { required: false, type: function () { return ({ email: { required: false, type: function () { return Boolean; } }, sms: { required: false, type: function () { return Boolean; } }, push: { required: false, type: function () { return Boolean; } } }); } }, branding: { required: false, type: function () { return ({ logo: { required: false, type: function () { return String; } }, colors: { required: false, type: function () { return ({ primary: { required: false, type: function () { return String; } }, secondary: { required: false, type: function () { return String; } } }); } } }); } } }); } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateOrganizationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(100), (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s\-_]+$/)];
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: OrganizationType }), (0, class_validator_1.IsEnum)(OrganizationType)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
            _email_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsPhoneNumber)()];
            _domain_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)];
            _address_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return Address; })];
            _primaryContact_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return Contact; })];
            _additionalContacts_decorators = [(0, swagger_1.ApiPropertyOptional)({ type: [Contact] }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return Contact; })];
            _subscriptionPlan_decorators = [(0, swagger_1.ApiProperty)({ enum: SubscriptionPlan }), (0, class_validator_1.IsEnum)(SubscriptionPlan)];
            _taxId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _registrationNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _licenseNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _settings_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: function (obj) { return "domain" in obj; }, get: function (obj) { return obj.domain; }, set: function (obj, value) { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _primaryContact_decorators, { kind: "field", name: "primaryContact", static: false, private: false, access: { has: function (obj) { return "primaryContact" in obj; }, get: function (obj) { return obj.primaryContact; }, set: function (obj, value) { obj.primaryContact = value; } }, metadata: _metadata }, _primaryContact_initializers, _primaryContact_extraInitializers);
            __esDecorate(null, null, _additionalContacts_decorators, { kind: "field", name: "additionalContacts", static: false, private: false, access: { has: function (obj) { return "additionalContacts" in obj; }, get: function (obj) { return obj.additionalContacts; }, set: function (obj, value) { obj.additionalContacts = value; } }, metadata: _metadata }, _additionalContacts_initializers, _additionalContacts_extraInitializers);
            __esDecorate(null, null, _subscriptionPlan_decorators, { kind: "field", name: "subscriptionPlan", static: false, private: false, access: { has: function (obj) { return "subscriptionPlan" in obj; }, get: function (obj) { return obj.subscriptionPlan; }, set: function (obj, value) { obj.subscriptionPlan = value; } }, metadata: _metadata }, _subscriptionPlan_initializers, _subscriptionPlan_extraInitializers);
            __esDecorate(null, null, _taxId_decorators, { kind: "field", name: "taxId", static: false, private: false, access: { has: function (obj) { return "taxId" in obj; }, get: function (obj) { return obj.taxId; }, set: function (obj, value) { obj.taxId = value; } }, metadata: _metadata }, _taxId_initializers, _taxId_extraInitializers);
            __esDecorate(null, null, _registrationNumber_decorators, { kind: "field", name: "registrationNumber", static: false, private: false, access: { has: function (obj) { return "registrationNumber" in obj; }, get: function (obj) { return obj.registrationNumber; }, set: function (obj, value) { obj.registrationNumber = value; } }, metadata: _metadata }, _registrationNumber_initializers, _registrationNumber_extraInitializers);
            __esDecorate(null, null, _licenseNumber_decorators, { kind: "field", name: "licenseNumber", static: false, private: false, access: { has: function (obj) { return "licenseNumber" in obj; }, get: function (obj) { return obj.licenseNumber; }, set: function (obj, value) { obj.licenseNumber = value; } }, metadata: _metadata }, _licenseNumber_initializers, _licenseNumber_extraInitializers);
            __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: function (obj) { return "settings" in obj; }, get: function (obj) { return obj.settings; }, set: function (obj, value) { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateOrganizationDto = CreateOrganizationDto;
//# sourceMappingURL=create-organization.dto.js.map