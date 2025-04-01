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
import { Repository, Not, In, IsNull } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { DepartmentsService } from './departments.service';
let DepartmentHierarchyService = class DepartmentHierarchyService {
    constructor(departmentRepository, departmentsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.departmentsService = departmentsService;
        this.eventEmitter = eventEmitter;
    }
    async getDepartmentTree(organizationId, rootDepartmentId) {
        const departments = await this.departmentRepository.find({
            where: { organizationId },
            order: { name: 'ASC' },
        });
        return this.buildDepartmentTree(departments, rootDepartmentId);
    }
    buildDepartmentTree(departments, rootDepartmentId, level = 0) {
        const rootDepartments = departments.filter(dept => rootDepartmentId
            ? dept.id === rootDepartmentId
            : !dept.parentDepartmentId);
        return rootDepartments.map(dept => ({
            id: dept.id,
            name: dept.name,
            managerId: dept.managerId,
            memberCount: dept.memberCount,
            level,
            metadata: dept.metadata,
            children: this.buildDepartmentTree(departments.filter(d => d.parentDepartmentId === dept.id), undefined, level + 1),
        }));
    }
    async moveDepartment(departmentId, newParentId, userId) {
        const department = await this.departmentsService.findById(departmentId);
        if (newParentId) {
            const newParent = await this.departmentsService.findById(newParentId);
            if (newParent.organizationId !== department.organizationId) {
                throw new BadRequestException('Cannot move department to different organization');
            }
            await this.validateHierarchyMove(departmentId, newParentId);
        }
        await this.departmentRepository.update(departmentId, {
            parentDepartmentId: newParentId || undefined,
            updatedById: userId,
        });
        this.eventEmitter.emit('department.moved', {
            departmentId,
            previousParentId: department.parentDepartmentId,
            newParentId,
            performedById: userId,
            organizationId: department.organizationId,
        });
    }
    async validateHierarchyMove(departmentId, newParentId) {
        if (departmentId === newParentId) {
            throw new BadRequestException('Department cannot be its own parent');
        }
        const childDepartments = await this.getAllChildDepartments(departmentId);
        if (childDepartments.some(dept => dept.id === newParentId)) {
            throw new BadRequestException('Cannot move department under its own child');
        }
    }
    async getAllChildDepartments(departmentId) {
        const children = await this.departmentRepository.find({
            where: { parentDepartmentId: departmentId },
        });
        const allChildren = [...children];
        for (const child of children) {
            const grandChildren = await this.getAllChildDepartments(child.id);
            allChildren.push(...grandChildren);
        }
        return allChildren;
    }
    async getDepartmentAncestors(departmentId) {
        const ancestors = [];
        let currentDepartment = await this.departmentsService.findById(departmentId, undefined, ['parentDepartment']);
        while (currentDepartment.parentDepartment) {
            ancestors.push(currentDepartment.parentDepartment);
            currentDepartment = await this.departmentsService.findById(currentDepartment.parentDepartment.id, undefined, ['parentDepartment']);
        }
        return ancestors.reverse();
    }
    async getDepartmentDescendants(departmentId) {
        return this.getAllChildDepartments(departmentId);
    }
    async getDepartmentSiblings(departmentId) {
        const department = await this.departmentsService.findById(departmentId, undefined, ['parentDepartment']);
        return this.departmentRepository.find({
            where: {
                parentDepartmentId: department.parentDepartmentId || IsNull(),
                id: Not(departmentId),
                organizationId: department.organizationId,
            },
        });
    }
    async getDepartmentDepth(departmentId) {
        const ancestors = await this.getDepartmentAncestors(departmentId);
        return ancestors.length;
    }
    async reorderDepartments(parentDepartmentId, orderedDepartmentIds, userId) {
        const departments = await this.departmentRepository.find({
            where: {
                id: In(orderedDepartmentIds),
                parentDepartmentId: parentDepartmentId || IsNull(),
            },
        });
        if (departments.length !== orderedDepartmentIds.length) {
            throw new BadRequestException('Invalid department IDs provided');
        }
        for (let i = 0; i < orderedDepartmentIds.length; i++) {
            await this.departmentRepository.update(orderedDepartmentIds[i], {
                sortOrder: i,
                updatedById: userId,
            });
        }
        this.eventEmitter.emit('department.reordered', {
            parentDepartmentId,
            orderedDepartmentIds,
            performedById: userId,
            organizationId: departments[0].organizationId,
        });
    }
    async updateDepartmentParent(departmentId, parentDepartmentId, userId) {
        const updateData = {
            parentDepartmentId,
            updatedById: userId
        };
        await this.departmentRepository.update(departmentId, updateData);
        return await this.departmentRepository.findOneOrFail({ where: { id: departmentId } });
    }
    async updateDepartmentOrder(departmentId, sortOrder, userId) {
        const updateData = {
            sortOrder,
            updatedById: userId
        };
        await this.departmentRepository.update(departmentId, updateData);
        return await this.departmentRepository.findOneOrFail({ where: { id: departmentId } });
    }
};
DepartmentHierarchyService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Department)),
    __metadata("design:paramtypes", [Repository,
        DepartmentsService,
        EventEmitter2])
], DepartmentHierarchyService);
export { DepartmentHierarchyService };
//# sourceMappingURL=department-hierarchy.service.js.map