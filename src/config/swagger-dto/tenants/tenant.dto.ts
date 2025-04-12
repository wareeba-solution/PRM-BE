// src/config/swagger-dto/tenants/tenant.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlanType, TenantStatus } from '../../../modules/tenants/entities/tenant.entity';

export class TenantDto {
  @ApiProperty({ description: 'Unique identifier for the tenant', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Name of the tenant', example: 'Healthcare Network Inc.' })
  name: string;

  @ApiProperty({ description: 'Subdomain for the tenant', example: 'healthcare-network' })
  subdomain: string;

  @ApiProperty({ 
    description: 'Plan type of the tenant', 
    enum: PlanType,
    example: PlanType.BASIC
  })
  planType: PlanType;

  @ApiProperty({ 
    description: 'Status of the tenant', 
    enum: TenantStatus,
    example: TenantStatus.ACTIVE
  })
  status: TenantStatus;

  @ApiPropertyOptional({ 
    description: 'Tenant settings',
    example: {
      branding: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        logoUrl: 'https://example.com/logo.png'
      },
      security: {
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true
        },
        mfaRequired: false
      }
    }
  })
  settings?: {
    branding?: {
      primaryColor?: string;
      secondaryColor?: string;
      logoUrl?: string;
      faviconUrl?: string;
    };
    security?: {
      passwordPolicy?: {
        minLength?: number;
        requireUppercase?: boolean;
        requireLowercase?: boolean;
        requireNumbers?: boolean;
        requireSpecialChars?: boolean;
        expiryDays?: number;
      };
      mfaRequired?: boolean;
      sessionTimeout?: number;
    };
    features?: {
      enabledModules?: string[];
      customFeatures?: Record<string, boolean>;
    };
  };

  @ApiPropertyOptional({ 
    description: 'Contact information for the tenant',
    example: {
      adminEmail: 'admin@example.com',
      adminPhone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
        postalCode: '12345'
      }
    }
  })
  contactInfo?: {
    adminEmail?: string;
    adminPhone?: string;
    billingEmail?: string;
    billingPhone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
    };
  };

  @ApiPropertyOptional({ 
    description: 'Subscription start date',
    example: '2025-01-01T00:00:00.000Z'
  })
  subscriptionStartDate?: Date;

  @ApiPropertyOptional({ 
    description: 'Subscription end date',
    example: '2026-01-01T00:00:00.000Z'
  })
  subscriptionEndDate?: Date;

  @ApiProperty({ 
    description: 'Whether the subscription is active',
    example: true
  })
  isSubscriptionActive: boolean;

  @ApiProperty({ 
    description: 'Maximum number of organizations allowed',
    example: 5
  })
  maxOrganizations: number;

  @ApiProperty({ 
    description: 'Maximum number of users allowed per organization',
    example: 10
  })
  maxUsersPerOrganization: number;

  @ApiProperty({ 
    description: 'Maximum storage allowed per organization in MB',
    example: 1024
  })
  maxStoragePerOrganization: number;

  @ApiProperty({ 
    description: 'Creation date of the tenant',
    example: '2025-04-08T08:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Last update date of the tenant',
    example: '2025-04-08T08:00:00.000Z'
  })
  updatedAt: Date;
}
