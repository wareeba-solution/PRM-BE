import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';

/**
 * User DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class UserDto extends BaseDto {
  @ApiProperty({
    description: 'Organization ID this user belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid'
  })
  organizationId: string;

  @ApiProperty({
    description: 'User\'s first name',
    example: 'John',
    maxLength: 50
  })
  firstName: string;

  @ApiProperty({
    description: 'User\'s last name',
    example: 'Doe',
    maxLength: 50
  })
  lastName: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'john.doe@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'User\'s role in the system',
    enum: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF', 'DOCTOR', 'NURSE', 'PATIENT', 'GUEST'],
    example: 'STAFF',
    enumName: 'Role'
  })
  role: string;

  @ApiProperty({
    description: 'List of permissions assigned to the user',
    example: ['read:users', 'write:tickets'],
    type: [String],
    required: false,
    nullable: true
  })
  permissions: string[];

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the user account is locked',
    example: false,
    default: false
  })
  isLocked: boolean;

  @ApiProperty({
    description: 'Whether the user\'s email is verified',
    example: false,
    default: false
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Whether the user needs to change their password on next login',
    example: true,
    default: true
  })
  requirePasswordChange: boolean;

  @ApiProperty({
    description: 'Last login timestamp',
    example: '2023-01-01T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  lastLoginAt?: Date;

  @ApiProperty({
    description: 'Last activity timestamp',
    example: '2023-01-01T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  lastActiveAt?: Date;

  @ApiProperty({
    description: 'User\'s full name (virtual property)',
    example: 'John Doe',
    readOnly: true
  })
  fullName: string;

  @ApiProperty({
    description: 'Whether the user is available (active and not locked)',
    example: true,
    readOnly: true
  })
  isAvailable: boolean;
}
