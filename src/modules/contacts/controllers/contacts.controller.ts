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
    HttpStatus,
    ParseUUIDPipe,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator'; // Ensure this path is correct or update it to the correct path
import { Role } from '../../users/enums/role.enum';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactQueryDto } from '../dto/contact-query.dto';
import { MergeContactsDto } from '../dto/merge-contacts.dto';
import { Contact } from '../entities/contact.entity';
import { CustomRequest } from '../../../interfaces/request.interface';

@Controller('contacts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.STAFF)
    async create(
        @Body() createContactDto: CreateContactDto,
        @Request() req: CustomRequest,
    ): Promise<Contact> {
        return this.contactsService.create({
            ...createContactDto,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            createdBy: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Get()
    async findAll(
        @Query() query: ContactQueryDto,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.findAll({
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }

    @Get('search')
    async search(
        @Query('q') searchTerm: string,
        @Query() query: ContactQueryDto,
        @Request() req: CustomRequest,
    ) {
        if (!searchTerm || searchTerm.length < 2) {
            throw new BadRequestException('Search term must be at least 2 characters long');
        }

        return this.contactsService.search(searchTerm, {
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ): Promise<Contact> {
        if (!req.organization?.id) {
            throw new BadRequestException('Organization ID is required');
        }
        const contact = await this.contactsService.findOne(id, req.organization.id);
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
    ): Promise<Contact> {
        return this.contactsService.update(id, {
            ...updateContactDto,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            updatedBy: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ): Promise<void> {
        if (!req.organization?.id) {
            throw new BadRequestException('Organization ID is required');
        }
        await this.contactsService.remove(id, req.organization.id);
    }

    @Post(':id/merge')
    @Roles(Role.ADMIN)
    async merge(
        @Param('id', ParseUUIDPipe) primaryId: string,
        @Body() mergeContactsDto: MergeContactsDto,
        @Request() req: CustomRequest,
    ): Promise<Contact> {
        return this.contactsService.merge(primaryId, mergeContactsDto.secondaryContactId, {
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Get(':id/relationships')
    async getRelationships(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: CustomRequest,
    ) {
        if (!req.organization?.id) {
            throw new BadRequestException('Organization ID is required');
        }
        return this.contactsService.getRelationships(id, req.organization.id);
    }

    @Post(':id/relationships')
    @Roles(Role.ADMIN, Role.STAFF)
    async addRelationship(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() relationshipDto: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.addRelationship(id, relationshipDto, {
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Get(':id/medical-history')
    async getMedicalHistory(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.getMedicalHistory(id, {
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }

    // Comment out or implement getAppointments method in ContactsService
    /*
    @Get(':id/appointments')
    async getAppointments(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.getAppointments(id, {
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }
    */

    @Get(':id/documents')
    async getDocuments(
        @Param('id', ParseUUIDPipe) id: string,
        @Query() query: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.getDocuments(id, {
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }

    @Post(':id/documents')
    @Roles(Role.ADMIN, Role.STAFF)
    async addDocument(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() documentDto: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.addDocument(id, documentDto, {
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Get('statistics/summary')
    @Roles(Role.ADMIN)
    async getStatistics(
        @Query() query: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.getStatistics({
            ...query,
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
        });
    }

    @Post('import')
    @Roles(Role.ADMIN)
    async importContacts(
        @Body() importDto: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.importContacts(importDto, {
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }

    @Post('export')
    @Roles(Role.ADMIN)
    async exportContacts(
        @Body() exportDto: any,
        @Request() req: CustomRequest,
    ) {
        return this.contactsService.exportContacts(exportDto, {
            organizationId: req.organization?.id ?? (() => { throw new BadRequestException('Organization ID is required'); })(),
            userId: req.user?.id ?? (() => { throw new BadRequestException('User ID is required'); })(),
        });
    }
}