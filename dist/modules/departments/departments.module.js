var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './services/departments.service';
import { DepartmentMembersService } from './services/department-members.service';
import { DepartmentHierarchyService } from './services/department-hierarchy.service';
import { DepartmentAuditService } from './services/department-audit.service';
import { DepartmentsController } from './controllers/departments.controller';
import { Department } from './entities/department.entity';
import { DepartmentAuditLog } from './entities/department-audit-log.entity';
import { User } from '../users/entities/user.entity';
import { DepartmentAssignmentListener } from './listeners/department-assignment.listener';
import { DepartmentAuditListener } from './listeners/department-audit.listener';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuthModule } from '../auth/auth.module';
let DepartmentsModule = class DepartmentsModule {
};
DepartmentsModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                Department,
                DepartmentAuditLog,
                User
            ]),
            OrganizationsModule,
            UsersModule,
            NotificationsModule,
            AuthModule
        ],
        controllers: [
            DepartmentsController
        ],
        providers: [
            DepartmentsService,
            DepartmentMembersService,
            DepartmentHierarchyService,
            DepartmentAuditService,
            DepartmentAssignmentListener,
            DepartmentAuditListener
        ],
        exports: [
            DepartmentsService,
            DepartmentMembersService,
            DepartmentHierarchyService,
            DepartmentAuditService,
            TypeOrmModule
        ]
    })
], DepartmentsModule);
export { DepartmentsModule };
//# sourceMappingURL=departments.module.js.map