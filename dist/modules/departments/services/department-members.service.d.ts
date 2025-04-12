import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { User } from '../../users/entities/user.entity';
import { DepartmentQueryDto } from '../dto/department-query.dto';
import { UsersService } from '../../users/services/users.service';
import { DepartmentsService } from './departments.service';
export declare class DepartmentMembersService {
    private readonly departmentRepository;
    private readonly userRepository;
    private readonly usersService;
    private readonly departmentsService;
    private readonly eventEmitter;
    constructor(departmentRepository: Repository<Department>, userRepository: Repository<User>, usersService: UsersService, departmentsService: DepartmentsService, eventEmitter: EventEmitter2);
    /**
     * Add member to department
     */
    addMember(departmentId: string, userId: string, performedById: string): Promise<void>;
    /**
     * Remove member from department
     */
    removeMember(departmentId: string, userId: string, performedById: string): Promise<void>;
    /**
     * Get department members
     */
    getMembers(departmentId: string, query: DepartmentQueryDto): Promise<[User[], number]>;
    /**
     * Transfer member to another department
     */
    transferMember(userId: string, fromDepartmentId: string, toDepartmentId: string, performedById: string): Promise<void>;
    /**
     * Get user's departments
     */
    getUserDepartments(userId: string): Promise<Department[]>;
    /**
     * Check if user is member of department
     */
    isMember(departmentId: string, userId: string): Promise<boolean>;
}
