var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DepartmentsService } from '../services/departments.service';
import { DepartmentMembersService } from '../services/department-members.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { OrganizationGuard } from '../../organizations/guards/organization.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { AddMemberDto } from '../dto/add-member.dto';
import { DepartmentQueryDto } from '../dto/department-query.dto';
import { Department } from '../entities/department.entity';
import { Role } from '../../users/enums/role.enum';
import { User } from '../../users/entities/user.entity';
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService, departmentMembersService) {
        this.departmentsService = departmentsService;
        this.departmentMembersService = departmentMembersService;
    }
    async create(createDepartmentDto, req) {
        return this.departmentsService.create(createDepartmentDto, req.user['id'], req.user['organizationId']);
    }
    async findAll(query, req) {
        return this.departmentsService.findAll(req.user['organizationId'], query);
    }
    async findOne(id, req) {
        return this.departmentsService.findById(id, req.user['organizationId']);
    }
    async update(id, updateDepartmentDto, userId) {
        return this.departmentsService.update(id, updateDepartmentDto, userId);
    }
    async remove(id, userId) {
        await this.departmentsService.delete(id, userId);
    }
    async addMember(departmentId, addMemberDto, userId) {
        await this.departmentMembersService.addMember(departmentId, addMemberDto.userId, userId);
    }
    async removeMember(departmentId, memberId, userId) {
        await this.departmentMembersService.removeMember(departmentId, memberId, userId);
    }
    async getMembers(departmentId, query) {
        return this.departmentMembersService.getMembers(departmentId, query);
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN, Role.MANAGER),
    ApiOperation({ summary: 'Create department' }),
    ApiResponse({ status: 201, type: Department }),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Get all departments' }),
    ApiResponse({ status: 200, type: [Department] }),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DepartmentQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get department by id' }),
    ApiResponse({ status: 200, type: Department }),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.ADMIN, Role.MANAGER),
    ApiOperation({ summary: 'Update department' }),
    ApiResponse({ status: 200, type: Department }),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateDepartmentDto, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Delete department' }),
    ApiResponse({ status: 204 }),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
__decorate([
    Post(':id/members'),
    Roles(Role.ADMIN, Role.MANAGER),
    ApiOperation({ summary: 'Add member to department' }),
    ApiResponse({ status: 200 }),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddMemberDto, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "addMember", null);
__decorate([
    Delete(':id/members/:userId'),
    Roles(Role.ADMIN, Role.MANAGER),
    ApiOperation({ summary: 'Remove member from department' }),
    ApiResponse({ status: 204 }),
    __param(0, Param('id')),
    __param(1, Param('userId')),
    __param(2, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "removeMember", null);
__decorate([
    Get(':id/members'),
    ApiOperation({ summary: 'Get department members' }),
    ApiResponse({ status: 200, type: [User] }),
    __param(0, Param('id')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DepartmentQueryDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getMembers", null);
DepartmentsController = __decorate([
    ApiTags('Departments'),
    Controller('departments'),
    UseGuards(AuthGuard, OrganizationGuard, RolesGuard),
    __metadata("design:paramtypes", [DepartmentsService,
        DepartmentMembersService])
], DepartmentsController);
export { DepartmentsController };
//# sourceMappingURL=departments.controller.js.map