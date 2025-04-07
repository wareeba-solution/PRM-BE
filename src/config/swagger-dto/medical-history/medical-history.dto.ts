import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Medical History DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class MedicalHistoryDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this medical history belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'Contact ID this medical history is for',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  contactId: string;

  @ApiProperty({
    description: 'Type of medical history entry',
    example: 'DIAGNOSIS',
    enum: ['DIAGNOSIS', 'PROCEDURE', 'MEDICATION', 'ALLERGY', 'IMMUNIZATION', 'LAB_RESULT', 'VITAL_SIGN', 'OTHER']
  })
  type: string;

  @ApiProperty({
    description: 'Title or name of the medical history entry',
    example: 'Hypertension Diagnosis'
  })
  title: string;

  @ApiProperty({
    description: 'Description or details of the medical history entry',
    example: 'Patient diagnosed with Stage 1 Hypertension',
    required: false,
    nullable: true
  })
  description?: string;

  @ApiProperty({
    description: 'Date when the medical event occurred',
    example: '2023-03-15T14:30:00.000Z',
    format: 'date-time'
  })
  eventDate: Date;

  @ApiProperty({
    description: 'Provider or doctor who recorded this entry',
    example: 'Dr. Jane Smith',
    required: false,
    nullable: true
  })
  provider?: string;

  @ApiProperty({
    description: 'Location where the medical event occurred',
    example: 'Main Hospital, Room 305',
    required: false,
    nullable: true
  })
  location?: string;

  @ApiProperty({
    description: 'Status of the medical history entry',
    example: 'ACTIVE',
    enum: ['ACTIVE', 'RESOLVED', 'CHRONIC', 'INACTIVE'],
    default: 'ACTIVE'
  })
  status: string;

  @ApiProperty({
    description: 'Severity level of the condition',
    example: 'MODERATE',
    enum: ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING', 'NOT_APPLICABLE'],
    required: false,
    nullable: true
  })
  severity?: string;

  @ApiProperty({
    description: 'Related document IDs',
    example: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
    type: [String],
    required: false,
    nullable: true
  })
  documentIds?: string[];

  @ApiProperty({
    description: 'Medical codes (e.g., ICD-10, CPT)',
    example: {
      'ICD-10': 'I10',
      'SNOMED-CT': '38341003'
    },
    required: false,
    nullable: true
  })
  medicalCodes?: Record<string, string>;

  @ApiProperty({
    description: 'Follow-up actions required',
    example: 'Schedule follow-up appointment in 3 months',
    required: false,
    nullable: true
  })
  followUp?: string;

  @ApiProperty({
    description: 'Date when follow-up is due',
    example: '2023-06-15T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  followUpDate?: Date;

  @ApiProperty({
    description: 'Additional notes',
    example: 'Patient reported feeling dizzy before diagnosis',
    required: false,
    nullable: true
  })
  notes?: string;

  @ApiProperty({
    description: 'Additional metadata',
    example: {
      bloodPressure: '140/90',
      heartRate: 85,
      familyHistory: true,
      treatmentPlan: 'Lifestyle changes and monitoring'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;
}
