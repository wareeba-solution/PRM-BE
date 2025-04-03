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
exports.CreateExceptionDto = exports.ScheduleExceptionType = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var ScheduleExceptionType;
(function (ScheduleExceptionType) {
    ScheduleExceptionType["VACATION"] = "VACATION";
    ScheduleExceptionType["SICK_LEAVE"] = "SICK_LEAVE";
    ScheduleExceptionType["CONFERENCE"] = "CONFERENCE";
    ScheduleExceptionType["PERSONAL"] = "PERSONAL";
    ScheduleExceptionType["OTHER"] = "OTHER";
})(ScheduleExceptionType || (exports.ScheduleExceptionType = ScheduleExceptionType = {}));
var CreateExceptionDto = function () {
    var _a;
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
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
    return _a = /** @class */ (function () {
            function CreateExceptionDto() {
                this.doctorId = __runInitializers(this, _doctorId_initializers, void 0);
                this.startDate = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.startTime = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.isFullDay = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _isFullDay_initializers, void 0));
                this.type = (__runInitializers(this, _isFullDay_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.reason = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                __runInitializers(this, _reason_extraInitializers);
            }
            CreateExceptionDto._OPENAPI_METADATA_FACTORY = function () {
                return { doctorId: { required: true, type: function () { return String; }, format: "uuid" }, startDate: { required: true, type: function () { return String; } }, endDate: { required: true, type: function () { return String; } }, startTime: { required: false, type: function () { return String; } }, endTime: { required: false, type: function () { return String; } }, isFullDay: { required: true, type: function () { return Boolean; } }, type: { required: true, enum: require("./create-exception.dto").ScheduleExceptionType }, reason: { required: false, type: function () { return String; } } };
            };
            return CreateExceptionDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _doctorId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Doctor ID', example: '123e4567-e89b-12d3-a456-426614174000' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _startDate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Start date of the exception',
                    example: '2023-06-15',
                    type: String,
                }), (0, class_validator_1.IsISO8601)(), (0, class_validator_1.IsNotEmpty)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'End date of the exception',
                    example: '2023-06-20',
                    type: String,
                }), (0, class_validator_1.IsISO8601)(), (0, class_validator_1.IsNotEmpty)()];
            _startTime_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Start time for partial day exceptions (optional)',
                    example: '09:00',
                    type: String,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _endTime_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'End time for partial day exceptions (optional)',
                    example: '12:00',
                    type: String,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isFullDay_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether this is a full day exception',
                    example: true,
                    default: false,
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of exception',
                    enum: ScheduleExceptionType,
                    example: ScheduleExceptionType.VACATION,
                }), (0, class_validator_1.IsEnum)(ScheduleExceptionType), (0, class_validator_1.IsNotEmpty)()];
            _reason_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional details or reason for the exception',
                    example: 'Annual family vacation',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _isFullDay_decorators, { kind: "field", name: "isFullDay", static: false, private: false, access: { has: function (obj) { return "isFullDay" in obj; }, get: function (obj) { return obj.isFullDay; }, set: function (obj, value) { obj.isFullDay = value; } }, metadata: _metadata }, _isFullDay_initializers, _isFullDay_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateExceptionDto = CreateExceptionDto;
//# sourceMappingURL=create-exception.dto.js.map