import { IsUUID, IsOptional, IsString, IsBoolean, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export enum AssignmentType {
    USER = 'user',
    TEAM = 'team',
    DEPARTMENT = 'department',
    AUTO = 'auto',
    ROUND_ROBIN = 'round_robin'
}

export class AssignmentNotification {
    @IsBoolean()
    @IsOptional()
    notifyAssignee?: boolean = true;


    @IsBoolean()
    @IsOptional()
    notifyPreviousAssignee?: boolean = true;


    @IsString()
    @IsOptional()
    customMessage?: string;
}

export class TicketAssignmentDto {
    @IsUUID()
    assigneeId: string;
  

    @IsString()
    @IsOptional()
    note?: string;
  }

export class AssignmentRules {
    @IsBoolean()
    @IsOptional()
    considerWorkload?: boolean = true;


    @IsBoolean()
    @IsOptional()
    checkSkillMatch?: boolean = true;


    @IsBoolean()
    @IsOptional()
    considerTimeZone?: boolean = false;


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    requiredSkills?: string[];
}

export class CreateTicketAssignmentDto {
    @IsEnum(AssignmentType)
    type: AssignmentType;


    @IsUUID('4')
    assigneeId: string;


    @ValidateNested()
    @Type(() => AssignmentNotification)
    @IsOptional()
    notification?: AssignmentNotification;


    @ValidateNested()
    @Type(() => AssignmentRules)
    @IsOptional()
    rules?: AssignmentRules;


    @IsString()
    @IsOptional()
    reason?: string;


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    notes?: string[];


    @IsBoolean()
    @IsOptional()
    isTemporary?: boolean = false;


    @IsOptional()
    @Type(() => Date)
    temporaryUntil?: Date;
}

export class UpdateTicketAssignmentDto {
    @IsEnum(AssignmentType)
    @IsOptional()
    type?: AssignmentType;


    @IsUUID('4')
    @IsOptional()
    assigneeId?: string;


    @ValidateNested()
    @Type(() => AssignmentNotification)
    @IsOptional()
    notification?: AssignmentNotification;


    @ValidateNested()
    @Type(() => AssignmentRules)
    @IsOptional()
    rules?: AssignmentRules;


    @IsString()
    @IsOptional()
    reason?: string;
}

export class BulkTicketAssignmentDto {
    @IsArray()
    @IsUUID('4', { each: true })
    @ArrayMinSize(1) // Moved this after IsArray and IsUUID to fix decorator type issues
    ticketIds: string[];
  

    @IsUUID()
    assigneeId: string;
  

    @IsString()
    @IsOptional()
    note?: string;
  }

export class AssignmentResponseDto {
    success: boolean;


    ticketId: string;


    assigneeId: string;


    type: AssignmentType;


    error?: string;


    timestamp: Date;


    details?: Record<string, any>;
}
function ArrayMinSize(min: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'arrayMinSize',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [min],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [minSize] = args.constraints;
                    return Array.isArray(value) && value.length >= minSize;
                },
                defaultMessage(args: ValidationArguments) {
                    const [minSize] = args.constraints;
                    return `Array must contain at least ${minSize} elements`;
                }
            }
        });
    };
}
