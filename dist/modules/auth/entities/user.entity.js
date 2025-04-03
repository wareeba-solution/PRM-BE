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
exports.User = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/entities/user.entity.ts
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var role_enum_1 = require("../../users/enums/role.enum");
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
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
    var _permissions_decorators;
    var _permissions_initializers = [];
    var _permissions_extraInitializers = [];
    var _isEmailVerified_decorators;
    var _isEmailVerified_initializers = [];
    var _isEmailVerified_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _lastLoginAt_decorators;
    var _lastLoginAt_initializers = [];
    var _lastLoginAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    var _refreshTokenExpiresAt_decorators;
    var _refreshTokenExpiresAt_initializers = [];
    var _refreshTokenExpiresAt_extraInitializers = [];
    var _passwordResetToken_decorators;
    var _passwordResetToken_initializers = [];
    var _passwordResetToken_extraInitializers = [];
    var _passwordResetExpiresAt_decorators;
    var _passwordResetExpiresAt_initializers = [];
    var _passwordResetExpiresAt_extraInitializers = [];
    var _normalizeEmail_decorators;
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.firstName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
            this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.phone = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.role = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.permissions = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _permissions_initializers, void 0));
            this.isEmailVerified = (__runInitializers(this, _permissions_extraInitializers), __runInitializers(this, _isEmailVerified_initializers, void 0));
            this.isActive = (__runInitializers(this, _isEmailVerified_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.lastLoginAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
            this.organization = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.organizationId = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.createdBy = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.createdAt = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.refreshToken = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _refreshToken_initializers, void 0));
            this.refreshTokenExpiresAt = (__runInitializers(this, _refreshToken_extraInitializers), __runInitializers(this, _refreshTokenExpiresAt_initializers, void 0));
            this.passwordResetToken = (__runInitializers(this, _refreshTokenExpiresAt_extraInitializers), __runInitializers(this, _passwordResetToken_initializers, void 0));
            this.passwordResetExpiresAt = (__runInitializers(this, _passwordResetToken_extraInitializers), __runInitializers(this, _passwordResetExpiresAt_initializers, void 0));
            __runInitializers(this, _passwordResetExpiresAt_extraInitializers);
        }
        Object.defineProperty(User_1.prototype, "fullName", {
            // Virtual property for full name
            get: function () {
                return "".concat(this.firstName, " ").concat(this.lastName);
            },
            enumerable: false,
            configurable: true
        });
        User_1.prototype.normalizeEmail = function () {
            if (this.email) {
                this.email = this.email.toLowerCase().trim();
            }
        };
        User_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, firstName: { required: true, type: function () { return String; } }, lastName: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, role: { required: true, enum: require("../../users/enums/role.enum").Role }, permissions: { required: true, type: function () { return [String]; } }, isEmailVerified: { required: true, type: function () { return Boolean; } }, isActive: { required: true, type: function () { return Boolean; } }, lastLoginAt: { required: true, type: function () { return Date; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, organizationId: { required: true, type: function () { return String; } }, createdBy: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedBy: { required: false, type: function () { return String; } }, updatedAt: { required: true, type: function () { return Date; } }, refreshToken: { required: false, type: function () { return String; } }, refreshTokenExpiresAt: { required: false, type: function () { return Date; } }, passwordResetToken: { required: false, type: function () { return String; } }, passwordResetExpiresAt: { required: false, type: function () { return Date; } } };
        };
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _firstName_decorators = [(0, typeorm_1.Column)({ length: 50 })];
        _lastName_decorators = [(0, typeorm_1.Column)({ length: 50 })];
        _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _password_decorators = [(0, typeorm_1.Column)(), (0, class_transformer_1.Exclude)()];
        _phone_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _role_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: role_enum_1.Role,
                default: role_enum_1.Role.STAFF
            })];
        _permissions_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _isEmailVerified_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _lastLoginAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }, { nullable: false }), (0, typeorm_1.JoinColumn)({ name: 'organization_id' })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ name: 'organization_id' })];
        _createdBy_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedBy_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _refreshToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _refreshTokenExpiresAt_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _passwordResetToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _passwordResetExpiresAt_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _normalizeEmail_decorators = [(0, typeorm_1.BeforeInsert)(), (0, typeorm_1.BeforeUpdate)()];
        __esDecorate(_classThis, null, _normalizeEmail_decorators, { kind: "method", name: "normalizeEmail", static: false, private: false, access: { has: function (obj) { return "normalizeEmail" in obj; }, get: function (obj) { return obj.normalizeEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
        __esDecorate(null, null, _isEmailVerified_decorators, { kind: "field", name: "isEmailVerified", static: false, private: false, access: { has: function (obj) { return "isEmailVerified" in obj; }, get: function (obj) { return obj.isEmailVerified; }, set: function (obj, value) { obj.isEmailVerified = value; } }, metadata: _metadata }, _isEmailVerified_initializers, _isEmailVerified_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: function (obj) { return "lastLoginAt" in obj; }, get: function (obj) { return obj.lastLoginAt; }, set: function (obj, value) { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
        __esDecorate(null, null, _refreshTokenExpiresAt_decorators, { kind: "field", name: "refreshTokenExpiresAt", static: false, private: false, access: { has: function (obj) { return "refreshTokenExpiresAt" in obj; }, get: function (obj) { return obj.refreshTokenExpiresAt; }, set: function (obj, value) { obj.refreshTokenExpiresAt = value; } }, metadata: _metadata }, _refreshTokenExpiresAt_initializers, _refreshTokenExpiresAt_extraInitializers);
        __esDecorate(null, null, _passwordResetToken_decorators, { kind: "field", name: "passwordResetToken", static: false, private: false, access: { has: function (obj) { return "passwordResetToken" in obj; }, get: function (obj) { return obj.passwordResetToken; }, set: function (obj, value) { obj.passwordResetToken = value; } }, metadata: _metadata }, _passwordResetToken_initializers, _passwordResetToken_extraInitializers);
        __esDecorate(null, null, _passwordResetExpiresAt_decorators, { kind: "field", name: "passwordResetExpiresAt", static: false, private: false, access: { has: function (obj) { return "passwordResetExpiresAt" in obj; }, get: function (obj) { return obj.passwordResetExpiresAt; }, set: function (obj, value) { obj.passwordResetExpiresAt = value; } }, metadata: _metadata }, _passwordResetExpiresAt_initializers, _passwordResetExpiresAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
//# sourceMappingURL=user.entity.js.map