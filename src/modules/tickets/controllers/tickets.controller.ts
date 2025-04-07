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
import { OrganizationGuard } from '../../../common/guards/organization.guard'; // Adjusted path
import { Roles } from '../../../common/decorators/roles.decorator'; // Adjusted path
import { Role } from '../../users/enums/role.enum';
import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CreateTicketCommentDto } from '../dto/ticket-comment.dto';
import { TicketAssignmentDto } from '../dto/ticket-assignment.dto';
import { TicketQueryDto } from '../dto/ticket-query.dto';
import { OrganizationRequest } from '../../../interfaces/request.interface'; // Adjusted path

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard, OrganizationGuard) // Added OrganizationGuard
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    async create(
        @Body() createTicketDto: CreateTicketDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.create({
            ...createTicketDto,
            organizationId: req.organization.id,
            createdBy: req.user.id,
        });
    }

    @Get()
    async findAll(
        @Query() query: TicketQueryDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.findAll({
            ...query,
            organizationId: req.organization.id,
        });
    }

    @Get('dashboard')
    async getDashboard(
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.getDashboard(req.organization.id);
    }

    @Get('assigned')
    async getAssignedTickets(
        @Query() query: TicketQueryDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.getAssignedTickets({
            ...query,
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: OrganizationRequest,
    ) {
        const ticket = await this.ticketsService.findOne(id, req.organization.id);
        if (!ticket) {
            throw new NotFoundException('Ticket not found');
        }
        return ticket;
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTicketDto: UpdateTicketDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.update(id, {
            ...updateTicketDto,
            organizationId: req.organization.id,
            updatedBy: req.user.id,
        });
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: OrganizationRequest,
    ) {
        await this.ticketsService.remove(id, req.organization.id);
    }

    @Post(':id/comments')
    async addComment(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() commentDto: CreateTicketCommentDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.addComment(id, {
            ...commentDto,
            organizationId: req.organization.id,
            userId: req.user.id,
        });
    }

    @Put(':id/assign')
    @Roles(Role.ADMIN, Role.STAFF)
    async assignTicket(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() assignmentDto: TicketAssignmentDto,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.assignTicket(id, {
            ...assignmentDto,
            organizationId: req.organization.id,
            assignedBy: req.user.id,
            ticketIds: [id],
        });
    }

    @Post(':id/escalate')
    @Roles(Role.ADMIN, Role.STAFF)
    async escalateTicket(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('reason') reason: string,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.escalateTicket(id, {
            reason,
            organizationId: req.organization.id,
            escalatedBy: req.user.id,
        });
    }

    @Post(':id/resolve')
    async resolveTicket(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('resolution') resolution: string,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.resolveTicket(id, {
            resolution,
            organizationId: req.organization.id,
            resolvedBy: req.user.id,
        });
    }

    @Post(':id/reopen')
    async reopenTicket(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('reason') reason: string,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.reopenTicket(id, {
            reason,
            organizationId: req.organization.id,
            reopenedBy: req.user.id,
        });
    }


    @Get(':id/timeline')
    async getTimeline(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.getTimeline(id, req.organization.id);
    }

    @Get(':id/related')
    async getRelatedTickets(
        @Param('id', ParseUUIDPipe) id: string,
        @Request() req: OrganizationRequest,
    ) {
        return this.ticketsService.getRelatedTickets(id, req.organization.id);
    }
}