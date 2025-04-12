// src/modules/tenants/dto/organization-setup.dto.ts

import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  IsOptional, 
  ValidateNested,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationAddressDto } from './tenant-registration.dto';

export class OrganizationSetupDto {
  @ApiProperty({ 
    description: 'ID of the tenant this organization belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ 
    description: 'Name of the organization',
    example: 'City Medical Center'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ 
    description: 'Description of the organization',
    example: 'A comprehensive medical center serving the city area'
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Address of the organization',
    type: () => OrganizationAddressDto
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrganizationAddressDto)
  address?: OrganizationAddressDto;

  @ApiPropertyOptional({ 
    description: 'Phone number of the organization',
    example: '+1987654321'
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ 
    description: 'Email of the organization',
    example: 'info@citymedical.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
