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
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { DepartmentsService } from './departments.service';
let DepartmentMembersService = class DepartmentMembersService {
    constructor(departmentRepository, userRepository, usersService, departmentsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.usersService = usersService;
        this.departmentsService = departmentsService;
        this.eventEmitter = eventEmitter;
    }
    async addMember(departmentId, userId, performedById) {
        const department = await this.departmentsService.findById(departmentId);
        const user = await this.usersService.findById(userId);
        const isMember = await this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('department.id = :departmentId', { departmentId })
            .andWhere('member.id = :userId', { userId })
            .getExists();
        if (isMember) {
            throw new BadRequestException('User is already a member of this department');
        }
        await this.departmentRepository
            .createQueryBuilder()
            .relation(Department, 'members')
            .of(department)
            .add(user);
        await this.departmentsService.updateMemberCount(departmentId);
        this.eventEmitter.emit('department.member.added', {
            departmentId,
            userId,
            performedById,
            organizationId: department.organizationId,
        });
    }
    async removeMember(departmentId, userId, performedById) {
        const department = await this.departmentsService.findById(departmentId);
        const isMember = await this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('department.id = :departmentId', { departmentId })
            .andWhere('member.id = :userId', { userId })
            .getExists();
        if (!isMember) {
            throw new BadRequestException('User is not a member of this department');
        }
        if (department.managerId === userId) {
            throw new BadRequestException('Cannot remove department manager from department');
        }
        await this.departmentRepository
            .createQueryBuilder()
            .relation(Department, 'members')
            .of(department)
            .remove(userId);
        await this.departmentsService.updateMemberCount(departmentId);
        this.eventEmitter.emit('department.member.removed', {
            departmentId,
            userId,
            performedById,
            organizationId: department.organizationId,
        });
    }
    async getMembers(departmentId, query) {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .innerJoin('user.departments', 'department')
            .where('department.id = :departmentId', { departmentId });
        if (query.search) {
            queryBuilder.andWhere('(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)', { search: `%${query.search}%` });
        }
        return queryBuilder
            .orderBy('user.firstName', 'ASC')
            .addOrderBy('user.lastName', 'ASC')
            .skip(query.skip)
            .take(query.take)
            .getManyAndCount();
    }
    async transferMember(userId, fromDepartmentId, toDepartmentId, performedById) {
        await this.removeMember(fromDepartmentId, userId, performedById);
        await this.addMember(toDepartmentId, userId, performedById);
        const fromDepartment = await this.departmentsService.findById(fromDepartmentId);
        this.eventEmitter.emit('department.member.transferred', {
            userId,
            fromDepartmentId,
            toDepartmentId,
            performedById,
            organizationId: fromDepartment.organizationId,
        });
    }
    async getUserDepartments(userId) {
        return this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('member.id = :userId', { userId })
            .getMany();
    }
    async isMember(departmentId, userId) {
        return this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('department.id = :departmentId', { departmentId })
            .andWhere('member.id = :userId', { userId })
            .getExists();
    }
};
DepartmentMembersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Department)),
    __param(1, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        UsersService,
        DepartmentsService,
        EventEmitter2])
], DepartmentMembersService);
export { DepartmentMembersService };
//# sourceMappingURL=department-members.service.js.map