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
exports.DepartmentAuditLog = exports.DepartmentAuditAction = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var department_entity_1 = require("./department.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var DepartmentAuditAction;
(function (DepartmentAuditAction) {
    DepartmentAuditAction["CREATED"] = "CREATED";
    DepartmentAuditAction["UPDATED"] = "UPDATED";
    DepartmentAuditAction["DELETED"] = "DELETED";
    DepartmentAuditAction["MEMBER_ADDED"] = "MEMBER_ADDED";
    DepartmentAuditAction["MEMBER_REMOVED"] = "MEMBER_REMOVED";
    DepartmentAuditAction["MEMBER_TRANSFERRED"] = "MEMBER_TRANSFERRED";
    DepartmentAuditAction["MANAGER_CHANGED"] = "MANAGER_CHANGED";
    DepartmentAuditAction["MOVED"] = "MOVED";
    DepartmentAuditAction["REORDERED"] = "REORDERED";
})(DepartmentAuditAction || (exports.DepartmentAuditAction = DepartmentAuditAction = {}));
var DepartmentAuditLog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('department_audit_logs')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _department_decorators;
    var _department_initializers = [];
    var _department_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _changes_decorators;
    var _changes_initializers = [];
    var _changes_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _performedById_decorators;
    var _performedById_initializers = [];
    var _performedById_extraInitializers = [];
    var _performedBy_decorators;
    var _performedBy_initializers = [];
    var _performedBy_extraInitializers = [];
    var _ipAddress_decorators;
    var _ipAddress_initializers = [];
    var _ipAddress_extraInitializers = [];
    var _userAgent_decorators;
    var _userAgent_initializers = [];
    var _userAgent_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _affectedUserId_decorators;
    var _affectedUserId_initializers = [];
    var _affectedUserId_extraInitializers = [];
    var _affectedUser_decorators;
    var _affectedUser_initializers = [];
    var _affectedUser_extraInitializers = [];
    var DepartmentAuditLog = _classThis = /** @class */ (function () {
        function DepartmentAuditLog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.departmentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _departmentId_initializers, void 0));
            this.department = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _department_initializers, void 0));
            this.organizationId = (__runInitializers(this, _department_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.action = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.changes = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _changes_initializers, void 0));
            this.metadata = (__runInitializers(this, _changes_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.performedById = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _performedById_initializers, void 0));
            this.performedBy = (__runInitializers(this, _performedById_extraInitializers), __runInitializers(this, _performedBy_initializers, void 0));
            this.ipAddress = (__runInitializers(this, _performedBy_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
            this.userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
            this.createdAt = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.affectedUserId = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _affectedUserId_initializers, void 0));
            this.affectedUser = (__runInitializers(this, _affectedUserId_extraInitializers), __runInitializers(this, _affectedUser_initializers, void 0));
            __runInitializers(this, _affectedUser_extraInitializers);
        }
        DepartmentAuditLog_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, departmentId: { required: true, type: function () { return String; } }, department: { required: true, type: function () { return require("./department.entity").Department; } }, organizationId: { required: true, type: function () { return String; } }, action: { required: true, enum: require("./department-audit-log.entity").DepartmentAuditAction }, changes: { required: true, type: function () { return Object; } }, metadata: { required: true, type: function () { return Object; } }, performedById: { required: true, type: function () { return String; } }, performedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, ipAddress: { required: true, type: function () { return String; } }, userAgent: { required: true, type: function () { return String; } }, createdAt: { required: true, type: function () { return Date; } }, affectedUserId: { required: true, type: function () { return String; } }, affectedUser: { required: true, type: function () { return require("../../users/entities/user.entity").User; } } };
        };
        return DepartmentAuditLog_1;
    }());
    __setFunctionName(_classThis, "DepartmentAuditLog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _departmentId_decorators = [(0, typeorm_1.Column)('uuid')];
        _department_decorators = [(0, typeorm_1.ManyToOne)(function () { return department_entity_1.Department; }), (0, typeorm_1.JoinColumn)({ name: 'departmentId' })];
        _organizationId_decorators = [(0, typeorm_1.Column)('uuid')];
        _action_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: DepartmentAuditAction
            })];
        _changes_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
        _performedById_decorators = [(0, typeorm_1.Column)('uuid')];
        _performedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'performedById' })];
        _ipAddress_decorators = [(0, typeorm_1.Column)('inet', { nullable: true })];
        _userAgent_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _affectedUserId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _affectedUser_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }), (0, typeorm_1.JoinColumn)({ name: 'affectedUserId' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
        __esDecorate(null, null, _department_decorators, { kind: "field", name: "department", static: false, private: false, access: { has: function (obj) { return "department" in obj; }, get: function (obj) { return obj.department; }, set: function (obj, value) { obj.department = value; } }, metadata: _metadata }, _department_initializers, _department_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _changes_decorators, { kind: "field", name: "changes", static: false, private: false, access: { has: function (obj) { return "changes" in obj; }, get: function (obj) { return obj.changes; }, set: function (obj, value) { obj.changes = value; } }, metadata: _metadata }, _changes_initializers, _changes_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _performedById_decorators, { kind: "field", name: "performedById", static: false, private: false, access: { has: function (obj) { return "performedById" in obj; }, get: function (obj) { return obj.performedById; }, set: function (obj, value) { obj.performedById = value; } }, metadata: _metadata }, _performedById_initializers, _performedById_extraInitializers);
        __esDecorate(null, null, _performedBy_decorators, { kind: "field", name: "performedBy", static: false, private: false, access: { has: function (obj) { return "performedBy" in obj; }, get: function (obj) { return obj.performedBy; }, set: function (obj, value) { obj.performedBy = value; } }, metadata: _metadata }, _performedBy_initializers, _performedBy_extraInitializers);
        __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: function (obj) { return "ipAddress" in obj; }, get: function (obj) { return obj.ipAddress; }, set: function (obj, value) { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
        __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: function (obj) { return "userAgent" in obj; }, get: function (obj) { return obj.userAgent; }, set: function (obj, value) { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _affectedUserId_decorators, { kind: "field", name: "affectedUserId", static: false, private: false, access: { has: function (obj) { return "affectedUserId" in obj; }, get: function (obj) { return obj.affectedUserId; }, set: function (obj, value) { obj.affectedUserId = value; } }, metadata: _metadata }, _affectedUserId_initializers, _affectedUserId_extraInitializers);
        __esDecorate(null, null, _affectedUser_decorators, { kind: "field", name: "affectedUser", static: false, private: false, access: { has: function (obj) { return "affectedUser" in obj; }, get: function (obj) { return obj.affectedUser; }, set: function (obj, value) { obj.affectedUser = value; } }, metadata: _metadata }, _affectedUser_initializers, _affectedUser_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentAuditLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentAuditLog = _classThis;
}();
exports.DepartmentAuditLog = DepartmentAuditLog;
//# sourceMappingURL=department-audit-log.entity.js.map