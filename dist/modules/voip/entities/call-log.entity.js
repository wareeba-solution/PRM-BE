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
exports.CallLog = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/voip/entities/call-log.entity.ts
var typeorm_1 = require("typeorm");
var CallLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('call_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _callUuid_decorators;
    var _callUuid_initializers = [];
    var _callUuid_extraInitializers = [];
    var _callerNumber_decorators;
    var _callerNumber_initializers = [];
    var _callerNumber_extraInitializers = [];
    var _destinationNumber_decorators;
    var _destinationNumber_initializers = [];
    var _destinationNumber_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _answerTime_decorators;
    var _answerTime_initializers = [];
    var _answerTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _hangupCause_decorators;
    var _hangupCause_initializers = [];
    var _hangupCause_extraInitializers = [];
    var _recordingUrl_decorators;
    var _recordingUrl_initializers = [];
    var _recordingUrl_extraInitializers = [];
    var _callDirection_decorators;
    var _callDirection_initializers = [];
    var _callDirection_extraInitializers = [];
    var _appointmentId_decorators;
    var _appointmentId_initializers = [];
    var _appointmentId_extraInitializers = [];
    var _contactId_decorators;
    var _contactId_initializers = [];
    var _contactId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var CallLog = _classThis = /** @class */ (function () {
        function CallLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.callUuid = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _callUuid_initializers, void 0));
            this.callerNumber = (__runInitializers(this, _callUuid_extraInitializers), __runInitializers(this, _callerNumber_initializers, void 0));
            this.destinationNumber = (__runInitializers(this, _callerNumber_extraInitializers), __runInitializers(this, _destinationNumber_initializers, void 0));
            this.provider = (__runInitializers(this, _destinationNumber_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.status = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.startTime = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.answerTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _answerTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _answerTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.duration = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.hangupCause = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _hangupCause_initializers, void 0));
            this.recordingUrl = (__runInitializers(this, _hangupCause_extraInitializers), __runInitializers(this, _recordingUrl_initializers, void 0));
            this.callDirection = (__runInitializers(this, _recordingUrl_extraInitializers), __runInitializers(this, _callDirection_initializers, void 0));
            this.appointmentId = (__runInitializers(this, _callDirection_extraInitializers), __runInitializers(this, _appointmentId_initializers, void 0));
            this.contactId = (__runInitializers(this, _appointmentId_extraInitializers), __runInitializers(this, _contactId_initializers, void 0));
            this.createdAt = (__runInitializers(this, _contactId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        CallLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return Number; } }, callUuid: { required: true, type: function () { return String; } }, callerNumber: { required: true, type: function () { return String; } }, destinationNumber: { required: true, type: function () { return String; } }, provider: { required: true, type: function () { return String; } }, status: { required: true, type: function () { return String; } }, startTime: { required: true, type: function () { return Date; } }, answerTime: { required: true, type: function () { return Date; } }, endTime: { required: true, type: function () { return Date; } }, duration: { required: true, type: function () { return Number; } }, hangupCause: { required: true, type: function () { return String; } }, recordingUrl: { required: true, type: function () { return String; } }, callDirection: { required: true, type: function () { return String; } }, appointmentId: { required: true, type: function () { return Number; } }, contactId: { required: true, type: function () { return Number; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return CallLog_1;
    }());
    __setFunctionName(_classThis, "CallLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _callUuid_decorators = [(0, typeorm_1.Column)()];
        _callerNumber_decorators = [(0, typeorm_1.Column)()];
        _destinationNumber_decorators = [(0, typeorm_1.Column)()];
        _provider_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)()];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _answerTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _duration_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _hangupCause_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _recordingUrl_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _callDirection_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _appointmentId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _contactId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _callUuid_decorators, { kind: "field", name: "callUuid", static: false, private: false, access: { has: function (obj) { return "callUuid" in obj; }, get: function (obj) { return obj.callUuid; }, set: function (obj, value) { obj.callUuid = value; } }, metadata: _metadata }, _callUuid_initializers, _callUuid_extraInitializers);
        __esDecorate(null, null, _callerNumber_decorators, { kind: "field", name: "callerNumber", static: false, private: false, access: { has: function (obj) { return "callerNumber" in obj; }, get: function (obj) { return obj.callerNumber; }, set: function (obj, value) { obj.callerNumber = value; } }, metadata: _metadata }, _callerNumber_initializers, _callerNumber_extraInitializers);
        __esDecorate(null, null, _destinationNumber_decorators, { kind: "field", name: "destinationNumber", static: false, private: false, access: { has: function (obj) { return "destinationNumber" in obj; }, get: function (obj) { return obj.destinationNumber; }, set: function (obj, value) { obj.destinationNumber = value; } }, metadata: _metadata }, _destinationNumber_initializers, _destinationNumber_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _answerTime_decorators, { kind: "field", name: "answerTime", static: false, private: false, access: { has: function (obj) { return "answerTime" in obj; }, get: function (obj) { return obj.answerTime; }, set: function (obj, value) { obj.answerTime = value; } }, metadata: _metadata }, _answerTime_initializers, _answerTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _hangupCause_decorators, { kind: "field", name: "hangupCause", static: false, private: false, access: { has: function (obj) { return "hangupCause" in obj; }, get: function (obj) { return obj.hangupCause; }, set: function (obj, value) { obj.hangupCause = value; } }, metadata: _metadata }, _hangupCause_initializers, _hangupCause_extraInitializers);
        __esDecorate(null, null, _recordingUrl_decorators, { kind: "field", name: "recordingUrl", static: false, private: false, access: { has: function (obj) { return "recordingUrl" in obj; }, get: function (obj) { return obj.recordingUrl; }, set: function (obj, value) { obj.recordingUrl = value; } }, metadata: _metadata }, _recordingUrl_initializers, _recordingUrl_extraInitializers);
        __esDecorate(null, null, _callDirection_decorators, { kind: "field", name: "callDirection", static: false, private: false, access: { has: function (obj) { return "callDirection" in obj; }, get: function (obj) { return obj.callDirection; }, set: function (obj, value) { obj.callDirection = value; } }, metadata: _metadata }, _callDirection_initializers, _callDirection_extraInitializers);
        __esDecorate(null, null, _appointmentId_decorators, { kind: "field", name: "appointmentId", static: false, private: false, access: { has: function (obj) { return "appointmentId" in obj; }, get: function (obj) { return obj.appointmentId; }, set: function (obj, value) { obj.appointmentId = value; } }, metadata: _metadata }, _appointmentId_initializers, _appointmentId_extraInitializers);
        __esDecorate(null, null, _contactId_decorators, { kind: "field", name: "contactId", static: false, private: false, access: { has: function (obj) { return "contactId" in obj; }, get: function (obj) { return obj.contactId; }, set: function (obj, value) { obj.contactId = value; } }, metadata: _metadata }, _contactId_initializers, _contactId_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CallLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CallLog = _classThis;
}();
exports.CallLog = CallLog;
//# sourceMappingURL=call-log.entity.js.map