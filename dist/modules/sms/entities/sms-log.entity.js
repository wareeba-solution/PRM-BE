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
exports.SmsLog = exports.SmsStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/sms/entities/sms-log.entity.ts
var typeorm_1 = require("typeorm");
var sms_template_entity_1 = require("../entities/sms-template.entity");
/**
 * Status of SMS delivery
 */
var SmsStatus;
(function (SmsStatus) {
    SmsStatus["PENDING"] = "pending";
    SmsStatus["SENT"] = "sent";
    SmsStatus["DELIVERED"] = "delivered";
    SmsStatus["FAILED"] = "failed";
    SmsStatus["UNDELIVERED"] = "undelivered";
    SmsStatus["REJECTED"] = "rejected";
})(SmsStatus || (exports.SmsStatus = SmsStatus = {}));
/**
 * Entity to log all SMS communications
 */
var SmsLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('sms_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _statusMessage_decorators;
    var _statusMessage_initializers = [];
    var _statusMessage_extraInitializers = [];
    var _externalId_decorators;
    var _externalId_initializers = [];
    var _externalId_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _appointmentId_decorators;
    var _appointmentId_initializers = [];
    var _appointmentId_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _templateId_decorators;
    var _templateId_initializers = [];
    var _templateId_extraInitializers = [];
    var _template_decorators;
    var _template_initializers = [];
    var _template_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _variables_decorators;
    var _variables_initializers = [];
    var _variables_extraInitializers = [];
    var _providerResponse_decorators;
    var _providerResponse_initializers = [];
    var _providerResponse_extraInitializers = [];
    var _segments_decorators;
    var _segments_initializers = [];
    var _segments_extraInitializers = [];
    var _cost_decorators;
    var _cost_initializers = [];
    var _cost_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deliveredAt_decorators;
    var _deliveredAt_initializers = [];
    var _deliveredAt_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var SmsLog = _classThis = /** @class */ (function () {
        function SmsLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.to = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            this.from = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.message = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.status = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.statusMessage = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _statusMessage_initializers, void 0));
            this.externalId = (__runInitializers(this, _statusMessage_extraInitializers), __runInitializers(this, _externalId_initializers, void 0));
            this.organizationId = (__runInitializers(this, _externalId_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.appointmentId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _appointmentId_initializers, void 0));
            this.contactId = (__runInitializers(this, _appointmentId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.templateId = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
            this.template = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _template_initializers, void 0));
            this.provider = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.variables = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _variables_initializers, void 0));
            this.providerResponse = (__runInitializers(this, _variables_extraInitializers), __runInitializers(this, _providerResponse_initializers, void 0));
            this.segments = (__runInitializers(this, _providerResponse_extraInitializers), __runInitializers(this, _segments_initializers, void 0));
            this.cost = (__runInitializers(this, _segments_extraInitializers), __runInitializers(this, _cost_initializers, void 0));
            this.currency = (__runInitializers(this, _cost_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.createdAt = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deliveredAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deliveredAt_initializers, void 0));
            this.createdById = (__runInitializers(this, _deliveredAt_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            /**
             * Optional metadata for additional properties
             */
            this.metadata = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            __runInitializers(this, _metadata_extraInitializers);
        }
        SmsLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, to: { required: true, type: function () { return String; } }, from: { required: true, type: function () { return String; } }, message: { required: true, type: function () { return String; } }, status: { required: true, enum: require("./sms-log.entity").SmsStatus }, statusMessage: { required: true, type: function () { return String; } }, externalId: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, appointmentId: { required: true, type: function () { return String; } }, contactId: { required: true, type: function () { return String; } }, templateId: { required: true, type: function () { return String; } }, template: { required: true, type: function () { return require("./sms-template.entity").SmsTemplate; } }, provider: { required: true, type: function () { return String; } }, variables: { required: true, type: function () { return Object; } }, providerResponse: { required: true, type: function () { return Object; } }, segments: { required: true, type: function () { return Number; } }, cost: { required: true, type: function () { return Number; } }, currency: { required: true, type: function () { return String; } }, ipAddress: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deliveredAt: { required: true, type: function () { return Date; } }, createdById: { required: true, type: function () { return String; } }, metadata: { required: true, type: function () { return Object; }, description: "Optional metadata for additional properties" } };
        };
        return SmsLog_1;
    }());
    __setFunctionName(_classThis, "SmsLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _to_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _from_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _message_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: SmsStatus,
                default: SmsStatus.PENDING,
            })];
        _statusMessage_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _externalId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _organizationId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _appointmentId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _contactId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _templateId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _template_decorators = [(0, typeorm_1.ManyToOne)(function () { return sms_template_entity_1.SmsTemplate; }, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'templateId' })];
        _provider_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _variables_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _providerResponse_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _segments_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _cost_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 4, nullable: true })];
        _currency_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deliveredAt_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _statusMessage_decorators, { kind: "field", name: "statusMessage", static: false, private: false, access: { has: function (obj) { return "statusMessage" in obj; }, get: function (obj) { return obj.statusMessage; }, set: function (obj, value) { obj.statusMessage = value; } }, metadata: _metadata }, _statusMessage_initializers, _statusMessage_extraInitializers);
        __esDecorate(null, null, _externalId_decorators, { kind: "field", name: "externalId", static: false, private: false, access: { has: function (obj) { return "externalId" in obj; }, get: function (obj) { return obj.externalId; }, set: function (obj, value) { obj.externalId = value; } }, metadata: _metadata }, _externalId_initializers, _externalId_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _appointmentId_decorators, { kind: "field", name: "appointmentId", static: false, private: false, access: { has: function (obj) { return "appointmentId" in obj; }, get: function (obj) { return obj.appointmentId; }, set: function (obj, value) { obj.appointmentId = value; } }, metadata: _metadata }, _appointmentId_initializers, _appointmentId_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: function (obj) { return "templateId" in obj; }, get: function (obj) { return obj.templateId; }, set: function (obj, value) { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
        __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: function (obj) { return "template" in obj; }, get: function (obj) { return obj.template; }, set: function (obj, value) { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _variables_decorators, { kind: "field", name: "variables", static: false, private: false, access: { has: function (obj) { return "variables" in obj; }, get: function (obj) { return obj.variables; }, set: function (obj, value) { obj.variables = value; } }, metadata: _metadata }, _variables_initializers, _variables_extraInitializers);
        __esDecorate(null, null, _providerResponse_decorators, { kind: "field", name: "providerResponse", static: false, private: false, access: { has: function (obj) { return "providerResponse" in obj; }, get: function (obj) { return obj.providerResponse; }, set: function (obj, value) { obj.providerResponse = value; } }, metadata: _metadata }, _providerResponse_initializers, _providerResponse_extraInitializers);
        __esDecorate(null, null, _segments_decorators, { kind: "field", name: "segments", static: false, private: false, access: { has: function (obj) { return "segments" in obj; }, get: function (obj) { return obj.segments; }, set: function (obj, value) { obj.segments = value; } }, metadata: _metadata }, _segments_initializers, _segments_extraInitializers);
        __esDecorate(null, null, _cost_decorators, { kind: "field", name: "cost", static: false, private: false, access: { has: function (obj) { return "cost" in obj; }, get: function (obj) { return obj.cost; }, set: function (obj, value) { obj.cost = value; } }, metadata: _metadata }, _cost_initializers, _cost_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deliveredAt_decorators, { kind: "field", name: "deliveredAt", static: false, private: false, access: { has: function (obj) { return "deliveredAt" in obj; }, get: function (obj) { return obj.deliveredAt; }, set: function (obj, value) { obj.deliveredAt = value; } }, metadata: _metadata }, _deliveredAt_initializers, _deliveredAt_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SmsLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SmsLog = _classThis;
}();
exports.SmsLog = SmsLog;
//# sourceMappingURL=sms-log.entity.js.map