// src/modules/tenants/dto/tenant-registration.dto.ts

import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  IsOptional, 
  IsEnum, 
  ValidateNested,
  MinLength,
  MaxLength,
  IsPhoneNumber
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlanType } from '../entities/tenant.entity';

export class OrganizationAddressDto {
  @ApiPropertyOptional({ description: 'Street address', example: '123 Main St' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ description: 'City', example: 'New York' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State or province', example: 'NY' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'USA' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Postal code', example: '10001' })
  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class TenantRegistrationDto {
  // Tenant information
  @ApiProperty({ description: 'Name of the tenant (healthcare network)', example: 'Healthcare Network Inc.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  tenantName: string;

  @ApiProperty({ description: 'Subdomain for the tenant', example: 'healthcare-network' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  subdomain: string;

  @ApiPropertyOptional({ description: 'Plan type of the tenant', enum: PlanType, example: PlanType.BASIC })
  @IsOptional()
  @IsEnum(PlanType)
  planType?: PlanType;
  
  // Primary admin information
  @ApiProperty({ description: 'First name of the primary admin user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  adminFirstName: string;

  @ApiProperty({ description: 'Last name of the primary admin user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  adminLastName: string;

  @ApiProperty({ description: 'Email of the primary admin user', example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  adminEmail: string;

  @ApiProperty({ description: 'Password for the primary admin user', example: 'SecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  adminPassword: string;

  @ApiPropertyOptional({ description: 'Phone number of the primary admin user', example: '+1234567890' })
  @IsOptional()
  @IsPhoneNumber()
  adminPhone?: string;
  
  // Organization information
  @ApiProperty({ description: 'Name of the primary organization', example: 'Main Hospital' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  organizationName: string;

  @ApiPropertyOptional({ description: 'Address of the organization', type: () => OrganizationAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrganizationAddressDto)
  organizationAddress?: OrganizationAddressDto;

  @ApiPropertyOptional({ description: 'Phone number of the organization', example: '+1234567890' })
  @IsOptional()
  @IsPhoneNumber()
  organizationPhone?: string;

  @ApiPropertyOptional({ description: 'Email of the organization', example: 'contact@hospital.com' })
  @IsOptional()
  @IsEmail()
  organizationEmail?: string;
}
