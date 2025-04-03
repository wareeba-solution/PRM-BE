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
exports.DepartmentHierarchyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const department_entity_1 = require("../entities/department.entity");
const departments_service_1 = require("./departments.service");
let DepartmentHierarchyService = class DepartmentHierarchyService {
    constructor(departmentRepository, departmentsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.departmentsService = departmentsService;
        this.eventEmitter = eventEmitter;
    }
    /**
     * Get department hierarchy tree
     */
    async getDepartmentTree(organizationId, rootDepartmentId) {
        const departments = await this.departmentRepository.find({
            where: { organizationId },
            order: { name: 'ASC' },
        });
        return this.buildDepartmentTree(departments, rootDepartmentId);
    }
    /**
     * Build department hierarchy tree
     */
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
    /**
     * Move department in hierarchy
     */
    async moveDepartment(departmentId, newParentId, userId) {
        const department = await this.departmentsService.findById(departmentId);
        if (newParentId) {
            // Validate new parent exists and is in same organization
            const newParent = await this.departmentsService.findById(newParentId);
            if (newParent.organizationId !== department.organizationId) {
                throw new common_1.BadRequestException('Cannot move department to different organization');
            }
            // Check for circular reference
            await this.validateHierarchyMove(departmentId, newParentId);
        }
        // Update parent
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
    /**
     * Validate hierarchy move to prevent circular references
     */
    async validateHierarchyMove(departmentId, newParentId) {
        if (departmentId === newParentId) {
            throw new common_1.BadRequestException('Department cannot be its own parent');
        }
        const childDepartments = await this.getAllChildDepartments(departmentId);
        if (childDepartments.some(dept => dept.id === newParentId)) {
            throw new common_1.BadRequestException('Cannot move department under its own child');
        }
    }
    /**
     * Get all child departments recursively
     */
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
    /**
     * Get department ancestors
     */
    async getDepartmentAncestors(departmentId) {
        const ancestors = [];
        let currentDepartment = await this.departmentsService.findById(departmentId, undefined, // organizationId is optional
        ['parentDepartment']);
        while (currentDepartment.parentDepartment) {
            ancestors.push(currentDepartment.parentDepartment);
            currentDepartment = await this.departmentsService.findById(currentDepartment.parentDepartment.id, undefined, ['parentDepartment']);
        }
        return ancestors.reverse();
    }
    /**
     * Get department descendants
     */
    async getDepartmentDescendants(departmentId) {
        return this.getAllChildDepartments(departmentId);
    }
    /**
     * Get department siblings
     */
    async getDepartmentSiblings(departmentId) {
        const department = await this.departmentsService.findById(departmentId, undefined, ['parentDepartment']);
        return this.departmentRepository.find({
            where: {
                parentDepartmentId: department.parentDepartmentId || (0, typeorm_2.IsNull)(),
                id: (0, typeorm_2.Not)(departmentId),
                organizationId: department.organizationId,
            },
        });
    }
    /**
     * Calculate department depth in hierarchy
     */
    async getDepartmentDepth(departmentId) {
        const ancestors = await this.getDepartmentAncestors(departmentId);
        return ancestors.length;
    }
    /**
     * Reorder sibling departments
     */
    async reorderDepartments(parentDepartmentId, orderedDepartmentIds, userId) {
        // Validate all departments exist and are siblings
        const departments = await this.departmentRepository.find({
            where: {
                id: (0, typeorm_2.In)(orderedDepartmentIds),
                parentDepartmentId: parentDepartmentId || (0, typeorm_2.IsNull)(),
            },
        });
        if (departments.length !== orderedDepartmentIds.length) {
            throw new common_1.BadRequestException('Invalid department IDs provided');
        }
        // Update order using sortOrder column
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
    /**
     * Update department parent
     */
    async updateDepartmentParent(departmentId, parentDepartmentId, userId) {
        const updateData = {
            parentDepartmentId,
            updatedById: userId
        };
        await this.departmentRepository.update(departmentId, updateData);
        return await this.departmentRepository.findOneOrFail({ where: { id: departmentId } });
    }
    /**
     * Update department order
     */
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        departments_service_1.DepartmentsService,
        event_emitter_1.EventEmitter2])
], DepartmentHierarchyService);
exports.DepartmentHierarchyService = DepartmentHierarchyService;
//# sourceMappingURL=department-hierarchy.service.js.map