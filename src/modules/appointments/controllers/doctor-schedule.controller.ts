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
  BadRequestException,
  NotFoundException,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { DoctorScheduleService } from '../services/doctor-schedule.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { CreateExceptionDto } from '../dto/create-exception.dto';
import { CustomRequest } from '../../../interfaces/request.interface';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { ScheduleException } from '../entities/schedule-exception.entity';

@Controller('doctors/schedules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorScheduleController {
  private readonly logger = new Logger(DoctorScheduleController.name);

  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Post()
  @Roles(Role.ADMIN, Role.DOCTOR)
  async create(
      @Body() createScheduleDto: CreateScheduleDto,
      @Request() req: CustomRequest,
  ): Promise<DoctorSchedule> {
    this.logger.debug(`Request received with body: ${JSON.stringify(createScheduleDto)}`);

    if (!req.user || !req.organization) {
      this.logger.error('Authentication data missing from request');
      throw new BadRequestException('Authentication data missing');
    }

    try {
      // Use direct database insertion to bypass TypeORM's entity mapper
      return await this.doctorScheduleService.createScheduleDirectly({
        doctorId: createScheduleDto.doctorId,
        organizationId: req.organization.id,
        dayOfWeek: createScheduleDto.dayOfWeek,
        workStart: createScheduleDto.workStart,
        workEnd: createScheduleDto.workEnd,
        breakStart: createScheduleDto.breakStart,
        breakEnd: createScheduleDto.breakEnd,
        slotDuration: createScheduleDto.defaultAppointmentDuration,
        isActive: createScheduleDto.isActive ?? true,
        createdById: req.user.id,
        metadata: createScheduleDto.settings
      });
    } catch (error) {
      this.logger.error(`Failed to create schedule: ${error.message}`);
      throw new BadRequestException(`Failed to create schedule: ${error.message}`);
    }
  }

  @Get('doctor/:doctorId')
  async getDoctorSchedules(
      @Param('doctorId', ParseUUIDPipe) doctorId: string,
      @Request() req: CustomRequest,
  ): Promise<DoctorSchedule[]> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    return this.doctorScheduleService.getDoctorSchedules(doctorId, req.organization.id);
  }

  @Get('date')
  async getScheduleForDate(
      @Query('doctorId', ParseUUIDPipe) doctorId: string,
      @Query('date') dateString: string,
      @Request() req: CustomRequest,
  ): Promise<DoctorSchedule> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const schedule = await this.doctorScheduleService.getDoctorScheduleForDate(
        doctorId,
        date,
        req.organization.id,
    );

    if (!schedule) {
      throw new NotFoundException('No schedule found for the specified date');
    }

    return schedule;
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateScheduleDto: UpdateScheduleDto,
      @Request() req: CustomRequest,
  ): Promise<DoctorSchedule> {
    if (!req.user || !req.organization) {
      throw new BadRequestException('Authentication data missing');
    }

    // Get existing schedule
    const schedule = await this.getScheduleById(id, req.organization.id);

    // Prepare update data
    const updateData: any = {
      updatedById: req.user.id
    };

    // Add fields that are present in the DTO
    if (updateScheduleDto.dayOfWeek !== undefined) {
      updateData.dayOfWeek = updateScheduleDto.dayOfWeek;
    }

    if (updateScheduleDto.workStart) {
      updateData.workStart = updateScheduleDto.workStart;  // Pass time as string
    }

    if (updateScheduleDto.workEnd) {
      updateData.workEnd = updateScheduleDto.workEnd;      // Pass time as string
    }

    if (updateScheduleDto.breakStart) {
      updateData.breakStart = updateScheduleDto.breakStart;  // Pass time as string
    }

    if (updateScheduleDto.breakEnd) {
      updateData.breakEnd = updateScheduleDto.breakEnd;      // Pass time as string
    }

    if (updateScheduleDto.defaultAppointmentDuration) {
      updateData.slotDuration = updateScheduleDto.defaultAppointmentDuration;
    }

    if (updateScheduleDto.isActive !== undefined) {
      updateData.isActive = updateScheduleDto.isActive;
    }

    if (updateScheduleDto.settings) {
      updateData.metadata = { ...updateScheduleDto.settings };
    }

    // Merge existing schedule with updates
    return this.doctorScheduleService.createOrUpdateSchedule({
      ...schedule,
      ...updateData,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async remove(
      @Param('id', ParseUUIDPipe) id: string,
      @Request() req: CustomRequest,
  ): Promise<void> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    const schedule = await this.getScheduleById(id, req.organization.id);

    await this.doctorScheduleService.createOrUpdateSchedule({
      ...schedule,
      isActive: false,
      updatedById: req.user.id,
    });
  }

  // Helper method to get a schedule by ID
  private async getScheduleById(id: string, organizationId: string): Promise<DoctorSchedule> {
    try {
      const doctorSchedules = await this.doctorScheduleService.getDoctorSchedules(
          'any', // This is a workaround until a findById method is implemented
          organizationId,
      );

      const schedule = doctorSchedules.find((s) => s.id === id);

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      return schedule;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to get schedule');
    }
  }

  @Post('exceptions')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async createException(
      @Body() createExceptionDto: CreateExceptionDto,
      @Request() req: CustomRequest,
  ): Promise<ScheduleException> {
    if (!req.user || !req.organization) {
      throw new BadRequestException('Authentication data missing');
    }

    // Create an explicitly typed object
    const exceptionData: any = {
      doctorId: createExceptionDto.doctorId,
      organizationId: req.organization.id,
      createdBy: req.user.id,
      startDate: new Date(createExceptionDto.startDate),
      endDate: new Date(createExceptionDto.endDate),
      isFullDay: createExceptionDto.isFullDay,
      type: createExceptionDto.type,
      reason: createExceptionDto.reason
    };

    // Add optional time fields if they exist
    if (createExceptionDto.startTime) {
      exceptionData.startTime = createExceptionDto.startTime;
    }

    if (createExceptionDto.endTime) {
      exceptionData.endTime = createExceptionDto.endTime;
    }

    return this.doctorScheduleService.createException(exceptionData);
  }

  @Get('exceptions/doctor/:doctorId')
  async getDoctorExceptions(
      @Param('doctorId', ParseUUIDPipe) doctorId: string,
      @Request() req: CustomRequest,
  ): Promise<ScheduleException[]> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    return this.doctorScheduleService.getDoctorExceptions(doctorId, req.organization.id);
  }

  @Delete('exceptions/:id')
  @Roles(Role.ADMIN, Role.DOCTOR)
  async removeException(
      @Param('id', ParseUUIDPipe) id: string,
      @Request() req: CustomRequest,
  ): Promise<void> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    await this.doctorScheduleService.deleteException(id, req.organization.id);
  }

  @Get('check-availability')
  async checkAvailability(
      @Query('doctorId', ParseUUIDPipe) doctorId: string,
      @Query('startTime') startTimeString: string,
      @Query('endTime') endTimeString: string,
      @Request() req: CustomRequest,
  ): Promise<{ available: boolean }> {
    if (!req.organization) {
      throw new BadRequestException('Organization information missing');
    }

    const startTime = new Date(startTimeString);
    const endTime = new Date(endTimeString);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const isAvailable = await this.doctorScheduleService.checkAvailability({
      doctorId,
      startTime,
      endTime,
    });

    return { available: isAvailable };
  }
}