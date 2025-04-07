import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Ticket DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class TicketDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this ticket belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'Ticket title',
    example: 'Cannot access patient records'
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the ticket',
    example: 'I am unable to access patient records for the last 24 hours. The system shows an error message when I try to view any patient data.'
  })
  description: string;

  @ApiProperty({
    description: 'Type of ticket',
    enum: ['GENERAL', 'TECHNICAL', 'BILLING', 'MEDICAL', 'APPOINTMENT', 'ACCESS', 'COMPLAINT', 'FEEDBACK'],
    example: 'TECHNICAL',
    enumName: 'TicketType'
  })
  type: string;

  @ApiProperty({
    description: 'Priority level of the ticket',
    enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
    example: 'HIGH',
    default: 'NORMAL',
    enumName: 'TicketPriority'
  })
  priority: string;

  @ApiProperty({
    description: 'Current status of the ticket',
    enum: ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED', 'ESCALATED', 'REOPENED', 'DELETED'],
    example: 'OPEN',
    enumName: 'TicketStatus'
  })
  status: string;

  @ApiProperty({
    description: 'Source of the ticket',
    enum: ['WEB', 'MOBILE', 'EMAIL', 'PHONE', 'CHAT', 'SYSTEM'],
    example: 'EMAIL',
    default: 'WEB',
    enumName: 'TicketSource'
  })
  source: string;

  @ApiProperty({
    description: 'ID of the contact associated with this ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  contactId?: string;

  @ApiProperty({
    description: 'ID of the department assigned to this ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  departmentId?: string;

  @ApiProperty({
    description: 'ID of the user assigned to this ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  assigneeId?: string;

  @ApiProperty({
    description: 'Category of the ticket',
    enum: ['GENERAL', 'TECHNICAL', 'BILLING', 'MEDICAL', 'APPOINTMENT', 'ACCESS', 'COMPLAINT', 'FEEDBACK', 'OTHER'],
    example: 'TECHNICAL',
    required: false,
    nullable: true,
    enumName: 'TicketCategory'
  })
  category?: string;

  @ApiProperty({
    description: 'Sub-category of the ticket',
    example: 'Database Access',
    required: false,
    nullable: true
  })
  subCategory?: string;

  @ApiProperty({
    description: 'Tags associated with the ticket',
    example: ['urgent', 'patient-data', 'access-issue'],
    type: [String],
    default: []
  })
  tags: string[];

  @ApiProperty({
    description: 'External reference number',
    example: 'TKT-2023-001',
    required: false,
    nullable: true
  })
  referenceNumber?: string;

  @ApiProperty({
    description: 'ID of a related ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  relatedTicketId?: string;

  @ApiProperty({
    description: 'Additional metadata for the ticket',
    example: {
      browser: 'Chrome 98.0.4758.102',
      os: 'Windows 10',
      device: 'Desktop',
      customField1: 'Custom value'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Whether the ticket is private (only visible to staff)',
    example: false,
    default: false
  })
  isPrivate: boolean;

  @ApiProperty({
    description: 'Internal notes visible only to staff',
    example: 'This issue appears to be related to the database maintenance performed yesterday.',
    required: false,
    nullable: true
  })
  internalNotes?: string;

  @ApiProperty({
    description: 'Resolution details for the ticket',
    example: 'Restored database access permissions for the user account.',
    required: false,
    nullable: true
  })
  resolution?: string;

  @ApiProperty({
    description: 'When the ticket was resolved',
    example: '2023-01-02T10:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  resolvedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who resolved the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  resolvedById?: string;

  @ApiProperty({
    description: 'When the ticket was closed',
    example: '2023-01-03T14:15:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  closedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who closed the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  closedById?: string;

  @ApiProperty({
    description: 'When the ticket was escalated',
    example: '2023-01-01T16:45:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  escalatedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who escalated the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  escalatedById?: string;

  @ApiProperty({
    description: 'Reason for escalation',
    example: 'Critical issue affecting multiple users',
    required: false,
    nullable: true
  })
  escalationReason?: string;

  @ApiProperty({
    description: 'Current escalation level',
    example: 1,
    default: 0
  })
  escalationLevel: number;

  @ApiProperty({
    description: 'When the ticket was reopened',
    example: '2023-01-04T09:20:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  reopenedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who reopened the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  reopenedById?: string;

  @ApiProperty({
    description: 'Reason for reopening the ticket',
    example: 'Issue has reoccurred after initial fix',
    required: false,
    nullable: true
  })
  reopenReason?: string;

  @ApiProperty({
    description: 'When the first response was provided',
    example: '2023-01-01T10:15:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  firstResponseAt?: Date;

  @ApiProperty({
    description: 'When the last activity occurred',
    example: '2023-01-02T15:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  lastActivityAt?: Date;

  // Virtual properties
  @ApiProperty({
    description: 'Whether the ticket has been escalated',
    example: true,
    readOnly: true
  })
  isEscalated: boolean;

  @ApiProperty({
    description: 'Whether the ticket has been resolved',
    example: true,
    readOnly: true
  })
  isResolved: boolean;

  @ApiProperty({
    description: 'Whether the ticket has been closed',
    example: false,
    readOnly: true
  })
  isClosed: boolean;

  @ApiProperty({
    description: 'Whether the ticket has been reopened',
    example: false,
    readOnly: true
  })
  isReopened: boolean;

  @ApiProperty({
    description: 'Whether the ticket has received a first response',
    example: true,
    readOnly: true
  })
  hasFirstResponse: boolean;

  @ApiProperty({
    description: 'Time to first response in milliseconds',
    example: 3600000, // 1 hour in milliseconds
    readOnly: true,
    nullable: true
  })
  responseTime: number | null;

  @ApiProperty({
    description: 'Time to resolution in milliseconds',
    example: 86400000, // 24 hours in milliseconds
    readOnly: true,
    nullable: true
  })
  resolutionTime: number | null;
}
