import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Merged Record DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class MergedRecordDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this merged record belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'ID of the primary contact that remains after merging',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  primaryContactId: string;

  @ApiProperty({
    description: 'ID of the secondary contact that was merged into the primary',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  secondaryContactId: string;

  @ApiProperty({
    description: 'Reason for the merge',
    example: 'Duplicate contact identified',
    required: false,
    nullable: true
  })
  reason?: string;

  @ApiProperty({
    description: 'Status of the merge',
    example: 'COMPLETED',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'REVERTED'],
    default: 'COMPLETED'
  })
  status: string;

  @ApiProperty({
    description: 'Fields that were merged',
    example: ['firstName', 'lastName', 'email', 'phoneNumber'],
    type: [String],
    required: false,
    nullable: true
  })
  mergedFields?: string[];

  @ApiProperty({
    description: 'Conflicts encountered during merge',
    example: {
      email: {
        primary: 'john.doe@example.com',
        secondary: 'johndoe@gmail.com',
        resolution: 'KEPT_PRIMARY'
      },
      phoneNumber: {
        primary: '+1-555-123-4567',
        secondary: '+1-555-987-6543',
        resolution: 'KEPT_SECONDARY'
      }
    },
    required: false,
    nullable: true
  })
  conflicts?: Record<string, {
    primary: any;
    secondary: any;
    resolution: string;
  }>;

  @ApiProperty({
    description: 'Whether the merge can be undone',
    example: true,
    default: true
  })
  isReversible: boolean;

  @ApiProperty({
    description: 'Date when the merge was completed',
    example: '2023-05-15T14:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  mergedAt?: Date;

  @ApiProperty({
    description: 'Date when the merge was reverted (if applicable)',
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  revertedAt?: Date;

  @ApiProperty({
    description: 'Additional metadata about the merge',
    example: {
      automaticMerge: false,
      confidenceScore: 0.95,
      relatedRecords: {
        appointments: 3,
        documents: 5,
        medicalHistory: 2
      }
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;
}
