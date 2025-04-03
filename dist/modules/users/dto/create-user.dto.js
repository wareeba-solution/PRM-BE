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
exports.CreateUserDto = exports.EmergencyContact = exports.UserAddress = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/users/dto/create-user.dto.ts
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var role_enum_1 = require("../enums/role.enum");
var UserAddress = function () {
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
            function UserAddress() {
                this.street = __runInitializers(this, _street_initializers, void 0);
                this.city = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.postalCode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.country = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                __runInitializers(this, _country_extraInitializers);
            }
            UserAddress._OPENAPI_METADATA_FACTORY = function () {
                return { street: { required: true, type: function () { return String; }, maxLength: 100 }, city: { required: true, type: function () { return String; }, maxLength: 100 }, state: { required: true, type: function () { return String; }, maxLength: 100 }, postalCode: { required: true, type: function () { return String; }, maxLength: 20 }, country: { required: true, type: function () { return String; }, maxLength: 100 } };
            };
            return UserAddress;
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
exports.UserAddress = UserAddress;
var EmergencyContact = function () {
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
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EmergencyContact() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.relationship = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _relationship_initializers, void 0));
                this.phone = (__runInitializers(this, _relationship_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.address = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                __runInitializers(this, _address_extraInitializers);
            }
            EmergencyContact._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, maxLength: 100 }, relationship: { required: true, type: function () { return String; }, maxLength: 100 }, phone: { required: true, type: function () { return String; } }, address: { required: false, type: function () { return String; }, maxLength: 200 } };
            };
            return EmergencyContact;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _relationship_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _phone_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsPhoneNumber)()];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _relationship_decorators, { kind: "field", name: "relationship", static: false, private: false, access: { has: function (obj) { return "relationship" in obj; }, get: function (obj) { return obj.relationship; }, set: function (obj, value) { obj.relationship = value; } }, metadata: _metadata }, _relationship_initializers, _relationship_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.EmergencyContact = EmergencyContact;
var CreateUserDto = function () {
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
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _department_decorators;
    var _department_initializers = [];
    var _department_extraInitializers = [];
    var _employeeId_decorators;
    var _employeeId_initializers = [];
    var _employeeId_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _emergencyContact_decorators;
    var _emergencyContact_initializers = [];
    var _emergencyContact_extraInitializers = [];
    var _licenseNumber_decorators;
    var _licenseNumber_initializers = [];
    var _licenseNumber_extraInitializers = [];
    var _specialization_decorators;
    var _specialization_initializers = [];
    var _specialization_extraInitializers = [];
    var _qualifications_decorators;
    var _qualifications_initializers = [];
    var _qualifications_extraInitializers = [];
    var _certifications_decorators;
    var _certifications_initializers = [];
    var _certifications_extraInitializers = [];
    var _isOnCall_decorators;
    var _isOnCall_initializers = [];
    var _isOnCall_extraInitializers = [];
    var _languages_decorators;
    var _languages_initializers = [];
    var _languages_extraInitializers = [];
    var _requirePasswordChange_decorators;
    var _requirePasswordChange_initializers = [];
    var _requirePasswordChange_extraInitializers = [];
    var _preferences_decorators;
    var _preferences_initializers = [];
    var _preferences_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateUserDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.phoneNumber = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
                this.role = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.title = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.department = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _department_initializers, void 0));
                this.employeeId = (__runInitializers(this, _department_extraInitializers), __runInitializers(this, _employeeId_initializers, void 0));
                this.address = (__runInitializers(this, _employeeId_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.emergencyContact = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _emergencyContact_initializers, void 0));
                this.licenseNumber = (__runInitializers(this, _emergencyContact_extraInitializers), __runInitializers(this, _licenseNumber_initializers, void 0));
                this.specialization = (__runInitializers(this, _licenseNumber_extraInitializers), __runInitializers(this, _specialization_initializers, void 0));
                this.qualifications = (__runInitializers(this, _specialization_extraInitializers), __runInitializers(this, _qualifications_initializers, void 0));
                this.certifications = (__runInitializers(this, _qualifications_extraInitializers), __runInitializers(this, _certifications_initializers, void 0));
                this.isOnCall = (__runInitializers(this, _certifications_extraInitializers), __runInitializers(this, _isOnCall_initializers, void 0));
                this.languages = (__runInitializers(this, _isOnCall_extraInitializers), __runInitializers(this, _languages_initializers, void 0));
                this.requirePasswordChange = (__runInitializers(this, _languages_extraInitializers), __runInitializers(this, _requirePasswordChange_initializers, true));
                this.preferences = (__runInitializers(this, _requirePasswordChange_extraInitializers), __runInitializers(this, _preferences_initializers, void 0));
                this.metadata = (__runInitializers(this, _preferences_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateUserDto._OPENAPI_METADATA_FACTORY = function () {
                return { firstName: { required: true, type: function () { return String; }, minLength: 2, maxLength: 50 }, lastName: { required: true, type: function () { return String; }, minLength: 2, maxLength: 50 }, email: { required: true, type: function () { return String; }, maxLength: 100, format: "email" }, password: { required: true, type: function () { return String; }, minLength: 8, maxLength: 100, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/" }, phoneNumber: { required: true, type: function () { return String; } }, role: { required: true, enum: require("../enums/role.enum").Role }, title: { required: false, type: function () { return String; }, maxLength: 100 }, department: { required: false, type: function () { return String; }, maxLength: 100 }, employeeId: { required: false, type: function () { return String; }, maxLength: 50 }, address: { required: false, type: function () { return require("./create-user.dto").UserAddress; } }, emergencyContact: { required: false, type: function () { return require("./create-user.dto").EmergencyContact; } }, licenseNumber: { required: false, type: function () { return String; }, maxLength: 50 }, specialization: { required: false, type: function () { return String; }, maxLength: 50 }, qualifications: { required: false, type: function () { return [String]; } }, certifications: { required: false, type: function () { return [String]; } }, isOnCall: { required: false, type: function () { return Boolean; } }, languages: { required: false, type: function () { return [String]; } }, requirePasswordChange: { required: false, type: function () { return Boolean; }, default: true }, preferences: { required: false, type: function () { return ({ theme: { required: false, type: function () { return String; } }, notifications: { required: false, type: function () { return ({ email: { required: false, type: function () { return Boolean; } }, sms: { required: false, type: function () { return Boolean; } }, inApp: { required: false, type: function () { return Boolean; } } }); } }, timezone: { required: false, type: function () { return String; } }, language: { required: false, type: function () { return String; } } }); } }, metadata: { required: false, type: function () { return Object; } } };
            };
            return CreateUserDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _lastName_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(50)];
            _email_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsEmail)(), (0, class_validator_1.MaxLength)(100)];
            _password_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8), (0, class_validator_1.MaxLength)(100), (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                })];
            _phoneNumber_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsPhoneNumber)()];
            _role_decorators = [(0, swagger_1.ApiProperty)({ enum: role_enum_1.Role }), (0, class_validator_1.IsEnum)(role_enum_1.Role)];
            _title_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _department_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _employeeId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return UserAddress; })];
            _emergencyContact_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return EmergencyContact; })];
            _licenseNumber_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _specialization_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _qualifications_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _certifications_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _isOnCall_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _languages_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _requirePasswordChange_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _preferences_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)()];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _department_decorators, { kind: "field", name: "department", static: false, private: false, access: { has: function (obj) { return "department" in obj; }, get: function (obj) { return obj.department; }, set: function (obj, value) { obj.department = value; } }, metadata: _metadata }, _department_initializers, _department_extraInitializers);
            __esDecorate(null, null, _employeeId_decorators, { kind: "field", name: "employeeId", static: false, private: false, access: { has: function (obj) { return "employeeId" in obj; }, get: function (obj) { return obj.employeeId; }, set: function (obj, value) { obj.employeeId = value; } }, metadata: _metadata }, _employeeId_initializers, _employeeId_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _emergencyContact_decorators, { kind: "field", name: "emergencyContact", static: false, private: false, access: { has: function (obj) { return "emergencyContact" in obj; }, get: function (obj) { return obj.emergencyContact; }, set: function (obj, value) { obj.emergencyContact = value; } }, metadata: _metadata }, _emergencyContact_initializers, _emergencyContact_extraInitializers);
            __esDecorate(null, null, _licenseNumber_decorators, { kind: "field", name: "licenseNumber", static: false, private: false, access: { has: function (obj) { return "licenseNumber" in obj; }, get: function (obj) { return obj.licenseNumber; }, set: function (obj, value) { obj.licenseNumber = value; } }, metadata: _metadata }, _licenseNumber_initializers, _licenseNumber_extraInitializers);
            __esDecorate(null, null, _specialization_decorators, { kind: "field", name: "specialization", static: false, private: false, access: { has: function (obj) { return "specialization" in obj; }, get: function (obj) { return obj.specialization; }, set: function (obj, value) { obj.specialization = value; } }, metadata: _metadata }, _specialization_initializers, _specialization_extraInitializers);
            __esDecorate(null, null, _qualifications_decorators, { kind: "field", name: "qualifications", static: false, private: false, access: { has: function (obj) { return "qualifications" in obj; }, get: function (obj) { return obj.qualifications; }, set: function (obj, value) { obj.qualifications = value; } }, metadata: _metadata }, _qualifications_initializers, _qualifications_extraInitializers);
            __esDecorate(null, null, _certifications_decorators, { kind: "field", name: "certifications", static: false, private: false, access: { has: function (obj) { return "certifications" in obj; }, get: function (obj) { return obj.certifications; }, set: function (obj, value) { obj.certifications = value; } }, metadata: _metadata }, _certifications_initializers, _certifications_extraInitializers);
            __esDecorate(null, null, _isOnCall_decorators, { kind: "field", name: "isOnCall", static: false, private: false, access: { has: function (obj) { return "isOnCall" in obj; }, get: function (obj) { return obj.isOnCall; }, set: function (obj, value) { obj.isOnCall = value; } }, metadata: _metadata }, _isOnCall_initializers, _isOnCall_extraInitializers);
            __esDecorate(null, null, _languages_decorators, { kind: "field", name: "languages", static: false, private: false, access: { has: function (obj) { return "languages" in obj; }, get: function (obj) { return obj.languages; }, set: function (obj, value) { obj.languages = value; } }, metadata: _metadata }, _languages_initializers, _languages_extraInitializers);
            __esDecorate(null, null, _requirePasswordChange_decorators, { kind: "field", name: "requirePasswordChange", static: false, private: false, access: { has: function (obj) { return "requirePasswordChange" in obj; }, get: function (obj) { return obj.requirePasswordChange; }, set: function (obj, value) { obj.requirePasswordChange = value; } }, metadata: _metadata }, _requirePasswordChange_initializers, _requirePasswordChange_extraInitializers);
            __esDecorate(null, null, _preferences_decorators, { kind: "field", name: "preferences", static: false, private: false, access: { has: function (obj) { return "preferences" in obj; }, get: function (obj) { return obj.preferences; }, set: function (obj, value) { obj.preferences = value; } }, metadata: _metadata }, _preferences_initializers, _preferences_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map