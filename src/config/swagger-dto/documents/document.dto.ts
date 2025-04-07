import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * Document DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class DocumentDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this document belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'Contact ID this document is related to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  contactId?: string;

  @ApiProperty({
    description: 'Document title or name',
    example: 'Medical History Report'
  })
  title: string;

  @ApiProperty({
    description: 'Document type',
    example: 'MEDICAL_RECORD',
    enum: ['MEDICAL_RECORD', 'LAB_RESULT', 'PRESCRIPTION', 'CONSENT_FORM', 'INSURANCE', 'OTHER']
  })
  type: string;

  @ApiProperty({
    description: 'Document description',
    example: 'Annual physical examination results',
    required: false,
    nullable: true
  })
  description?: string;

  @ApiProperty({
    description: 'File path or storage location',
    example: 'documents/550e8400-e29b-41d4-a716-446655440000/medical_history.pdf'
  })
  filePath: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 1024000
  })
  fileSize: number;

  @ApiProperty({
    description: 'MIME type of the document',
    example: 'application/pdf'
  })
  mimeType: string;

  @ApiProperty({
    description: 'Document status',
    example: 'ACTIVE',
    enum: ['DRAFT', 'ACTIVE', 'ARCHIVED', 'DELETED'],
    default: 'ACTIVE'
  })
  status: string;

  @ApiProperty({
    description: 'Version number of the document',
    example: 1,
    default: 1
  })
  version: number;

  @ApiProperty({
    description: 'Whether the document is confidential',
    example: false,
    default: false
  })
  isConfidential: boolean;

  @ApiProperty({
    description: 'Date when the document was issued',
    example: '2023-05-15T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  issuedAt?: Date;

  @ApiProperty({
    description: 'Date when the document expires',
    example: '2024-05-15T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  expiresAt?: Date;

  @ApiProperty({
    description: 'Tags associated with the document',
    example: ['medical', 'annual', 'physical'],
    type: [String],
    required: false,
    nullable: true
  })
  tags?: string[];

  @ApiProperty({
    description: 'Additional metadata for the document',
    example: {
      author: 'Dr. Jane Smith',
      department: 'Cardiology',
      pageCount: 5,
      signatureRequired: true
    },
    required: false,
    nullable: true
  })
  metadata?: Record<string, any>;
}
