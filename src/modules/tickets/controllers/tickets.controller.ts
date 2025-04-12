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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketComment } from '../entities/ticket-comment.entity';
import { TicketAttachment } from '../entities/ticket-attachment.entity';
import { TicketActivity } from '../entities/ticket-activity.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Express } from 'express';
import { Multer } from 'multer';
import { TicketStatus, TicketType } from '../enums/ticket.enums';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OrganizationGuard)
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new ticket' })
    @ApiResponse({ status: 201, description: 'Ticket created successfully', type: Ticket })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(
        @Body() createTicketDto: CreateTicketDto,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        return this.ticketsService.create({
            ...createTicketDto,
            organizationId: req.organization.id,
            createdBy: user.id,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all tickets with pagination and filtering' })
    @ApiResponse({ status: 200, description: 'Returns paginated tickets', type: Pagination<Ticket> })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiQuery({ name: 'organizationId', required: true, type: String })
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
    findAll(@Query() query: TicketQueryDto, @Request() req: OrganizationRequest) {
        return this.ticketsService.findAll({
            ...query,
            organizationId: req.organization.id,
        });
    }

    @Get('metrics')
    @ApiOperation({ summary: 'Get ticket metrics for the organization' })
    @ApiResponse({ status: 200, description: 'Returns ticket metrics' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getTicketMetrics(@Request() req: OrganizationRequest) {
        return this.ticketsService.getTicketMetrics(req.organization.id);
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
        return this.ticketsService.getAssignedTickets({
            ...query,
            organizationId: req.organization.id,
            userId: user.id,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific ticket by ID' })
    @ApiResponse({ status: 200, description: 'Returns the ticket', type: Ticket })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findOne(@Param('id') id: string, @Request() req: OrganizationRequest) {
        return this.ticketsService.findOne(id, req.organization.id);
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
        return this.ticketsService.update(id, {
            ...updateTicketDto,
            organizationId: req.organization.id,
            updatedBy: user.id,
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a ticket' })
    @ApiResponse({ status: 200, description: 'Ticket deleted successfully' })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string, @Request() req: OrganizationRequest) {
        return this.ticketsService.remove(id, req.organization.id);
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
        return this.ticketsService.addComment(id, {
            ...createCommentDto,
            organizationId: req.organization.id,
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
        return this.ticketsService.bulkAssignTickets({
            ...bulkAssignmentDto,
            organizationId: req.organization.id,
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
    @UseInterceptors(FileInterceptor('file'))
    uploadAttachment(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/ }),
                ],
            }),
        )
        file: Multer.File,
        @CurrentUser() user: User,
        @Request() req: OrganizationRequest
    ) {
        return this.ticketsService.uploadAttachment(id, file, req.organization.id, user.id);
    }

    @Get(':id/activities')
    @ApiOperation({ summary: 'Get ticket activities' })
    @ApiResponse({ status: 200, description: 'Returns ticket activities', type: [TicketActivity] })
    @ApiResponse({ status: 404, description: 'Ticket not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getTicketActivities(@Param('id') id: string, @Request() req: OrganizationRequest) {
        return this.ticketsService.getTicketActivities(id, req.organization.id);
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
        return this.ticketsService.reopenTicket(id, {
            reason: data.reason,
            organizationId: req.organization.id,
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
        return this.ticketsService.escalateTicket(id, {
            reason: data.reason,
            organizationId: req.organization.id,
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
        return this.ticketsService.resolveTicket(id, {
            resolution: data.resolution,
            organizationId: req.organization.id,
            resolvedBy: user.id,
        });
    }
}