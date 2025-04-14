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
    Patch,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TicketSource } from '../enums/ticket-source.enum';
import { TicketCategory } from '../enums/ticket-category.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { OrganizationGuard } from '../../organizations/guards/organization.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CreateTicketCommentDto } from '../dto/ticket-comment.dto';
import { BulkTicketAssignmentDto } from '../dto/ticket-assignment.dto';
import { TicketQueryDto } from '../dto/ticket-query.dto';
import { OrganizationRequest } from '../../../interfaces/request.interface';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketComment } from '../entities/ticket-comment.entity';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { TicketActivityType } from '../enums/ticket-activity-type.enum';

import { Express } from 'express';

import { TicketStatus, TicketType } from '../enums/ticket.enums';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
        private readonly dataSource: DataSource
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new ticket' })
    @ApiResponse({ status: 201, description: 'Ticket created successfully', type: Ticket })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async create(
        @Body() ticketDto: CreateTicketDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        try {
            // Process frontend fields
            if (!ticketDto.title && ticketDto.subject) {
                ticketDto.title = ticketDto.subject;
            }

            if (ticketDto.patient && !ticketDto.patientId) {
                ticketDto.patientId = ticketDto.patient;
            }

            if (ticketDto.tagTeamMembers?.length > 0 && !ticketDto.assignedToId) {
                ticketDto.assignedToId = ticketDto.tagTeamMembers[0];
            }

            if (ticketDto.tagTeamMembers) {
                ticketDto.tags = [...(ticketDto.tags || []), ...ticketDto.tagTeamMembers];
            }

            const organizationId = req.organization?.id || user.organizationId;

            // Execute direct database query to create ticket
            const queryResult = await this.dataSource.query(`
            INSERT INTO tickets 
            ("organizationId", title, description, status, "createdById", "assigneeId")
            VALUES 
            ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [
                organizationId,
                ticketDto.title,
                ticketDto.description || '',
                'OPEN',
                user.id,
                ticketDto.assignedToId || null
            ]);

            // Create activity with the correct column names
            try {
                await this.dataSource.query(`
                INSERT INTO ticket_activities
                ("ticketId", "organizationId", "userId", action, description, metadata, "createdAt")
                VALUES
                ($1, $2, $3, $4, $5, $6, NOW())
            `, [
                    queryResult[0].id,
                    organizationId,
                    user.id,
                    'CREATED', // action field
                    'Ticket created', // description field
                    JSON.stringify({ source: 'web' }) // metadata field
                ]);
            } catch (activityError) {
                console.warn('Could not create activity record:', activityError);
                // Continue even if activity creation fails
            }

            return queryResult[0];
        } catch (error) {
            console.error('Ticket creation failed:', error);
            throw new BadRequestException('Failed to create ticket: ' + error.message);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all tickets with pagination and filtering' })
    @ApiResponse({ status: 200, description: 'Returns paginated tickets', type: Pagination<Ticket> })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    // @ApiQuery({ name: 'organizationId', required: true, type: String })
    @ApiQuery({ name: 'status', required: false, isArray: true, enum: Object.values(TicketStatus) })
    @ApiQuery({ name: 'type', required: false, enum: Object.values(TicketType) })
    @ApiQuery({ name: 'assigneeId', required: false, type: String })
    @ApiQuery({ name: 'contactId', required: false, type: String })
    @ApiQuery({ name: 'departmentId', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'startDate', required: false, type: Date })
    @ApiQuery({ name: 'endDate', required: false, type: Date })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    findAll(@Query() query: TicketQueryDto, @Request() req: OrganizationRequest, @CurrentUser() user: User) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.findAll({
            ...query,
            organizationId,
        });
    }

    @Get('metrics')
    @ApiOperation({ summary: 'Get ticket metrics for the organization' })
    @ApiResponse({ status: 200, description: 'Returns ticket metrics' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getTicketMetrics(@Request() req: OrganizationRequest, @CurrentUser() user: User) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.getTicketMetrics(organizationId);
    }

    @Get('assigned')
    @ApiOperation({ summary: 'Get tickets assigned to the current user' })
    @ApiResponse({ status: 200, description: 'Returns assigned tickets', type: Pagination<Ticket> })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiQuery({ name: 'organizationId', required: true, type: String })
    @ApiQuery({ name: 'status', required: false, isArray: true, enum: Object.values(TicketStatus) })
    @ApiQuery({ name: 'type', required: false, enum: Object.values(TicketType) })
    @ApiQuery({ name: 'contactId', required: false, type: String })
    @ApiQuery({ name: 'departmentId', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'startDate', required: false, type: Date })
    @ApiQuery({ name: 'endDate', required: false, type: Date })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    getAssignedTickets(
        @Query() query: TicketQueryDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.getAssignedTickets({
            ...query,
            organizationId,
            userId: user.id,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific ticket by ID' })
    @ApiResponse({ status: 200, description: 'Returns the ticket', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findOne(@Param('id') id: string, @Request() req: OrganizationRequest, @CurrentUser() user: User) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.findOne(id, organizationId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket updated successfully', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    update(
        @Param('id') id: string,
        @Body() updateTicketDto: UpdateTicketDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.update(id, {
            ...updateTicketDto,
            organizationId,
            updatedBy: user.id,
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket deleted successfully' })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string, @Request() req: OrganizationRequest, @CurrentUser() user: User) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.remove(id, organizationId);
    }

    @Post(':id/comments')
    @ApiOperation({ summary: 'Add a comment to a ticket' })
    @ApiResponse({ status: 201, description: 'Comment added successfully', type: TicketComment })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    addComment(
        @Param('id') id: string,
        @Body() createCommentDto: CreateTicketCommentDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.addComment(id, {
            ...createCommentDto,
            organizationId,
            userId: user.id,
        });
    }

    @Post('bulk-assign')
    @ApiOperation({ summary: 'Bulk assign tickets to users' })
    @ApiResponse({ status: 200, description: 'Tickets assigned successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    bulkAssignTickets(
        @Body() bulkAssignmentDto: BulkTicketAssignmentDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.bulkAssignTickets({
            ...bulkAssignmentDto,
            organizationId,
            assignedBy: user.id,
        });
    }

    @Post(':id/attachments')
    @ApiOperation({ summary: 'Upload an attachment to a ticket' })
    @ApiResponse({ status: 201, description: 'Attachment uploaded successfully', type: TicketAttachment })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 400, description: 'Invalid file' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor as any)
    uploadAttachment(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/ }),
                ],
            }),
        )
        file: any,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.uploadAttachment(id, file, organizationId, user.id);
    }

    @Get(':id/activities')
    @ApiOperation({ summary: 'Get ticket activities' })
    @ApiResponse({ status: 200, description: 'Returns ticket activities', type: [TicketActivity] })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getTicketActivities(@Param('id') id: string, @Request() req: OrganizationRequest, @CurrentUser() user: User) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.getTicketActivities(id, organizationId);
    }

    @Post(':id/reopen')
    @ApiOperation({ summary: 'Reopen a closed ticket' })
    @ApiResponse({ status: 200, description: 'Ticket reopened successfully', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    reopenTicket(
        @Param('id') id: string,
        @Body() data: { reason: string },
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.reopenTicket(id, {
            reason: data.reason,
            organizationId,
            reopenedBy: user.id,
        });
    }

    @Post(':id/escalate')
    @ApiOperation({ summary: 'Escalate a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket escalated successfully', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    escalateTicket(
        @Param('id') id: string,
        @Body() data: { reason: string },
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.escalateTicket(id, {
            reason: data.reason,
            organizationId,
            escalatedBy: user.id,
        });
    }

    @Post(':id/resolve')
    @ApiOperation({ summary: 'Resolve a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket resolved successfully', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    resolveTicket(
        @Param('id') id: string,
        @Body() data: { resolution: string },
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        const organizationId = req.organization?.id || user.organizationId;
        return this.ticketsService.resolveTicket(id, {
            resolution: data.resolution,
            organizationId,
            resolvedBy: user.id,
        });
    }
}