import { RoutingService } from '../services/routing.service';
import { CreateRoutingRuleDto } from '../dto/create-routing-rule.dto';
import { UpdateRoutingRuleDto } from '../dto/update-routing-rule.dto';
import { User } from '../../users/entities/user.entity';
export declare class RoutingController {
    private readonly routingService;
    constructor(routingService: RoutingService);
    create(organizationId: string, createRoutingRuleDto: CreateRoutingRuleDto, user: User): Promise<import("../entities/routing-rule.entity").RoutingRule>;
    findAll(organizationId: string, departmentId?: string): Promise<import("../entities/routing-rule.entity").RoutingRule[]>;
    findOne(organizationId: string, id: string): Promise<import("../entities/routing-rule.entity").RoutingRule>;
    update(organizationId: string, id: string, updateRoutingRuleDto: UpdateRoutingRuleDto): Promise<import("../entities/routing-rule.entity").RoutingRule>;
    remove(organizationId: string, id: string): Promise<import("../entities/routing-rule.entity").RoutingRule>;
}
