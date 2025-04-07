import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Notification DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class NotificationDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this notification belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'User ID this notification is for',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  userId: string;

  @ApiProperty({
    description: 'Title of the notification',
    example: 'New appointment scheduled'
  })
  title: string;

  @ApiProperty({
    description: 'Content of the notification',
    example: 'You have a new appointment scheduled for tomorrow at 10:00 AM.'
  })
  content: string;

  @ApiProperty({
    description: 'Type of notification',
    example: 'APPOINTMENT',
    enum: ['APPOINTMENT', 'MESSAGE', 'TICKET', 'SYSTEM', 'OTHER']
  })
  type: string;

  @ApiProperty({
    description: 'Whether the notification has been read',
    example: false,
    default: false
  })
  isRead: boolean;

  @ApiProperty({
    description: 'When the notification was read',
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  readAt?: Date;

  @ApiProperty({
    description: 'Reference ID related to this notification (e.g., appointment ID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  referenceId?: string;

  @ApiProperty({
    description: 'Reference type for this notification',
    example: 'APPOINTMENT',
    enum: ['APPOINTMENT', 'MESSAGE', 'TICKET', 'USER', 'CONTACT', 'OTHER'],
    required: false,
    nullable: true
  })
  referenceType?: string;

  @ApiProperty({
    description: 'URL to navigate to when clicking on the notification',
    example: '/appointments/550e8400-e29b-41d4-a716-446655440000',
    required: false,
    nullable: true
  })
  actionUrl?: string;

  @ApiProperty({
    description: 'Priority level of the notification',
    example: 'NORMAL',
    enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
    default: 'NORMAL'
  })
  priority: string;

  @ApiProperty({
    description: 'Icon to display with the notification',
    example: 'calendar',
    required: false,
    nullable: true
  })
  icon?: string;

  @ApiProperty({
    description: 'Additional metadata for the notification',
    example: {
      appointmentTime: '2023-05-15T10:00:00.000Z',
      patientName: 'John Doe',
      location: 'Main Office'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Channels this notification was sent through',
    example: ['APP', 'EMAIL'],
    type: [String],
    required: false,
    nullable: true
  })
  channels?: string[];

  @ApiProperty({
    description: 'Whether the notification was successfully delivered',
    example: true,
    default: true
  })
  isDelivered: boolean;

  @ApiProperty({
    description: 'When the notification expires',
    example: '2023-06-15T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  expiresAt?: Date;
}
