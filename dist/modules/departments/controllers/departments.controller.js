"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departments_service_1 = require("../services/departments.service");
const department_members_service_1 = require("../services/department-members.service");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const organization_guard_1 = require("../../organizations/guards/organization.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const update_department_dto_1 = require("../dto/update-department.dto");
const add_member_dto_1 = require("../dto/add-member.dto");
const department_query_dto_1 = require("../dto/department-query.dto");
const department_entity_1 = require("../entities/department.entity");
const role_enum_1 = require("../../users/enums/role.enum");
const user_entity_1 = require("../../users/entities/user.entity");
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
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create department' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: department_entity_1.Department }),
    openapi.ApiResponse({ status: 201, type: require("../entities/department.entity").Department }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all departments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [department_entity_1.Department] }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_query_dto_1.DepartmentQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get department by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: department_entity_1.Department }),
    openapi.ApiResponse({ status: 200, type: require("../entities/department.entity").Department }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update department' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: department_entity_1.Department }),
    openapi.ApiResponse({ status: 200, type: require("../entities/department.entity").Department }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete department' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Add member to department' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_member_dto_1.AddMemberDto, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:userId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Remove member from department' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiOperation)({ summary: 'Get department members' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_entity_1.User] }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, department_query_dto_1.DepartmentQueryDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getMembers", null);
DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('Departments'),
    (0, common_1.Controller)('departments'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, organization_guard_1.OrganizationGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService,
        department_members_service_1.DepartmentMembersService])
], DepartmentsController);
exports.DepartmentsController = DepartmentsController;
//# sourceMappingURL=departments.controller.js.map