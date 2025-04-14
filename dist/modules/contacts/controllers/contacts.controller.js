"use strict";
// src/modules/contacts/controllers/contacts.controller.ts
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
var ContactsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../users/enums/role.enum");
const contacts_service_1 = require("../services/contacts.service");
const create_contact_dto_1 = require("../dto/create-contact.dto");
const update_contact_dto_1 = require("../dto/update-contact.dto");
const contact_query_dto_1 = require("../dto/contact-query.dto");
const merge_contacts_dto_1 = require("../dto/merge-contacts.dto");
let ContactsController = ContactsController_1 = class ContactsController {
    constructor(contactsService) {
        this.contactsService = contactsService;
        this.logger = new common_1.Logger(ContactsController_1.name);
    }
    async create(createContactDto, req, headerOrgId, tenantId) {
        var _a, _b, _c, _d;
        this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
        this.logger.debug(`Request organization: ${JSON.stringify(req.organization)}`);
        // Workaround: If req.organization is missing but req.user has organizationId, use it directly
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        // Get tenant ID from header or user object
        const contactTenantId = tenantId || ((_d = req.user) === null || _d === void 0 ? void 0 : _d.tenantId);
        if (!contactTenantId) {
            throw new common_1.BadRequestException('Tenant ID is required');
        }
        return this.contactsService.create(Object.assign(Object.assign({}, createContactDto), { organizationId: organizationId, tenantId: contactTenantId, createdBy: req.user.id }));
    }
    async findAll(query, req, headerOrgId) {
        var _a, _b;
        // Try multiple sources for the organization ID
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.findAll(Object.assign(Object.assign({}, query), { organizationId: organizationId }));
    }
    async search(searchTerm, query, req, headerOrgId) {
        var _a, _b;
        if (!searchTerm || searchTerm.length < 2) {
            throw new common_1.BadRequestException('Search term must be at least 2 characters long');
        }
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.search(searchTerm, Object.assign(Object.assign({}, query), { organizationId: organizationId }));
    }
    async findOne(id, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        const contact = await this.contactsService.findOne(id, organizationId);
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contact;
    }
    async update(id, updateContactDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.update(id, Object.assign(Object.assign({}, updateContactDto), { organizationId: organizationId, updatedBy: req.user.id }));
    }
    async remove(id, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        await this.contactsService.remove(id, organizationId);
    }
    async merge(primaryId, mergeContactsDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.merge(primaryId, mergeContactsDto.secondaryContactId, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
    async getRelationships(id, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.getRelationships(id, organizationId);
    }
    async addRelationship(id, relationshipDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.addRelationship(id, relationshipDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
    async getMedicalHistory(id, query, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.getMedicalHistory(id, Object.assign(Object.assign({}, query), { organizationId: organizationId }));
    }
    async getDocuments(id, query, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.getDocuments(id, Object.assign(Object.assign({}, query), { organizationId: organizationId }));
    }
    async addDocument(id, documentDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.addDocument(id, documentDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
    async getStatistics(query, req, headerOrgId) {
        var _a, _b;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.contactsService.getStatistics(Object.assign(Object.assign({}, query), { organizationId: organizationId }));
    }
    async importContacts(importDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.importContacts(importDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
    async exportContacts(exportDto, req, headerOrgId) {
        var _a, _b, _c;
        const organizationId = ((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.organizationId) || headerOrgId;
        if (!organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        if (!((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.contactsService.exportContacts(exportDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __param(3, (0, common_1.Headers)('X-Tenant-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto, Object, String, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_query_dto_1.ContactQueryDto, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_query_dto_1.ContactQueryDto, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_dto_1.UpdateContactDto, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/merge'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, merge_contacts_dto_1.MergeContactsDto, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "merge", null);
__decorate([
    (0, common_1.Get)(':id/relationships'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getRelationships", null);
__decorate([
    (0, common_1.Post)(':id/relationships'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "addRelationship", null);
__decorate([
    (0, common_1.Get)(':id/medical-history'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getMedicalHistory", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "addDocument", null);
__decorate([
    (0, common_1.Get)('statistics/summary'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "importContacts", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('X-Organization-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "exportContacts", null);
ContactsController = ContactsController_1 = __decorate([
    (0, common_1.Controller)('contacts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsController);
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map