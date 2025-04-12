// src/modules/tenants/controllers/tenant-onboarding.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { TenantOnboardingService } from '../services/tenant-onboarding.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { Public } from '../../auth/decorators/public.decorator';
import { Request } from 'express';
import { TenantRegistrationDto } from '../dto/tenant-registration.dto';
import { OrganizationSetupDto } from '../dto/organization-setup.dto';

// Define interface for the user object in the request
interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
    tenantId: string;
    organizationId: string;
    permissions?: string[];
  };
}

@ApiTags('Tenant Onboarding')
@Controller('tenant-onboarding')
export class TenantOnboardingController {
  constructor(private readonly tenantOnboardingService: TenantOnboardingService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new tenant with initial organization and admin user' })
  @ApiBody({ type: TenantRegistrationDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tenant registered successfully' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Tenant with this subdomain already exists' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  async registerTenant(@Body() registrationDto: TenantRegistrationDto) {
    const result = await this.tenantOnboardingService.registerTenant(registrationDto);
    return {
      message: 'Tenant registered successfully',
      data: {
        tenant: {
          id: result.tenant.id,
          name: result.tenant.name,
          subdomain: result.tenant.subdomain,
          status: result.tenant.status,
        },
        organization: {
          id: result.organization.id,
          name: result.organization.name,
        },
        adminUser: {
          id: result.adminUser.id,
          email: result.adminUser.email,
        },
      },
    };
  }

  @Post('organizations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new organization to an existing tenant' })
  @ApiBody({ type: OrganizationSetupDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Organization added successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data or tenant not found' })
  async addOrganization(@Body() setupDto: OrganizationSetupDto, @Req() req: RequestWithUser) {
    // Ensure the tenant ID from the token matches the one in the request
    if (req.user.tenantId !== setupDto.tenantId && req.user.role !== Role.SUPER_ADMIN) {
      return {
        message: 'You do not have permission to add organizations to this tenant',
        success: false,
      };
    }

    const organization = await this.tenantOnboardingService.addOrganization(setupDto);
    return {
      message: 'Organization added successfully',
      data: {
        id: organization.id,
        name: organization.name,
        tenantId: organization.tenantId,
      },
    };
  }

  @Get('status/:subdomain')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if a tenant subdomain is available and get tenant status' })
  @ApiParam({ name: 'subdomain', description: 'The subdomain to check', example: 'healthcare-network' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tenant status information' })
  async checkTenantStatus(@Param('subdomain') subdomain: string) {
    // This endpoint can be used to check if a tenant subdomain is available
    // and the status of an existing tenant
    try {
      const tenant = await this.tenantOnboardingService.getTenantBySubdomain(subdomain);
      return {
        exists: true,
        status: tenant.status,
        name: tenant.name,
      };
    } catch (error) {
      return {
        exists: false,
      };
    }
  }
}
