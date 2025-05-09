import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import { DepartmentMembersService } from '../services/department-members.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { OrganizationGuard } from '../../organizations/guards/organization.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { AddMemberDto } from '../dto/add-member.dto';
import { DepartmentQueryDto } from '../dto/department-query.dto';
import { Department } from '../entities/department.entity';
import { Role } from '../../users/enums/role.enum';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';

@Controller('departments')
@UseGuards(AuthGuard, OrganizationGuard, RolesGuard)
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly departmentMembersService: DepartmentMembersService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  async create(
    @Body() createDepartmentDto: Partial<Department>,
    @Req() req: Request
  ): Promise<Department> {
    return this.departmentsService.create(
      createDepartmentDto,
      req.user['id'],
      req.user['organizationId']
    );
  }

  @Get()
  async findAll(
    @Query() query: DepartmentQueryDto,
    @Req() req: Request
  ): Promise<[Department[], number]> {
    return this.departmentsService.findAll(
      req.user['organizationId'],
      query
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request
  ): Promise<Department> {
    return this.departmentsService.findById(
      id,
      req.user['organizationId']
    );
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @CurrentUser('id') userId: string
  ): Promise<Department> {
    return this.departmentsService.update(id, updateDepartmentDto, userId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ): Promise<void> {
    await this.departmentsService.delete(id, userId);
  }

  @Post(':id/members')
  @Roles(Role.ADMIN, Role.MANAGER)
  async addMember(
    @Param('id') departmentId: string,
    @Body() addMemberDto: AddMemberDto,
    @CurrentUser('id') userId: string
  ): Promise<void> {
    await this.departmentMembersService.addMember(
      departmentId,
      addMemberDto.userId,
      userId
    );
  }

  @Delete(':id/members/:userId')
  @Roles(Role.ADMIN, Role.MANAGER)
  async removeMember(
    @Param('id') departmentId: string,
    @Param('userId') memberId: string,
    @CurrentUser('id') userId: string
  ): Promise<void> {
    await this.departmentMembersService.removeMember(
      departmentId,
      memberId,
      userId
    );
  }

  @Get(':id/members')
  async getMembers(
    @Param('id') departmentId: string,
    @Query() query: DepartmentQueryDto
  ): Promise<[User[], number]> {
    return this.departmentMembersService.getMembers(departmentId, query);
  }
}