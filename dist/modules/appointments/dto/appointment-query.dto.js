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
exports.AppointmentQueryDto = exports.AppointmentStatus = void 0;
var openapi = require("@nestjs/swagger");
// src/modules/appointments/dto/appointment-query.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
// Assuming you have an enum for appointment status
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "SCHEDULED";
    AppointmentStatus["CONFIRMED"] = "CONFIRMED";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
    AppointmentStatus["NO_SHOW"] = "NO_SHOW";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var AppointmentQueryDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _doctorId_decorators;
    var _doctorId_initializers = [];
    var _doctorId_extraInitializers = [];
    var _providerId_decorators;
    var _providerId_initializers = [];
    var _providerId_extraInitializers = [];
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _upcoming_decorators;
    var _upcoming_initializers = [];
    var _upcoming_extraInitializers = [];
    var _past_decorators;
    var _past_initializers = [];
    var _past_extraInitializers = [];
    var _today_decorators;
    var _today_initializers = [];
    var _today_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AppointmentQueryDto() {
                this.page = __runInitializers(this, _page_initializers, 1);
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                this.doctorId = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _doctorId_initializers, void 0));
                this.providerId = (__runInitializers(this, _doctorId_extraInitializers), __runInitializers(this, _providerId_initializers, void 0));
                this.patientId = (__runInitializers(this, _providerId_extraInitializers), __runInitializers(this, _patientId_initializers, void 0));
                this.status = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.startDate = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.search = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.upcoming = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _upcoming_initializers, void 0));
                this.past = (__runInitializers(this, _upcoming_extraInitializers), __runInitializers(this, _past_initializers, void 0));
                this.today = (__runInitializers(this, _past_extraInitializers), __runInitializers(this, _today_initializers, void 0));
                this.sortBy = (__runInitializers(this, _today_extraInitializers), __runInitializers(this, _sortBy_initializers, 'startTime'));
                this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, 'ASC'));
                // This will be set by the controller
                this.organizationId = __runInitializers(this, _sortOrder_extraInitializers);
            }
            AppointmentQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { page: { required: false, type: function () { return Number; }, default: 1, minimum: 1 }, limit: { required: false, type: function () { return Number; }, default: 10, minimum: 1, maximum: 100 }, doctorId: { required: false, type: function () { return String; }, format: "uuid" }, providerId: { required: false, type: function () { return String; }, format: "uuid" }, patientId: { required: false, type: function () { return String; }, format: "uuid" }, status: { required: false, enum: require("./appointment-query.dto").AppointmentStatus, isArray: true }, startDate: { required: false, type: function () { return Date; } }, endDate: { required: false, type: function () { return Date; } }, search: { required: false, type: function () { return String; } }, upcoming: { required: false, type: function () { return Boolean; } }, past: { required: false, type: function () { return Boolean; } }, today: { required: false, type: function () { return Boolean; } }, sortBy: { required: false, type: function () { return String; }, default: "startTime" }, sortOrder: { required: false, type: function () { return Object; }, default: "ASC" }, organizationId: { required: false, type: function () { return String; } } };
            };
            return AppointmentQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number (pagination)', default: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Number of items per page', default: 10 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_transformer_1.Type)(function () { return Number; })];
            _doctorId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Doctor/Provider ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _providerId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Provider ID (alias for doctorId)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _patientId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Patient ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status', enum: AppointmentStatus, isArray: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(AppointmentStatus, { each: true }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return (Array.isArray(value) ? value : [value].filter(Boolean));
                })];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for range query' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for range query' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Search term for appointment title, notes, etc.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _upcoming_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter for upcoming appointments only' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _past_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter for past appointments only' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _today_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter for today\'s appointments only' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort field (e.g. startTime, createdAt)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order (ASC or DESC)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['ASC', 'DESC'])];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _doctorId_decorators, { kind: "field", name: "doctorId", static: false, private: false, access: { has: function (obj) { return "doctorId" in obj; }, get: function (obj) { return obj.doctorId; }, set: function (obj, value) { obj.doctorId = value; } }, metadata: _metadata }, _doctorId_initializers, _doctorId_extraInitializers);
            __esDecorate(null, null, _providerId_decorators, { kind: "field", name: "providerId", static: false, private: false, access: { has: function (obj) { return "providerId" in obj; }, get: function (obj) { return obj.providerId; }, set: function (obj, value) { obj.providerId = value; } }, metadata: _metadata }, _providerId_initializers, _providerId_extraInitializers);
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _upcoming_decorators, { kind: "field", name: "upcoming", static: false, private: false, access: { has: function (obj) { return "upcoming" in obj; }, get: function (obj) { return obj.upcoming; }, set: function (obj, value) { obj.upcoming = value; } }, metadata: _metadata }, _upcoming_initializers, _upcoming_extraInitializers);
            __esDecorate(null, null, _past_decorators, { kind: "field", name: "past", static: false, private: false, access: { has: function (obj) { return "past" in obj; }, get: function (obj) { return obj.past; }, set: function (obj, value) { obj.past = value; } }, metadata: _metadata }, _past_initializers, _past_extraInitializers);
            __esDecorate(null, null, _today_decorators, { kind: "field", name: "today", static: false, private: false, access: { has: function (obj) { return "today" in obj; }, get: function (obj) { return obj.today; }, set: function (obj, value) { obj.today = value; } }, metadata: _metadata }, _today_initializers, _today_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AppointmentQueryDto = AppointmentQueryDto;
//# sourceMappingURL=appointment-query.dto.js.map