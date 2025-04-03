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
exports.AppointmentReminder = exports.ReminderStatus = exports.ReminderType = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/appointment-reminder.entity.ts
var typeorm_1 = require("typeorm");
var appointment_entity_1 = require("./appointment.entity");
var ReminderType;
(function (ReminderType) {
    ReminderType["EMAIL"] = "email";
    ReminderType["SMS"] = "sms";
    ReminderType["PUSH"] = "push";
    ReminderType["WHATSAPP"] = "whatsapp";
})(ReminderType || (exports.ReminderType = ReminderType = {}));
var ReminderStatus;
(function (ReminderStatus) {
    ReminderStatus["PENDING"] = "pending";
    ReminderStatus["SENT"] = "sent";
    ReminderStatus["FAILED"] = "failed";
    ReminderStatus["CANCELLED"] = "cancelled";
})(ReminderStatus || (exports.ReminderStatus = ReminderStatus = {}));
var AppointmentReminder = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('appointment_reminders')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _appointmentId_decorators;
    var _appointmentId_initializers = [];
    var _appointmentId_extraInitializers = [];
    var _appointment_decorators;
    var _appointment_initializers = [];
    var _appointment_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _scheduledFor_decorators;
    var _scheduledFor_initializers = [];
    var _scheduledFor_extraInitializers = [];
    var _sentAt_decorators;
    var _sentAt_initializers = [];
    var _sentAt_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _recipientId_decorators;
    var _recipientId_initializers = [];
    var _recipientId_extraInitializers = [];
    var _recipientEmail_decorators;
    var _recipientEmail_initializers = [];
    var _recipientEmail_extraInitializers = [];
    var _recipientPhone_decorators;
    var _recipientPhone_initializers = [];
    var _recipientPhone_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _deliveryDetails_decorators;
    var _deliveryDetails_initializers = [];
    var _deliveryDetails_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var AppointmentReminder = _classThis = /** @class */ (function () {
        function AppointmentReminder_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.appointmentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _appointmentId_initializers, void 0));
            this.appointment = (__runInitializers(this, _appointmentId_extraInitializers), __runInitializers(this, _appointment_initializers, void 0));
            this.type = (__runInitializers(this, _appointment_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.scheduledFor = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
            this.sentAt = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
            this.content = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.recipientId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _recipientId_initializers, void 0));
            this.recipientEmail = (__runInitializers(this, _recipientId_extraInitializers), __runInitializers(this, _recipientEmail_initializers, void 0));
            this.recipientPhone = (__runInitializers(this, _recipientEmail_extraInitializers), __runInitializers(this, _recipientPhone_initializers, void 0));
            this.metadata = (__runInitializers(this, _recipientPhone_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.deliveryDetails = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _deliveryDetails_initializers, void 0));
            this.organizationId = (__runInitializers(this, _deliveryDetails_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.createdById = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        AppointmentReminder_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, appointmentId: { required: true, type: function () { return String; } }, appointment: { required: true, type: function () { return require("./appointment.entity").Appointment; } }, type: { required: true, enum: require("./appointment-reminder.entity").ReminderType }, status: { required: true, enum: require("./appointment-reminder.entity").ReminderStatus }, scheduledFor: { required: true, type: function () { return Date; } }, sentAt: { required: false, type: function () { return Date; } }, content: { required: false, type: function () { return String; } }, recipientId: { required: false, type: function () { return String; } }, recipientEmail: { required: false, type: function () { return String; } }, recipientPhone: { required: false, type: function () { return String; } }, metadata: { required: false, type: function () { return Object; } }, deliveryDetails: { required: false, type: function () { return ({ provider: { required: false, type: function () { return String; } }, messageId: { required: false, type: function () { return String; } }, error: { required: false, type: function () { return String; } }, attempts: { required: false, type: function () { return Number; } } }); } }, organizationId: { required: true, type: function () { return String; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } } };
        };
        return AppointmentReminder_1;
    }());
    __setFunctionName(_classThis, "AppointmentReminder");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _appointmentId_decorators = [(0, typeorm_1.Column)()];
        _appointment_decorators = [(0, typeorm_1.ManyToOne)(function () { return appointment_entity_1.Appointment; }, function (appointment) { return appointment.reminderSent; }), (0, typeorm_1.JoinColumn)({ name: 'appointmentId' })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ReminderType })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ReminderStatus, default: ReminderStatus.PENDING })];
        _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _sentAt_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _content_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _recipientId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _recipientEmail_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _recipientPhone_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _deliveryDetails_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _organizationId_decorators = [(0, typeorm_1.Column)()];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _appointmentId_decorators, { kind: "field", name: "appointmentId", static: false, private: false, access: { has: function (obj) { return "appointmentId" in obj; }, get: function (obj) { return obj.appointmentId; }, set: function (obj, value) { obj.appointmentId = value; } }, metadata: _metadata }, _appointmentId_initializers, _appointmentId_extraInitializers);
        __esDecorate(null, null, _appointment_decorators, { kind: "field", name: "appointment", static: false, private: false, access: { has: function (obj) { return "appointment" in obj; }, get: function (obj) { return obj.appointment; }, set: function (obj, value) { obj.appointment = value; } }, metadata: _metadata }, _appointment_initializers, _appointment_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: function (obj) { return "scheduledFor" in obj; }, get: function (obj) { return obj.scheduledFor; }, set: function (obj, value) { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
        __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: function (obj) { return "sentAt" in obj; }, get: function (obj) { return obj.sentAt; }, set: function (obj, value) { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _recipientId_decorators, { kind: "field", name: "recipientId", static: false, private: false, access: { has: function (obj) { return "recipientId" in obj; }, get: function (obj) { return obj.recipientId; }, set: function (obj, value) { obj.recipientId = value; } }, metadata: _metadata }, _recipientId_initializers, _recipientId_extraInitializers);
        __esDecorate(null, null, _recipientEmail_decorators, { kind: "field", name: "recipientEmail", static: false, private: false, access: { has: function (obj) { return "recipientEmail" in obj; }, get: function (obj) { return obj.recipientEmail; }, set: function (obj, value) { obj.recipientEmail = value; } }, metadata: _metadata }, _recipientEmail_initializers, _recipientEmail_extraInitializers);
        __esDecorate(null, null, _recipientPhone_decorators, { kind: "field", name: "recipientPhone", static: false, private: false, access: { has: function (obj) { return "recipientPhone" in obj; }, get: function (obj) { return obj.recipientPhone; }, set: function (obj, value) { obj.recipientPhone = value; } }, metadata: _metadata }, _recipientPhone_initializers, _recipientPhone_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _deliveryDetails_decorators, { kind: "field", name: "deliveryDetails", static: false, private: false, access: { has: function (obj) { return "deliveryDetails" in obj; }, get: function (obj) { return obj.deliveryDetails; }, set: function (obj, value) { obj.deliveryDetails = value; } }, metadata: _metadata }, _deliveryDetails_initializers, _deliveryDetails_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentReminder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentReminder = _classThis;
}();
exports.AppointmentReminder = AppointmentReminder;
//# sourceMappingURL=appointment-reminder.entity.js.map