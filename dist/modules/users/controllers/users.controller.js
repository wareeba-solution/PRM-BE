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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, BadRequestException, ForbiddenException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQueryDto } from '../dto/user-query.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { SimpleUserDto } from '../../../swagger/dtos/simple-user.dto';
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        return this.usersService.create(Object.assign(Object.assign({}, createUserDto), { organizationId: req.organization.id, createdBy: req.user.id }));
    }
    async findAll(query, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.findAll(Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getProfile(req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        return this.usersService.findOne(req.user.id, req.organization.id);
    }
    async updateProfile(updateProfileDto, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        return this.usersService.updateProfile(req.user.id, Object.assign(Object.assign({}, updateProfileDto), { organizationId: req.organization.id }));
    }
    async updatePassword(updatePasswordDto, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        return this.usersService.updatePassword(req.user.id, Object.assign(Object.assign({}, updatePasswordDto), { organizationId: req.organization.id }));
    }
    async findOne(id, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        const user = await this.usersService.findOne(id, req.organization.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        if (updateUserDto.role && updateUserDto.role !== Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                const currentUser = await this.usersService.findOne(id, req.organization.id);
                if (currentUser.role === Role.ADMIN) {
                    throw new BadRequestException('Cannot demote the last administrator');
                }
            }
        }
        return this.usersService.update(id, Object.assign(Object.assign({}, updateUserDto), { organizationId: req.organization.id, updatedBy: req.user.id }));
    }
    async remove(id, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        const user = await this.usersService.findOne(id, req.organization.id);
        if (user.role === Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                throw new BadRequestException('Cannot delete the last administrator');
            }
        }
        await this.usersService.remove(id, req.organization.id);
    }
    async activate(id, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.activate(id, req.organization.id);
    }
    async deactivate(id, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        const user = await this.usersService.findOne(id, req.organization.id);
        if (user.role === Role.ADMIN) {
            const admins = await this.usersService.getAdminCount(req.organization.id);
            if (admins === 1) {
                throw new BadRequestException('Cannot deactivate the last administrator');
            }
        }
        return this.usersService.deactivate(id, req.organization.id);
    }
    async getActivity(id, query, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.getActivity(id, Object.assign(Object.assign({}, query), { organizationId: req.organization.id }));
    }
    async getPermissions(id, req) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.getPermissions(id, req.organization.id);
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Create new user' }),
    ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User created successfully',
        type: SimpleUserDto
    }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    Get(),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Return all users',
        type: SimpleUserDto,
        isArray: true
    }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    Get('profile'),
    ApiOperation({ summary: 'Get current user profile' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Return current user profile',
        type: SimpleUserDto
    }),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    Put('profile'),
    ApiOperation({ summary: 'Update current user profile' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Profile updated successfully',
        type: SimpleUserDto
    }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    Put('profile/password'),
    ApiOperation({ summary: 'Update current user password' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Password updated successfully',
        type: SimpleUserDto
    }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    Get(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get user by id' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Return user details',
        type: SimpleUserDto
    }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Update user' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'User updated successfully',
        type: SimpleUserDto
    }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Delete user' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    Put(':id/activate'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Activate user' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'User activated successfully',
        type: SimpleUserDto
    }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "activate", null);
__decorate([
    Put(':id/deactivate'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Deactivate user' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'User deactivated successfully',
        type: SimpleUserDto
    }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivate", null);
__decorate([
    Get(':id/activity'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get user activity' }),
    ApiResponse({
        status: HttpStatus.OK,
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
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getActivity", null);
__decorate([
    Get(':id/permissions'),
    ApiOperation({ summary: 'Get user permissions' }),
    ApiResponse({
        status: HttpStatus.OK,
        description: 'Return user permissions',
        schema: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPermissions", null);
UsersController = __decorate([
    ApiTags('Users'),
    Controller('users'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map