// src/modules/tenants/tenants.module.ts

import { Module, MiddlewareConsumer, RequestMethod, forwardRef, OnModuleInit, NestModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantsService } from './services/tenants.service';
import { TenantsController } from './controllers/tenants.controller';
import { TenantOnboardingService } from './services/tenant-onboarding.service';
import { TenantOnboardingController } from './controllers/tenant-onboarding.controller';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { TenantDatabaseService } from './services/tenant-database.service';
import { User } from '../users/entities/user.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UserSettings } from '../users/entities/user-settings.entity';
import { UserVerification } from '../users/entities/user-verification.entity';
import { AuthModule } from '../auth/auth.module';
import { DataSource } from 'typeorm';
import { initTenantSchema } from './init-tenant-schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User, Organization, UserSettings, UserVerification]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TenantsController, TenantOnboardingController],
  providers: [TenantsService, TenantOnboardingService, TenantDatabaseService],
  exports: [TenantsService, TenantOnboardingService, TenantDatabaseService],
})
export class TenantsModule implements OnModuleInit, NestModule {
  private readonly logger = new Logger(TenantsModule.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    // Initialize tenant schema on application startup
    try {
      await initTenantSchema(this.dataSource);
    } catch (error) {
      console.error('Failed to initialize tenant schema:', error);
    }
  }

  configure(consumer: MiddlewareConsumer) {
    this.logger.log('Configuring TenantMiddleware');

    // Apply tenant middleware to all routes
    consumer
        .apply(TenantMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });

    this.logger.log('TenantMiddleware configured for all routes');
  }
}