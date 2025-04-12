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
exports.RoutingController = void 0;
const common_1 = require("@nestjs/common");
const routing_service_1 = require("../services/routing.service");
const create_routing_rule_dto_1 = require("../dto/create-routing-rule.dto");
const update_routing_rule_dto_1 = require("../dto/update-routing-rule.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const organization_guard_1 = require("../../organizations/guards/organization.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
let RoutingController = class RoutingController {
    constructor(routingService) {
        this.routingService = routingService;
    }
    create(organizationId, createRoutingRuleDto, user) {
        return this.routingService.create(organizationId, createRoutingRuleDto, user.id);
    }
    findAll(organizationId, departmentId) {
        return this.routingService.findAll(organizationId, departmentId);
    }
    findOne(organizationId, id) {
        return this.routingService.findOne(organizationId, id);
    }
    update(organizationId, id, updateRoutingRuleDto) {
        return this.routingService.update(organizationId, id, updateRoutingRuleDto);
    }
    remove(organizationId, id) {
        return this.routingService.remove(organizationId, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_routing_rule_dto_1.CreateRoutingRuleDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RoutingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Query)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoutingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoutingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_routing_rule_dto_1.UpdateRoutingRuleDto]),
    __metadata("design:returntype", void 0)
], RoutingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoutingController.prototype, "remove", null);
RoutingController = __decorate([
    (0, common_1.Controller)('organizations/:organizationId/routing-rules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, organization_guard_1.OrganizationGuard),
    __metadata("design:paramtypes", [routing_service_1.RoutingService])
], RoutingController);
exports.RoutingController = RoutingController;
//# sourceMappingURL=routing.controller.js.map