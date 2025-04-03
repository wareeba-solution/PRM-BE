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
exports.UserActivity = exports.ActivityType = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var ActivityType;
(function (ActivityType) {
    ActivityType["LOGIN"] = "LOGIN";
    ActivityType["LOGOUT"] = "LOGOUT";
    ActivityType["PASSWORD_CHANGE"] = "PASSWORD_CHANGE";
    ActivityType["PROFILE_UPDATE"] = "PROFILE_UPDATE";
    ActivityType["TICKET_CREATE"] = "TICKET_CREATE";
    ActivityType["TICKET_UPDATE"] = "TICKET_UPDATE";
    ActivityType["TICKET_COMMENT"] = "TICKET_COMMENT";
    ActivityType["TICKET_ASSIGNMENT"] = "TICKET_ASSIGNMENT";
    ActivityType["TICKET_STATUS_CHANGE"] = "TICKET_STATUS_CHANGE";
    ActivityType["MESSAGE_SEND"] = "MESSAGE_SEND";
    ActivityType["APPOINTMENT_CREATE"] = "APPOINTMENT_CREATE";
    ActivityType["APPOINTMENT_UPDATE"] = "APPOINTMENT_UPDATE";
    ActivityType["APPOINTMENT_CANCEL"] = "APPOINTMENT_CANCEL";
    ActivityType["DOCUMENT_UPLOAD"] = "DOCUMENT_UPLOAD";
    ActivityType["DOCUMENT_DELETE"] = "DOCUMENT_DELETE";
    ActivityType["SETTINGS_UPDATE"] = "SETTINGS_UPDATE";
    ActivityType["API_ACCESS"] = "API_ACCESS";
    ActivityType["FAILED_LOGIN"] = "FAILED_LOGIN";
    ActivityType["EMAIL_VERIFICATION"] = "EMAIL_VERIFICATION";
    ActivityType["PHONE_VERIFICATION"] = "PHONE_VERIFICATION";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
var UserActivity = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('user_activities'), (0, typeorm_1.Index)(['organizationId', 'userId']), (0, typeorm_1.Index)(['organizationId', 'activityType']), (0, typeorm_1.Index)(['organizationId', 'createdAt'])];
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
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _performedById_decorators;
    var _performedById_initializers = [];
    var _performedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _referrer_decorators;
    var _referrer_initializers = [];
    var _referrer_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _failureReason_decorators;
    var _failureReason_initializers = [];
    var _failureReason_extraInitializers = [];
    var _activityType_decorators;
    var _activityType_initializers = [];
    var _activityType_extraInitializers = [];
    var _details_decorators;
    var _details_initializers = [];
    var _details_extraInitializers = [];
    var _isSuccess_decorators;
    var _isSuccess_initializers = [];
    var _isSuccess_extraInitializers = [];
    var _errorMessage_decorators;
    var _errorMessage_initializers = [];
    var _errorMessage_extraInitializers = [];
    var _context_decorators;
    var _context_initializers = [];
    var _context_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var UserActivity = _classThis = /** @class */ (function () {
        function UserActivity_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.organizationId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.action = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.performedById = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _performedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _performedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.type = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.description = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.metadata = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.referrer = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _referrer_initializers, void 0));
            this.status = (__runInitializers(this, _referrer_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.failureReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _failureReason_initializers, void 0));
            this.activityType = (__runInitializers(this, _failureReason_extraInitializers), __runInitializers(this, _activityType_initializers, void 0));
            this.details = (__runInitializers(this, _activityType_extraInitializers), __runInitializers(this, _details_initializers, void 0));
            this.isSuccess = (__runInitializers(this, _details_extraInitializers), __runInitializers(this, _isSuccess_initializers, void 0));
            this.errorMessage = (__runInitializers(this, _isSuccess_extraInitializers), __runInitializers(this, _errorMessage_initializers, void 0));
            this.context = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            // Relations
            this.organization = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.user = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        UserActivity_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, action: { required: true, type: function () { return String; } }, performedById: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, type: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; } }, ipAddress: { required: true, type: function () { return String; } }, userAgent: { required: true, type: function () { return String; } }, referrer: { required: true, type: function () { return String; } }, status: { required: true, type: function () { return String; } }, failureReason: { required: true, type: function () { return String; } }, activityType: { required: true, enum: require("./user-activity.entity").ActivityType }, details: { required: true, type: function () { return ({ resourceId: { required: false, type: function () { return String; } }, resourceType: { required: false, type: function () { return String; } }, oldValue: { required: false, type: function () { return Object; } }, newValue: { required: false, type: function () { return Object; } }, description: { required: false, type: function () { return String; } }, additionalInfo: { required: false, type: function () { return Object; } } }); } }, isSuccess: { required: true, type: function () { return Boolean; } }, errorMessage: { required: false, type: function () { return String; } }, context: { required: true, type: function () { return ({ module: { required: false, type: function () { return String; } }, action: { required: false, type: function () { return String; } }, target: { required: false, type: function () { return String; } }, result: { required: false, type: function () { return String; } }, severity: { required: false, type: function () { return Object; } } }); } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, user: { required: true, type: function () { return require("./user.entity").User; } } };
        };
        return UserActivity_1;
    }());
    __setFunctionName(_classThis, "UserActivity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)()];
        _organizationId_decorators = [(0, typeorm_1.Column)()];
        _action_decorators = [(0, typeorm_1.Column)()];
        _performedById_decorators = [(0, typeorm_1.Column)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _type_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _referrer_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _failureReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _activityType_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ActivityType
            })];
        _details_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isSuccess_decorators = [(0, typeorm_1.Column)({ default: true })];
        _errorMessage_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _context_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _user_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _performedById_decorators, { kind: "field", name: "performedById", static: false, private: false, access: { has: function (obj) { return "performedById" in obj; }, get: function (obj) { return obj.performedById; }, set: function (obj, value) { obj.performedById = value; } }, metadata: _metadata }, _performedById_initializers, _performedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _referrer_decorators, { kind: "field", name: "referrer", static: false, private: false, access: { has: function (obj) { return "referrer" in obj; }, get: function (obj) { return obj.referrer; }, set: function (obj, value) { obj.referrer = value; } }, metadata: _metadata }, _referrer_initializers, _referrer_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _failureReason_decorators, { kind: "field", name: "failureReason", static: false, private: false, access: { has: function (obj) { return "failureReason" in obj; }, get: function (obj) { return obj.failureReason; }, set: function (obj, value) { obj.failureReason = value; } }, metadata: _metadata }, _failureReason_initializers, _failureReason_extraInitializers);
        __esDecorate(null, null, _activityType_decorators, { kind: "field", name: "activityType", static: false, private: false, access: { has: function (obj) { return "activityType" in obj; }, get: function (obj) { return obj.activityType; }, set: function (obj, value) { obj.activityType = value; } }, metadata: _metadata }, _activityType_initializers, _activityType_extraInitializers);
        __esDecorate(null, null, _details_decorators, { kind: "field", name: "details", static: false, private: false, access: { has: function (obj) { return "details" in obj; }, get: function (obj) { return obj.details; }, set: function (obj, value) { obj.details = value; } }, metadata: _metadata }, _details_initializers, _details_extraInitializers);
        __esDecorate(null, null, _isSuccess_decorators, { kind: "field", name: "isSuccess", static: false, private: false, access: { has: function (obj) { return "isSuccess" in obj; }, get: function (obj) { return obj.isSuccess; }, set: function (obj, value) { obj.isSuccess = value; } }, metadata: _metadata }, _isSuccess_initializers, _isSuccess_extraInitializers);
        __esDecorate(null, null, _errorMessage_decorators, { kind: "field", name: "errorMessage", static: false, private: false, access: { has: function (obj) { return "errorMessage" in obj; }, get: function (obj) { return obj.errorMessage; }, set: function (obj, value) { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
        __esDecorate(null, null, _context_decorators, { kind: "field", name: "context", static: false, private: false, access: { has: function (obj) { return "context" in obj; }, get: function (obj) { return obj.context; }, set: function (obj, value) { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserActivity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserActivity = _classThis;
}();
exports.UserActivity = UserActivity;
//# sourceMappingURL=user-activity.entity.js.map