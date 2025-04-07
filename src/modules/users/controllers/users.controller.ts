// src/modules/users/controllers/users.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
    HttpStatus,
    ParseUUIDPipe,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
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
import { CustomRequest } from '../../../interfaces/request.interface';
import { SimpleUserDto } from '../dtos/simple-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles(Role.ADMIN)
    async create(
        @Body() createUserDto: CreateUserDto, // Ensure CreateUserDto is properly defined
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        
        return this.usersService.create({
            ...createUserDto,
            organizationId: req.organization.id,
            createdBy: req.user.id,
        });
    }

    @Get()
    @Roles(Role.ADMIN)
    async findAll(
        @Query() query: UserQueryDto, // Ensure UserQueryDto is properly defined
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.findAll({
            ...query,
            organizationId: req.organization.id,
        });
    }

    @Get('profile')
    async getProfile(
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        
        return this.usersService.findOne(req.user.id, req.organization.id);
    }

    @Put('profile')
    async updateProfile(
        @Body() updateProfileDto: UpdateProfileDto, // Ensure UpdateProfileDto is properly defined
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        
        return this.usersService.updateProfile(req.user.id, {
            ...updateProfileDto,
            organizationId: req.organization.id,
        });
    }

    @Put('profile/password')
    async updatePassword(
        @Body() updatePasswordDto: UpdatePasswordDto, // Ensure UpdatePasswordDto is properly defined
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        
        if (!req.user) {
            throw new ForbiddenException('User context is required');
        }
        
        return this.usersService.updatePassword(req.user.id, {
            ...updatePasswordDto,
            organizationId: req.organization.id,
        });
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        const user = await this.usersService.findOne(id, req.organization.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Put(':id')
    @Roles(Role.ADMIN)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto, // Ensure UpdateUserDto is properly defined
        @Request() req: CustomRequest,
    ) {
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

        return this.usersService.update(id, {
            ...updateUserDto,
            organizationId: req.organization.id,
            updatedBy: req.user.id,
        });
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
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

    @Put(':id/activate')
    @Roles(Role.ADMIN)
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.activate(id, req.organization.id);
    }

    @Put(':id/deactivate')
    @Roles(Role.ADMIN)
    async deactivate(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
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

    @Get(':id/activity')
    @Roles(Role.ADMIN)
    async getActivity(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.getActivity(id, {
            ...query,
            organizationId: req.organization.id,
        });
    }

    @Get(':id/permissions')
    async getPermissions(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization) {
            throw new ForbiddenException('Organization context is required');
        }
        return this.usersService.getPermissions(id, req.organization.id);
    }
}