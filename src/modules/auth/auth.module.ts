// src/modules/auth/auth.module.ts

import { Module, forwardRef, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserAccountService } from './services/user-account.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { UserSettings } from '../users/entities/user-settings.entity';
import { UserVerification } from '../users/entities/user-verification.entity';
import { UsersModule } from '../users/users.module';
import { Tenant } from '../tenants/entities/tenant.entity';
import { TenantsModule } from '../tenants/tenants.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { DomainModule } from '../domain/domain.module';
import { EmailModule } from '../email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken, Organization, UserSettings, UserVerification, Tenant]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          const logger = new Logger('AuthModule');
          logger.error('JWT_SECRET environment variable is not set');
          throw new Error('JWT_SECRET environment variable is not set');
        }

        // Using a very long expiration time for debugging purposes
        return {
          secret,
          signOptions: {
            expiresIn: '30d', // Set to 30 days for debugging
          }
        };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => TenantsModule),
    forwardRef(() => OrganizationsModule),
    forwardRef(() => DomainModule),
    forwardRef(() => EmailModule),
    forwardRef(() => NotificationsModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserAccountService,
    JwtStrategy
  ],
  exports: [AuthService, UserAccountService, JwtStrategy, JwtModule],
})
export class AuthModule {}