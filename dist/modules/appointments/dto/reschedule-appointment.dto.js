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
exports.RescheduleAppointmentDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/reschedule-appointment.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var RescheduleAppointmentDto = function () {
    var _a;
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _providerId_decorators;
    var _providerId_initializers = [];
    var _providerId_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _notifyPatient_decorators;
    var _notifyPatient_initializers = [];
    var _notifyPatient_extraInitializers = [];
    var _notificationMessage_decorators;
    var _notificationMessage_initializers = [];
    var _notificationMessage_extraInitializers = [];
    var _requireConfirmation_decorators;
    var _requireConfirmation_initializers = [];
    var _requireConfirmation_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RescheduleAppointmentDto() {
                this.startTime = __runInitializers(this, _startTime_initializers, void 0);
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.providerId = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _providerId_initializers, void 0));
                this.reason = (__runInitializers(this, _providerId_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                this.notifyPatient = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _notifyPatient_initializers, true));
                this.notificationMessage = (__runInitializers(this, _notifyPatient_extraInitializers), __runInitializers(this, _notificationMessage_initializers, void 0));
                this.requireConfirmation = (__runInitializers(this, _notificationMessage_extraInitializers), __runInitializers(this, _requireConfirmation_initializers, false));
                // These fields will be set by the controller
                this.organizationId = __runInitializers(this, _requireConfirmation_extraInitializers);
            }
            RescheduleAppointmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { startTime: { required: true, type: function () { return String; } }, endTime: { required: true, type: function () { return String; } }, providerId: { required: false, type: function () { return String; }, format: "uuid" }, reason: { required: false, type: function () { return String; } }, notifyPatient: { required: false, type: function () { return Boolean; }, default: true }, notificationMessage: { required: false, type: function () { return String; } }, requireConfirmation: { required: false, type: function () { return Boolean; }, default: false }, organizationId: { required: false, type: function () { return String; } }, updatedBy: { required: false, type: function () { return String; } } };
            };
            return RescheduleAppointmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _startTime_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'New appointment start time',
                    example: '2025-04-15T09:00:00Z'
                }), (0, class_validator_1.IsNotEmpty)({ message: 'Start time is required' }), (0, class_validator_1.IsDateString)({}, { message: 'Start time must be a valid ISO date string' })];
            _endTime_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'New appointment end time',
                    example: '2025-04-15T10:00:00Z'
                }), (0, class_validator_1.IsNotEmpty)({ message: 'End time is required' }), (0, class_validator_1.IsDateString)({}, { message: 'End time must be a valid ISO date string' })];
            _providerId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'New provider/doctor for the appointment (if changing provider)',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)('4', { message: 'Provider ID must be a valid UUID' })];
            _reason_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Reason for rescheduling',
                    example: 'Doctor availability changed'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Reschedule reason must be a string' })];
            _notifyPatient_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to notify the patient about the reschedule',
                    default: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Notify patient must be a boolean value' }), (0, class_transformer_1.Type)(function () { return Boolean; })];
            _notificationMessage_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom notification message to send to the patient',
                    example: 'Your appointment has been rescheduled due to unforeseen circumstances.'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateIf)(function (o) { return o.notifyPatient === true; }), (0, class_validator_1.IsString)({ message: 'Notification message must be a string' })];
            _requireConfirmation_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether patient confirmation is required for the rescheduled appointment',
                    default: false
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Require confirmation must be a boolean value' }), (0, class_transformer_1.Type)(function () { return Boolean; })];
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _providerId_decorators, { kind: "field", name: "providerId", static: false, private: false, access: { has: function (obj) { return "providerId" in obj; }, get: function (obj) { return obj.providerId; }, set: function (obj, value) { obj.providerId = value; } }, metadata: _metadata }, _providerId_initializers, _providerId_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _notifyPatient_decorators, { kind: "field", name: "notifyPatient", static: false, private: false, access: { has: function (obj) { return "notifyPatient" in obj; }, get: function (obj) { return obj.notifyPatient; }, set: function (obj, value) { obj.notifyPatient = value; } }, metadata: _metadata }, _notifyPatient_initializers, _notifyPatient_extraInitializers);
            __esDecorate(null, null, _notificationMessage_decorators, { kind: "field", name: "notificationMessage", static: false, private: false, access: { has: function (obj) { return "notificationMessage" in obj; }, get: function (obj) { return obj.notificationMessage; }, set: function (obj, value) { obj.notificationMessage = value; } }, metadata: _metadata }, _notificationMessage_initializers, _notificationMessage_extraInitializers);
            __esDecorate(null, null, _requireConfirmation_decorators, { kind: "field", name: "requireConfirmation", static: false, private: false, access: { has: function (obj) { return "requireConfirmation" in obj; }, get: function (obj) { return obj.requireConfirmation; }, set: function (obj, value) { obj.requireConfirmation = value; } }, metadata: _metadata }, _requireConfirmation_initializers, _requireConfirmation_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RescheduleAppointmentDto = RescheduleAppointmentDto;
//# sourceMappingURL=reschedule-appointment.dto.js.map