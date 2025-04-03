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
exports.ResetPasswordDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/dto/reset-password.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ResetPasswordDto = function () {
    var _a;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _passwordConfirmation_decorators;
    var _passwordConfirmation_initializers = [];
    var _passwordConfirmation_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ResetPasswordDto() {
                this.token = __runInitializers(this, _token_initializers, void 0);
                this.password = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.passwordConfirmation = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _passwordConfirmation_initializers, void 0));
                __runInitializers(this, _passwordConfirmation_extraInitializers);
            }
            ResetPasswordDto._OPENAPI_METADATA_FACTORY = function () {
                return { token: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; }, minLength: 8, pattern: "/((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/" }, passwordConfirmation: { required: true, type: function () { return String; } } };
            };
            return ResetPasswordDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _token_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Reset token received via email',
                    example: 'abcdef123456789'
                }), (0, class_validator_1.IsNotEmpty)({ message: 'Token is required' }), (0, class_validator_1.IsString)({ message: 'Token must be a string' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'New password',
                    example: 'StrongP@ssw0rd!'
                }), (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }), (0, class_validator_1.IsString)({ message: 'Password must be a string' }), (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }), (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
                    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character'
                })];
            _passwordConfirmation_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Confirm new password',
                    example: 'StrongP@ssw0rd!'
                }), (0, class_validator_1.IsNotEmpty)({ message: 'Password confirmation is required' }), (0, class_validator_1.IsString)({ message: 'Password confirmation must be a string' })];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _passwordConfirmation_decorators, { kind: "field", name: "passwordConfirmation", static: false, private: false, access: { has: function (obj) { return "passwordConfirmation" in obj; }, get: function (obj) { return obj.passwordConfirmation; }, set: function (obj, value) { obj.passwordConfirmation = value; } }, metadata: _metadata }, _passwordConfirmation_initializers, _passwordConfirmation_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ResetPasswordDto = ResetPasswordDto;
//# sourceMappingURL=reset-password.dto.js.map