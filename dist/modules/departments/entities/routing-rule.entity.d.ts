import { Department } from './department.entity';
export declare enum RoutingType {
    TICKET = "TICKET",
    MESSAGE = "MESSAGE",
    APPOINTMENT = "APPOINTMENT"
}
export declare enum RoutingCondition {
    KEYWORD = "KEYWORD",
    PRIORITY = "PRIORITY",
    PATIENT_TYPE = "PATIENT_TYPE",
    TIME_OF_DAY = "TIME_OF_DAY",
    DAY_OF_WEEK = "DAY_OF_WEEK",
    CUSTOM = "CUSTOM"
}
export declare enum RoutingAction {
    ASSIGN_TO_DEPARTMENT = "ASSIGN_TO_DEPARTMENT",
    ASSIGN_TO_USER = "ASSIGN_TO_USER",
    ESCALATE = "ESCALATE",
    NOTIFY = "NOTIFY",
    AUTO_REPLY = "AUTO_REPLY"
}
export declare class RoutingRule {
    id: string;
    organizationId: string;
    departmentId: string;
    department: Department;
    type: RoutingType;
    condition: RoutingCondition;
    conditionValue: any;
    action: RoutingAction;
    actionValue: any;
    priority: number;
    isActive: boolean;
    description?: string;
    isDefault: boolean;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
