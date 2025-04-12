import { Repository } from 'typeorm';
import { RoutingRule, RoutingType } from '../entities/routing-rule.entity';
import { CreateRoutingRuleDto } from '../dto/create-routing-rule.dto';
import { UpdateRoutingRuleDto } from '../dto/update-routing-rule.dto';
import { DepartmentsService } from './departments.service';
export declare class RoutingService {
    private readonly routingRuleRepository;
    private readonly departmentsService;
    constructor(routingRuleRepository: Repository<RoutingRule>, departmentsService: DepartmentsService);
    create(organizationId: string, createRoutingRuleDto: CreateRoutingRuleDto, createdById: string): Promise<RoutingRule>;
    findAll(organizationId: string, departmentId?: string): Promise<RoutingRule[]>;
    findOne(organizationId: string, id: string): Promise<RoutingRule>;
    update(organizationId: string, id: string, updateRoutingRuleDto: UpdateRoutingRuleDto): Promise<RoutingRule>;
    remove(organizationId: string, id: string): Promise<RoutingRule>;
    findMatchingRules(organizationId: string, type: RoutingType, context: any): Promise<RoutingRule[]>;
    private evaluateCondition;
    private evaluateKeywordCondition;
    private evaluatePriorityCondition;
    private evaluatePatientTypeCondition;
    private evaluateTimeOfDayCondition;
    private evaluateDayOfWeekCondition;
    private evaluateCustomCondition;
    private timeToMinutes;
    applyRoutingRules(organizationId: string, type: RoutingType, context: any): Promise<any[]>;
    private executeActions;
}
