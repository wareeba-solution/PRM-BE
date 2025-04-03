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
exports.DoctorSchedule = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/entities/doctor-schedule.entity.ts
var typeorm_1 = require("typeorm");
var day_of_week_enum_1 = require("../enums/day-of-week.enum");
var DoctorSchedule = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('doctor_schedules')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _dayOfWeek_decorators;
    var _dayOfWeek_initializers = [];
    var _dayOfWeek_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _workStart_decorators;
    var _workStart_initializers = [];
    var _workStart_extraInitializers = [];
    var _workEnd_decorators;
    var _workEnd_initializers = [];
    var _workEnd_extraInitializers = [];
    var _slotDuration_decorators;
    var _slotDuration_initializers = [];
    var _slotDuration_extraInitializers = [];
    var _breakBetweenSlots_decorators;
    var _breakBetweenSlots_initializers = [];
    var _breakBetweenSlots_extraInitializers = [];
    var _isAvailable_decorators;
    var _isAvailable_initializers = [];
    var _isAvailable_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validTo_decorators;
    var _validTo_initializers = [];
    var _validTo_extraInitializers = [];
    var _breakTimes_decorators;
    var _breakTimes_initializers = [];
    var _breakTimes_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _virtualLink_decorators;
    var _virtualLink_initializers = [];
    var _virtualLink_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _slotCapacity_decorators;
    var _slotCapacity_initializers = [];
    var _slotCapacity_extraInitializers = [];
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
    var DoctorSchedule = _classThis = /** @class */ (function () {
        function DoctorSchedule_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.doctorId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _doctorId_initializers, void 0));
            this.organizationId = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.dayOfWeek = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _dayOfWeek_initializers, void 0));
            this.startTime = (__runInitializers(this, _dayOfWeek_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            // Added to match service code
            this.workStart = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _workStart_initializers, void 0));
            this.workEnd = (__runInitializers(this, _workStart_extraInitializers), __runInitializers(this, _workEnd_initializers, void 0));
            this.slotDuration = (__runInitializers(this, _workEnd_extraInitializers), __runInitializers(this, _slotDuration_initializers, void 0)); // Duration of each appointment slot in minutes
            this.breakBetweenSlots = (__runInitializers(this, _slotDuration_extraInitializers), __runInitializers(this, _breakBetweenSlots_initializers, void 0)); // Buffer time between appointments in minutes
            this.isAvailable = (__runInitializers(this, _breakBetweenSlots_extraInitializers), __runInitializers(this, _isAvailable_initializers, void 0));
            this.isActive = (__runInitializers(this, _isAvailable_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.validFrom = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
            this.validTo = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validTo_initializers, void 0));
            this.breakTimes = (__runInitializers(this, _validTo_extraInitializers), __runInitializers(this, _breakTimes_initializers, void 0));
            this.metadata = (__runInitializers(this, _breakTimes_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.location = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _location_initializers, void 0));
            this.virtualLink = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _virtualLink_initializers, void 0));
            this.notes = (__runInitializers(this, _virtualLink_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.slotCapacity = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _slotCapacity_initializers, void 0)); // For group appointments/sessions
            this.createdById = (__runInitializers(this, _slotCapacity_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Virtual fields (not stored in database)
            this.appointments = __runInitializers(this, _deletedAt_extraInitializers); // Related appointments for this schedule
        }
        // Helper methods
        DoctorSchedule_1.prototype.isTimeInRange = function (time) {
            return time >= this.startTime && time <= this.endTime;
        };
        DoctorSchedule_1.prototype.isDateInValidRange = function (date) {
            if (!this.validFrom && !this.validTo)
                return true;
            var currentDate = new Date(date);
            currentDate.setHours(0, 0, 0, 0);
            if (this.validFrom) {
                var validFromDate = new Date(this.validFrom);
                validFromDate.setHours(0, 0, 0, 0);
                if (currentDate < validFromDate)
                    return false;
            }
            if (this.validTo) {
                var validToDate = new Date(this.validTo);
                validToDate.setHours(0, 0, 0, 0);
                if (currentDate > validToDate)
                    return false;
            }
            return true;
        };
        DoctorSchedule_1.prototype.getDayNumber = function () {
            return this.dayOfWeek;
        };
        DoctorSchedule_1.prototype.isBreakTime = function (time) {
            if (!this.breakTimes || !this.breakTimes.length)
                return false;
            return this.breakTimes.some(function (breakTime) { return time >= breakTime.startTime && time < breakTime.endTime; });
        };
        DoctorSchedule_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, doctorId: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, dayOfWeek: { required: true, enum: require("../enums/day-of-week.enum").DayOfWeek }, startTime: { required: true, type: function () { return String; } }, endTime: { required: true, type: function () { return String; } }, workStart: { required: true, type: function () { return Date; } }, workEnd: { required: true, type: function () { return Date; } }, slotDuration: { required: true, type: function () { return Number; } }, breakBetweenSlots: { required: true, type: function () { return Number; } }, isAvailable: { required: true, type: function () { return Boolean; } }, isActive: { required: true, type: function () { return Boolean; } }, validFrom: { required: false, type: function () { return Date; } }, validTo: { required: false, type: function () { return Date; } }, breakTimes: { required: false }, metadata: { required: false, type: function () { return Object; } }, location: { required: false, type: function () { return String; } }, virtualLink: { required: false, type: function () { return String; } }, notes: { required: false, type: function () { return String; } }, slotCapacity: { required: false, type: function () { return Number; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, appointments: { required: false, type: function () { return [require("./appointment.entity").Appointment]; } }, availableSlots: { required: false } };
        };
        return DoctorSchedule_1;
    }());
    __setFunctionName(_classThis, "DoctorSchedule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _doctorId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _organizationId_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _dayOfWeek_decorators = [(0, typeorm_1.Column)({ type: 'int', enum: day_of_week_enum_1.DayOfWeek })];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'time' })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'time' })];
        _workStart_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _workEnd_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
        _slotDuration_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 30 })];
        _breakBetweenSlots_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _isAvailable_decorators = [(0, typeorm_1.Column)({ default: true })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _validFrom_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _validTo_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _breakTimes_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _metadata_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'jsonb' })];
        _location_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _virtualLink_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _slotCapacity_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _dayOfWeek_decorators, { kind: "field", name: "dayOfWeek", static: false, private: false, access: { has: function (obj) { return "dayOfWeek" in obj; }, get: function (obj) { return obj.dayOfWeek; }, set: function (obj, value) { obj.dayOfWeek = value; } }, metadata: _metadata }, _dayOfWeek_initializers, _dayOfWeek_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _workStart_decorators, { kind: "field", name: "workStart", static: false, private: false, access: { has: function (obj) { return "workStart" in obj; }, get: function (obj) { return obj.workStart; }, set: function (obj, value) { obj.workStart = value; } }, metadata: _metadata }, _workStart_initializers, _workStart_extraInitializers);
        __esDecorate(null, null, _workEnd_decorators, { kind: "field", name: "workEnd", static: false, private: false, access: { has: function (obj) { return "workEnd" in obj; }, get: function (obj) { return obj.workEnd; }, set: function (obj, value) { obj.workEnd = value; } }, metadata: _metadata }, _workEnd_initializers, _workEnd_extraInitializers);
        __esDecorate(null, null, _slotDuration_decorators, { kind: "field", name: "slotDuration", static: false, private: false, access: { has: function (obj) { return "slotDuration" in obj; }, get: function (obj) { return obj.slotDuration; }, set: function (obj, value) { obj.slotDuration = value; } }, metadata: _metadata }, _slotDuration_initializers, _slotDuration_extraInitializers);
        __esDecorate(null, null, _breakBetweenSlots_decorators, { kind: "field", name: "breakBetweenSlots", static: false, private: false, access: { has: function (obj) { return "breakBetweenSlots" in obj; }, get: function (obj) { return obj.breakBetweenSlots; }, set: function (obj, value) { obj.breakBetweenSlots = value; } }, metadata: _metadata }, _breakBetweenSlots_initializers, _breakBetweenSlots_extraInitializers);
        __esDecorate(null, null, _isAvailable_decorators, { kind: "field", name: "isAvailable", static: false, private: false, access: { has: function (obj) { return "isAvailable" in obj; }, get: function (obj) { return obj.isAvailable; }, set: function (obj, value) { obj.isAvailable = value; } }, metadata: _metadata }, _isAvailable_initializers, _isAvailable_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
        __esDecorate(null, null, _validTo_decorators, { kind: "field", name: "validTo", static: false, private: false, access: { has: function (obj) { return "validTo" in obj; }, get: function (obj) { return obj.validTo; }, set: function (obj, value) { obj.validTo = value; } }, metadata: _metadata }, _validTo_initializers, _validTo_extraInitializers);
        __esDecorate(null, null, _breakTimes_decorators, { kind: "field", name: "breakTimes", static: false, private: false, access: { has: function (obj) { return "breakTimes" in obj; }, get: function (obj) { return obj.breakTimes; }, set: function (obj, value) { obj.breakTimes = value; } }, metadata: _metadata }, _breakTimes_initializers, _breakTimes_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
        __esDecorate(null, null, _virtualLink_decorators, { kind: "field", name: "virtualLink", static: false, private: false, access: { has: function (obj) { return "virtualLink" in obj; }, get: function (obj) { return obj.virtualLink; }, set: function (obj, value) { obj.virtualLink = value; } }, metadata: _metadata }, _virtualLink_initializers, _virtualLink_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _slotCapacity_decorators, { kind: "field", name: "slotCapacity", static: false, private: false, access: { has: function (obj) { return "slotCapacity" in obj; }, get: function (obj) { return obj.slotCapacity; }, set: function (obj, value) { obj.slotCapacity = value; } }, metadata: _metadata }, _slotCapacity_initializers, _slotCapacity_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DoctorSchedule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DoctorSchedule = _classThis;
}();
exports.DoctorSchedule = DoctorSchedule;
//# sourceMappingURL=doctor-schedule.entity.js.map