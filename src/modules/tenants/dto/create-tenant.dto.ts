// src/modules/tenants/dto/create-tenant.dto.ts

import { IsString, IsOptional, IsEnum, IsObject, IsDateString, IsInt, Min, ValidateNested, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PlanType } from '../entities/tenant.entity';
import { SubdomainUtils } from '../utils/subdomain.utils';

class TenantBrandingDto {
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  faviconUrl?: string;
}

class TenantSecurityDto {
  @IsObject()
  @IsOptional()
  passwordPolicy?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    expiryDays?: number;
  };

  @IsOptional()
  mfaRequired?: boolean;

  @IsInt()
  @IsOptional()
  sessionTimeout?: number;
}

class TenantFeaturesDto {
  @IsString({ each: true })
  @IsOptional()
  enabledModules?: string[];

  @IsObject()
  @IsOptional()
  customFeatures?: Record<string, boolean>;
}

class TenantSettingsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TenantBrandingDto)
  branding?: TenantBrandingDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantSecurityDto)
  security?: TenantSecurityDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantFeaturesDto)
  features?: TenantFeaturesDto;
}

class TenantAddressDto {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}

class TenantContactInfoDto {
  @IsString()
  @IsOptional()
  adminEmail?: string;

  @IsString()
  @IsOptional()
  adminPhone?: string;

  @IsString()
  @IsOptional()
  billingEmail?: string;

  @IsString()
  @IsOptional()
  billingPhone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantAddressDto)
  address?: TenantAddressDto;
}

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsString()
  @IsOptional()
  subdomain?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(PlanType)
  @IsOptional()
  planType?: PlanType;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantSettingsDto)
  settings?: TenantSettingsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantContactInfoDto)
  contactInfo?: TenantContactInfoDto;

  @IsDateString()
  @IsOptional()
  subscriptionStartDate?: string;

  @IsDateString()
  @IsOptional()
  subscriptionEndDate?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxOrganizations?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxUsersPerOrganization?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxStoragePerOrganization?: number;

  constructor(partial: Partial<CreateTenantDto>) {
    Object.assign(this, partial);
    
    // Generate subdomain from organization name if not provided
    if (!this.subdomain) {
      this.subdomain = SubdomainUtils.generateSubdomain(this.organizationName);
    }
  }
}
