// src/modules/appointments/appointments.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentsService } from './services/appointments.service';
import { DoctorScheduleService } from './services/doctor-schedule.service';
import { Appointment } from './entities/appointment.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { ScheduleException } from './entities/schedule-exception.entity';
import { User } from '../users/entities/user.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { Department } from '../departments/entities/department.entity';
import { Organization } from '../organizations/entities/organization.entity';

import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { DepartmentsModule } from '../departments/departments.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

export enum AppointmentEventTypes {
  CREATED = 'appointment.created',
  UPDATED = 'appointment.updated',
  CANCELLED = 'appointment.cancelled',
  COMPLETED = 'appointment.completed',
  RESCHEDULED = 'appointment.rescheduled',
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      DoctorSchedule,
      ScheduleException,
      User,
      Contact,
      Department,
      Organization
    ]),
    EventEmitterModule.forRoot(),
    forwardRef(() => UsersModule),
    forwardRef(() => ContactsModule),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => NotificationsModule),
    forwardRef(() => EmailModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, DoctorScheduleService],
  exports: [AppointmentsService, DoctorScheduleService]
})
export class AppointmentsModule {}