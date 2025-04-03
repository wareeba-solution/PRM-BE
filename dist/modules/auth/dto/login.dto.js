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
exports.LoginDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/dto/login.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var LoginDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _rememberMe_decorators;
    var _rememberMe_initializers = [];
    var _rememberMe_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _deviceId_decorators;
    var _deviceId_initializers = [];
    var _deviceId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LoginDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.rememberMe = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _rememberMe_initializers, void 0));
                this.organizationId = (__runInitializers(this, _rememberMe_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
                this.deviceId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _deviceId_initializers, void 0));
                __runInitializers(this, _deviceId_extraInitializers);
            }
            LoginDto._OPENAPI_METADATA_FACTORY = function () {
                return { email: { required: true, type: function () { return String; }, format: "email" }, password: { required: true, type: function () { return String; }, minLength: 8 }, rememberMe: { required: false, type: function () { return Boolean; } }, organizationId: { required: false, type: function () { return String; } }, deviceId: { required: false, type: function () { return String; } } };
            };
            return LoginDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User email address',
                    example: 'john.doe@example.com',
                }), (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }), (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User password',
                    example: 'Password123!',
                    minLength: 8,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }), (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' })];
            _rememberMe_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Remember user session',
                    default: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _organizationId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Organization identifier for multi-tenant applications',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _deviceId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Device identifier for multi-device management',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _rememberMe_decorators, { kind: "field", name: "rememberMe", static: false, private: false, access: { has: function (obj) { return "rememberMe" in obj; }, get: function (obj) { return obj.rememberMe; }, set: function (obj, value) { obj.rememberMe = value; } }, metadata: _metadata }, _rememberMe_initializers, _rememberMe_extraInitializers);
            __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
            __esDecorate(null, null, _deviceId_decorators, { kind: "field", name: "deviceId", static: false, private: false, access: { has: function (obj) { return "deviceId" in obj; }, get: function (obj) { return obj.deviceId; }, set: function (obj, value) { obj.deviceId = value; } }, metadata: _metadata }, _deviceId_initializers, _deviceId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map