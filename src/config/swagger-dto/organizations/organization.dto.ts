import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../base.dto';
import { OrganizationStatus } from '../../../modules/organizations/enums/organization-status.enum';
import { SubscriptionTier } from '../../../modules/organizations/enums/subscription-tier.enum';

/**
 * Organization DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export class OrganizationDto extends BaseDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Acme Healthcare',
    maxLength: 100
  })
  name: string;

  @ApiProperty({
    description: 'Organization description',
    example: 'Leading healthcare provider in the region',
    maxLength: 255,
    required: false,
    nullable: true
  })
  description: string;

  @ApiProperty({
    description: 'Organization unique slug',
    example: 'acme-healthcare',
    maxLength: 100
  })
  slug: string;

  @ApiProperty({
    description: 'URL to organization logo',
    example: 'https://example.com/logo.png',
    maxLength: 255,
    required: false,
    nullable: true
  })
  logo: string;

  @ApiProperty({
    description: 'Organization domain name',
    example: 'acmehealthcare.com',
    maxLength: 100,
    required: false,
    nullable: true
  })
  domain: string;

  @ApiProperty({
    description: 'Whether the domain has been verified',
    example: false,
    default: false
  })
  isDomainVerified: boolean;

  @ApiProperty({
    description: 'Organization status',
    enum: OrganizationStatus,
    example: OrganizationStatus.ACTIVE,
    default: OrganizationStatus.PENDING,
    enumName: 'OrganizationStatus'
  })
  status: OrganizationStatus;

  @ApiProperty({
    description: 'Organization subscription tier',
    enum: SubscriptionTier,
    example: SubscriptionTier.PROFESSIONAL,
    default: SubscriptionTier.FREE,
    enumName: 'SubscriptionTier'
  })
  subscriptionTier: SubscriptionTier;

  @ApiProperty({
    description: 'Subscription start date',
    example: '2023-01-01T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  subscriptionStartDate?: Date;

  @ApiProperty({
    description: 'Subscription end date',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
    required: false,
    nullable: true
  })
  subscriptionEndDate?: Date;

  @ApiProperty({
    description: 'Whether the subscription is currently active',
    example: true,
    default: false
  })
  isSubscriptionActive: boolean;

  @ApiProperty({
    description: 'Organization settings',
    example: {
      ticketPriorities: ['Low', 'Medium', 'High', 'Critical'],
      ticketCategories: ['Technical', 'Billing', 'General'],
      customFields: [
        { name: 'patientId', type: 'string', required: true }
      ],
      notificationSettings: {
        emailNotifications: true,
        smsNotifications: false
      },
      brandingSettings: {
        primaryColor: '#4A90E2',
        secondaryColor: '#50E3C2'
      }
    },
    required: false,
    nullable: true
  })
  settings?: {
    ticketPriorities?: string[];
    ticketCategories?: string[];
    customFields?: any[];
    notificationSettings?: any;
    brandingSettings?: any;
  };

  @ApiProperty({
    description: 'Maximum number of users allowed',
    example: 10,
    default: 0
  })
  maxUsers: number;

  @ApiProperty({
    description: 'Maximum storage allowed in MB',
    example: 5000,
    default: 0
  })
  maxStorage: number;

  @ApiProperty({
    description: 'Additional metadata about the organization',
    example: {
      industry: 'Healthcare',
      size: '50-100',
      location: 'New York',
      timezone: 'America/New_York'
    },
    required: false,
    nullable: true
  })
  metadata?: {
    industry?: string;
    size?: string;
    location?: string;
    timezone?: string;
    customAttributes?: Record<string, any>;
  };

  @ApiProperty({
    description: 'Organization contact information',
    example: {
      email: 'contact@acmehealthcare.com',
      phone: '+1-555-123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001'
      }
    },
    required: false,
    nullable: true
  })
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
    };
  };

  @ApiProperty({
    description: 'List of allowed email domains for auto-verification',
    example: ['acmehealthcare.com', 'acme-health.org'],
    type: [String],
    required: false,
    nullable: true
  })
  allowedDomains?: string[];

  @ApiProperty({
    description: 'Whether email verification is required for new users',
    example: true,
    default: true
  })
  isEmailVerificationRequired: boolean;

  @ApiProperty({
    description: 'Whether two-factor authentication is required for users',
    example: false,
    default: false
  })
  isTwoFactorAuthRequired: boolean;

  @ApiProperty({
    description: 'Audit log configuration',
    example: {
      enableAuditLog: true,
      retentionPeriod: 90,
      logLevel: 'info'
    },
    required: false,
    nullable: true
  })
  auditConfig?: {
    enableAuditLog?: boolean;
    retentionPeriod?: number;
    logLevel?: string;
  };

  @ApiProperty({
    description: 'Whether the organization is active',
    example: true,
    readOnly: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the organization has a premium subscription',
    example: true,
    readOnly: true
  })
  isPremium: boolean;

  @ApiProperty({
    description: 'Whether the organization has an enterprise subscription',
    example: false,
    readOnly: true
  })
  isEnterprise: boolean;
}
