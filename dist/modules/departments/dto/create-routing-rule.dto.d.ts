import { RoutingType, RoutingCondition, RoutingAction } from '../entities/routing-rule.entity';
export declare class CreateRoutingRuleDto {
    departmentId: string;
    type: RoutingType;
    condition: RoutingCondition;
    conditionValue: any;
    action: RoutingAction;
    actionValue: any;
    priority?: number;
    isActive?: boolean;
    description?: string;
    isDefault?: boolean;
}
