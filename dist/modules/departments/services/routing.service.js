"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const routing_rule_entity_1 = require("../entities/routing-rule.entity");
const departments_service_1 = require("./departments.service");
let RoutingService = class RoutingService {
    constructor(routingRuleRepository, departmentsService) {
        this.routingRuleRepository = routingRuleRepository;
        this.departmentsService = departmentsService;
    }
    async create(organizationId, createRoutingRuleDto, createdById) {
        // Verify department exists and belongs to organization
        await this.departmentsService.findById(createRoutingRuleDto.departmentId, organizationId);
        const rule = this.routingRuleRepository.create(Object.assign(Object.assign({}, createRoutingRuleDto), { organizationId,
            createdById }));
        return this.routingRuleRepository.save(rule);
    }
    async findAll(organizationId, departmentId) {
        const query = this.routingRuleRepository
            .createQueryBuilder('rule')
            .where('rule.organizationId = :organizationId', { organizationId })
            .andWhere('rule.deletedAt IS NULL');
        if (departmentId) {
            query.andWhere('rule.departmentId = :departmentId', { departmentId });
        }
        return query.orderBy('rule.priority', 'ASC').getMany();
    }
    async findOne(organizationId, id) {
        const rule = await this.routingRuleRepository.findOne({
            where: { id, organizationId, deletedAt: null },
        });
        if (!rule) {
            throw new common_1.NotFoundException(`Routing rule with ID ${id} not found`);
        }
        return rule;
    }
    async update(organizationId, id, updateRoutingRuleDto) {
        const rule = await this.findOne(organizationId, id);
        if (updateRoutingRuleDto.departmentId) {
            await this.departmentsService.findById(updateRoutingRuleDto.departmentId, organizationId);
        }
        Object.assign(rule, updateRoutingRuleDto);
        return this.routingRuleRepository.save(rule);
    }
    async remove(organizationId, id) {
        const rule = await this.findOne(organizationId, id);
        return this.routingRuleRepository.softRemove(rule);
    }
    async findMatchingRules(organizationId, type, context) {
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
    evaluateCondition(rule, context) {
        switch (rule.condition) {
            case routing_rule_entity_1.RoutingCondition.KEYWORD:
                return this.evaluateKeywordCondition(rule.conditionValue, context);
            case routing_rule_entity_1.RoutingCondition.PRIORITY:
                return this.evaluatePriorityCondition(rule.conditionValue, context);
            case routing_rule_entity_1.RoutingCondition.PATIENT_TYPE:
                return this.evaluatePatientTypeCondition(rule.conditionValue, context);
            case routing_rule_entity_1.RoutingCondition.TIME_OF_DAY:
                return this.evaluateTimeOfDayCondition(rule.conditionValue, context);
            case routing_rule_entity_1.RoutingCondition.DAY_OF_WEEK:
                return this.evaluateDayOfWeekCondition(rule.conditionValue, context);
            case routing_rule_entity_1.RoutingCondition.CUSTOM:
                return this.evaluateCustomCondition(rule.conditionValue, context);
            default:
                return false;
        }
    }
    evaluateKeywordCondition(conditionValue, context) {
        var _a;
        const keywords = conditionValue.keywords || [];
        const content = ((_a = context.content) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        return keywords.some(keyword => content.includes(keyword.toLowerCase()));
    }
    evaluatePriorityCondition(conditionValue, context) {
        const requiredPriority = conditionValue.priority;
        return context.priority === requiredPriority;
    }
    evaluatePatientTypeCondition(conditionValue, context) {
        const allowedTypes = conditionValue.patientTypes || [];
        return allowedTypes.includes(context.patientType);
    }
    evaluateTimeOfDayCondition(conditionValue, context) {
        const { startTime, endTime } = conditionValue;
        const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
        const startMinutes = this.timeToMinutes(startTime);
        const endMinutes = this.timeToMinutes(endTime);
        return currentTime >= startMinutes && currentTime <= endMinutes;
    }
    evaluateDayOfWeekCondition(conditionValue, context) {
        const allowedDays = conditionValue.days || [];
        const currentDay = new Date().getDay();
        return allowedDays.includes(currentDay);
    }
    evaluateCustomCondition(conditionValue, context) {
        // Implement custom condition evaluation logic
        // This could be a JavaScript function stored in the database
        try {
            const customFunction = new Function('context', conditionValue.function);
            return customFunction(context);
        }
        catch (error) {
            console.error('Error evaluating custom condition:', error);
            return false;
        }
    }
    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    async applyRoutingRules(organizationId, type, context) {
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
    async executeActions(rules, context) {
        const results = [];
        for (const rule of rules) {
            switch (rule.action) {
                case routing_rule_entity_1.RoutingAction.ASSIGN_TO_DEPARTMENT:
                    results.push({
                        action: 'ASSIGN_TO_DEPARTMENT',
                        departmentId: rule.actionValue.departmentId,
                    });
                    break;
                case routing_rule_entity_1.RoutingAction.ASSIGN_TO_USER:
                    results.push({
                        action: 'ASSIGN_TO_USER',
                        userId: rule.actionValue.userId,
                    });
                    break;
                case routing_rule_entity_1.RoutingAction.ESCALATE:
                    results.push({
                        action: 'ESCALATE',
                        level: rule.actionValue.level,
                    });
                    break;
                case routing_rule_entity_1.RoutingAction.NOTIFY:
                    results.push({
                        action: 'NOTIFY',
                        recipients: rule.actionValue.recipients,
                        message: rule.actionValue.message,
                    });
                    break;
                case routing_rule_entity_1.RoutingAction.AUTO_REPLY:
                    results.push({
                        action: 'AUTO_REPLY',
                        message: rule.actionValue.message,
                    });
                    break;
            }
        }
        return results;
    }
};
RoutingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(routing_rule_entity_1.RoutingRule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        departments_service_1.DepartmentsService])
], RoutingService);
exports.RoutingService = RoutingService;
//# sourceMappingURL=routing.service.js.map