import { IsEnum, IsString, IsNumber, IsBoolean, IsOptional, IsUUID, IsObject } from 'class-validator';
import { RoutingType, RoutingCondition, RoutingAction } from '../entities/routing-rule.entity';

export class CreateRoutingRuleDto {
    @IsUUID()
    departmentId: string;

    @IsEnum(RoutingType)
    type: RoutingType;

    @IsEnum(RoutingCondition)
    condition: RoutingCondition;

    @IsObject()
    conditionValue: any;

    @IsEnum(RoutingAction)
    action: RoutingAction;

    @IsObject()
    actionValue: any;

    @IsOptional()
    @IsNumber()
    priority?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
} 