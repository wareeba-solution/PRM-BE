import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Contact Relationship DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class ContactRelationshipDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this relationship belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'ID of the primary contact in the relationship',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  contactId: string;

  @ApiProperty({
    description: 'ID of the related contact',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  relatedContactId: string;

  @ApiProperty({
    description: 'Type of relationship',
    example: 'FAMILY',
    enum: ['FAMILY', 'EMERGENCY_CONTACT', 'CAREGIVER', 'DOCTOR', 'INSURANCE', 'OTHER']
  })
  type: string;

  @ApiProperty({
    description: 'Specific relationship description',
    example: 'Parent',
    enum: ['Parent', 'Child', 'Spouse', 'Sibling', 'Friend', 'Doctor', 'Caregiver', 'Other']
  })
  relationship: string;

  @ApiProperty({
    description: 'Whether this is a primary relationship',
    example: true,
    default: false
  })
  isPrimary: boolean;

  @ApiProperty({
    description: 'Whether this is an emergency contact relationship',
    example: true,
    default: false
  })
  isEmergencyContact: boolean;

  @ApiProperty({
    description: 'Additional notes about the relationship',
    example: 'Primary caregiver who should be contacted first',
    required: false,
    nullable: true
  })
  notes?: string;

  @ApiProperty({
    description: 'Status of the relationship',
    example: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE', 'ARCHIVED'],
    default: 'ACTIVE'
  })
  status: string;

  @ApiProperty({
    description: 'Additional metadata for the relationship',
    example: {
      legalGuardian: true,
      powerOfAttorney: false,
      contactPreference: 'Phone'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;
}
