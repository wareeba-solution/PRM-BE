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
exports.ScheduleException = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
/**
 * Entity for doctor's schedule exceptions (time off, vacations, etc.)
 */
var ScheduleException = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('schedule_exceptions')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _doctor_decorators;
    var _doctor_initializers = [];
    var _doctor_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _isFullDay_decorators;
    var _isFullDay_initializers = [];
    var _isFullDay_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _creator_decorators;
    var _creator_initializers = [];
    var _creator_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _updater_decorators;
    var _updater_initializers = [];
    var _updater_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var ScheduleException = _classThis = /** @class */ (function () {
        function ScheduleException_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.doctorId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _doctorId_initializers, void 0));
            this.doctor = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _doctor_initializers, void 0));
            this.organizationId = (__runInitializers(this, _doctor_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.organization = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.startDate = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            this.startTime = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.isFullDay = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _isFullDay_initializers, void 0));
            this.type = (__runInitializers(this, _isFullDay_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.reason = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.createdBy = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.creator = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _creator_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _creator_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.updater = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _updater_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updater_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        /**
         * Check if a given datetime falls within the exception
         */
        ScheduleException_1.prototype.isDateTimeInException = function (dateTime) {
            // Create date objects without time for date comparisons
            var exceptionStartDate = new Date(this.startDate);
            exceptionStartDate.setHours(0, 0, 0, 0);
            var exceptionEndDate = new Date(this.endDate);
            exceptionEndDate.setHours(23, 59, 59, 999);
            var testDate = new Date(dateTime);
            // First check if the date is within the exception date range
            if (testDate < exceptionStartDate || testDate > exceptionEndDate) {
                return false;
            }
            // If it's a full day exception, the datetime is in the exception
            if (this.isFullDay) {
                return true;
            }
            // If not a full day, check time range
            // Only if we have start and end times
            if (this.startTime && this.endTime) {
                var exceptionStartDateTime = new Date(testDate);
                exceptionStartDateTime.setHours(this.startTime.getHours(), this.startTime.getMinutes(), this.startTime.getSeconds());
                var exceptionEndDateTime = new Date(testDate);
                exceptionEndDateTime.setHours(this.endTime.getHours(), this.endTime.getMinutes(), this.endTime.getSeconds());
                return testDate >= exceptionStartDateTime && testDate <= exceptionEndDateTime;
            }
            // If we don't have specific times, it affects the whole day
            return true;
        };
        ScheduleException_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, doctorId: { required: true, type: function () { return String; } }, doctor: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, organizationId: { required: true, type: function () { return String; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, startDate: { required: true, type: function () { return Date; } }, endDate: { required: true, type: function () { return Date; } }, startTime: { required: true, type: function () { return Date; }, nullable: true }, endTime: { required: true, type: function () { return Date; }, nullable: true }, isFullDay: { required: true, type: function () { return Boolean; } }, type: { required: true, type: function () { return String; } }, reason: { required: true, type: function () { return String; } }, createdBy: { required: true, type: function () { return String; } }, creator: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: true, type: function () { return String; } }, updater: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } } };
        };
        return ScheduleException_1;
    }());
    __setFunctionName(_classThis, "ScheduleException");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _doctorId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _doctor_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'doctor_id' })];
        _organizationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organization_id' })];
        _startDate_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _endDate_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _startTime_decorators = [(0, typeorm_1.Column)({ type: 'time', nullable: true })];
        _endTime_decorators = [(0, typeorm_1.Column)({ type: 'time', nullable: true })];
        _isFullDay_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['VACATION', 'SICK_LEAVE', 'CONFERENCE', 'PERSONAL', 'OTHER'], default: 'OTHER' })];
        _reason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _createdBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _creator_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'created_by' })];
        _updatedBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
        _updater_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'updated_by' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; }, onUpdate: 'CURRENT_TIMESTAMP' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
        __esDecorate(null, null, _doctor_decorators, { kind: "field", name: "doctor", static: false, private: false, access: { has: function (obj) { return "doctor" in obj; }, get: function (obj) { return obj.doctor; }, set: function (obj, value) { obj.doctor = value; } }, metadata: _metadata }, _doctor_initializers, _doctor_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _isFullDay_decorators, { kind: "field", name: "isFullDay", static: false, private: false, access: { has: function (obj) { return "isFullDay" in obj; }, get: function (obj) { return obj.isFullDay; }, set: function (obj, value) { obj.isFullDay = value; } }, metadata: _metadata }, _isFullDay_initializers, _isFullDay_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _creator_decorators, { kind: "field", name: "creator", static: false, private: false, access: { has: function (obj) { return "creator" in obj; }, get: function (obj) { return obj.creator; }, set: function (obj, value) { obj.creator = value; } }, metadata: _metadata }, _creator_initializers, _creator_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _updater_decorators, { kind: "field", name: "updater", static: false, private: false, access: { has: function (obj) { return "updater" in obj; }, get: function (obj) { return obj.updater; }, set: function (obj, value) { obj.updater = value; } }, metadata: _metadata }, _updater_initializers, _updater_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScheduleException = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScheduleException = _classThis;
}();
exports.ScheduleException = ScheduleException;
//# sourceMappingURL=schedule-exception.entity.js.map