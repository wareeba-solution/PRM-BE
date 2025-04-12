"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoutingRuleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_routing_rule_dto_1 = require("./create-routing-rule.dto");
class UpdateRoutingRuleDto extends (0, mapped_types_1.PartialType)(create_routing_rule_dto_1.CreateRoutingRuleDto) {
}
exports.UpdateRoutingRuleDto = UpdateRoutingRuleDto;
//# sourceMappingURL=update-routing-rule.dto.js.map