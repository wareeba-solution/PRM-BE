// src/modules/tenants/controllers/tenants.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../users/enums/role.enum';
import { Request } from 'express';


@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('test-subdomain')
  async testSubdomain(@Req() req: Request) {
    const host = req.headers.host || '';
    const subdomain = this.extractSubdomain(host);
    
    return {
      host,
      extractedSubdomain: subdomain,
      headers: req.headers,
    };
  }

  private extractSubdomain(host: string): string | null {
    try {
      if (!host || typeof host !== 'string') return null;
      if (host.includes('localhost') || /\d+\.\d+\.\d+\.\d+/.test(host)) return null;
      
      const hostWithoutPort = host.split(':')[0];
      const parts = hostWithoutPort.split('.').filter(part => part.length > 0);
      
      if (parts.length < 3) return null;
      
      const subdomain = parts[0];
      if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(subdomain)) return null;
      
      return subdomain;
    } catch (error) {
      return null;
    }
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  async create(@Body() createTenantDto: CreateTenantDto) {
    const tenant = await this.tenantsService.create(createTenantDto);
    return {
      message: 'Tenant created successfully',
      data: tenant,
    };
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async findAll() {
    const tenants = await this.tenantsService.findAll();
    return {
      data: tenants,
    };
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantsService.findOne(id);
    return {
      data: tenant,
    };
  }

  @Get('subdomain/:subdomain')
  @Roles(Role.SUPER_ADMIN)
  async findBySubdomain(@Param('subdomain') subdomain: string) {
    const tenant = await this.tenantsService.findBySubdomain(subdomain);
    return {
      data: tenant,
    };
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN)
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantsService.update(id, updateTenantDto);
    return {
      message: 'Tenant updated successfully',
      data: tenant,
    };
  }

  @Patch(':id/activate')
  @Roles(Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async activate(@Param('id') id: string) {
    const tenant = await this.tenantsService.activate(id);
    return {
      message: 'Tenant activated successfully',
      data: tenant,
    };
  }

  @Patch(':id/deactivate')
  @Roles(Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async deactivate(@Param('id') id: string) {
    const tenant = await this.tenantsService.deactivate(id);
    return {
      message: 'Tenant deactivated successfully',
      data: tenant,
    };
  }

  @Patch(':id/suspend')
  @Roles(Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async suspend(@Param('id') id: string) {
    const tenant = await this.tenantsService.suspend(id);
    return {
      message: 'Tenant suspended successfully',
      data: tenant,
    };
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.tenantsService.remove(id);
  }
}
