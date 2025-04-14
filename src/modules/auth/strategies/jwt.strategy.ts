// src/modules/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
      private configService: ConfigService,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {
    // Fix: Use type assertion to bypass TypeScript checking
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    } as any); // Use type assertion to bypass the type checking
  }

  async validate(payload: any) {
    try {
      this.logger.debug(`JWT payload: ${JSON.stringify(payload)}`);

      if (!payload.sub) {
        this.logger.error('Missing sub in JWT payload');
        throw new UnauthorizedException('Invalid token format');
      }

      // Use a raw SQL query to get just the user data without relationships
      const user = await this.userRepository.createQueryBuilder('user')
          .select([
            'user.id',
            'user.email',
            'user.role',
            'user.organizationId',
            'user.tenantId',
            'user.isActive'
          ])
          .where('user.id = :id', { id: payload.sub })
          .getOne();

      if (!user) {
        this.logger.warn(`User not found with ID: ${payload.sub}`);
        throw new UnauthorizedException('User not found');
      }

      // Make sure organization ID from token is properly passed through
      const organizationId = payload.organizationId || user.organizationId;

      // Log for debugging
      this.logger.debug(`User authenticated: ${user.id}, Organization: ${organizationId}`);

      // Return user data with explicit properties
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: payload.tenantId || user.tenantId,
        organizationId: organizationId,
        isActive: user.isActive
      };
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }
}