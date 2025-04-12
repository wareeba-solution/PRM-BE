// src/config/swagger-dto/tenants/tenant-registration.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlanType } from '@/modules/tenants/entities/tenant.entity';

export class TenantRegistrationDto {
  // Tenant information
  @ApiProperty({ 
    description: 'Name of the tenant (healthcare network)',
    example: 'Healthcare Network Inc.'
  })
  tenantName: string;

  @ApiProperty({ 
    description: 'Subdomain for the tenant',
    example: 'healthcare-network'
  })
  subdomain: string;

  @ApiPropertyOptional({ 
    description: 'Plan type of the tenant',
    enum: PlanType,
    example: PlanType.BASIC
  })
  planType?: PlanType;
  
  // Primary admin information
  @ApiProperty({ 
    description: 'First name of the primary admin user',
    example: 'John'
  })
  adminFirstName: string;

  @ApiProperty({ 
    description: 'Last name of the primary admin user',
    example: 'Doe'
  })
  adminLastName: string;

  @ApiProperty({ 
    description: 'Email of the primary admin user',
    example: 'admin@example.com'
  })
  adminEmail: string;

  @ApiProperty({ 
    description: 'Password for the primary admin user',
    example: 'SecurePassword123!'
  })
  adminPassword: string;

  @ApiPropertyOptional({ 
    description: 'Phone number of the primary admin user',
    example: '+1234567890'
  })
  adminPhone?: string;
  
  // Organization information
  @ApiProperty({ 
    description: 'Name of the primary organization',
    example: 'Main Hospital'
  })
  organizationName: string;

  @ApiPropertyOptional({ 
    description: 'Address of the organization',
    example: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      postalCode: '12345'
    }
  })
  organizationAddress?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  @ApiPropertyOptional({ 
    description: 'Phone number of the organization',
    example: '+1234567890'
  })
  organizationPhone?: string;

  @ApiPropertyOptional({ 
    description: 'Email of the organization',
    example: 'contact@hospital.com'
  })
  organizationEmail?: string;
}
