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
exports.RefreshToken = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/auth/entities/refresh-token.entity.ts
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var RefreshToken = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('refresh_tokens'), (0, typeorm_1.Index)(['token']), (0, typeorm_1.Index)(['userId', 'deviceId'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _isRevoked_decorators;
    var _isRevoked_initializers = [];
    var _isRevoked_extraInitializers = [];
    var _deviceId_decorators;
    var _deviceId_initializers = [];
    var _deviceId_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _revokedAt_decorators;
    var _revokedAt_initializers = [];
    var _revokedAt_extraInitializers = [];
    var _revokedBy_decorators;
    var _revokedBy_initializers = [];
    var _revokedBy_extraInitializers = [];
    var _revokedReason_decorators;
    var _revokedReason_initializers = [];
    var _revokedReason_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var RefreshToken = _classThis = /** @class */ (function () {
        function RefreshToken_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.organizationId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.token = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _token_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.isRevoked = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _isRevoked_initializers, void 0));
            this.deviceId = (__runInitializers(this, _isRevoked_extraInitializers), __runInitializers(this, _deviceId_initializers, void 0));
            this.userAgent = (__runInitializers(this, _deviceId_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.metadata = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.revokedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _revokedAt_initializers, void 0));
            this.revokedBy = (__runInitializers(this, _revokedAt_extraInitializers), __runInitializers(this, _revokedBy_initializers, void 0));
            this.revokedReason = (__runInitializers(this, _revokedBy_extraInitializers), __runInitializers(this, _revokedReason_initializers, void 0));
            this.user = (__runInitializers(this, _revokedReason_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        // Helper methods
        RefreshToken_1.prototype.isExpired = function () {
            return new Date() > this.expiresAt;
        };
        RefreshToken_1.prototype.isValid = function () {
            return !this.isRevoked && !this.isExpired();
        };
        RefreshToken_1.prototype.revoke = function (userId, reason) {
            this.isRevoked = true;
            this.revokedAt = new Date();
            this.revokedBy = userId;
            this.revokedReason = reason;
        };
        RefreshToken_1.prototype.updateLastUsed = function () {
            if (this.metadata) {
                this.metadata.lastUsed = new Date();
            }
        };
        RefreshToken_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, token: { required: true, type: function () { return String; } }, expiresAt: { required: true, type: function () { return Date; } }, isRevoked: { required: true, type: function () { return Boolean; } }, deviceId: { required: true, type: function () { return String; } }, userAgent: { required: true, type: function () { return String; } }, ipAddress: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return ({ platform: { required: false, type: function () { return String; } }, browser: { required: false, type: function () { return String; } }, location: { required: false, type: function () { return String; } }, lastUsed: { required: false, type: function () { return Date; } } }); } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, revokedAt: { required: true, type: function () { return Date; } }, revokedBy: { required: true, type: function () { return String; } }, revokedReason: { required: true, type: function () { return String; } }, user: { required: true, type: function () { return require("../../users/entities/user.entity").User; } } };
        };
        return RefreshToken_1;
    }());
    __setFunctionName(_classThis, "RefreshToken");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _token_decorators = [(0, typeorm_1.Column)({ type: 'text', unique: true })];
        _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone' })];
        _isRevoked_decorators = [(0, typeorm_1.Column)({ default: false })];
        _deviceId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' })];
        _revokedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _revokedBy_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _revokedReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _isRevoked_decorators, { kind: "field", name: "isRevoked", static: false, private: false, access: { has: function (obj) { return "isRevoked" in obj; }, get: function (obj) { return obj.isRevoked; }, set: function (obj, value) { obj.isRevoked = value; } }, metadata: _metadata }, _isRevoked_initializers, _isRevoked_extraInitializers);
        __esDecorate(null, null, _deviceId_decorators, { kind: "field", name: "deviceId", static: false, private: false, access: { has: function (obj) { return "deviceId" in obj; }, get: function (obj) { return obj.deviceId; }, set: function (obj, value) { obj.deviceId = value; } }, metadata: _metadata }, _deviceId_initializers, _deviceId_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _revokedAt_decorators, { kind: "field", name: "revokedAt", static: false, private: false, access: { has: function (obj) { return "revokedAt" in obj; }, get: function (obj) { return obj.revokedAt; }, set: function (obj, value) { obj.revokedAt = value; } }, metadata: _metadata }, _revokedAt_initializers, _revokedAt_extraInitializers);
        __esDecorate(null, null, _revokedBy_decorators, { kind: "field", name: "revokedBy", static: false, private: false, access: { has: function (obj) { return "revokedBy" in obj; }, get: function (obj) { return obj.revokedBy; }, set: function (obj, value) { obj.revokedBy = value; } }, metadata: _metadata }, _revokedBy_initializers, _revokedBy_extraInitializers);
        __esDecorate(null, null, _revokedReason_decorators, { kind: "field", name: "revokedReason", static: false, private: false, access: { has: function (obj) { return "revokedReason" in obj; }, get: function (obj) { return obj.revokedReason; }, set: function (obj, value) { obj.revokedReason = value; } }, metadata: _metadata }, _revokedReason_initializers, _revokedReason_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RefreshToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RefreshToken = _classThis;
}();
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refresh-token.entity.js.map