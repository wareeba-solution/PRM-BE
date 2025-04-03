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
exports.UserSession = exports.SessionStatus = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["ACTIVE"] = "ACTIVE";
    SessionStatus["EXPIRED"] = "EXPIRED";
    SessionStatus["REVOKED"] = "REVOKED";
    SessionStatus["LOGGED_OUT"] = "LOGGED_OUT";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
var UserSession = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('user_sessions')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _lastActivityAt_decorators;
    var _lastActivityAt_initializers = [];
    var _lastActivityAt_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _deviceId_decorators;
    var _deviceId_initializers = [];
    var _deviceId_extraInitializers = [];
    var _deviceType_decorators;
    var _deviceType_initializers = [];
    var _deviceType_extraInitializers = [];
    var _browser_decorators;
    var _browser_initializers = [];
    var _browser_extraInitializers = [];
    var _operatingSystem_decorators;
    var _operatingSystem_initializers = [];
    var _operatingSystem_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _isMobile_decorators;
    var _isMobile_initializers = [];
    var _isMobile_extraInitializers = [];
    var _isRemembered_decorators;
    var _isRemembered_initializers = [];
    var _isRemembered_extraInitializers = [];
    var _revokedAt_decorators;
    var _revokedAt_initializers = [];
    var _revokedAt_extraInitializers = [];
    var _revokedBy_decorators;
    var _revokedBy_initializers = [];
    var _revokedBy_extraInitializers = [];
    var _revokedReason_decorators;
    var _revokedReason_initializers = [];
    var _revokedReason_extraInitializers = [];
    var _tokenRotationCount_decorators;
    var _tokenRotationCount_initializers = [];
    var _tokenRotationCount_extraInitializers = [];
    var _lastTokenRotation_decorators;
    var _lastTokenRotation_initializers = [];
    var _lastTokenRotation_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var UserSession = _classThis = /** @class */ (function () {
        function UserSession_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.organizationId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.token = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _token_initializers, void 0));
            this.refreshToken = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _refreshToken_initializers, void 0));
            this.status = (__runInitializers(this, _refreshToken_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.lastActivityAt = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _lastActivityAt_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _lastActivityAt_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.deviceId = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _deviceId_initializers, void 0));
            this.deviceType = (__runInitializers(this, _deviceId_extraInitializers), __runInitializers(this, _deviceType_initializers, void 0));
            this.browser = (__runInitializers(this, _deviceType_extraInitializers), __runInitializers(this, _browser_initializers, void 0));
            this.operatingSystem = (__runInitializers(this, _browser_extraInitializers), __runInitializers(this, _operatingSystem_initializers, void 0));
            this.location = (__runInitializers(this, _operatingSystem_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.metadata = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.isMobile = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _isMobile_initializers, void 0));
            this.isRemembered = (__runInitializers(this, _isMobile_extraInitializers), __runInitializers(this, _isRemembered_initializers, void 0));
            this.revokedAt = (__runInitializers(this, _isRemembered_extraInitializers), __runInitializers(this, _revokedAt_initializers, void 0));
            this.revokedBy = (__runInitializers(this, _revokedAt_extraInitializers), __runInitializers(this, _revokedBy_initializers, void 0));
            this.revokedReason = (__runInitializers(this, _revokedBy_extraInitializers), __runInitializers(this, _revokedReason_initializers, void 0));
            this.tokenRotationCount = (__runInitializers(this, _revokedReason_extraInitializers), __runInitializers(this, _tokenRotationCount_initializers, void 0));
            this.lastTokenRotation = (__runInitializers(this, _tokenRotationCount_extraInitializers), __runInitializers(this, _lastTokenRotation_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastTokenRotation_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        /**
         * Check if session is expired
         */
        UserSession_1.prototype.isExpired = function () {
            return new Date() > this.expiresAt;
        };
        /**
         * Check if session is active
         */
        UserSession_1.prototype.isActive = function () {
            return (this.status === SessionStatus.ACTIVE &&
                !this.isExpired());
        };
        /**
         * Check if session can be extended
         */
        UserSession_1.prototype.canBeExtended = function () {
            return (this.isActive() &&
                this.isRemembered &&
                this.tokenRotationCount < 10);
        };
        /**
         * Check if session requires rotation
         */
        UserSession_1.prototype.requiresRotation = function () {
            if (!this.lastTokenRotation) {
                return false;
            }
            var rotationThreshold = 24 * 60 * 60 * 1000; // 24 hours
            var timeSinceLastRotation = Date.now() - this.lastTokenRotation.getTime();
            return timeSinceLastRotation >= rotationThreshold;
        };
        /**
         * Extend session expiry
         */
        UserSession_1.prototype.extend = function (duration) {
            if (!this.canBeExtended()) {
                throw new Error('Session cannot be extended');
            }
            var newExpiryDate = new Date();
            newExpiryDate.setTime(newExpiryDate.getTime() + duration);
            this.expiresAt = newExpiryDate;
            this.tokenRotationCount += 1;
            this.lastTokenRotation = new Date();
        };
        /**
         * Update last activity
         */
        UserSession_1.prototype.updateActivity = function () {
            this.lastActivityAt = new Date();
        };
        /**
         * Revoke session
         */
        UserSession_1.prototype.revoke = function (revokedBy, reason) {
            if (reason === void 0) { reason = ''; }
            this.status = SessionStatus.REVOKED;
            this.revokedAt = new Date();
            this.revokedBy = revokedBy;
            this.revokedReason = reason;
        };
        /**
         * Mark session as logged out
         */
        UserSession_1.prototype.logout = function () {
            this.status = SessionStatus.LOGGED_OUT;
        };
        /**
         * Check if session is from same IP
         */
        UserSession_1.prototype.isSameIp = function (ip) {
            return this.ipAddress === ip;
        };
        /**
         * Check if session is from same device
         */
        UserSession_1.prototype.isSameDevice = function (deviceId) {
            return this.deviceId === deviceId;
        };
        UserSession_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, user: { required: true, type: function () { return require("./user.entity").User; } }, organizationId: { required: true, type: function () { return String; } }, token: { required: true, type: function () { return String; } }, refreshToken: { required: true, type: function () { return String; } }, status: { required: true, enum: require("./user-session.entity").SessionStatus }, expiresAt: { required: true, type: function () { return Date; } }, lastActivityAt: { required: true, type: function () { return Date; } }, ipAddress: { required: true, type: function () { return String; } }, userAgent: { required: true, type: function () { return String; } }, deviceId: { required: true, type: function () { return String; } }, deviceType: { required: true, type: function () { return String; } }, browser: { required: true, type: function () { return String; } }, operatingSystem: { required: true, type: function () { return String; } }, location: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, isMobile: { required: true, type: function () { return Boolean; } }, isRemembered: { required: true, type: function () { return Boolean; } }, revokedAt: { required: true, type: function () { return Date; } }, revokedBy: { required: true, type: function () { return String; } }, revokedReason: { required: true, type: function () { return String; } }, tokenRotationCount: { required: true, type: function () { return Number; } }, lastTokenRotation: { required: true, type: function () { return Date; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return UserSession_1;
    }());
    __setFunctionName(_classThis, "UserSession");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _token_decorators = [(0, typeorm_1.Column)({ unique: true }), (0, typeorm_1.Index)()];
        _refreshToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: SessionStatus,
                default: SessionStatus.ACTIVE
            })];
        _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _lastActivityAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _deviceId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _deviceType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _browser_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _operatingSystem_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _location_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isMobile_decorators = [(0, typeorm_1.Column)({ default: false })];
        _isRemembered_decorators = [(0, typeorm_1.Column)({ default: false })];
        _revokedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _revokedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _revokedReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _tokenRotationCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _lastTokenRotation_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _lastActivityAt_decorators, { kind: "field", name: "lastActivityAt", static: false, private: false, access: { has: function (obj) { return "lastActivityAt" in obj; }, get: function (obj) { return obj.lastActivityAt; }, set: function (obj, value) { obj.lastActivityAt = value; } }, metadata: _metadata }, _lastActivityAt_initializers, _lastActivityAt_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _deviceId_decorators, { kind: "field", name: "deviceId", static: false, private: false, access: { has: function (obj) { return "deviceId" in obj; }, get: function (obj) { return obj.deviceId; }, set: function (obj, value) { obj.deviceId = value; } }, metadata: _metadata }, _deviceId_initializers, _deviceId_extraInitializers);
        __esDecorate(null, null, _deviceType_decorators, { kind: "field", name: "deviceType", static: false, private: false, access: { has: function (obj) { return "deviceType" in obj; }, get: function (obj) { return obj.deviceType; }, set: function (obj, value) { obj.deviceType = value; } }, metadata: _metadata }, _deviceType_initializers, _deviceType_extraInitializers);
        __esDecorate(null, null, _browser_decorators, { kind: "field", name: "browser", static: false, private: false, access: { has: function (obj) { return "browser" in obj; }, get: function (obj) { return obj.browser; }, set: function (obj, value) { obj.browser = value; } }, metadata: _metadata }, _browser_initializers, _browser_extraInitializers);
        __esDecorate(null, null, _operatingSystem_decorators, { kind: "field", name: "operatingSystem", static: false, private: false, access: { has: function (obj) { return "operatingSystem" in obj; }, get: function (obj) { return obj.operatingSystem; }, set: function (obj, value) { obj.operatingSystem = value; } }, metadata: _metadata }, _operatingSystem_initializers, _operatingSystem_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _isMobile_decorators, { kind: "field", name: "isMobile", static: false, private: false, access: { has: function (obj) { return "isMobile" in obj; }, get: function (obj) { return obj.isMobile; }, set: function (obj, value) { obj.isMobile = value; } }, metadata: _metadata }, _isMobile_initializers, _isMobile_extraInitializers);
        __esDecorate(null, null, _isRemembered_decorators, { kind: "field", name: "isRemembered", static: false, private: false, access: { has: function (obj) { return "isRemembered" in obj; }, get: function (obj) { return obj.isRemembered; }, set: function (obj, value) { obj.isRemembered = value; } }, metadata: _metadata }, _isRemembered_initializers, _isRemembered_extraInitializers);
        __esDecorate(null, null, _revokedAt_decorators, { kind: "field", name: "revokedAt", static: false, private: false, access: { has: function (obj) { return "revokedAt" in obj; }, get: function (obj) { return obj.revokedAt; }, set: function (obj, value) { obj.revokedAt = value; } }, metadata: _metadata }, _revokedAt_initializers, _revokedAt_extraInitializers);
        __esDecorate(null, null, _revokedBy_decorators, { kind: "field", name: "revokedBy", static: false, private: false, access: { has: function (obj) { return "revokedBy" in obj; }, get: function (obj) { return obj.revokedBy; }, set: function (obj, value) { obj.revokedBy = value; } }, metadata: _metadata }, _revokedBy_initializers, _revokedBy_extraInitializers);
        __esDecorate(null, null, _revokedReason_decorators, { kind: "field", name: "revokedReason", static: false, private: false, access: { has: function (obj) { return "revokedReason" in obj; }, get: function (obj) { return obj.revokedReason; }, set: function (obj, value) { obj.revokedReason = value; } }, metadata: _metadata }, _revokedReason_initializers, _revokedReason_extraInitializers);
        __esDecorate(null, null, _tokenRotationCount_decorators, { kind: "field", name: "tokenRotationCount", static: false, private: false, access: { has: function (obj) { return "tokenRotationCount" in obj; }, get: function (obj) { return obj.tokenRotationCount; }, set: function (obj, value) { obj.tokenRotationCount = value; } }, metadata: _metadata }, _tokenRotationCount_initializers, _tokenRotationCount_extraInitializers);
        __esDecorate(null, null, _lastTokenRotation_decorators, { kind: "field", name: "lastTokenRotation", static: false, private: false, access: { has: function (obj) { return "lastTokenRotation" in obj; }, get: function (obj) { return obj.lastTokenRotation; }, set: function (obj, value) { obj.lastTokenRotation = value; } }, metadata: _metadata }, _lastTokenRotation_initializers, _lastTokenRotation_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserSession = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserSession = _classThis;
}();
exports.UserSession = UserSession;
//# sourceMappingURL=user-session.entity.js.map