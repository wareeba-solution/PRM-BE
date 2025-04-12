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
exports.DepartmentMembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const department_entity_1 = require("../entities/department.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const users_service_1 = require("../../users/services/users.service");
const departments_service_1 = require("./departments.service");
let DepartmentMembersService = class DepartmentMembersService {
    constructor(departmentRepository, userRepository, usersService, departmentsService, eventEmitter) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.usersService = usersService;
        this.departmentsService = departmentsService;
        this.eventEmitter = eventEmitter;
    }
    /**
     * Add member to department
     */
    async addMember(departmentId, userId, performedById) {
        const department = await this.departmentsService.findById(departmentId);
        const user = await this.usersService.findById(userId);
        // Check if user is already a member
        const isMember = await this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('department.id = :departmentId', { departmentId })
            .andWhere('member.id = :userId', { userId })
            .getExists();
        if (isMember) {
            throw new common_1.BadRequestException('User is already a member of this department');
        }
        // Add member
        await this.departmentRepository
            .createQueryBuilder()
            .relation(department_entity_1.Department, 'members')
            .of(department)
            .add(user);
        // Update member count
        await this.departmentsService.updateMemberCount(departmentId);
        this.eventEmitter.emit('department.member.added', {
            departmentId,
            userId,
            performedById,
            organizationId: department.organizationId,
        });
    }
    /**
     * Remove member from department
     */
    async removeMember(departmentId, userId, performedById) {
        const department = await this.departmentsService.findById(departmentId);
        // Check if user is a member
        const isMember = await this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('department.id = :departmentId', { departmentId })
            .andWhere('member.id = :userId', { userId })
            .getExists();
        if (!isMember) {
            throw new common_1.BadRequestException('User is not a member of this department');
        }
        // Check if user is department manager
        if (department.managerId === userId) {
            throw new common_1.BadRequestException('Cannot remove department manager from department');
        }
        // Remove member
        await this.departmentRepository
            .createQueryBuilder()
            .relation(department_entity_1.Department, 'members')
            .of(department)
            .remove(userId);
        // Update member count
        await this.departmentsService.updateMemberCount(departmentId);
        this.eventEmitter.emit('department.member.removed', {
            departmentId,
            userId,
            performedById,
            organizationId: department.organizationId,
        });
    }
    /**
     * Get department members
     */
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
    /**
     * Transfer member to another department
     */
    async transferMember(userId, fromDepartmentId, toDepartmentId, performedById) {
        // Remove from old department
        await this.removeMember(fromDepartmentId, userId, performedById);
        // Add to new department
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
    /**
     * Get user's departments
     */
    async getUserDepartments(userId) {
        return this.departmentRepository
            .createQueryBuilder('department')
            .innerJoin('department.members', 'member')
            .where('member.id = :userId', { userId })
            .getMany();
    }
    /**
     * Check if user is member of department
     */
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
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        departments_service_1.DepartmentsService,
        event_emitter_1.EventEmitter2])
], DepartmentMembersService);
exports.DepartmentMembersService = DepartmentMembersService;
//# sourceMappingURL=department-members.service.js.map