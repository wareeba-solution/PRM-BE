// src/config/swagger-dto/tenants/organization-setup.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationSetupDto {
  @ApiProperty({ 
    description: 'ID of the tenant this organization belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  tenantId: string;

  @ApiProperty({ 
    description: 'Name of the organization',
    example: 'City Medical Center'
  })
  name: string;

  @ApiPropertyOptional({ 
    description: 'Description of the organization',
    example: 'A comprehensive medical center serving the city area'
  })
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Address of the organization',
    example: {
      street: '456 Health Ave',
      city: 'Metropolis',
      state: 'NY',
      country: 'USA',
      postalCode: '54321'
    }
  })
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  @ApiPropertyOptional({ 
    description: 'Phone number of the organization',
    example: '+1987654321'
  })
  phone?: string;

  @ApiPropertyOptional({ 
    description: 'Email of the organization',
    example: 'info@citymedical.com'
  })
  email?: string;
}
