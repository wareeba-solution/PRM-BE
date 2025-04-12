"use strict";
// src/modules/users/controllers/users.controller.ts
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
const common_1 = require("@nestjs/common");
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
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, // Ensure CreateUserDto is properly defined
    req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.create(Object.assign(Object.assign({}, createUserDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async findAll(query, // Ensure UserQueryDto is properly defined
    req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        return this.usersService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getProfile(req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.findOne(req.user.id, req.organization.id);
    }
    async updateProfile(updateProfileDto, // Ensure UpdateProfileDto is properly defined
    req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
        return this.usersService.updateProfile(req.user.id, Object.assign(Object.assign({}, updateProfileDto), { organizationId: req.organization.id }));
    }
    async updatePassword(updatePasswordDto, // Ensure UpdatePasswordDto is properly defined
    req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
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
    async update(id, updateUserDto, // Ensure UpdateUserDto is properly defined
    req) {
        if (!req.organization) {
            throw new common_1.ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new common_1.ForbiddenException('User context is required');
        }
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_query_dto_1.UserQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('profile/password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
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
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)(':id/deactivate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Get)(':id/activity'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getActivity", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPermissions", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map