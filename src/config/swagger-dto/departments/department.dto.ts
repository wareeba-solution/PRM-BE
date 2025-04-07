import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Department DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class DepartmentDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this department belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'Department name',
    example: 'Cardiology'
  })
  name: string;

  @ApiProperty({
    description: 'Department description',
    example: 'Specializes in heart-related conditions and treatments',
    required: false,
    nullable: true
  })
  description?: string;

  @ApiProperty({
    description: 'ID of the department head/manager',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  managerId?: string;

  @ApiProperty({
    description: 'Email address for the department',
    example: 'cardiology@hospital.com',
    format: 'email',
    required: false,
    nullable: true
  })
  email?: string;

  @ApiProperty({
    description: 'Phone number for the department',
    example: '+1-555-123-4567',
    required: false,
    nullable: true
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Location or address of the department',
    example: 'Building A, Floor 3, Room 305',
    required: false,
    nullable: true
  })
  location?: string;

  @ApiProperty({
    description: 'Whether the department is active',
    example: true,
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Department code or identifier',
    example: 'CARD',
    required: false,
    nullable: true
  })
  code?: string;

  @ApiProperty({
    description: 'Parent department ID if this is a sub-department',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  parentDepartmentId?: string;

  @ApiProperty({
    description: 'Working hours of the department',
    example: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null
    },
    required: false,
    nullable: true
  })
  workingHours?: Record<string, { start: string; end: string } | null>;

  @ApiProperty({
    description: 'Additional metadata for the department',
    example: {
      specialties: ['Cardiac Surgery', 'Interventional Cardiology'],
      equipmentCount: 15,
      averageWaitTime: '3 days'
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Tags associated with the department',
    example: ['specialty', 'surgical', 'inpatient'],
    type: [String],
    required: false,
    nullable: true
  })
  tags?: string[];
}
