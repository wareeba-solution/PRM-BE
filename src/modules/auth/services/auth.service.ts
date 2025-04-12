// src/modules/auth/services/auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, Logger, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { LoginDto } from '../dto/login.dto';
import { compare, hash } from 'bcrypt';
import { Organization, OrganizationStatus } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { TenantsService } from '../../tenants/services/tenants.service';
import { UserAccountService } from './user-account.service';
import { OrganizationsService } from '../../organizations/services/organizations.service';

// Define interfaces for token payloads and responses
interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
  organizationId: string;
  tenantId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(RefreshToken)
      private readonly refreshTokenRepository: Repository<RefreshToken>,
      @InjectRepository(Organization)
      private readonly organizationRepository: Repository<Organization>,
      @InjectRepository(Tenant)
      private readonly tenantRepository: Repository<Tenant>,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly tenantsService: TenantsService,
        private readonly userAccountService: UserAccountService,
        private readonly organizationsService: OrganizationsService,
    ) {}

    async login(loginDto: LoginDto): Promise<TokenPair & { isEmailVerified: boolean }> {
        const { email, password, organizationId } = loginDto;

        // Find user by email and organization
        const user = await this.usersService.findByEmail(email, organizationId);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isValidPassword = await this.usersService.validatePassword(user, password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }

        // Get tenant ID from user or request
        const tenantId = user.tenantId || loginDto.tenantId;

        if (!tenantId) {
            throw new BadRequestException('Tenant ID is required for authentication');
        }

        // Generate tokens with tenantId included
        const accessToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
                tenantId: tenantId // Include tenant ID in token
            },
            { expiresIn: '1h' }
        );

        const refreshToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
                tenantId: tenantId // Include tenant ID in token
            },
            { expiresIn: '7d' }
        );

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600,
            isEmailVerified: user.isEmailVerified
        };
    }




    async createBranch(createBranchDto: CreateBranchDto): Promise<TokenPair & { isEmailVerified: boolean, verificationToken?: string }> {
        // Delegate branch creation to UserAccountService
        const result = await this.userAccountService.createBranch(createBranchDto);

        // Generate tokens after successful branch creation
        const loginResult = await this.login({
            email: result.user.email,
            password: createBranchDto.user.password,
            organizationId: result.user.organizationId
        });

        return {
            ...loginResult,
            isEmailVerified: false, // New branch admins always start unverified
            verificationToken: result.verificationToken // Only included in development
        };
    }

    async refreshToken(refreshToken: string): Promise<TokenPair> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usersService.findById(payload.sub);

            if (!user) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Use tenantId from payload or from user
            const tenantId = payload.tenantId || user.tenantId;

            if (!tenantId) {
                throw new BadRequestException('Tenant ID is required for authentication');
            }

            const accessToken = this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId,
                    tenantId: tenantId // Include tenant ID in token
                },
                { expiresIn: '1h' }
            );

            const newRefreshToken = this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId,
                    tenantId: tenantId // Include tenant ID in token
                },
                { expiresIn: '7d' }
            );

            return {
                accessToken,
                refreshToken: newRefreshToken,
                expiresIn: 3600 // 1 hour in seconds
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async validateToken(token: string): Promise<TokenPayload> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async logout(refreshToken: string): Promise<void> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            await this.refreshTokenRepository.delete({ userId: payload.sub });
        } catch (error) {
            this.logger.error(`Error during logout: ${error.message}`);
        }
  }

  async checkOrganizationAccess(userId: string, organizationId: string): Promise<boolean> {
    const user = await this.userRepository.createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();
    if (!user) {
      return false;
    }
    return user.organizationId === organizationId;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const user = await this.userRepository.createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const permissions = [];
    permissions.push('user:read');

    if (user.role === Role.SUPER_ADMIN) {
      permissions.push('user:create', 'user:update', 'user:delete');
      permissions.push('organization:read', 'organization:update');
      permissions.push('billing:read', 'billing:update');
    } else if (user.role === Role.ADMIN) {
      permissions.push('user:create', 'user:update');
      permissions.push('organization:read');
      permissions.push('billing:read');
    }

    return permissions;
  }

  generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
  }

  extractPlatform(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'Mac';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  extractBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
    return 'Unknown';
  }

    async forgotPassword(email: string, tenantId: string) {
        try {
          // Verify tenant exists and is active
          const tenant = await this.tenantsService.findOne(tenantId);
          if (!tenant || !tenant.isActive) {
            throw new UnauthorizedException('Invalid or inactive tenant');
          }

          // Find user within the tenant
          const user = await this.usersService.findByEmail(email, tenantId);
          if (!user) {
            // Don't reveal if user exists or not
            return { message: 'If an account exists, password reset instructions have been sent' };
          }

          // Generate and send reset token
          await this.usersService.sendPasswordResetEmail(user);

          return { message: 'Password reset instructions sent to email' };
        } catch (error) {
          this.logger.error('Forgot password error:', error);
          throw error;
        }
    }

    async resetPassword(token: string, newPassword: string, tenantId: string) {
        try {
          // Verify tenant exists and is active
          const tenant = await this.tenantsService.findOne(tenantId);
          if (!tenant || !tenant.isActive) {
            throw new UnauthorizedException('Invalid or inactive tenant');
          }

          // Reset password
          await this.usersService.resetPassword(token, newPassword);

          return { message: 'Password reset successful' };
        } catch (error) {
          this.logger.error('Reset password error:', error);
          throw error;
        }
  }
}