import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Message DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class MessageDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this message belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'ID of the user who sent the message',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  senderId: string;

  @ApiProperty({
    description: 'ID of the recipient (user or contact)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  recipientId?: string;

  @ApiProperty({
    description: 'Type of recipient (USER or CONTACT)',
    example: 'CONTACT',
    enum: ['USER', 'CONTACT', 'GROUP'],
    required: false,
    nullable: true
  })
  recipientType?: string;

  @ApiProperty({
    description: 'Subject of the message',
    example: 'Appointment Confirmation',
    required: false,
    nullable: true
  })
  subject?: string;

  @ApiProperty({
    description: 'Content of the message',
    example: 'Your appointment has been confirmed for tomorrow at 10:00 AM.'
  })
  content: string;

  @ApiProperty({
    description: 'Type of message',
    example: 'EMAIL',
    enum: ['EMAIL', 'SMS', 'CHAT', 'WHATSAPP', 'SYSTEM', 'OTHER']
  })
  type: string;

  @ApiProperty({
    description: 'Status of the message',
    example: 'SENT',
    enum: ['DRAFT', 'SENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
    default: 'DRAFT'
  })
  status: string;

  @ApiProperty({
    description: 'Whether the message has been read',
    example: false,
    default: false
  })
  isRead: boolean;

  @ApiProperty({
    description: 'When the message was read',
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  readAt?: Date;

  @ApiProperty({
    description: 'When the message was sent',
    example: '2023-05-14T15:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  sentAt?: Date;

  @ApiProperty({
    description: 'When the message was delivered',
    example: '2023-05-14T15:30:05.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  deliveredAt?: Date;

  @ApiProperty({
    description: 'Priority level of the message',
    example: 'NORMAL',
    enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
    default: 'NORMAL'
  })
  priority: string;

  @ApiProperty({
    description: 'ID of the conversation this message belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  conversationId?: string;

  @ApiProperty({
    description: 'ID of the message this is replying to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  replyToId?: string;

  @ApiProperty({
    description: 'Whether the message has attachments',
    example: false,
    default: false
  })
  hasAttachments: boolean;

  @ApiProperty({
    description: 'External message ID (e.g., email message ID)',
    example: '<abc123@example.com>',
    required: false,
    nullable: true
  })
  externalId?: string;

  @ApiProperty({
    description: 'Additional metadata for the message',
    example: {
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      emailHeaders: {
        from: 'sender@example.com',
        to: 'recipient@example.com'
      }
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Tags associated with the message',
    example: ['appointment', 'confirmation', 'automated'],
    type: [String],
    required: false,
    nullable: true
  })
  tags?: string[];

  @ApiProperty({
    description: 'When the message is scheduled to be sent',
    example: '2023-05-15T08:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  scheduledFor?: Date;
}
