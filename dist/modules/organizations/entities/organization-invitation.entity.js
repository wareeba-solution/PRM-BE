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
exports.OrganizationInvitation = exports.InvitationStatus = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var organization_entity_1 = require("./organization.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "PENDING";
    InvitationStatus["ACCEPTED"] = "ACCEPTED";
    InvitationStatus["DECLINED"] = "DECLINED";
    InvitationStatus["EXPIRED"] = "EXPIRED";
    InvitationStatus["REVOKED"] = "REVOKED";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
var OrganizationInvitation = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('organization_invitations')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _roles_extraInitializers = [];
    var _invitedById_decorators;
    var _invitedById_initializers = [];
    var _invitedById_extraInitializers = [];
    var _invitedBy_decorators;
    var _invitedBy_initializers = [];
    var _invitedBy_extraInitializers = [];
    var _invitedUserId_decorators;
    var _invitedUserId_initializers = [];
    var _invitedUserId_extraInitializers = [];
    var _invitedUser_decorators;
    var _invitedUser_initializers = [];
    var _invitedUser_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _departmentIds_decorators;
    var _departmentIds_initializers = [];
    var _departmentIds_extraInitializers = [];
    var _acceptedAt_decorators;
    var _acceptedAt_initializers = [];
    var _acceptedAt_extraInitializers = [];
    var _declinedAt_decorators;
    var _declinedAt_initializers = [];
    var _declinedAt_extraInitializers = [];
    var _revokedAt_decorators;
    var _revokedAt_initializers = [];
    var _revokedAt_extraInitializers = [];
    var _revokedById_decorators;
    var _revokedById_initializers = [];
    var _revokedById_extraInitializers = [];
    var _revokedBy_decorators;
    var _revokedBy_initializers = [];
    var _revokedBy_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _isResent_decorators;
    var _isResent_initializers = [];
    var _isResent_extraInitializers = [];
    var _lastResentAt_decorators;
    var _lastResentAt_initializers = [];
    var _lastResentAt_extraInitializers = [];
    var _resendCount_decorators;
    var _resendCount_initializers = [];
    var _resendCount_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var OrganizationInvitation = _classThis = /** @class */ (function () {
        function OrganizationInvitation_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            // FIXED: Keep only one relationship to Organization
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.email = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.roles = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _roles_initializers, void 0));
            this.invitedById = (__runInitializers(this, _roles_extraInitializers), __runInitializers(this, _invitedById_initializers, void 0));
            this.invitedBy = (__runInitializers(this, _invitedById_extraInitializers), __runInitializers(this, _invitedBy_initializers, void 0));
            this.invitedUserId = (__runInitializers(this, _invitedBy_extraInitializers), __runInitializers(this, _invitedUserId_initializers, void 0));
            this.invitedUser = (__runInitializers(this, _invitedUserId_extraInitializers), __runInitializers(this, _invitedUser_initializers, void 0));
            this.token = (__runInitializers(this, _invitedUser_extraInitializers), __runInitializers(this, _token_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.status = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.departmentIds = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _departmentIds_initializers, void 0));
            this.acceptedAt = (__runInitializers(this, _departmentIds_extraInitializers), __runInitializers(this, _acceptedAt_initializers, void 0));
            this.declinedAt = (__runInitializers(this, _acceptedAt_extraInitializers), __runInitializers(this, _declinedAt_initializers, void 0));
            this.revokedAt = (__runInitializers(this, _declinedAt_extraInitializers), __runInitializers(this, _revokedAt_initializers, void 0));
            this.revokedById = (__runInitializers(this, _revokedAt_extraInitializers), __runInitializers(this, _revokedById_initializers, void 0));
            this.revokedBy = (__runInitializers(this, _revokedById_extraInitializers), __runInitializers(this, _revokedBy_initializers, void 0));
            this.message = (__runInitializers(this, _revokedBy_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.metadata = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.isResent = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _isResent_initializers, void 0));
            this.lastResentAt = (__runInitializers(this, _isResent_extraInitializers), __runInitializers(this, _lastResentAt_initializers, void 0));
            this.resendCount = (__runInitializers(this, _lastResentAt_extraInitializers), __runInitializers(this, _resendCount_initializers, void 0));
            this.createdAt = (__runInitializers(this, _resendCount_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        /**
         * Check if invitation has expired
         */
        OrganizationInvitation_1.prototype.isExpired = function () {
            return new Date() > this.expiresAt;
        };
        /**
         * Check if invitation can be resent
         */
        OrganizationInvitation_1.prototype.canBeResent = function () {
            return (this.status === InvitationStatus.PENDING &&
                !this.isExpired() &&
                this.resendCount < 3);
        };
        /**
         * Check if invitation can be accepted
         */
        OrganizationInvitation_1.prototype.canBeAccepted = function () {
            return (this.status === InvitationStatus.PENDING &&
                !this.isExpired());
        };
        /**
         * Check if invitation can be revoked
         */
        OrganizationInvitation_1.prototype.canBeRevoked = function () {
            return this.status === InvitationStatus.PENDING;
        };
        OrganizationInvitation_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("./organization.entity").Organization; } }, email: { required: true, type: function () { return String; } }, roles: { required: true, type: function () { return [String]; } }, invitedById: { required: true, type: function () { return String; } }, invitedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, invitedUserId: { required: true, type: function () { return String; } }, invitedUser: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, token: { required: true, type: function () { return String; } }, expiresAt: { required: true, type: function () { return Date; } }, status: { required: true, enum: require("./organization-invitation.entity").InvitationStatus }, departmentIds: { required: true, type: function () { return [String]; } }, acceptedAt: { required: true, type: function () { return Date; } }, declinedAt: { required: true, type: function () { return Date; } }, revokedAt: { required: true, type: function () { return Date; } }, revokedById: { required: true, type: function () { return String; } }, revokedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, message: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, isResent: { required: true, type: function () { return Boolean; } }, lastResentAt: { required: true, type: function () { return Date; } }, resendCount: { required: true, type: function () { return Number; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return OrganizationInvitation_1;
    }());
    __setFunctionName(_classThis, "OrganizationInvitation");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid')];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _email_decorators = [(0, typeorm_1.Column)()];
        _roles_decorators = [(0, typeorm_1.Column)('simple-array')];
        _invitedById_decorators = [(0, typeorm_1.Column)('uuid')];
        _invitedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'invitedById' })];
        _invitedUserId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _invitedUser_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'invitedUserId' })];
        _token_decorators = [(0, typeorm_1.Column)()];
        _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: InvitationStatus,
                default: InvitationStatus.PENDING
            })];
        _departmentIds_decorators = [(0, typeorm_1.Column)('uuid', { array: true, nullable: true })];
        _acceptedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _declinedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _revokedAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _revokedById_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
        _revokedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'revokedById' })];
        _message_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _isResent_decorators = [(0, typeorm_1.Column)({ default: false })];
        _lastResentAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _resendCount_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
        __esDecorate(null, null, _invitedById_decorators, { kind: "field", name: "invitedById", static: false, private: false, access: { has: function (obj) { return "invitedById" in obj; }, get: function (obj) { return obj.invitedById; }, set: function (obj, value) { obj.invitedById = value; } }, metadata: _metadata }, _invitedById_initializers, _invitedById_extraInitializers);
        __esDecorate(null, null, _invitedBy_decorators, { kind: "field", name: "invitedBy", static: false, private: false, access: { has: function (obj) { return "invitedBy" in obj; }, get: function (obj) { return obj.invitedBy; }, set: function (obj, value) { obj.invitedBy = value; } }, metadata: _metadata }, _invitedBy_initializers, _invitedBy_extraInitializers);
        __esDecorate(null, null, _invitedUserId_decorators, { kind: "field", name: "invitedUserId", static: false, private: false, access: { has: function (obj) { return "invitedUserId" in obj; }, get: function (obj) { return obj.invitedUserId; }, set: function (obj, value) { obj.invitedUserId = value; } }, metadata: _metadata }, _invitedUserId_initializers, _invitedUserId_extraInitializers);
        __esDecorate(null, null, _invitedUser_decorators, { kind: "field", name: "invitedUser", static: false, private: false, access: { has: function (obj) { return "invitedUser" in obj; }, get: function (obj) { return obj.invitedUser; }, set: function (obj, value) { obj.invitedUser = value; } }, metadata: _metadata }, _invitedUser_initializers, _invitedUser_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _departmentIds_decorators, { kind: "field", name: "departmentIds", static: false, private: false, access: { has: function (obj) { return "departmentIds" in obj; }, get: function (obj) { return obj.departmentIds; }, set: function (obj, value) { obj.departmentIds = value; } }, metadata: _metadata }, _departmentIds_initializers, _departmentIds_extraInitializers);
        __esDecorate(null, null, _acceptedAt_decorators, { kind: "field", name: "acceptedAt", static: false, private: false, access: { has: function (obj) { return "acceptedAt" in obj; }, get: function (obj) { return obj.acceptedAt; }, set: function (obj, value) { obj.acceptedAt = value; } }, metadata: _metadata }, _acceptedAt_initializers, _acceptedAt_extraInitializers);
        __esDecorate(null, null, _declinedAt_decorators, { kind: "field", name: "declinedAt", static: false, private: false, access: { has: function (obj) { return "declinedAt" in obj; }, get: function (obj) { return obj.declinedAt; }, set: function (obj, value) { obj.declinedAt = value; } }, metadata: _metadata }, _declinedAt_initializers, _declinedAt_extraInitializers);
        __esDecorate(null, null, _revokedAt_decorators, { kind: "field", name: "revokedAt", static: false, private: false, access: { has: function (obj) { return "revokedAt" in obj; }, get: function (obj) { return obj.revokedAt; }, set: function (obj, value) { obj.revokedAt = value; } }, metadata: _metadata }, _revokedAt_initializers, _revokedAt_extraInitializers);
        __esDecorate(null, null, _revokedById_decorators, { kind: "field", name: "revokedById", static: false, private: false, access: { has: function (obj) { return "revokedById" in obj; }, get: function (obj) { return obj.revokedById; }, set: function (obj, value) { obj.revokedById = value; } }, metadata: _metadata }, _revokedById_initializers, _revokedById_extraInitializers);
        __esDecorate(null, null, _revokedBy_decorators, { kind: "field", name: "revokedBy", static: false, private: false, access: { has: function (obj) { return "revokedBy" in obj; }, get: function (obj) { return obj.revokedBy; }, set: function (obj, value) { obj.revokedBy = value; } }, metadata: _metadata }, _revokedBy_initializers, _revokedBy_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _isResent_decorators, { kind: "field", name: "isResent", static: false, private: false, access: { has: function (obj) { return "isResent" in obj; }, get: function (obj) { return obj.isResent; }, set: function (obj, value) { obj.isResent = value; } }, metadata: _metadata }, _isResent_initializers, _isResent_extraInitializers);
        __esDecorate(null, null, _lastResentAt_decorators, { kind: "field", name: "lastResentAt", static: false, private: false, access: { has: function (obj) { return "lastResentAt" in obj; }, get: function (obj) { return obj.lastResentAt; }, set: function (obj, value) { obj.lastResentAt = value; } }, metadata: _metadata }, _lastResentAt_initializers, _lastResentAt_extraInitializers);
        __esDecorate(null, null, _resendCount_decorators, { kind: "field", name: "resendCount", static: false, private: false, access: { has: function (obj) { return "resendCount" in obj; }, get: function (obj) { return obj.resendCount; }, set: function (obj, value) { obj.resendCount = value; } }, metadata: _metadata }, _resendCount_initializers, _resendCount_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrganizationInvitation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrganizationInvitation = _classThis;
}();
exports.OrganizationInvitation = OrganizationInvitation;
//# sourceMappingURL=organization-invitation.entity.js.map