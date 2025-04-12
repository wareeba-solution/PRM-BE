import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { DepartmentQueryDto } from '../dto/department-query.dto';
import { OrganizationsService } from '../../organizations/services/organizations.service';
export declare class DepartmentsService {
    private readonly departmentRepository;
    private readonly organizationsService;
    private readonly eventEmitter;
    constructor(departmentRepository: Repository<Department>, organizationsService: OrganizationsService, eventEmitter: EventEmitter2);
    /**
     * Create a new department
     */
    create(createDepartmentDto: Partial<Department>, userId: string, organizationId: string): Promise<Department>;
    /**
     * Find all departments matching query
     */
    findAll(organizationId: string, query: DepartmentQueryDto): Promise<[Department[], number]>;
    /**
     * Find department by ID
     */
    findById(id: string, organizationId?: string, relations?: string[]): Promise<Department>;
    /**
     * Update department
     */
    update(id: string, updateDepartmentDto: UpdateDepartmentDto, userId: string): Promise<Department>;
    /**
     * Delete department
     */
    delete(id: string, userId: string): Promise<void>;
    /**
     * Validate parent department relationship
     */
    private validateParentDepartment;
    /**
     * Find all child departments
     */
    private findAllChildren;
    /**
     * Update member count
     */
    updateMemberCount(id: string): Promise<void>;
}
