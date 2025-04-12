import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';
import { Role } from '../../../modules/users/enums/role.enum';
import { SubscriptionPlan } from '../../../modules/organizations/dto/create-organization.dto';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    minLength: 2,
    maxLength: 50
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    minLength: 2,
    maxLength: 50
  })
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123!',
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
  })
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.ADMIN,
    default: Role.USER
  })
  role: Role;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
    pattern: '^\\+[1-9]\\d{1,14}$'
  })
  phone?: string;
}

export class RegisterOrganizationDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Acme Healthcare',
    minLength: 2,
    maxLength: 100
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Organization description',
    example: 'Leading healthcare provider in the region',
    maxLength: 255
  })
  description?: string;

  @ApiProperty({
    description: 'Organization subscription plan',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.FREE,
    default: SubscriptionPlan.FREE
  })
  subscriptionPlan: SubscriptionPlan;
}

export class RegisterDto {
  @ApiProperty({
    description: 'User registration details',
    type: RegisterUserDto
  })
  user: RegisterUserDto;

  @ApiProperty({
    description: 'Organization registration details',
    type: RegisterOrganizationDto
  })
  organization: RegisterOrganizationDto;

  @ApiPropertyOptional({
    description: 'Tenant ID for multi-tenant setup',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  tenantId?: string;
}

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Email verification token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password reset token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({
    description: 'New password',
    example: 'NewPassword123!',
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
  })
  newPassword: string;
} 