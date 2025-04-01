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
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { OrganizationsService } from '../../organizations/services/organizations.service';
let DepartmentsService = class DepartmentsService {
    constructor(departmentRepository, organizationsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.organizationsService = organizationsService;
        this.eventEmitter = eventEmitter;
    }
    async create(createDepartmentDto, userId, organizationId) {
        const department = this.departmentRepository.create(Object.assign(Object.assign({}, createDepartmentDto), { organizationId, createdById: userId, updatedById: userId, isActive: true }));
        return await this.departmentRepository.save(department);
    }
    async findAll(organizationId, query) {
        const where = { organizationId };
        if (query.isActive !== undefined) {
            where.isActive = query.isActive;
        }
        if (query.parentDepartmentId) {
            where.parentDepartmentId = query.parentDepartmentId;
        }
        if (query.managerId) {
            where.managerId = query.managerId;
        }
        return this.departmentRepository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: query.skip,
            take: query.take,
            relations: query.relations || [],
        });
    }
    async findById(id, organizationId, relations) {
        const where = { id };
        if (organizationId) {
            where.organizationId = organizationId;
        }
        const department = await this.departmentRepository.findOne({
            where,
            relations: relations || []
        });
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async update(id, updateDepartmentDto, userId) {
        const department = await this.findById(id);
        if (updateDepartmentDto.parentDepartmentId) {
            await this.validateParentDepartment(id, updateDepartmentDto.parentDepartmentId);
        }
        const updatedDepartment = await this.departmentRepository.save(Object.assign(Object.assign(Object.assign({}, department), updateDepartmentDto), { updatedById: userId }));
        this.eventEmitter.emit('department.updated', {
            departmentId: id,
            organizationId: department.organizationId,
            updatedById: userId,
            changes: updateDepartmentDto,
        });
        return updatedDepartment;
    }
    async delete(id, userId) {
        const department = await this.findById(id);
        const hasChildren = await this.departmentRepository.count({
            where: { parentDepartmentId: id },
        });
        if (hasChildren) {
            throw new BadRequestException('Cannot delete department with child departments');
        }
        await this.departmentRepository.softDelete(id);
        this.eventEmitter.emit('department.deleted', {
            departmentId: id,
            organizationId: department.organizationId,
            deletedById: userId,
        });
    }
    async validateParentDepartment(departmentId, parentId) {
        if (departmentId === parentId) {
            throw new BadRequestException('Department cannot be its own parent');
        }
        const childDepartments = await this.findAllChildren(departmentId);
        if (childDepartments.some(dept => dept.id === parentId)) {
            throw new BadRequestException('Cannot set a child department as parent department');
        }
    }
    async findAllChildren(departmentId) {
        const children = await this.departmentRepository.find({
            where: { parentDepartmentId: departmentId },
        });
        const allChildren = [...children];
        for (const child of children) {
            const grandChildren = await this.findAllChildren(child.id);
            allChildren.push(...grandChildren);
        }
        return allChildren;
    }
    async updateMemberCount(id) {
        const count = await this.departmentRepository
            .createQueryBuilder('department')
            .leftJoin('department.members', 'member')
            .where('department.id = :id', { id })
            .getCount();
        await this.departmentRepository.update(id, { memberCount: count });
    }
};
DepartmentsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Department)),
    __metadata("design:paramtypes", [Repository,
        OrganizationsService,
        EventEmitter2])
], DepartmentsService);
export { DepartmentsService };
//# sourceMappingURL=departments.service.js.map