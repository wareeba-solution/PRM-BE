// src/modules/appointments/controllers/appointments.controller.ts

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
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { CalendarEvent } from '../interfaces/calendar-event.interface';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    async create(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        return this.appointmentsService.create({
            ...createAppointmentDto,
            organizationId: req.user.organizationId,
            createdBy: req.user.id,
        });
    }

    @Get()
    async findAll(
        @Request() req,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('doctorId') doctorId?: string,
        @Query('patientId') patientId?: string,
        @Query('status') status?: AppointmentStatus[],
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.appointmentsService.findAll({
            organizationId: req.user.organizationId,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            doctorId,
            patientId,
            status,
            page,
            limit,
        });
    }

    @Get(':id')
    async findOne(@Request() req, @Param('id') id: string): Promise<Appointment> {
        return this.appointmentsService.findOne(id, req.user.organizationId);
    }

    @Put(':id')
    async update(
        @Request() req,
        @Param('id') id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ): Promise<Appointment> {
        return this.appointmentsService.update(id, {
            ...updateAppointmentDto,
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }

    @Post(':id/cancel')
    async cancel(
        @Request() req,
        @Param('id') id: string,
        @Body('reason') reason: string,
    ): Promise<Appointment> {
        return this.appointmentsService.cancel(id, {
            reason,
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }

    @Post(':id/reschedule')
    async reschedule(
        @Request() req,
        @Param('id') id: string,
        @Body() data: { startTime: Date; endTime: Date; reason: string },
    ): Promise<Appointment> {
        return this.appointmentsService.reschedule(id, {
            ...data,
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }

    @Post(':id/confirm')
    async confirm(@Request() req, @Param('id') id: string): Promise<Appointment> {
        return this.appointmentsService.confirm(id, {
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }

    @Post(':id/complete')
    async complete(@Request() req, @Param('id') id: string): Promise<Appointment> {
        return this.appointmentsService.complete(id, {
            organizationId: req.user.organizationId,
            updatedBy: req.user.id,
        });
    }

    @Delete(':id')
    async remove(@Request() req, @Param('id') id: string): Promise<void> {
        return this.appointmentsService.remove(id, req.user.organizationId);
    }

    @Get('calendar/events')
    async getCalendarEvents(
        @Request() req,
        @Query('start') start: string,
        @Query('end') end: string,
    ): Promise<CalendarEvent[]> {
        return this.appointmentsService.getCalendarEvents(
            req.user.organizationId,
            new Date(start),
            new Date(end),
        );
    }

    @Get('available-slots')
    async getAvailableSlots(
        @Request() req,
        @Query('doctorId') doctorId: string,
        @Query('date') date: string,
    ): Promise<{ startTime: string; endTime: string }[]> {
        return this.appointmentsService.getAvailableSlots(
            doctorId,
            req.user.organizationId,
            new Date(date),
        );
    }

    @Get('check-availability')
    async checkAvailability(
        @Request() req,
        @Query('doctorId') doctorId: string,
        @Query('date') date: string,
        @Query('startTime') startTime: string,
        @Query('endTime') endTime: string,
    ): Promise<boolean> {
        return this.appointmentsService.checkAvailability(
            doctorId,
            req.user.organizationId,
            new Date(date),
            startTime,
            endTime,
        );
    }

    @Get('statistics')
    async getStatistics(
        @Request() req,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('doctorId') doctorId?: string,
    ) {
        return this.appointmentsService.getStatistics({
            organizationId: req.user.organizationId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            doctorId,
        });
    }
} 