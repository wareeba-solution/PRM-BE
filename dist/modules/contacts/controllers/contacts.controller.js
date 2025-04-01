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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, HttpStatus, ParseUUIDPipe, NotFoundException, BadRequestException, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactQueryDto } from '../dto/contact-query.dto';
import { MergeContactsDto } from '../dto/merge-contacts.dto';
let ContactsController = class ContactsController {
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    async create(createContactDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.create(Object.assign(Object.assign({}, createContactDto), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(), createdBy: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })() }));
    }
    async findAll(query, req) {
        var _a, _b;
        return this.contactsService.findAll(Object.assign(Object.assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })() }));
    }
    async search(searchTerm, query, req) {
        var _a, _b;
        if (!searchTerm || searchTerm.length < 2) {
            throw new BadRequestException('Search term must be at least 2 characters long');
        }
        return this.contactsService.search(searchTerm, Object.assign(Object.assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })() }));
    }
    async findOne(id, req) {
        var _a;
        if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new BadRequestException('Organization ID is required');
        }
        const contact = await this.contactsService.findOne(id, req.organization.id);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }
    async update(id, updateContactDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.update(id, Object.assign(Object.assign({}, updateContactDto), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(), updatedBy: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })() }));
    }
    async remove(id, req) {
        var _a;
        if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new BadRequestException('Organization ID is required');
        }
        await this.contactsService.remove(id, req.organization.id);
    }
    async merge(primaryId, mergeContactsDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.merge(primaryId, mergeContactsDto.secondaryContactId, {
            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
    async getRelationships(id, req) {
        var _a;
        if (!((_a = req.organization) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new BadRequestException('Organization ID is required');
        }
        return this.contactsService.getRelationships(id, req.organization.id);
    }
    async addRelationship(id, relationshipDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.addRelationship(id, relationshipDto, {
            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
    async getMedicalHistory(id, query, req) {
        var _a, _b;
        return this.contactsService.getMedicalHistory(id, Object.assign(Object.assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })() }));
    }
    async getDocuments(id, query, req) {
        var _a, _b;
        return this.contactsService.getDocuments(id, Object.assign(Object.assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })() }));
    }
    async addDocument(id, documentDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.addDocument(id, documentDto, {
            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
    async getStatistics(query, req) {
        var _a, _b;
        return this.contactsService.getStatistics(Object.assign(Object.assign({}, query), { organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })() }));
    }
    async importContacts(importDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.importContacts(importDto, {
            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
    async exportContacts(exportDto, req) {
        var _a, _b, _c, _d;
        return this.contactsService.exportContacts(exportDto, {
            organizationId: (_b = (_a = req.organization) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
};
__decorate([
    Post(),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Create new contact' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Contact created successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateContactDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Get all contacts' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return all contacts' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ContactQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findAll", null);
__decorate([
    Get('search'),
    ApiOperation({ summary: 'Search contacts' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return matching contacts' }),
    __param(0, Query('q')),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ContactQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "search", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get contact by id' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return contact details' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Update contact' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Contact updated successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateContactDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Delete contact' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Contact deleted successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "remove", null);
__decorate([
    Post(':id/merge'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Merge contacts' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Contacts merged successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, MergeContactsDto, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "merge", null);
__decorate([
    Get(':id/relationships'),
    ApiOperation({ summary: 'Get contact relationships' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return contact relationships' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getRelationships", null);
__decorate([
    Post(':id/relationships'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Add contact relationship' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Relationship added successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "addRelationship", null);
__decorate([
    Get(':id/medical-history'),
    ApiOperation({ summary: 'Get medical history' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return medical history' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getMedicalHistory", null);
__decorate([
    Get(':id/documents'),
    ApiOperation({ summary: 'Get contact documents' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return contact documents' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Query()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getDocuments", null);
__decorate([
    Post(':id/documents'),
    Roles(Role.ADMIN, Role.STAFF),
    ApiOperation({ summary: 'Add contact document' }),
    ApiResponse({ status: HttpStatus.CREATED, description: 'Document added successfully' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __param(2, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "addDocument", null);
__decorate([
    Get('statistics/summary'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Get contacts statistics' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Return contacts statistics' }),
    __param(0, Query()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "getStatistics", null);
__decorate([
    Post('import'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Import contacts' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Contacts imported successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "importContacts", null);
__decorate([
    Post('export'),
    Roles(Role.ADMIN),
    ApiOperation({ summary: 'Export contacts' }),
    ApiResponse({ status: HttpStatus.OK, description: 'Contacts exported successfully' }),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "exportContacts", null);
ContactsController = __decorate([
    ApiTags('Contacts'),
    Controller('contacts'),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [ContactsService])
], ContactsController);
export { ContactsController };
//# sourceMappingURL=contacts.controller.js.map