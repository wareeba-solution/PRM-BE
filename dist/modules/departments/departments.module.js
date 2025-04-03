"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departments_service_1 = require("./services/departments.service");
const department_members_service_1 = require("./services/department-members.service");
const department_hierarchy_service_1 = require("./services/department-hierarchy.service");
const department_audit_service_1 = require("./services/department-audit.service");
const departments_controller_1 = require("./controllers/departments.controller");
const department_entity_1 = require("./entities/department.entity");
const department_audit_log_entity_1 = require("./entities/department-audit-log.entity");
const user_entity_1 = require("../users/entities/user.entity"); // Add User entity import
const department_assignment_listener_1 = require("./listeners/department-assignment.listener");
const department_audit_listener_1 = require("./listeners/department-audit.listener");
const organizations_module_1 = require("../organizations/organizations.module");
const users_module_1 = require("../users/users.module");
const notifications_module_1 = require("../notifications/notifications.module");
const auth_module_1 = require("../auth/auth.module");
let DepartmentsModule = class DepartmentsModule {
};
DepartmentsModule = __decorate([
    (0, common_1.Module)({
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
    })
], DepartmentsModule);
exports.DepartmentsModule = DepartmentsModule;
//# sourceMappingURL=departments.module.js.map