import { ApiProperty } from '@nestjs/swagger';

/**
 * Base DTO class with common properties for Swagger documentation
 * Using DTOs instead of entity classes helps avoid circular dependency issues
 */
export class BaseDto {
  @ApiProperty({ 
    description: 'Unique identifier', 
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({ 
    description: 'Creation timestamp', 
    example: '2023-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Last update timestamp', 
    example: '2023-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Soft delete timestamp', 
    example: null,
    format: 'date-time',
    required: false,
    nullable: true
  })
  deletedAt?: Date;

  @ApiProperty({
    description: 'ID of the user who created this record',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  createdById: string;

  @ApiProperty({
    description: 'ID of the user who last updated this record',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: false,
    nullable: true
  })
  updatedById?: string;
}
