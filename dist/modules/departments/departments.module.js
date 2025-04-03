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
exports.DepartmentsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var departments_service_1 = require("./services/departments.service");
var department_members_service_1 = require("./services/department-members.service");
var department_hierarchy_service_1 = require("./services/department-hierarchy.service");
var department_audit_service_1 = require("./services/department-audit.service");
var departments_controller_1 = require("./controllers/departments.controller");
var department_entity_1 = require("./entities/department.entity");
var department_audit_log_entity_1 = require("./entities/department-audit-log.entity");
var user_entity_1 = require("../users/entities/user.entity"); // Add User entity import
var department_assignment_listener_1 = require("./listeners/department-assignment.listener");
var department_audit_listener_1 = require("./listeners/department-audit.listener");
var organizations_module_1 = require("../organizations/organizations.module");
var users_module_1 = require("../users/users.module");
var notifications_module_1 = require("../notifications/notifications.module");
var auth_module_1 = require("../auth/auth.module");
var DepartmentsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    department_entity_1.Department,
                    department_audit_log_entity_1.DepartmentAuditLog,
                    user_entity_1.User
                ]),
                organizations_module_1.OrganizationsModule,
                users_module_1.UsersModule,
                notifications_module_1.NotificationsModule,
                auth_module_1.AuthModule
            ],
            controllers: [
                departments_controller_1.DepartmentsController
            ],
            providers: [
                // Core Services
                departments_service_1.DepartmentsService,
                department_members_service_1.DepartmentMembersService,
                department_hierarchy_service_1.DepartmentHierarchyService,
                department_audit_service_1.DepartmentAuditService,
                // Event Listeners
                department_assignment_listener_1.DepartmentAssignmentListener,
                department_audit_listener_1.DepartmentAuditListener
            ],
            exports: [
                departments_service_1.DepartmentsService,
                department_members_service_1.DepartmentMembersService,
                department_hierarchy_service_1.DepartmentHierarchyService,
                department_audit_service_1.DepartmentAuditService,
                typeorm_1.TypeOrmModule
            ]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DepartmentsModule = _classThis = /** @class */ (function () {
        function DepartmentsModule_1() {
        }
        return DepartmentsModule_1;
    }());
    __setFunctionName(_classThis, "DepartmentsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DepartmentsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DepartmentsModule = _classThis;
}();
exports.DepartmentsModule = DepartmentsModule;
//# sourceMappingURL=departments.module.js.map