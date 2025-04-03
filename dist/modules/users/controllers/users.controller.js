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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/users/controllers/users.controller.ts
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
const users_service_1 = require("../services/users.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const user_query_dto_1 = require("../dto/user-query.dto");
const update_password_dto_1 = require("../dto/update-password.dto");
const update_profile_dto_1 = require("../dto/update-profile.dto");
const simple_user_dto_1 = require("../../../swagger/dtos/simple-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Fix: Ensure req.user is defined
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.create(Object.assign(Object.assign({}, createUserDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        return this.usersService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getProfile(req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Fix: Ensure req.user is defined
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.findOne(req.user.id, req.organization.id);
    }
    async updateProfile(updateProfileDto, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Fix: Ensure req.user is defined
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.updateProfile(req.user.id, Object.assign(Object.assign({}, updateProfileDto), { organizationId: req.organization.id }));
    }
    async updatePassword(updatePasswordDto, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Fix: Ensure req.user is defined
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.updatePassword(req.user.id, Object.assign(Object.assign({}, updatePasswordDto), { organizationId: req.organization.id }));
    }
    async findOne(id, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        const user = await this.usersService.findOne(id, req.organization.id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Fix: Ensure req.user is defined
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        // Prevent demoting the last admin
        if (updateUserDto.role && updateUserDto.role !== role_enum_1.Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                const currentUser = await this.usersService.findOne(id, req.organization.id);
                if (currentUser.role === role_enum_1.Role.ADMIN) {
                    throw new common_1.BadRequestException('Cannot demote the last administrator');
                }
            }
        }
        return this.usersService.update(id, Object.assign(Object.assign({}, updateUserDto), { organizationId: req.organization.id, updatedBy: req.user.id }));
    }
    async remove(id, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Prevent deleting the last admin
        const user = await this.usersService.findOne(id, req.organization.id);
        if (user.role === role_enum_1.Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                throw new common_1.BadRequestException('Cannot delete the last administrator');
            }
        }
        await this.usersService.remove(id, req.organization.id);
    }
    async activate(id, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        return this.usersService.activate(id, req.organization.id);
    }
    async deactivate(id, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        // Prevent deactivating the last admin
        const user = await this.usersService.findOne(id, req.organization.id);
        if (user.role === role_enum_1.Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                throw new common_1.BadRequestException('Cannot deactivate the last administrator');
            }
        }
        return this.usersService.deactivate(id, req.organization.id);
    }
    async getActivity(id, query, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        return this.usersService.getActivity(id, Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getPermissions(id, req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        return this.usersService.getPermissions(id, req.organization.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'User created successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 201, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Return all users',
        type: simple_user_dto_1.SimpleUserDto,
        isArray: true
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_query_dto_1.UserQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Return current user profile',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Profile updated successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('profile/password'),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user password' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Password updated successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Return user details',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User updated successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'User deleted successfully' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Activate user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User activated successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)(':id/deactivate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User deactivated successfully',
        type: simple_user_dto_1.SimpleUserDto
    }),
    openapi.ApiResponse({ status: 200, type: require("../entities/user.entity").User }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Get)(':id/activity'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user activity' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Return user activity',
        schema: {
            type: 'object',
            properties: {
                activities: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            action: { type: 'string' },
                            timestamp: { type: 'string', format: 'date-time' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }),
    openapi.ApiResponse({ status: 200, type: [require("../entities/user-activity.entity").UserActivity] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getActivity", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user permissions' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Return user permissions',
        schema: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }),
    openapi.ApiResponse({ status: 200, type: [String] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPermissions", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map