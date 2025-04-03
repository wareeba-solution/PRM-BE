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
exports.CreateAppointmentDto = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/create-appointment.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var appointment_type_enum_1 = require("../enums/appointment-type.enum");
var appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
var CreateAppointmentDto = function () {
    var _a;
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _meetingLink_decorators;
    var _meetingLink_initializers = [];
    var _meetingLink_extraInitializers = [];
    var _sendReminders_decorators;
    var _sendReminders_initializers = [];
    var _sendReminders_extraInitializers = [];
    var _reminderPreferences_decorators;
    var _reminderPreferences_initializers = [];
    var _reminderPreferences_extraInitializers = [];
    var _formData_decorators;
    var _formData_initializers = [];
    var _formData_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAppointmentDto() {
                this.patientId = __runInitializers(this, _patientId_initializers, void 0);
                this.isRecurring = __runInitializers(this, _patientId_extraInitializers);
                this.doctorId = __runInitializers(this, _doctorId_initializers, void 0);
                this.startTime = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.type = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.priority = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.title = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.location = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.meetingLink = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _meetingLink_initializers, void 0));
                this.sendReminders = (__runInitializers(this, _meetingLink_extraInitializers), __runInitializers(this, _sendReminders_initializers, void 0));
                this.reminderPreferences = (__runInitializers(this, _sendReminders_extraInitializers), __runInitializers(this, _reminderPreferences_initializers, void 0));
                this.formData = (__runInitializers(this, _reminderPreferences_extraInitializers), __runInitializers(this, _formData_initializers, void 0));
                this.metadata = (__runInitializers(this, _formData_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            CreateAppointmentDto._OPENAPI_METADATA_FACTORY = function () {
                return { patientId: { required: true, type: function () { return String; }, format: "uuid" }, isRecurring: { required: false, type: function () { return Boolean; } }, recurrencePattern: { required: false, type: function () { return Object; } }, doctorId: { required: true, type: function () { return String; }, format: "uuid" }, startTime: { required: true, type: function () { return String; } }, endTime: { required: true, type: function () { return String; } }, type: { required: true, enum: require("../enums/appointment-type.enum").AppointmentType }, priority: { required: false, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, title: { required: true, type: function () { return String; }, minLength: 3, maxLength: 100 }, description: { required: false, type: function () { return String; }, maxLength: 1000 }, location: { required: false, type: function () { return String; }, maxLength: 200 }, meetingLink: { required: false, type: function () { return String; }, maxLength: 500 }, sendReminders: { required: false, type: function () { return Boolean; } }, reminderPreferences: { required: false, type: function () { return ReminderPreferencesDto; } }, formData: { required: false, type: function () { return AppointmentFormDataDto; } }, metadata: { required: false, type: function () { return AppointmentMetadataDto; } } };
            };
            return CreateAppointmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _patientId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Patient/Contact ID' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)()];
            _doctorId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Doctor ID' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)()];
            _startTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Appointment start time', example: '2024-02-10T10:00:00Z' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsDateString)()];
            _endTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Appointment end time', example: '2024-02-10T11:00:00Z' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsDateString)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({ enum: appointment_type_enum_1.AppointmentType, description: 'Type of appointment' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEnum)(appointment_type_enum_1.AppointmentType)];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: appointment_priority_enum_1.AppointmentPriority, description: 'Priority of appointment' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(appointment_priority_enum_1.AppointmentPriority)];
            _title_decorators = [(0, swagger_1.ApiProperty)({ description: 'Title/Subject of appointment' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(100)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Detailed description of appointment' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            _location_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Location of appointment' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
            _meetingLink_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Meeting link for virtual appointments' }), (0, class_validator_1.ValidateIf)(function (o) { return o.type === appointment_type_enum_1.AppointmentType.VIRTUAL; }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _sendReminders_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to send reminders' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _reminderPreferences_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Reminder preferences' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return ReminderPreferencesDto; })];
            _formData_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom form data for appointment' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return AppointmentFormDataDto; })];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional metadata for appointment' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return AppointmentMetadataDto; })];
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _meetingLink_decorators, { kind: "field", name: "meetingLink", static: false, private: false, access: { has: function (obj) { return "meetingLink" in obj; }, get: function (obj) { return obj.meetingLink; }, set: function (obj, value) { obj.meetingLink = value; } }, metadata: _metadata }, _meetingLink_initializers, _meetingLink_extraInitializers);
            __esDecorate(null, null, _sendReminders_decorators, { kind: "field", name: "sendReminders", static: false, private: false, access: { has: function (obj) { return "sendReminders" in obj; }, get: function (obj) { return obj.sendReminders; }, set: function (obj, value) { obj.sendReminders = value; } }, metadata: _metadata }, _sendReminders_initializers, _sendReminders_extraInitializers);
            __esDecorate(null, null, _reminderPreferences_decorators, { kind: "field", name: "reminderPreferences", static: false, private: false, access: { has: function (obj) { return "reminderPreferences" in obj; }, get: function (obj) { return obj.reminderPreferences; }, set: function (obj, value) { obj.reminderPreferences = value; } }, metadata: _metadata }, _reminderPreferences_initializers, _reminderPreferences_extraInitializers);
            __esDecorate(null, null, _formData_decorators, { kind: "field", name: "formData", static: false, private: false, access: { has: function (obj) { return "formData" in obj; }, get: function (obj) { return obj.formData; }, set: function (obj, value) { obj.formData = value; } }, metadata: _metadata }, _formData_initializers, _formData_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAppointmentDto = CreateAppointmentDto;
var ReminderPreferencesDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _sms_decorators;
    var _sms_initializers = [];
    var _sms_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _reminderTimes_decorators;
    var _reminderTimes_initializers = [];
    var _reminderTimes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ReminderPreferencesDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.sms = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _sms_initializers, void 0));
                this.whatsapp = (__runInitializers(this, _sms_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
                this.reminderTimes = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _reminderTimes_initializers, void 0));
                __runInitializers(this, _reminderTimes_extraInitializers);
            }
            ReminderPreferencesDto._OPENAPI_METADATA_FACTORY = function () {
                return { email: { required: false, type: function () { return Boolean; } }, sms: { required: false, type: function () { return Boolean; } }, whatsapp: { required: false, type: function () { return Boolean; } }, reminderTimes: { required: false, type: function () { return [Number]; } } };
            };
            return ReminderPreferencesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Send email reminders' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _sms_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Send SMS reminders' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _whatsapp_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Send WhatsApp reminders' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _reminderTimes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Reminder times in minutes before appointment' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _sms_decorators, { kind: "field", name: "sms", static: false, private: false, access: { has: function (obj) { return "sms" in obj; }, get: function (obj) { return obj.sms; }, set: function (obj, value) { obj.sms = value; } }, metadata: _metadata }, _sms_initializers, _sms_extraInitializers);
            __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
            __esDecorate(null, null, _reminderTimes_decorators, { kind: "field", name: "reminderTimes", static: false, private: false, access: { has: function (obj) { return "reminderTimes" in obj; }, get: function (obj) { return obj.reminderTimes; }, set: function (obj, value) { obj.reminderTimes = value; } }, metadata: _metadata }, _reminderTimes_initializers, _reminderTimes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var AppointmentFormDataDto = function () {
    var _a;
    var _chiefComplaint_decorators;
    var _chiefComplaint_initializers = [];
    var _chiefComplaint_extraInitializers = [];
    var _symptoms_decorators;
    var _symptoms_initializers = [];
    var _symptoms_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AppointmentFormDataDto() {
                this.chiefComplaint = __runInitializers(this, _chiefComplaint_initializers, void 0);
                this.symptoms = (__runInitializers(this, _chiefComplaint_extraInitializers), __runInitializers(this, _symptoms_initializers, void 0));
                this.duration = (__runInitializers(this, _symptoms_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
                this.notes = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            AppointmentFormDataDto._OPENAPI_METADATA_FACTORY = function () {
                return { chiefComplaint: { required: false, type: function () { return String; }, maxLength: 500 }, symptoms: { required: false, type: function () { return [String]; } }, duration: { required: false, type: function () { return String; }, maxLength: 100 }, notes: { required: false, type: function () { return String; }, maxLength: 1000 } };
            };
            return AppointmentFormDataDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _chiefComplaint_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Chief complaint' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _symptoms_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Symptoms' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _duration_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Duration of symptoms' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _chiefComplaint_decorators, { kind: "field", name: "chiefComplaint", static: false, private: false, access: { has: function (obj) { return "chiefComplaint" in obj; }, get: function (obj) { return obj.chiefComplaint; }, set: function (obj, value) { obj.chiefComplaint = value; } }, metadata: _metadata }, _chiefComplaint_initializers, _chiefComplaint_extraInitializers);
            __esDecorate(null, null, _symptoms_decorators, { kind: "field", name: "symptoms", static: false, private: false, access: { has: function (obj) { return "symptoms" in obj; }, get: function (obj) { return obj.symptoms; }, set: function (obj, value) { obj.symptoms = value; } }, metadata: _metadata }, _symptoms_initializers, _symptoms_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var AppointmentMetadataDto = function () {
    var _a;
    var _referralSource_decorators;
    var _referralSource_initializers = [];
    var _referralSource_extraInitializers = [];
    var _insurance_decorators;
    var _insurance_initializers = [];
    var _insurance_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _externalId_decorators;
    var _externalId_initializers = [];
    var _externalId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AppointmentMetadataDto() {
                this.referralSource = __runInitializers(this, _referralSource_initializers, void 0);
                this.insurance = (__runInitializers(this, _referralSource_extraInitializers), __runInitializers(this, _insurance_initializers, void 0));
                this.tags = (__runInitializers(this, _insurance_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.externalId = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _externalId_initializers, void 0));
                __runInitializers(this, _externalId_extraInitializers);
            }
            AppointmentMetadataDto._OPENAPI_METADATA_FACTORY = function () {
                return { referralSource: { required: false, type: function () { return String; } }, insurance: { required: false, type: function () { return String; } }, tags: { required: false, type: function () { return [String]; } }, externalId: { required: false, type: function () { return String; } } };
            };
            return AppointmentMetadataDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _referralSource_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Referral source' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _insurance_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Insurance information' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom tags' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _externalId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'External reference ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _referralSource_decorators, { kind: "field", name: "referralSource", static: false, private: false, access: { has: function (obj) { return "referralSource" in obj; }, get: function (obj) { return obj.referralSource; }, set: function (obj, value) { obj.referralSource = value; } }, metadata: _metadata }, _referralSource_initializers, _referralSource_extraInitializers);
            __esDecorate(null, null, _insurance_decorators, { kind: "field", name: "insurance", static: false, private: false, access: { has: function (obj) { return "insurance" in obj; }, get: function (obj) { return obj.insurance; }, set: function (obj, value) { obj.insurance = value; } }, metadata: _metadata }, _insurance_initializers, _insurance_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _externalId_decorators, { kind: "field", name: "externalId", static: false, private: false, access: { has: function (obj) { return "externalId" in obj; }, get: function (obj) { return obj.externalId; }, set: function (obj, value) { obj.externalId = value; } }, metadata: _metadata }, _externalId_initializers, _externalId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
//# sourceMappingURL=create-appointment.dto.js.map