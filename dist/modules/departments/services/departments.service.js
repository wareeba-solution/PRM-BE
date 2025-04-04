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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const department_entity_1 = require("../entities/department.entity");
const organizations_service_1 = require("../../organizations/services/organizations.service");
let DepartmentsService = class DepartmentsService {
    constructor(departmentRepository, organizationsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.organizationsService = organizationsService;
        this.eventEmitter = eventEmitter;
    }
    /**
     * Create a new department
     */
    async create(createDepartmentDto, userId, organizationId) {
        const department = this.departmentRepository.create(Object.assign(Object.assign({}, createDepartmentDto), { organizationId, createdById: userId, updatedById: userId, isActive: true }));
        return await this.departmentRepository.save(department);
    }
    /**
     * Find all departments matching query
     */
    async findAll(organizationId, query) {
        const where = {};
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
    /**
     * Find department by ID
     */
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
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    /**
     * Update department
     */
    async update(id, updateDepartmentDto, userId) {
        const department = await this.findById(id);
        // Prevent circular parent-child relationship
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
    /**
     * Delete department
     */
    async delete(id, userId) {
        const department = await this.findById(id);
        // Check if department has child departments
        const hasChildren = await this.departmentRepository.count({
            where: { parentDepartmentId: id },
        });
        if (hasChildren) {
            throw new common_1.BadRequestException('Cannot delete department with child departments');
        }
        await this.departmentRepository.softDelete(id);
        this.eventEmitter.emit('department.deleted', {
            departmentId: id,
            organizationId: department.organizationId,
            deletedById: userId,
        });
    }
    /**
     * Validate parent department relationship
     */
    async validateParentDepartment(departmentId, parentId) {
        if (departmentId === parentId) {
            throw new common_1.BadRequestException('Department cannot be its own parent');
        }
        const childDepartments = await this.findAllChildren(departmentId);
        if (childDepartments.some(dept => dept.id === parentId)) {
            throw new common_1.BadRequestException('Cannot set a child department as parent department');
        }
    }
    /**
     * Find all child departments
     */
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
    /**
     * Update member count
     */
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        organizations_service_1.OrganizationsService,
        event_emitter_1.EventEmitter2])
], DepartmentsService);
exports.DepartmentsService = DepartmentsService;
//# sourceMappingURL=departments.service.js.map