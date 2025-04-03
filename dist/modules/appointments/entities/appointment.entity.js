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
exports.Appointment = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/appointment.entity.ts
var typeorm_1 = require("typeorm");
var appointment_type_enum_1 = require("../enums/appointment-type.enum");
var appointment_status_enum_1 = require("../enums/appointment-status.enum");
var appointment_priority_enum_1 = require("../enums/appointment-priority.enum");
var swagger_1 = require("@nestjs/swagger");
// DO NOT import Contact directly - this is what causes the circular dependency
var Appointment = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('appointments'), (0, typeorm_1.Index)(['organizationId', 'startTime']), (0, typeorm_1.Index)(['doctorId', 'startTime']), (0, typeorm_1.Index)(['patientId', 'startTime'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _confirmedAt_decorators;
    var _confirmedAt_initializers = [];
    var _confirmedAt_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
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
    var _isRecurring_decorators;
    var _isRecurring_initializers = [];
    var _isRecurring_extraInitializers = [];
    var _recurrencePattern_decorators;
    var _recurrencePattern_initializers = [];
    var _recurrencePattern_extraInitializers = [];
    var _parentAppointmentId_decorators;
    var _parentAppointmentId_initializers = [];
    var _parentAppointmentId_extraInitializers = [];
    var _cancellationReason_decorators;
    var _cancellationReason_initializers = [];
    var _cancellationReason_extraInitializers = [];
    var _reschedulingReason_decorators;
    var _reschedulingReason_initializers = [];
    var _reschedulingReason_extraInitializers = [];
    var _reminderSent_decorators;
    var _reminderSent_initializers = [];
    var _reminderSent_extraInitializers = [];
    var _reminderSentAt_decorators;
    var _reminderSentAt_initializers = [];
    var _reminderSentAt_extraInitializers = [];
    var _checkedInAt_decorators;
    var _checkedInAt_initializers = [];
    var _checkedInAt_extraInitializers = [];
    var _completedAt_decorators;
    var _completedAt_initializers = [];
    var _completedAt_extraInitializers = [];
    var _cancelledAt_decorators;
    var _cancelledAt_initializers = [];
    var _cancelledAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _patient_decorators;
    var _patient_initializers = [];
    var _patient_extraInitializers = [];
    var _doctor_decorators;
    var _doctor_initializers = [];
    var _doctor_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _parentAppointment_decorators;
    var _parentAppointment_initializers = [];
    var _parentAppointment_extraInitializers = [];
    var _recurrentAppointments_decorators;
    var _recurrentAppointments_initializers = [];
    var _recurrentAppointments_extraInitializers = [];
    var Appointment = _classThis = /** @class */ (function () {
        function Appointment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.startTime = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.notes = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.organizationId = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.patientId = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _patientId_initializers, void 0));
            this.doctorId = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _doctorId_initializers, void 0));
            this.createdById = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.confirmedAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _confirmedAt_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _confirmedAt_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.type = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.priority = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.description = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.location = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.meetingLink = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _meetingLink_initializers, void 0));
            this.sendReminders = (__runInitializers(this, _meetingLink_extraInitializers), __runInitializers(this, _sendReminders_initializers, void 0));
            this.reminderPreferences = (__runInitializers(this, _sendReminders_extraInitializers), __runInitializers(this, _reminderPreferences_initializers, void 0));
            this.formData = (__runInitializers(this, _reminderPreferences_extraInitializers), __runInitializers(this, _formData_initializers, void 0));
            this.metadata = (__runInitializers(this, _formData_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.isRecurring = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _isRecurring_initializers, void 0));
            this.recurrencePattern = (__runInitializers(this, _isRecurring_extraInitializers), __runInitializers(this, _recurrencePattern_initializers, void 0));
            this.parentAppointmentId = (__runInitializers(this, _recurrencePattern_extraInitializers), __runInitializers(this, _parentAppointmentId_initializers, void 0));
            this.cancellationReason = (__runInitializers(this, _parentAppointmentId_extraInitializers), __runInitializers(this, _cancellationReason_initializers, void 0));
            this.reschedulingReason = (__runInitializers(this, _cancellationReason_extraInitializers), __runInitializers(this, _reschedulingReason_initializers, void 0));
            this.reminderSent = (__runInitializers(this, _reschedulingReason_extraInitializers), __runInitializers(this, _reminderSent_initializers, void 0));
            this.reminderSentAt = (__runInitializers(this, _reminderSent_extraInitializers), __runInitializers(this, _reminderSentAt_initializers, void 0));
            this.checkedInAt = (__runInitializers(this, _reminderSentAt_extraInitializers), __runInitializers(this, _checkedInAt_initializers, void 0));
            this.completedAt = (__runInitializers(this, _checkedInAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
            this.cancelledAt = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _cancelledAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _cancelledAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // Relationships - use only string references for circular dependencies
            this.organization = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            // FIXED: Keep only one relationship to Contact using patientId
            this.patient = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _patient_initializers, void 0));
            // REMOVED the duplicate relationship that was here
            // @ManyToOne('Contact', 'appointments', { onDelete: 'CASCADE' })
            // @JoinColumn({ name: 'patientId' })
            // contact: any;
            this.doctor = (__runInitializers(this, _patient_extraInitializers), __runInitializers(this, _doctor_initializers, void 0));
            this.createdBy = (__runInitializers(this, _doctor_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.parentAppointment = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _parentAppointment_initializers, void 0));
            this.recurrentAppointments = (__runInitializers(this, _parentAppointment_extraInitializers), __runInitializers(this, _recurrentAppointments_initializers, void 0));
            this.provider = __runInitializers(this, _recurrentAppointments_extraInitializers);
        }
        // Helper methods
        Appointment_1.prototype.isUpcoming = function () {
            return new Date() < this.startTime;
        };
        Appointment_1.prototype.isInProgress = function () {
            var now = new Date();
            return now >= this.startTime && now <= this.endTime;
        };
        Appointment_1.prototype.isOverdue = function () {
            return new Date() > this.endTime && this.status !== appointment_status_enum_1.AppointmentStatus.COMPLETED;
        };
        Appointment_1.prototype.getDuration = function () {
            return this.endTime.getTime() - this.startTime.getTime();
        };
        Appointment_1.prototype.canBeModified = function () {
            return ![
                appointment_status_enum_1.AppointmentStatus.COMPLETED,
                appointment_status_enum_1.AppointmentStatus.CANCELLED,
            ].includes(this.status);
        };
        Appointment_1.prototype.needsReminder = function () {
            var _a;
            if (!this.sendReminders || this.reminderSent || !this.isUpcoming()) {
                return false;
            }
            var now = new Date();
            var nextReminderTime = Math.min.apply(Math, ((_a = this.reminderPreferences) === null || _a === void 0 ? void 0 : _a.reminderTimes) || [60]);
            var reminderDue = new Date(this.startTime.getTime() - nextReminderTime * 60000);
            return now >= reminderDue;
        };
        Appointment_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, title: { required: true, type: function () { return String; } }, startTime: { required: true, type: function () { return Date; } }, endTime: { required: true, type: function () { return Date; } }, notes: { required: false, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, patientId: { required: true, type: function () { return String; } }, doctorId: { required: true, type: function () { return String; } }, createdById: { required: true, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, confirmedAt: { required: false, type: function () { return Date; } }, scheduledFor: { required: true, type: function () { return Date; } }, type: { required: true, enum: require("../enums/appointment-type.enum").AppointmentType }, status: { required: true, enum: require("../enums/appointment-status.enum").AppointmentStatus }, priority: { required: true, enum: require("../enums/appointment-priority.enum").AppointmentPriority }, description: { required: true, type: function () { return String; } }, location: { required: true, type: function () { return String; } }, meetingLink: { required: true, type: function () { return String; } }, sendReminders: { required: true, type: function () { return Boolean; } }, reminderPreferences: { required: true, type: function () { return ({ email: { required: true, type: function () { return Boolean; } }, sms: { required: true, type: function () { return Boolean; } }, whatsapp: { required: true, type: function () { return Boolean; } }, reminderTimes: { required: true, type: function () { return [Number]; } } }); } }, formData: { required: true, type: function () { return ({ chiefComplaint: { required: false, type: function () { return String; } }, symptoms: { required: false, type: function () { return [String]; } }, duration: { required: false, type: function () { return String; } }, notes: { required: false, type: function () { return String; } }, diagnosis: { required: false, type: function () { return String; } }, treatmentPlan: { required: false, type: function () { return String; } }, prescriptions: { required: false, type: function () { return [String]; } }, followUpInstructions: { required: false, type: function () { return String; } } }); } }, metadata: { required: true, type: function () { return ({ referralSource: { required: false, type: function () { return String; } }, insurance: { required: false, type: function () { return String; } }, tags: { required: false, type: function () { return [String]; } }, externalId: { required: false, type: function () { return String; } }, followUpAppointmentId: { required: false, type: function () { return String; } }, previousAppointmentId: { required: false, type: function () { return String; } }, billingStatus: { required: false, type: function () { return String; } }, claimStatus: { required: false, type: function () { return String; } }, followUpSentAt: { required: false, type: function () { return String; } } }); } }, isRecurring: { required: true, type: function () { return Boolean; } }, recurrencePattern: { required: true, type: function () { return ({ frequency: { required: true, type: function () { return Object; } }, interval: { required: true, type: function () { return Number; } }, endDate: { required: false, type: function () { return Date; } }, daysOfWeek: { required: false, type: function () { return [Number]; } } }); } }, parentAppointmentId: { required: true, type: function () { return String; } }, cancellationReason: { required: true, type: function () { return String; } }, reschedulingReason: { required: true, type: function () { return String; } }, reminderSent: { required: true, type: function () { return Boolean; } }, reminderSentAt: { required: true, type: function () { return Date; } }, checkedInAt: { required: true, type: function () { return Date; } }, completedAt: { required: true, type: function () { return Date; } }, cancelledAt: { required: true, type: function () { return Date; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, organization: { required: true, type: function () { return Object; } }, patient: { required: true, type: function () { return Object; } }, doctor: { required: true, type: function () { return Object; } }, createdBy: { required: true, type: function () { return Object; } }, updatedBy: { required: true, type: function () { return Object; } }, parentAppointment: { required: true, type: function () { return require("./appointment.entity").Appointment; } }, recurrentAppointments: { required: true, type: function () { return [require("./appointment.entity").Appointment]; } }, provider: { required: true, type: function () { return Object; } } };
        };
        return Appointment_1;
    }());
    __setFunctionName(_classThis, "Appointment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _title_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _startTime_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp' })];
        _endTime_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'timestamp' })];
        _notes_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _patientId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _doctorId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _createdById_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _confirmedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone' })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: appointment_type_enum_1.AppointmentType,
                default: appointment_type_enum_1.AppointmentType.IN_PERSON,
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: appointment_status_enum_1.AppointmentStatus,
                default: appointment_status_enum_1.AppointmentStatus.SCHEDULED,
            })];
        _priority_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: appointment_priority_enum_1.AppointmentPriority,
                default: appointment_priority_enum_1.AppointmentPriority.NORMAL,
            })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _location_decorators = [(0, typeorm_1.Column)({ length: 200, nullable: true })];
        _meetingLink_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true })];
        _sendReminders_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _reminderPreferences_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _formData_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _isRecurring_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _recurrencePattern_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _parentAppointmentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _cancellationReason_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true })];
        _reschedulingReason_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true })];
        _reminderSent_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _reminderSentAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _checkedInAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _completedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _cancelledAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' })];
        _organization_decorators = [(0, typeorm_1.ManyToOne)('Organization', { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _patient_decorators = [(0, typeorm_1.ManyToOne)('Contact', 'appointments', { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'patientId' })];
        _doctor_decorators = [(0, typeorm_1.ManyToOne)('User', { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'doctorId' })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)('User'), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _parentAppointment_decorators = [(0, typeorm_1.ManyToOne)(function () { return Appointment; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'parentAppointmentId' })];
        _recurrentAppointments_decorators = [(0, typeorm_1.OneToMany)(function () { return Appointment; }, function (appointment) { return appointment.parentAppointment; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
        __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _confirmedAt_decorators, { kind: "field", name: "confirmedAt", static: false, private: false, access: { has: function (obj) { return "confirmedAt" in obj; }, get: function (obj) { return obj.confirmedAt; }, set: function (obj, value) { obj.confirmedAt = value; } }, metadata: _metadata }, _confirmedAt_initializers, _confirmedAt_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _meetingLink_decorators, { kind: "field", name: "meetingLink", static: false, private: false, access: { has: function (obj) { return "meetingLink" in obj; }, get: function (obj) { return obj.meetingLink; }, set: function (obj, value) { obj.meetingLink = value; } }, metadata: _metadata }, _meetingLink_initializers, _meetingLink_extraInitializers);
        __esDecorate(null, null, _sendReminders_decorators, { kind: "field", name: "sendReminders", static: false, private: false, access: { has: function (obj) { return "sendReminders" in obj; }, get: function (obj) { return obj.sendReminders; }, set: function (obj, value) { obj.sendReminders = value; } }, metadata: _metadata }, _sendReminders_initializers, _sendReminders_extraInitializers);
        __esDecorate(null, null, _reminderPreferences_decorators, { kind: "field", name: "reminderPreferences", static: false, private: false, access: { has: function (obj) { return "reminderPreferences" in obj; }, get: function (obj) { return obj.reminderPreferences; }, set: function (obj, value) { obj.reminderPreferences = value; } }, metadata: _metadata }, _reminderPreferences_initializers, _reminderPreferences_extraInitializers);
        __esDecorate(null, null, _formData_decorators, { kind: "field", name: "formData", static: false, private: false, access: { has: function (obj) { return "formData" in obj; }, get: function (obj) { return obj.formData; }, set: function (obj, value) { obj.formData = value; } }, metadata: _metadata }, _formData_initializers, _formData_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _isRecurring_decorators, { kind: "field", name: "isRecurring", static: false, private: false, access: { has: function (obj) { return "isRecurring" in obj; }, get: function (obj) { return obj.isRecurring; }, set: function (obj, value) { obj.isRecurring = value; } }, metadata: _metadata }, _isRecurring_initializers, _isRecurring_extraInitializers);
        __esDecorate(null, null, _recurrencePattern_decorators, { kind: "field", name: "recurrencePattern", static: false, private: false, access: { has: function (obj) { return "recurrencePattern" in obj; }, get: function (obj) { return obj.recurrencePattern; }, set: function (obj, value) { obj.recurrencePattern = value; } }, metadata: _metadata }, _recurrencePattern_initializers, _recurrencePattern_extraInitializers);
        __esDecorate(null, null, _parentAppointmentId_decorators, { kind: "field", name: "parentAppointmentId", static: false, private: false, access: { has: function (obj) { return "parentAppointmentId" in obj; }, get: function (obj) { return obj.parentAppointmentId; }, set: function (obj, value) { obj.parentAppointmentId = value; } }, metadata: _metadata }, _parentAppointmentId_initializers, _parentAppointmentId_extraInitializers);
        __esDecorate(null, null, _cancellationReason_decorators, { kind: "field", name: "cancellationReason", static: false, private: false, access: { has: function (obj) { return "cancellationReason" in obj; }, get: function (obj) { return obj.cancellationReason; }, set: function (obj, value) { obj.cancellationReason = value; } }, metadata: _metadata }, _cancellationReason_initializers, _cancellationReason_extraInitializers);
        __esDecorate(null, null, _reschedulingReason_decorators, { kind: "field", name: "reschedulingReason", static: false, private: false, access: { has: function (obj) { return "reschedulingReason" in obj; }, get: function (obj) { return obj.reschedulingReason; }, set: function (obj, value) { obj.reschedulingReason = value; } }, metadata: _metadata }, _reschedulingReason_initializers, _reschedulingReason_extraInitializers);
        __esDecorate(null, null, _reminderSent_decorators, { kind: "field", name: "reminderSent", static: false, private: false, access: { has: function (obj) { return "reminderSent" in obj; }, get: function (obj) { return obj.reminderSent; }, set: function (obj, value) { obj.reminderSent = value; } }, metadata: _metadata }, _reminderSent_initializers, _reminderSent_extraInitializers);
        __esDecorate(null, null, _reminderSentAt_decorators, { kind: "field", name: "reminderSentAt", static: false, private: false, access: { has: function (obj) { return "reminderSentAt" in obj; }, get: function (obj) { return obj.reminderSentAt; }, set: function (obj, value) { obj.reminderSentAt = value; } }, metadata: _metadata }, _reminderSentAt_initializers, _reminderSentAt_extraInitializers);
        __esDecorate(null, null, _checkedInAt_decorators, { kind: "field", name: "checkedInAt", static: false, private: false, access: { has: function (obj) { return "checkedInAt" in obj; }, get: function (obj) { return obj.checkedInAt; }, set: function (obj, value) { obj.checkedInAt = value; } }, metadata: _metadata }, _checkedInAt_initializers, _checkedInAt_extraInitializers);
        __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: function (obj) { return "completedAt" in obj; }, get: function (obj) { return obj.completedAt; }, set: function (obj, value) { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
        __esDecorate(null, null, _cancelledAt_decorators, { kind: "field", name: "cancelledAt", static: false, private: false, access: { has: function (obj) { return "cancelledAt" in obj; }, get: function (obj) { return obj.cancelledAt; }, set: function (obj, value) { obj.cancelledAt = value; } }, metadata: _metadata }, _cancelledAt_initializers, _cancelledAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _patient_decorators, { kind: "field", name: "patient", static: false, private: false, access: { has: function (obj) { return "patient" in obj; }, get: function (obj) { return obj.patient; }, set: function (obj, value) { obj.patient = value; } }, metadata: _metadata }, _patient_initializers, _patient_extraInitializers);
        __esDecorate(null, null, _doctor_decorators, { kind: "field", name: "doctor", static: false, private: false, access: { has: function (obj) { return "doctor" in obj; }, get: function (obj) { return obj.doctor; }, set: function (obj, value) { obj.doctor = value; } }, metadata: _metadata }, _doctor_initializers, _doctor_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _parentAppointment_decorators, { kind: "field", name: "parentAppointment", static: false, private: false, access: { has: function (obj) { return "parentAppointment" in obj; }, get: function (obj) { return obj.parentAppointment; }, set: function (obj, value) { obj.parentAppointment = value; } }, metadata: _metadata }, _parentAppointment_initializers, _parentAppointment_extraInitializers);
        __esDecorate(null, null, _recurrentAppointments_decorators, { kind: "field", name: "recurrentAppointments", static: false, private: false, access: { has: function (obj) { return "recurrentAppointments" in obj; }, get: function (obj) { return obj.recurrentAppointments; }, set: function (obj, value) { obj.recurrentAppointments = value; } }, metadata: _metadata }, _recurrentAppointments_initializers, _recurrentAppointments_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Appointment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Appointment = _classThis;
}();
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map