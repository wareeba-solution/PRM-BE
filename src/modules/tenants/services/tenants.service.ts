// src/modules/tenants/services/tenants.service.ts

import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant, TenantStatus, PlanType } from '../entities/tenant.entity';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { SubdomainUtils } from '../utils/subdomain.utils';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    try {
      // Validate the subdomain
      if (!SubdomainUtils.isValidSubdomain(createTenantDto.subdomain)) {
        throw new BadRequestException('Invalid subdomain format');
      }

      // Check if subdomain already exists
      const existingTenant = await this.findBySubdomain(createTenantDto.subdomain);
      if (existingTenant) {
        throw new ConflictException(`Subdomain '${createTenantDto.subdomain}' is already in use`);
      }

      // Create the tenant
      const tenant = this.tenantRepository.create({
        ...createTenantDto,
        isActive: createTenantDto.isActive ?? true,
      });

      await this.tenantRepository.save(tenant);
      this.logger.log(`Created new tenant with subdomain: ${tenant.subdomain}`);
      
      return tenant;
    } catch (error) {
      this.logger.error('Error creating tenant:', error);
      throw error;
    }
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }

  async findBySubdomain(subdomain: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { subdomain } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with subdomain ${subdomain} not found`);
    }
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);

    // Check if subdomain is being changed and if it's already taken
    if (updateTenantDto.subdomain && updateTenantDto.subdomain !== tenant.subdomain) {
      const existingTenant = await this.tenantRepository.findOne({
        where: { subdomain: updateTenantDto.subdomain }
      });

      if (existingTenant) {
        throw new ConflictException(`Subdomain '${updateTenantDto.subdomain}' is already taken`);
      }
    }

    // Update subscription dates if provided
    if (updateTenantDto.subscriptionStartDate) {
      tenant.subscriptionStartDate = new Date(updateTenantDto.subscriptionStartDate);
    }
    
    if (updateTenantDto.subscriptionEndDate) {
      tenant.subscriptionEndDate = new Date(updateTenantDto.subscriptionEndDate);
    }

    // Update subscription status based on dates
    if (tenant.subscriptionStartDate && tenant.subscriptionEndDate) {
      const now = new Date();
      tenant.isSubscriptionActive = (tenant.subscriptionStartDate <= now && tenant.subscriptionEndDate >= now);
    }

    // Merge and save the updated tenant
    const updatedTenant = this.tenantRepository.merge(tenant, updateTenantDto);
    return this.tenantRepository.save(updatedTenant);
  }

  async activate(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    
    if (tenant.status === TenantStatus.ACTIVE) {
      throw new BadRequestException('Tenant is already active');
    }
    
    tenant.status = TenantStatus.ACTIVE;
    return this.tenantRepository.save(tenant);
  }

  async deactivate(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    
    if (tenant.status === TenantStatus.INACTIVE) {
      throw new BadRequestException('Tenant is already inactive');
    }
    
    tenant.status = TenantStatus.INACTIVE;
    return this.tenantRepository.save(tenant);
  }

  async suspend(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    
    if (tenant.status === TenantStatus.SUSPENDED) {
      throw new BadRequestException('Tenant is already suspended');
    }
    
    tenant.status = TenantStatus.SUSPENDED;
    return this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const tenant = await this.findOne(id);
    await this.tenantRepository.softRemove(tenant);
  }
}
