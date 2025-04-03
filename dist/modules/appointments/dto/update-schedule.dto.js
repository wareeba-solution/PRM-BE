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
exports.UpdateScheduleDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
// For settings, we can reuse the structure from CreateScheduleDto
var ScheduleSettingsDto = function () {
    var _a;
    var _minAppointmentDuration_decorators;
    var _minAppointmentDuration_initializers = [];
    var _minAppointmentDuration_extraInitializers = [];
    var _appointmentBuffer_decorators;
    var _appointmentBuffer_initializers = [];
    var _appointmentBuffer_extraInitializers = [];
    var _maxAppointmentsPerDay_decorators;
    var _maxAppointmentsPerDay_initializers = [];
    var _maxAppointmentsPerDay_extraInitializers = [];
    var _preferredDuration_decorators;
    var _preferredDuration_initializers = [];
    var _preferredDuration_extraInitializers = [];
    var _allowOnlineBooking_decorators;
    var _allowOnlineBooking_initializers = [];
    var _allowOnlineBooking_extraInitializers = [];
    var _advanceBookingDays_decorators;
    var _advanceBookingDays_initializers = [];
    var _advanceBookingDays_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ScheduleSettingsDto() {
                this.minAppointmentDuration = __runInitializers(this, _minAppointmentDuration_initializers, void 0);
                this.appointmentBuffer = (__runInitializers(this, _minAppointmentDuration_extraInitializers), __runInitializers(this, _appointmentBuffer_initializers, void 0));
                this.maxAppointmentsPerDay = (__runInitializers(this, _appointmentBuffer_extraInitializers), __runInitializers(this, _maxAppointmentsPerDay_initializers, void 0));
                this.preferredDuration = (__runInitializers(this, _maxAppointmentsPerDay_extraInitializers), __runInitializers(this, _preferredDuration_initializers, void 0));
                this.allowOnlineBooking = (__runInitializers(this, _preferredDuration_extraInitializers), __runInitializers(this, _allowOnlineBooking_initializers, void 0));
                this.advanceBookingDays = (__runInitializers(this, _allowOnlineBooking_extraInitializers), __runInitializers(this, _advanceBookingDays_initializers, void 0));
                __runInitializers(this, _advanceBookingDays_extraInitializers);
            }
            ScheduleSettingsDto._OPENAPI_METADATA_FACTORY = function () {
                return { minAppointmentDuration: { required: false, type: function () { return Number; }, minimum: 5 }, appointmentBuffer: { required: false, type: function () { return Number; }, minimum: 0 }, maxAppointmentsPerDay: { required: false, type: function () { return Number; }, minimum: 1 }, preferredDuration: { required: false, type: function () { return Number; }, minimum: 5 }, allowOnlineBooking: { required: false, type: function () { return Boolean; } }, advanceBookingDays: { required: false, type: function () { return Number; }, minimum: 1 } };
            };
            return ScheduleSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _minAppointmentDuration_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Minimum appointment duration in minutes', example: 15 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5), (0, class_validator_1.IsOptional)()];
            _appointmentBuffer_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Appointment buffer time in minutes', example: 5 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.IsOptional)()];
            _maxAppointmentsPerDay_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Max appointments per day', example: 20 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.IsOptional)()];
            _preferredDuration_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Preferred appointment duration in minutes', example: 30 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5), (0, class_validator_1.IsOptional)()];
            _allowOnlineBooking_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to allow online booking', example: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _advanceBookingDays_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'How many days in advance appointment can be booked', example: 30 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _minAppointmentDuration_decorators, { kind: "field", name: "minAppointmentDuration", static: false, private: false, access: { has: function (obj) { return "minAppointmentDuration" in obj; }, get: function (obj) { return obj.minAppointmentDuration; }, set: function (obj, value) { obj.minAppointmentDuration = value; } }, metadata: _metadata }, _minAppointmentDuration_initializers, _minAppointmentDuration_extraInitializers);
            __esDecorate(null, null, _appointmentBuffer_decorators, { kind: "field", name: "appointmentBuffer", static: false, private: false, access: { has: function (obj) { return "appointmentBuffer" in obj; }, get: function (obj) { return obj.appointmentBuffer; }, set: function (obj, value) { obj.appointmentBuffer = value; } }, metadata: _metadata }, _appointmentBuffer_initializers, _appointmentBuffer_extraInitializers);
            __esDecorate(null, null, _maxAppointmentsPerDay_decorators, { kind: "field", name: "maxAppointmentsPerDay", static: false, private: false, access: { has: function (obj) { return "maxAppointmentsPerDay" in obj; }, get: function (obj) { return obj.maxAppointmentsPerDay; }, set: function (obj, value) { obj.maxAppointmentsPerDay = value; } }, metadata: _metadata }, _maxAppointmentsPerDay_initializers, _maxAppointmentsPerDay_extraInitializers);
            __esDecorate(null, null, _preferredDuration_decorators, { kind: "field", name: "preferredDuration", static: false, private: false, access: { has: function (obj) { return "preferredDuration" in obj; }, get: function (obj) { return obj.preferredDuration; }, set: function (obj, value) { obj.preferredDuration = value; } }, metadata: _metadata }, _preferredDuration_initializers, _preferredDuration_extraInitializers);
            __esDecorate(null, null, _allowOnlineBooking_decorators, { kind: "field", name: "allowOnlineBooking", static: false, private: false, access: { has: function (obj) { return "allowOnlineBooking" in obj; }, get: function (obj) { return obj.allowOnlineBooking; }, set: function (obj, value) { obj.allowOnlineBooking = value; } }, metadata: _metadata }, _allowOnlineBooking_initializers, _allowOnlineBooking_extraInitializers);
            __esDecorate(null, null, _advanceBookingDays_decorators, { kind: "field", name: "advanceBookingDays", static: false, private: false, access: { has: function (obj) { return "advanceBookingDays" in obj; }, get: function (obj) { return obj.advanceBookingDays; }, set: function (obj, value) { obj.advanceBookingDays = value; } }, metadata: _metadata }, _advanceBookingDays_initializers, _advanceBookingDays_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
// Make all fields optional for updates
var UpdateScheduleDto = function () {
    var _a;
    var _dayOfWeek_decorators;
    var _dayOfWeek_initializers = [];
    var _dayOfWeek_extraInitializers = [];
    var _workStart_decorators;
    var _workStart_initializers = [];
    var _workStart_extraInitializers = [];
    var _workEnd_decorators;
    var _workEnd_initializers = [];
    var _workEnd_extraInitializers = [];
    var _breakStart_decorators;
    var _breakStart_initializers = [];
    var _breakStart_extraInitializers = [];
    var _breakEnd_decorators;
    var _breakEnd_initializers = [];
    var _breakEnd_extraInitializers = [];
    var _defaultAppointmentDuration_decorators;
    var _defaultAppointmentDuration_initializers = [];
    var _defaultAppointmentDuration_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _settings_decorators;
    var _settings_initializers = [];
    var _settings_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateScheduleDto() {
                this.dayOfWeek = __runInitializers(this, _dayOfWeek_initializers, void 0);
                this.workStart = (__runInitializers(this, _dayOfWeek_extraInitializers), __runInitializers(this, _workStart_initializers, void 0));
                this.workEnd = (__runInitializers(this, _workStart_extraInitializers), __runInitializers(this, _workEnd_initializers, void 0));
                this.breakStart = (__runInitializers(this, _workEnd_extraInitializers), __runInitializers(this, _breakStart_initializers, void 0));
                this.breakEnd = (__runInitializers(this, _breakStart_extraInitializers), __runInitializers(this, _breakEnd_initializers, void 0));
                this.defaultAppointmentDuration = (__runInitializers(this, _breakEnd_extraInitializers), __runInitializers(this, _defaultAppointmentDuration_initializers, void 0));
                this.isActive = (__runInitializers(this, _defaultAppointmentDuration_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.settings = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _settings_initializers, void 0));
                __runInitializers(this, _settings_extraInitializers);
            }
            UpdateScheduleDto._OPENAPI_METADATA_FACTORY = function () {
                return { dayOfWeek: { required: false, type: function () { return Number; }, minimum: 0, maximum: 6 }, workStart: { required: false, type: function () { return String; } }, workEnd: { required: false, type: function () { return String; } }, breakStart: { required: false, type: function () { return String; } }, breakEnd: { required: false, type: function () { return String; } }, defaultAppointmentDuration: { required: false, type: function () { return Number; }, minimum: 5 }, isActive: { required: false, type: function () { return Boolean; } }, settings: { required: false, type: function () { return ScheduleSettingsDto; } } };
            };
            return UpdateScheduleDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _dayOfWeek_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Day of week (0=Sunday, 1=Monday, etc.)', example: 1 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(6), (0, class_validator_1.IsOptional)()];
            _workStart_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Work start time', example: '09:00' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _workEnd_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Work end time', example: '17:00' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _breakStart_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Break start time', example: '12:00' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _breakEnd_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Break end time', example: '13:00' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _defaultAppointmentDuration_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Default appointment duration in minutes', example: 30 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Is this schedule active', default: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _settings_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional schedule settings', type: ScheduleSettingsDto }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return ScheduleSettingsDto; }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _dayOfWeek_decorators, { kind: "field", name: "dayOfWeek", static: false, private: false, access: { has: function (obj) { return "dayOfWeek" in obj; }, get: function (obj) { return obj.dayOfWeek; }, set: function (obj, value) { obj.dayOfWeek = value; } }, metadata: _metadata }, _dayOfWeek_initializers, _dayOfWeek_extraInitializers);
            __esDecorate(null, null, _workStart_decorators, { kind: "field", name: "workStart", static: false, private: false, access: { has: function (obj) { return "workStart" in obj; }, get: function (obj) { return obj.workStart; }, set: function (obj, value) { obj.workStart = value; } }, metadata: _metadata }, _workStart_initializers, _workStart_extraInitializers);
            __esDecorate(null, null, _workEnd_decorators, { kind: "field", name: "workEnd", static: false, private: false, access: { has: function (obj) { return "workEnd" in obj; }, get: function (obj) { return obj.workEnd; }, set: function (obj, value) { obj.workEnd = value; } }, metadata: _metadata }, _workEnd_initializers, _workEnd_extraInitializers);
            __esDecorate(null, null, _breakStart_decorators, { kind: "field", name: "breakStart", static: false, private: false, access: { has: function (obj) { return "breakStart" in obj; }, get: function (obj) { return obj.breakStart; }, set: function (obj, value) { obj.breakStart = value; } }, metadata: _metadata }, _breakStart_initializers, _breakStart_extraInitializers);
            __esDecorate(null, null, _breakEnd_decorators, { kind: "field", name: "breakEnd", static: false, private: false, access: { has: function (obj) { return "breakEnd" in obj; }, get: function (obj) { return obj.breakEnd; }, set: function (obj, value) { obj.breakEnd = value; } }, metadata: _metadata }, _breakEnd_initializers, _breakEnd_extraInitializers);
            __esDecorate(null, null, _defaultAppointmentDuration_decorators, { kind: "field", name: "defaultAppointmentDuration", static: false, private: false, access: { has: function (obj) { return "defaultAppointmentDuration" in obj; }, get: function (obj) { return obj.defaultAppointmentDuration; }, set: function (obj, value) { obj.defaultAppointmentDuration = value; } }, metadata: _metadata }, _defaultAppointmentDuration_initializers, _defaultAppointmentDuration_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _settings_decorators, { kind: "field", name: "settings", static: false, private: false, access: { has: function (obj) { return "settings" in obj; }, get: function (obj) { return obj.settings; }, set: function (obj, value) { obj.settings = value; } }, metadata: _metadata }, _settings_initializers, _settings_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateScheduleDto = UpdateScheduleDto;
//# sourceMappingURL=update-schedule.dto.js.map