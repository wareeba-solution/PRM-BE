import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Appointment DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class AppointmentDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this appointment belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'ID of the patient/contact for this appointment',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  contactId: string;

  @ApiProperty({
    description: 'ID of the doctor/provider for this appointment',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  doctorId: string;

  @ApiProperty({
    description: 'Title or subject of the appointment',
    example: 'Annual Check-up'
  })
  title: string;

  @ApiProperty({
    description: 'Notes or description for the appointment',
    example: 'Regular annual physical examination with blood work',
    required: false,
    nullable: true
  })
  notes?: string;

  @ApiProperty({
    description: 'Start time of the appointment',
    example: '2023-05-15T10:00:00.000Z',
    format: 'date-time'
  })
  startTime: Date;

  @ApiProperty({
    description: 'End time of the appointment',
    example: '2023-05-15T11:00:00.000Z',
    format: 'date-time'
  })
  endTime: Date;

  @ApiProperty({
    description: 'Status of the appointment',
    example: 'scheduled',
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show']
  })
  status: string;

  @ApiProperty({
    description: 'Type of appointment',
    example: 'in-person',
    enum: ['in-person', 'video', 'phone']
  })
  type: string;

  @ApiProperty({
    description: 'Location of the appointment',
    example: 'Main Office - Room 305',
    required: false,
    nullable: true
  })
  location?: string;

  @ApiProperty({
    description: 'Whether reminders have been sent',
    example: true,
    default: false
  })
  reminderSent: boolean;

  @ApiProperty({
    description: 'When reminders were last sent',
    example: '2023-05-14T10:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  lastReminderSentAt?: Date;

  @ApiProperty({
    description: 'Whether the appointment has been confirmed by the patient',
    example: true,
    default: false
  })
  isConfirmed: boolean;

  @ApiProperty({
    description: 'When the appointment was confirmed',
    example: '2023-05-14T15:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  confirmedAt?: Date;

  @ApiProperty({
    description: 'Whether the appointment has been cancelled',
    example: false,
    default: false
  })
  isCancelled: boolean;

  @ApiProperty({
    description: 'When the appointment was cancelled',
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  cancelledAt?: Date;

  @ApiProperty({
    description: 'ID of the user who cancelled the appointment',
    example: null,
    format: 'uuid',
    required: false,
    nullable: true
  })
  cancelledById?: string;

  @ApiProperty({
    description: 'Reason for cancellation',
    example: 'Patient requested rescheduling',
    required: false,
    nullable: true
  })
  cancellationReason?: string;

  @ApiProperty({
    description: 'Whether the appointment has been completed',
    example: false,
    default: false
  })
  isCompleted: boolean;

  @ApiProperty({
    description: 'When the appointment was marked as completed',
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  completedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who marked the appointment as completed',
    example: null,
    format: 'uuid',
    required: false,
    nullable: true
  })
  completedById?: string;

  @ApiProperty({
    description: 'Additional metadata for the appointment',
    example: {
      insuranceVerified: true,
      preAppointmentFormCompleted: false,
      specialRequirements: 'Wheelchair access needed'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;
}
