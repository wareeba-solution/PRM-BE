// src/modules/contacts/controllers/contacts.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
    Logger,
    HttpStatus,
    ParseUUIDPipe,
    NotFoundException,
    BadRequestException,
    Headers
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactQueryDto } from '../dto/contact-query.dto';
import { MergeContactsDto } from '../dto/merge-contacts.dto';
import { Contact } from '../entities/contact.entity';
import { CustomRequest } from '@/interfaces/request.interface';

@Controller('contacts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactsController {

    private readonly logger = new Logger(ContactsController.name);
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.STAFF)
    async create(
        @Body() createContactDto: CreateContactDto,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
        @Headers('X-Tenant-ID') tenantId?: string,
    ): Promise<Contact> {
        this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);
        this.logger.debug(`Request organization: ${JSON.stringify(req.organization)}`);

        // Workaround: If req.organization is missing but req.user has organizationId, use it directly
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        // Get tenant ID from header or user object
        const contactTenantId = tenantId || req.user?.tenantId;
        if (!contactTenantId) {
            throw new BadRequestException('Tenant ID is required');
        }

        return this.contactsService.create({
            ...createContactDto,
            organizationId: organizationId,
            tenantId: contactTenantId,
            createdBy: req.user.id,
        });
    }

    @Get()
    async findAll(
        @Query() query: ContactQueryDto,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        // Try multiple sources for the organization ID
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.findAll({
            ...query,
            organizationId: organizationId,
        });
    }

    @Get('search')
    async search(
        @Query('q') searchTerm: string,
        @Query() query: ContactQueryDto,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        if (!searchTerm || searchTerm.length < 2) {
            throw new BadRequestException('Search term must be at least 2 characters long');
        }

        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.search(searchTerm, {
            ...query,
            organizationId: organizationId,
        });
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ): Promise<Contact> {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        const contact = await this.contactsService.findOne(id, organizationId);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return contact;
    }

    @Put(':id')
    @Roles(Role.ADMIN, Role.STAFF)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateContactDto: UpdateContactDto,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ): Promise<Contact> {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.update(id, {
            ...updateContactDto,
            organizationId: organizationId,
            updatedBy: req.user.id,
        });
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ): Promise<void> {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        await this.contactsService.remove(id, organizationId);
    }

    @Post(':id/merge')
    @Roles(Role.ADMIN)
    async merge(
        @Param('id', ParseUUIDPipe) primaryId: string,
        @Body() mergeContactsDto: MergeContactsDto,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ): Promise<Contact> {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.merge(primaryId, mergeContactsDto.secondaryContactId, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }

    @Get(':id/relationships')
    async getRelationships(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.getRelationships(id, organizationId);
    }

    @Post(':id/relationships')
    @Roles(Role.ADMIN, Role.STAFF)
    async addRelationship(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() relationshipDto: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.addRelationship(id, relationshipDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }

    @Get(':id/medical-history')
    async getMedicalHistory(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.getMedicalHistory(id, {
            ...query,
            organizationId: organizationId,
        });
    }

    @Get(':id/documents')
    async getDocuments(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.getDocuments(id, {
            ...query,
            organizationId: organizationId,
        });
    }

    @Post(':id/documents')
    @Roles(Role.ADMIN, Role.STAFF)
    async addDocument(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() documentDto: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.addDocument(id, documentDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }

    @Get('statistics/summary')
    @Roles(Role.ADMIN)
    async getStatistics(
        @Query() query: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        return this.contactsService.getStatistics({
            ...query,
            organizationId: organizationId,
        });
    }

    @Post('import')
    @Roles(Role.ADMIN)
    async importContacts(
        @Body() importDto: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.importContacts(importDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }

    @Post('export')
    @Roles(Role.ADMIN)
    async exportContacts(
        @Body() exportDto: any,
        @Request() req: CustomRequest,
        @Headers('X-Organization-ID') headerOrgId?: string,
    ) {
        const organizationId = req.organization?.id || req.user?.organizationId || headerOrgId;

        if (!organizationId) {
            throw new BadRequestException('Organization ID is required');
        }

        if (!req.user?.id) {
            throw new BadRequestException('User ID is required');
        }

        return this.contactsService.exportContacts(exportDto, {
            organizationId: organizationId,
            userId: req.user.id,
        });
    }
}