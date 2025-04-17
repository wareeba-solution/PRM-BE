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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const family_service_1 = require("../services/family.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const user_entity_1 = require("../../users/entities/user.entity");
let FamilyController = class FamilyController {
    constructor(familyService) {
        this.familyService = familyService;
    }
    async createFamily(user, data) {
        return this.familyService.createFamily(user.organizationId, user.tenantId, user.id, data.primaryPatient, data.familyMembers);
    }
    async addFamilyMember(user, familyId, data) {
        return this.familyService.addFamilyMember(user.organizationId, user.tenantId, user.id, familyId, data.contact, data.relationshipType, {
            isLegalGuardian: data.isLegalGuardian,
            hasMedicalDecisionAuthority: data.hasMedicalDecisionAuthority,
            permissions: data.permissions,
        });
    }
    async getFamilyMembers(user, familyId) {
        return this.familyService.getFamilyMembers(familyId, user.organizationId);
    }
    async getPrimaryPatient(user, familyId) {
        return this.familyService.getPrimaryPatient(familyId, user.organizationId);
    }
    async updateFamilyRelationship(user, familyId, contactId, relatedContactId, updates) {
        return this.familyService.updateFamilyRelationship(user.organizationId, familyId, contactId, relatedContactId, updates);
    }
    async removeFamilyMember(user, familyId, contactId) {
        return this.familyService.removeFamilyMember(user.organizationId, familyId, contactId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "createFamily", null);
__decorate([
    (0, common_1.Post)(':familyId/members'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('familyId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "addFamilyMember", null);
__decorate([
    (0, common_1.Get)(':familyId/members'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF, role_enum_1.Role.PATIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('familyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyMembers", null);
__decorate([
    (0, common_1.Get)(':familyId/primary-patient'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF, role_enum_1.Role.PATIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('familyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getPrimaryPatient", null);
__decorate([
    (0, common_1.Put)(':familyId/relationships/:contactId/:relatedContactId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('familyId')),
    __param(2, (0, common_1.Param)('contactId')),
    __param(3, (0, common_1.Param)('relatedContactId')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateFamilyRelationship", null);
__decorate([
    (0, common_1.Delete)(':familyId/members/:contactId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('familyId')),
    __param(2, (0, common_1.Param)('contactId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "removeFamilyMember", null);
FamilyController = __decorate([
    (0, common_1.Controller)('/families'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
exports.FamilyController = FamilyController;
//# sourceMappingURL=family.controller.js.map