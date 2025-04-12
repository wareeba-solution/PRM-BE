import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutingRule, RoutingType, RoutingCondition, RoutingAction } from '../entities/routing-rule.entity';
import { CreateRoutingRuleDto } from '../dto/create-routing-rule.dto';
import { UpdateRoutingRuleDto } from '../dto/update-routing-rule.dto';
import { DepartmentsService } from './departments.service';

@Injectable()
export class RoutingService {
    constructor(
        @InjectRepository(RoutingRule)
        private readonly routingRuleRepository: Repository<RoutingRule>,
        private readonly departmentsService: DepartmentsService,
    ) {}

    async create(organizationId: string, createRoutingRuleDto: CreateRoutingRuleDto, createdById: string) {
        // Verify department exists and belongs to organization
        await this.departmentsService.findById(createRoutingRuleDto.departmentId, organizationId);

        const rule = this.routingRuleRepository.create({
            ...createRoutingRuleDto,
            organizationId,
            createdById,
        });

        return this.routingRuleRepository.save(rule);
    }

    async findAll(organizationId: string, departmentId?: string) {
        const query = this.routingRuleRepository
            .createQueryBuilder('rule')
            .where('rule.organizationId = :organizationId', { organizationId })
            .andWhere('rule.deletedAt IS NULL');

        if (departmentId) {
            query.andWhere('rule.departmentId = :departmentId', { departmentId });
        }

        return query.orderBy('rule.priority', 'ASC').getMany();
    }

    async findOne(organizationId: string, id: string) {
        const rule = await this.routingRuleRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });

        if (!rule) {
            throw new NotFoundException(`Routing rule with ID ${id} not found`);
        }

        return rule;
    }

    async update(organizationId: string, id: string, updateRoutingRuleDto: UpdateRoutingRuleDto) {
        const rule = await this.findOne(organizationId, id);

        if (updateRoutingRuleDto.departmentId) {
            await this.departmentsService.findById(updateRoutingRuleDto.departmentId, organizationId);
        }

        Object.assign(rule, updateRoutingRuleDto);
        return this.routingRuleRepository.save(rule);
    }

    async remove(organizationId: string, id: string) {
        const rule = await this.findOne(organizationId, id);
        return this.routingRuleRepository.softRemove(rule);
    }

    async findMatchingRules(organizationId: string, type: RoutingType, context: any) {
        const rules = await this.routingRuleRepository
            .createQueryBuilder('rule')
            .where('rule.organizationId = :organizationId', { organizationId })
            .andWhere('rule.type = :type', { type })
            .andWhere('rule.isActive = true')
            .andWhere('rule.deletedAt IS NULL')
            .orderBy('rule.priority', 'ASC')
            .getMany();

        return rules.filter(rule => this.evaluateCondition(rule, context));
    }

    private evaluateCondition(rule: RoutingRule, context: any): boolean {
        switch (rule.condition) {
            case RoutingCondition.KEYWORD:
                return this.evaluateKeywordCondition(rule.conditionValue, context);
            case RoutingCondition.PRIORITY:
                return this.evaluatePriorityCondition(rule.conditionValue, context);
            case RoutingCondition.PATIENT_TYPE:
                return this.evaluatePatientTypeCondition(rule.conditionValue, context);
            case RoutingCondition.TIME_OF_DAY:
                return this.evaluateTimeOfDayCondition(rule.conditionValue, context);
            case RoutingCondition.DAY_OF_WEEK:
                return this.evaluateDayOfWeekCondition(rule.conditionValue, context);
            case RoutingCondition.CUSTOM:
                return this.evaluateCustomCondition(rule.conditionValue, context);
            default:
                return false;
        }
    }

    private evaluateKeywordCondition(conditionValue: any, context: any): boolean {
        const keywords = conditionValue.keywords || [];
        const content = context.content?.toLowerCase() || '';
        return keywords.some(keyword => content.includes(keyword.toLowerCase()));
    }

    private evaluatePriorityCondition(conditionValue: any, context: any): boolean {
        const requiredPriority = conditionValue.priority;
        return context.priority === requiredPriority;
    }

    private evaluatePatientTypeCondition(conditionValue: any, context: any): boolean {
        const allowedTypes = conditionValue.patientTypes || [];
        return allowedTypes.includes(context.patientType);
    }

    private evaluateTimeOfDayCondition(conditionValue: any, context: any): boolean {
        const { startTime, endTime } = conditionValue;
        const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
        const startMinutes = this.timeToMinutes(startTime);
        const endMinutes = this.timeToMinutes(endTime);
        return currentTime >= startMinutes && currentTime <= endMinutes;
    }

    private evaluateDayOfWeekCondition(conditionValue: any, context: any): boolean {
        const allowedDays = conditionValue.days || [];
        const currentDay = new Date().getDay();
        return allowedDays.includes(currentDay);
    }

    private evaluateCustomCondition(conditionValue: any, context: any): boolean {
        // Implement custom condition evaluation logic
        // This could be a JavaScript function stored in the database
        try {
            const customFunction = new Function('context', conditionValue.function);
            return customFunction(context);
        } catch (error) {
            console.error('Error evaluating custom condition:', error);
            return false;
        }
    }

    private timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    async applyRoutingRules(organizationId: string, type: RoutingType, context: any) {
        const matchingRules = await this.findMatchingRules(organizationId, type, context);
        
        if (matchingRules.length === 0) {
            // Apply default rules if no specific rules match
            const defaultRules = await this.routingRuleRepository
                .createQueryBuilder('rule')
                .where('rule.organizationId = :organizationId', { organizationId })
                .andWhere('rule.type = :type', { type })
                .andWhere('rule.isDefault = true')
                .andWhere('rule.isActive = true')
                .andWhere('rule.deletedAt IS NULL')
                .orderBy('rule.priority', 'ASC')
                .getMany();

            return this.executeActions(defaultRules, context);
        }

        return this.executeActions(matchingRules, context);
    }

    private async executeActions(rules: RoutingRule[], context: any) {
        const results = [];

        for (const rule of rules) {
            switch (rule.action) {
                case RoutingAction.ASSIGN_TO_DEPARTMENT:
                    results.push({
                        action: 'ASSIGN_TO_DEPARTMENT',
                        departmentId: rule.actionValue.departmentId,
                    });
                    break;
                case RoutingAction.ASSIGN_TO_USER:
                    results.push({
                        action: 'ASSIGN_TO_USER',
                        userId: rule.actionValue.userId,
                    });
                    break;
                case RoutingAction.ESCALATE:
                    results.push({
                        action: 'ESCALATE',
                        level: rule.actionValue.level,
                    });
                    break;
                case RoutingAction.NOTIFY:
                    results.push({
                        action: 'NOTIFY',
                        recipients: rule.actionValue.recipients,
                        message: rule.actionValue.message,
                    });
                    break;
                case RoutingAction.AUTO_REPLY:
                    results.push({
                        action: 'AUTO_REPLY',
                        message: rule.actionValue.message,
                    });
                    break;
            }
        }

        return results;
    }
} 