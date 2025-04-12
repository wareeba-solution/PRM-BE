// src/modules/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TenantsService } from '../../tenants/services/tenants.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
      private configService: ConfigService,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly tenantsService: TenantsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      // Log for debugging
      this.logger.debug(`JWT payload: ${JSON.stringify(payload)}`);

      if (!payload.sub) {
        this.logger.error('Missing sub in JWT payload');
        throw new UnauthorizedException('Invalid token format');
      }

      // Verify that tenantId is in the payload
      if (!payload.tenantId) {
        this.logger.error('Missing tenantId in JWT payload');
        throw new UnauthorizedException('Invalid token format: missing tenant context');
      }

      // Verify that the tenant exists and is active
      try {
        const tenant = await this.tenantsService.findOne(payload.tenantId);
        if (!tenant || !tenant.isActive) {
          this.logger.warn(`Invalid or inactive tenant in token: ${payload.tenantId}`);
          throw new UnauthorizedException('Invalid or inactive tenant');
        }
      } catch (error) {
        this.logger.error(`Error verifying tenant from token: ${error.message}`);
        throw new UnauthorizedException('Invalid tenant context');
      }

      // Find the user with ID only first, to provide better error messages
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        this.logger.warn(`User not found with ID: ${payload.sub}`);
        throw new UnauthorizedException('User not found');
      }

      // Return user data to be attached to request, including tenantId from token
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: payload.tenantId, // Use tenantId from token
        organizationId: user.organizationId,
        permissions: payload.permissions || user.permissions || []
      };
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}