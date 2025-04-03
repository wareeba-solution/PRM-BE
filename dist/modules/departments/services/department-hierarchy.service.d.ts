import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Department } from '../entities/department.entity';
import { DepartmentsService } from './departments.service';
interface DepartmentTreeNode {
    id: string;
    name: string;
    managerId: string;
    memberCount: number;
    level: number;
    children: DepartmentTreeNode[];
    metadata?: Record<string, any>;
}
export declare class DepartmentHierarchyService {
    private readonly departmentRepository;
    private readonly departmentsService;
    private readonly eventEmitter;
    constructor(departmentRepository: Repository<Department>, departmentsService: DepartmentsService, eventEmitter: EventEmitter2);
    /**
     * Get department hierarchy tree
     */
    getDepartmentTree(organizationId: string, rootDepartmentId?: string): Promise<DepartmentTreeNode[]>;
    /**
     * Build department hierarchy tree
     */
    private buildDepartmentTree;
    /**
     * Move department in hierarchy
     */
    moveDepartment(departmentId: string, newParentId: string | null, userId: string): Promise<void>;
    /**
     * Validate hierarchy move to prevent circular references
     */
    private validateHierarchyMove;
    /**
     * Get all child departments recursively
     */
    private getAllChildDepartments;
    /**
     * Get department ancestors
     */
    getDepartmentAncestors(departmentId: string): Promise<Department[]>;
    /**
     * Get department descendants
     */
    getDepartmentDescendants(departmentId: string): Promise<Department[]>;
    /**
     * Get department siblings
     */
    getDepartmentSiblings(departmentId: string): Promise<Department[]>;
    /**
     * Calculate department depth in hierarchy
     */
    getDepartmentDepth(departmentId: string): Promise<number>;
    /**
     * Reorder sibling departments
     */
    reorderDepartments(parentDepartmentId: string | null, orderedDepartmentIds: string[], userId: string): Promise<void>;
    /**
     * Update department parent
     */
    updateDepartmentParent(departmentId: string, parentDepartmentId: string | null, userId: string): Promise<Department>;
    /**
     * Update department order
     */
    updateDepartmentOrder(departmentId: string, sortOrder: number, userId: string): Promise<Department>;
}
export {};
