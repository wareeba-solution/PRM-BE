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
exports.PushSubscription = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/notifications/entities/push-subscription.entity.ts
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var PushSubscription = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('push_subscriptions'), (0, typeorm_1.Index)(['userId', 'endpoint']), (0, typeorm_1.Index)(['organizationId', 'active'])];
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
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _subscription_decorators;
    var _subscription_initializers = [];
    var _subscription_extraInitializers = [];
    var _endpoint_decorators;
    var _endpoint_initializers = [];
    var _endpoint_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _active_decorators;
    var _active_initializers = [];
    var _active_extraInitializers = [];
    var _lastUsed_decorators;
    var _lastUsed_initializers = [];
    var _lastUsed_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var PushSubscription = _classThis = /** @class */ (function () {
        function PushSubscription_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.organizationId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            /**
             * The stringified push subscription object from the browser
             * Contains endpoint, keys (p256dh, auth), etc.
             */
            this.subscription = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _subscription_initializers, void 0));
            /**
             * The unique endpoint URL for this subscription
             * Used for querying and updating subscriptions
             */
            this.endpoint = (__runInitializers(this, _subscription_extraInitializers), __runInitializers(this, _endpoint_initializers, void 0));
            /**
             * User agent information of the device/browser
             */
            this.userAgent = (__runInitializers(this, _endpoint_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            /**
             * Whether this subscription is currently active
             */
            this.active = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _active_initializers, void 0));
            /**
             * Last time a notification was successfully sent to this subscription
             */
            this.lastUsed = (__runInitializers(this, _active_extraInitializers), __runInitializers(this, _lastUsed_initializers, void 0));
            /**
             * Creation timestamp
             */
            this.createdAt = (__runInitializers(this, _lastUsed_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            /**
             * Last update timestamp
             */
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        PushSubscription_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, userId: { required: true, type: function () { return String; } }, user: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, subscription: { required: true, type: function () { return String; }, description: "The stringified push subscription object from the browser\nContains endpoint, keys (p256dh, auth), etc." }, endpoint: { required: true, type: function () { return String; }, description: "The unique endpoint URL for this subscription\nUsed for querying and updating subscriptions" }, userAgent: { required: true, type: function () { return String; }, description: "User agent information of the device/browser" }, active: { required: true, type: function () { return Boolean; }, description: "Whether this subscription is currently active" }, lastUsed: { required: true, type: function () { return Date; }, description: "Last time a notification was successfully sent to this subscription" }, createdAt: { required: true, type: function () { return Date; }, description: "Creation timestamp" }, updatedAt: { required: true, type: function () { return Date; }, description: "Last update timestamp" } };
        };
        return PushSubscription_1;
    }());
    __setFunctionName(_classThis, "PushSubscription");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' }), (0, typeorm_1.Index)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _subscription_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _endpoint_decorators = [(0, typeorm_1.Column)({ type: 'text' }), (0, typeorm_1.Index)()];
        _userAgent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _active_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _lastUsed_decorators = [(0, typeorm_1.Column)({ type: 'timestamptz', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _subscription_decorators, { kind: "field", name: "subscription", static: false, private: false, access: { has: function (obj) { return "subscription" in obj; }, get: function (obj) { return obj.subscription; }, set: function (obj, value) { obj.subscription = value; } }, metadata: _metadata }, _subscription_initializers, _subscription_extraInitializers);
        __esDecorate(null, null, _endpoint_decorators, { kind: "field", name: "endpoint", static: false, private: false, access: { has: function (obj) { return "endpoint" in obj; }, get: function (obj) { return obj.endpoint; }, set: function (obj, value) { obj.endpoint = value; } }, metadata: _metadata }, _endpoint_initializers, _endpoint_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: function (obj) { return "active" in obj; }, get: function (obj) { return obj.active; }, set: function (obj, value) { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
        __esDecorate(null, null, _lastUsed_decorators, { kind: "field", name: "lastUsed", static: false, private: false, access: { has: function (obj) { return "lastUsed" in obj; }, get: function (obj) { return obj.lastUsed; }, set: function (obj, value) { obj.lastUsed = value; } }, metadata: _metadata }, _lastUsed_initializers, _lastUsed_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushSubscription = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushSubscription = _classThis;
}();
exports.PushSubscription = PushSubscription;
//# sourceMappingURL=push-subscription.entity.js.map