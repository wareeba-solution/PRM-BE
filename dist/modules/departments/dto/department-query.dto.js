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
exports.DepartmentQueryDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var DepartmentQueryDto = function () {
    var _a;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _parentDepartmentId_decorators;
    var _parentDepartmentId_initializers = [];
    var _parentDepartmentId_extraInitializers = [];
    var _managerId_decorators;
    var _managerId_initializers = [];
    var _managerId_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _relations_decorators;
    var _relations_initializers = [];
    var _relations_extraInitializers = [];
    var _skip_decorators;
    var _skip_initializers = [];
    var _skip_extraInitializers = [];
    var _take_decorators;
    var _take_initializers = [];
    var _take_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DepartmentQueryDto() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.parentDepartmentId = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _parentDepartmentId_initializers, void 0));
                this.managerId = (__runInitializers(this, _parentDepartmentId_extraInitializers), __runInitializers(this, _managerId_initializers, void 0));
                this.isActive = (__runInitializers(this, _managerId_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.relations = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _relations_initializers, void 0));
                this.skip = (__runInitializers(this, _relations_extraInitializers), __runInitializers(this, _skip_initializers, 0));
                this.take = (__runInitializers(this, _skip_extraInitializers), __runInitializers(this, _take_initializers, 10));
                __runInitializers(this, _take_extraInitializers);
            }
            DepartmentQueryDto._OPENAPI_METADATA_FACTORY = function () {
                return { search: { required: false, type: function () { return String; } }, parentDepartmentId: { required: false, type: function () { return String; }, format: "uuid" }, managerId: { required: false, type: function () { return String; }, format: "uuid" }, isActive: { required: false, type: function () { return Boolean; } }, relations: { required: false, type: function () { return [String]; } }, skip: { required: false, type: function () { return Number; }, default: 0, minimum: 0 }, take: { required: false, type: function () { return Number; }, default: 10, minimum: 1, maximum: 100 } };
            };
            return DepartmentQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _parentDepartmentId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _managerId_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Type)(function () { return Boolean; })];
            _relations_decorators = [(0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _skip_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.Min)(0)];
            _take_decorators = [(0, swagger_1.ApiPropertyOptional)({ default: 10 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _parentDepartmentId_decorators, { kind: "field", name: "parentDepartmentId", static: false, private: false, access: { has: function (obj) { return "parentDepartmentId" in obj; }, get: function (obj) { return obj.parentDepartmentId; }, set: function (obj, value) { obj.parentDepartmentId = value; } }, metadata: _metadata }, _parentDepartmentId_initializers, _parentDepartmentId_extraInitializers);
            __esDecorate(null, null, _managerId_decorators, { kind: "field", name: "managerId", static: false, private: false, access: { has: function (obj) { return "managerId" in obj; }, get: function (obj) { return obj.managerId; }, set: function (obj, value) { obj.managerId = value; } }, metadata: _metadata }, _managerId_initializers, _managerId_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _relations_decorators, { kind: "field", name: "relations", static: false, private: false, access: { has: function (obj) { return "relations" in obj; }, get: function (obj) { return obj.relations; }, set: function (obj, value) { obj.relations = value; } }, metadata: _metadata }, _relations_initializers, _relations_extraInitializers);
            __esDecorate(null, null, _skip_decorators, { kind: "field", name: "skip", static: false, private: false, access: { has: function (obj) { return "skip" in obj; }, get: function (obj) { return obj.skip; }, set: function (obj, value) { obj.skip = value; } }, metadata: _metadata }, _skip_initializers, _skip_extraInitializers);
            __esDecorate(null, null, _take_decorators, { kind: "field", name: "take", static: false, private: false, access: { has: function (obj) { return "take" in obj; }, get: function (obj) { return obj.take; }, set: function (obj, value) { obj.take = value; } }, metadata: _metadata }, _take_initializers, _take_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DepartmentQueryDto = DepartmentQueryDto;
//# sourceMappingURL=department-query.dto.js.map