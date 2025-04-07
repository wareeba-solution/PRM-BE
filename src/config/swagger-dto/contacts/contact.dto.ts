import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Contact DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class ContactDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this contact belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'Type of contact',
    example: 'PATIENT',
    enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER'],
    default: 'PATIENT'
  })
  type: string;

  @ApiProperty({
    description: 'Contact status',
    example: 'ACTIVE',
    required: false,
    nullable: true
  })
  status?: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    maxLength: 100
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    maxLength: 100
  })
  lastName: string;

  @ApiProperty({
    description: 'Middle name',
    example: 'Robert',
    maxLength: 100,
    required: false,
    nullable: true
  })
  middleName?: string;

  @ApiProperty({
    description: 'Preferred name or nickname',
    example: 'Johnny',
    maxLength: 100,
    required: false,
    nullable: true
  })
  preferredName?: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
    format: 'email',
    required: false,
    nullable: true
  })
  email?: string;

  @ApiProperty({
    description: 'Primary phone number',
    example: '+1-555-123-4567',
    required: false,
    nullable: true
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Alternative phone number',
    example: '+1-555-987-6543',
    required: false,
    nullable: true
  })
  alternativePhoneNumber?: string;

  @ApiProperty({
    description: 'Gender',
    example: 'MALE',
    enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'],
    required: false,
    nullable: true
  })
  gender?: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1980-01-15',
    format: 'date',
    required: false,
    nullable: true
  })
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Blood type',
    example: 'O+',
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'UNKNOWN'],
    default: 'UNKNOWN'
  })
  bloodType: string;

  @ApiProperty({
    description: 'Address information',
    example: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    required: false,
    nullable: true
  })
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @ApiProperty({
    description: 'Emergency contact information',
    example: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phoneNumber: '+1-555-789-0123',
      address: '123 Main St, New York, NY 10001'
    },
    required: false,
    nullable: true
  })
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
    address?: string;
  };

  @ApiProperty({
    description: 'List of allergies',
    example: ['Penicillin', 'Peanuts', 'Latex'],
    type: [String],
    required: false,
    nullable: true
  })
  allergies?: string[];

  @ApiProperty({
    description: 'List of current medications',
    example: ['Lisinopril 10mg', 'Metformin 500mg', 'Vitamin D 1000IU'],
    type: [String],
    required: false,
    nullable: true
  })
  medications?: string[];

  @ApiProperty({
    description: 'Occupation or profession',
    example: 'Software Engineer',
    required: false,
    nullable: true
  })
  occupation?: string;

  @ApiProperty({
    description: 'Additional notes about the contact',
    example: 'Prefers afternoon appointments. Has anxiety about dental procedures.',
    required: false,
    nullable: true
  })
  notes?: string;

  @ApiProperty({
    description: 'Custom fields specific to the organization',
    example: {
      insuranceProvider: 'Blue Cross Blue Shield',
      policyNumber: 'XYZ123456789',
      preferredLanguage: 'Spanish',
      referredBy: 'Dr. Smith'
    },
    required: false,
    nullable: true
  })
  customFields?: Record<string, any>;

  @ApiProperty({
    description: 'Whether the contact is active',
    example: true,
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Date of last visit',
    example: '2023-03-15T14:30:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  lastVisitDate?: Date;

  @ApiProperty({
    description: 'Date of next scheduled appointment',
    example: '2023-06-15T10:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  nextAppointmentDate?: Date;

  @ApiProperty({
    description: 'Additional metadata',
    example: {
      importSource: 'CSV Import 2023-01-15',
      patientPortalActivated: true,
      communicationPreferences: {
        email: true,
        sms: true,
        phone: false
      }
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;

  // Virtual properties
  @ApiProperty({
    description: 'Full name (virtual property)',
    example: 'John Doe',
    readOnly: true
  })
  fullName: string;

  @ApiProperty({
    description: 'Age calculated from date of birth (virtual property)',
    example: 42,
    readOnly: true,
    nullable: true
  })
  age?: number;
}
