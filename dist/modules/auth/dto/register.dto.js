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
exports.RegisterDto = exports.RegisterOrganizationDto = exports.RegisterUserDto = exports.OrganizationAddressDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/dto/register.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var role_enum_1 = require("../../users/enums/role.enum");
var subscription_plan_enum_1 = require("../../organizations/enums/subscription-plan.enum");
var OrganizationAddressDto = function () {
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
            function OrganizationAddressDto() {
                this.street = __runInitializers(this, _street_initializers, void 0);
                this.city = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.postalCode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _postalCode_initializers, void 0));
                this.country = (__runInitializers(this, _postalCode_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                __runInitializers(this, _country_extraInitializers);
            }
            OrganizationAddressDto._OPENAPI_METADATA_FACTORY = function () {
                return { street: { required: true, type: function () { return String; } }, city: { required: true, type: function () { return String; } }, state: { required: true, type: function () { return String; } }, postalCode: { required: true, type: function () { return String; } }, country: { required: true, type: function () { return String; } } };
            };
            return OrganizationAddressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _street_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _city_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _state_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _postalCode_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _country_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: function (obj) { return "street" in obj; }, get: function (obj) { return obj.street; }, set: function (obj, value) { obj.street = value; } }, metadata: _metadata }, _street_initializers, _street_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _postalCode_decorators, { kind: "field", name: "postalCode", static: false, private: false, access: { has: function (obj) { return "postalCode" in obj; }, get: function (obj) { return obj.postalCode; }, set: function (obj, value) { obj.postalCode = value; } }, metadata: _metadata }, _postalCode_initializers, _postalCode_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.OrganizationAddressDto = OrganizationAddressDto;
var RegisterUserDto = function () {
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
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterUserDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.phone = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.role = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                __runInitializers(this, _role_extraInitializers);
            }
            RegisterUserDto._OPENAPI_METADATA_FACTORY = function () {
                return { firstName: { required: true, type: function () { return String; }, minLength: 2, maxLength: 50 }, lastName: { required: true, type: function () { return String; }, minLength: 2, maxLength: 50 }, email: { required: true, type: function () { return String; }, format: "email" }, password: { required: true, type: function () { return String; }, minLength: 8, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/" }, phone: { required: false, type: function () { return String; } }, role: { required: false, enum: require("../../users/enums/role.enum").Role } };
            };
            return RegisterUserDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User first name',
                    example: 'John',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }), (0, class_validator_1.MinLength)(2, { message: 'First name must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(50, { message: 'First name must not exceed 50 characters' })];
            _lastName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User last name',
                    example: 'Doe',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }), (0, class_validator_1.MinLength)(2, { message: 'Last name must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(50, { message: 'Last name must not exceed 50 characters' })];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User email address',
                    example: 'john.doe@example.com',
                }), (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }), (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User password',
                    example: 'Password123!',
                    minLength: 8,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }), (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }), (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                })];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User phone number',
                    example: '+1234567890',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' })];
            _role_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: role_enum_1.Role,
                    description: 'User role',
                    default: role_enum_1.Role.ADMIN,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(role_enum_1.Role)];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterUserDto = RegisterUserDto;
var RegisterOrganizationDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _website_decorators;
    var _website_initializers = [];
    var _website_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _subscriptionPlan_decorators;
    var _subscriptionPlan_initializers = [];
    var _subscriptionPlan_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterOrganizationDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.website = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _website_initializers, void 0));
                this.phone = (__runInitializers(this, _website_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.address = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.subscriptionPlan = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _subscriptionPlan_initializers, void 0));
                __runInitializers(this, _subscriptionPlan_extraInitializers);
            }
            RegisterOrganizationDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, minLength: 2, maxLength: 100 }, website: { required: false, type: function () { return String; }, pattern: "/^https?:\\/\\/.+\\..+$/" }, phone: { required: false, type: function () { return String; } }, address: { required: false, type: function () { return require("./register.dto").OrganizationAddressDto; } }, subscriptionPlan: { required: false, enum: require("../../organizations/enums/subscription-plan.enum").SubscriptionPlan } };
            };
            return RegisterOrganizationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Organization name',
                    example: 'Acme Medical Center',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'Organization name is required' }), (0, class_validator_1.MinLength)(2, { message: 'Organization name must be at least 2 characters long' }), (0, class_validator_1.MaxLength)(100, { message: 'Organization name must not exceed 100 characters' })];
            _website_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization website',
                    example: 'https://www.acmemedical.com',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^https?:\/\/.+\..+$/, {
                    message: 'Please enter a valid website URL',
                })];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization phone number',
                    example: '+1234567890',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Please enter a valid phone number' })];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization address',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return OrganizationAddressDto; })];
            _subscriptionPlan_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: subscription_plan_enum_1.SubscriptionPlan,
                    description: 'Subscription plan',
                    default: subscription_plan_enum_1.SubscriptionPlan.BASIC,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(subscription_plan_enum_1.SubscriptionPlan)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _website_decorators, { kind: "field", name: "website", static: false, private: false, access: { has: function (obj) { return "website" in obj; }, get: function (obj) { return obj.website; }, set: function (obj, value) { obj.website = value; } }, metadata: _metadata }, _website_initializers, _website_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _subscriptionPlan_decorators, { kind: "field", name: "subscriptionPlan", static: false, private: false, access: { has: function (obj) { return "subscriptionPlan" in obj; }, get: function (obj) { return obj.subscriptionPlan; }, set: function (obj, value) { obj.subscriptionPlan = value; } }, metadata: _metadata }, _subscriptionPlan_initializers, _subscriptionPlan_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterOrganizationDto = RegisterOrganizationDto;
var RegisterDto = function () {
    var _a;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RegisterDto() {
                this.user = __runInitializers(this, _user_initializers, void 0);
                this.organization = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
                __runInitializers(this, _organization_extraInitializers);
            }
            RegisterDto._OPENAPI_METADATA_FACTORY = function () {
                return { user: { required: true, type: function () { return require("./register.dto").RegisterUserDto; } }, organization: { required: true, type: function () { return require("./register.dto").RegisterOrganizationDto; } } };
            };
            return RegisterDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _user_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return RegisterUserDto; })];
            _organization_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return RegisterOrganizationDto; })];
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map