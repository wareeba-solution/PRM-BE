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
exports.Department = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var user_entity_1 = require("../../users/entities/user.entity");
var organization_entity_1 = require("../../organizations/entities/organization.entity");
var ticket_entity_1 = require("../../tickets/entities/ticket.entity");
var Department = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('departments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _organizationId_decorators;
    var _organizationId_initializers = [];
    var _organizationId_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _parentDepartmentId_decorators;
    var _parentDepartmentId_initializers = [];
    var _parentDepartmentId_extraInitializers = [];
    var _managerId_decorators;
    var _managerId_initializers = [];
    var _managerId_extraInitializers = [];
    var _createdById_decorators;
    var _createdById_initializers = [];
    var _createdById_extraInitializers = [];
    var _updatedById_decorators;
    var _updatedById_initializers = [];
    var _updatedById_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _memberCount_decorators;
    var _memberCount_initializers = [];
    var _memberCount_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _organization_decorators;
    var _organization_initializers = [];
    var _organization_extraInitializers = [];
    var _parentDepartment_decorators;
    var _parentDepartment_initializers = [];
    var _parentDepartment_extraInitializers = [];
    var _childDepartments_decorators;
    var _childDepartments_initializers = [];
    var _childDepartments_extraInitializers = [];
    var _manager_decorators;
    var _manager_initializers = [];
    var _manager_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _tickets_decorators;
    var _tickets_initializers = [];
    var _tickets_extraInitializers = [];
    var Department = _classThis = /** @class */ (function () {
        function Department_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.organizationId = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _organizationId_initializers, void 0));
            this.description = (__runInitializers(this, _organizationId_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.parentDepartmentId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _parentDepartmentId_initializers, void 0));
            this.managerId = (__runInitializers(this, _parentDepartmentId_extraInitializers), __runInitializers(this, _managerId_initializers, void 0));
            this.createdById = (__runInitializers(this, _managerId_extraInitializers), __runInitializers(this, _createdById_initializers, void 0));
            this.updatedById = (__runInitializers(this, _createdById_extraInitializers), __runInitializers(this, _updatedById_initializers, void 0));
            this.isActive = (__runInitializers(this, _updatedById_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.memberCount = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _memberCount_initializers, void 0));
            this.sortOrder = (__runInitializers(this, _memberCount_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
            this.metadata = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
            this.createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            // Relations
            this.organization = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _organization_initializers, void 0));
            this.parentDepartment = (__runInitializers(this, _organization_extraInitializers), __runInitializers(this, _parentDepartment_initializers, void 0));
            this.childDepartments = (__runInitializers(this, _parentDepartment_extraInitializers), __runInitializers(this, _childDepartments_initializers, void 0));
            this.manager = (__runInitializers(this, _childDepartments_extraInitializers), __runInitializers(this, _manager_initializers, void 0));
            this.createdBy = (__runInitializers(this, _manager_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.tickets = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _tickets_initializers, void 0));
            __runInitializers(this, _tickets_extraInitializers);
        }
        Department_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, organizationId: { required: true, type: function () { return String; } }, description: { required: false, type: function () { return String; } }, parentDepartmentId: { required: false, type: function () { return String; } }, managerId: { required: false, type: function () { return String; } }, createdById: { required: false, type: function () { return String; } }, updatedById: { required: false, type: function () { return String; } }, isActive: { required: true, type: function () { return Boolean; } }, memberCount: { required: true, type: function () { return Number; } }, sortOrder: { required: true, type: function () { return Number; } }, metadata: { required: false, type: function () { return Object; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: true, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, organization: { required: true, type: function () { return require("../../organizations/entities/organization.entity").Organization; } }, parentDepartment: { required: false, type: function () { return require("./department.entity").Department; } }, childDepartments: { required: true, type: function () { return [require("./department.entity").Department]; } }, manager: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, createdBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, updatedBy: { required: true, type: function () { return require("../../users/entities/user.entity").User; } }, tickets: { required: true, type: function () { return [require("../../tickets/entities/ticket.entity").Ticket]; } } };
        };
        return Department_1;
    }());
    __setFunctionName(_classThis, "Department");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _organizationId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)()];
        _description_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _parentDepartmentId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _managerId_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _createdById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _updatedById_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ nullable: true })];
        _isActive_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ default: true })];
        _memberCount_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _sortOrder_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _metadata_decorators = [(0, swagger_1.ApiProperty)(), (0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _organization_decorators = [(0, typeorm_1.ManyToOne)(function () { return organization_entity_1.Organization; }), (0, typeorm_1.JoinColumn)({ name: 'organizationId' })];
        _parentDepartment_decorators = [(0, typeorm_1.ManyToOne)(function () { return Department; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'parentDepartmentId' })];
        _childDepartments_decorators = [(0, typeorm_1.OneToMany)(function () { return Department; }, function (dept) { return dept.parentDepartment; })];
        _manager_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'managerId' })];
        _createdBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'createdById' })];
        _updatedBy_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { lazy: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedById' })];
        _tickets_decorators = [(0, typeorm_1.OneToMany)(function () { return ticket_entity_1.Ticket; }, function (ticket) { return ticket.department; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _organizationId_decorators, { kind: "field", name: "organizationId", static: false, private: false, access: { has: function (obj) { return "organizationId" in obj; }, get: function (obj) { return obj.organizationId; }, set: function (obj, value) { obj.organizationId = value; } }, metadata: _metadata }, _organizationId_initializers, _organizationId_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _parentDepartmentId_decorators, { kind: "field", name: "parentDepartmentId", static: false, private: false, access: { has: function (obj) { return "parentDepartmentId" in obj; }, get: function (obj) { return obj.parentDepartmentId; }, set: function (obj, value) { obj.parentDepartmentId = value; } }, metadata: _metadata }, _parentDepartmentId_initializers, _parentDepartmentId_extraInitializers);
        __esDecorate(null, null, _managerId_decorators, { kind: "field", name: "managerId", static: false, private: false, access: { has: function (obj) { return "managerId" in obj; }, get: function (obj) { return obj.managerId; }, set: function (obj, value) { obj.managerId = value; } }, metadata: _metadata }, _managerId_initializers, _managerId_extraInitializers);
        __esDecorate(null, null, _createdById_decorators, { kind: "field", name: "createdById", static: false, private: false, access: { has: function (obj) { return "createdById" in obj; }, get: function (obj) { return obj.createdById; }, set: function (obj, value) { obj.createdById = value; } }, metadata: _metadata }, _createdById_initializers, _createdById_extraInitializers);
        __esDecorate(null, null, _updatedById_decorators, { kind: "field", name: "updatedById", static: false, private: false, access: { has: function (obj) { return "updatedById" in obj; }, get: function (obj) { return obj.updatedById; }, set: function (obj, value) { obj.updatedById = value; } }, metadata: _metadata }, _updatedById_initializers, _updatedById_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _memberCount_decorators, { kind: "field", name: "memberCount", static: false, private: false, access: { has: function (obj) { return "memberCount" in obj; }, get: function (obj) { return obj.memberCount; }, set: function (obj, value) { obj.memberCount = value; } }, metadata: _metadata }, _memberCount_initializers, _memberCount_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _organization_decorators, { kind: "field", name: "organization", static: false, private: false, access: { has: function (obj) { return "organization" in obj; }, get: function (obj) { return obj.organization; }, set: function (obj, value) { obj.organization = value; } }, metadata: _metadata }, _organization_initializers, _organization_extraInitializers);
        __esDecorate(null, null, _parentDepartment_decorators, { kind: "field", name: "parentDepartment", static: false, private: false, access: { has: function (obj) { return "parentDepartment" in obj; }, get: function (obj) { return obj.parentDepartment; }, set: function (obj, value) { obj.parentDepartment = value; } }, metadata: _metadata }, _parentDepartment_initializers, _parentDepartment_extraInitializers);
        __esDecorate(null, null, _childDepartments_decorators, { kind: "field", name: "childDepartments", static: false, private: false, access: { has: function (obj) { return "childDepartments" in obj; }, get: function (obj) { return obj.childDepartments; }, set: function (obj, value) { obj.childDepartments = value; } }, metadata: _metadata }, _childDepartments_initializers, _childDepartments_extraInitializers);
        __esDecorate(null, null, _manager_decorators, { kind: "field", name: "manager", static: false, private: false, access: { has: function (obj) { return "manager" in obj; }, get: function (obj) { return obj.manager; }, set: function (obj, value) { obj.manager = value; } }, metadata: _metadata }, _manager_initializers, _manager_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _tickets_decorators, { kind: "field", name: "tickets", static: false, private: false, access: { has: function (obj) { return "tickets" in obj; }, get: function (obj) { return obj.tickets; }, set: function (obj, value) { obj.tickets = value; } }, metadata: _metadata }, _tickets_initializers, _tickets_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Department = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Department = _classThis;
}();
exports.Department = Department;
//# sourceMappingURL=department.entity.js.map