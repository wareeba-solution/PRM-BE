import { DepartmentStatus } from '../enums/department-status.enum';
export declare class Department {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    parentDepartmentId?: string;
    managerId?: string;
    status: DepartmentStatus;
    settings?: {
        workingHours?: {
            start: string;
            end: string;
            timezone: string;
            workingDays: string[];
        };
        notificationPreferences?: {
            email?: boolean;
            sms?: boolean;
            whatsapp?: boolean;
        };
        [key: string]: any;
    };
    metadata?: {
        location?: string;
        floor?: string;
        room?: string;
        equipment?: string[];
        [key: string]: any;
    };
    createdById: string;
    updatedById?: string;
    memberCount: number;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    organization: any;
    parentDepartment?: any;
    manager?: Promise<any>;
    createdBy: Promise<any>;
    updatedBy?: Promise<any>;
    childDepartments: any[];
    users: any[];
    tickets: any[];
    get isActive(): boolean;
    get hasManager(): boolean;
    get isParentDepartment(): boolean;
}
