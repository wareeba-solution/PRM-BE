// src/modules/auth/services/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { compare, hash } from 'bcrypt';
import { Organization, OrganizationStatus, SubscriptionTier } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { JwtPayload } from '../../../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { UserSettings } from '../../users/entities/user-settings.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) { }

  /**
   * Checks if a token has been blacklisted
   * @param token The JWT token to check
   * @returns boolean True if the token is blacklisted, false otherwise
   */
  isTokenBlacklisted(token: string): boolean {
    // In a real implementation, you would:
    // 1. Either check a cache (Redis) or database table for blacklisted tokens
    // 2. Or verify against a token revocation list
    
    // For now, return false as a placeholder
    // You can implement token blacklisting using the refresh token repository
    // by checking if there's a revoked token matching this one
    
    // Example implementation (uncomment and adapt when you have the proper setup):
    /*
    try {
      const decodedToken = this.jwtService.decode(token) as JwtPayload;
      if (!decodedToken || !decodedToken.sessionId) {
        return false;
      }
      
      // Check if a refresh token with this session ID has been revoked
      const revokedToken = this.refreshTokenRepository.findOne({
        where: {
          sessionId: decodedToken.sessionId,
          isRevoked: true
        }
      });
      
      return !!revokedToken;
    } catch (error) {
      // If we can't decode the token, assume it's not blacklisted
      return false;
    }
    */
    
    return false;
  }

  /**
   * Determines if email verification is required
   * @returns boolean True if email verification is required, false otherwise
   */
  get requireEmailVerification(): boolean {
    // Read this from your application config
    // You might want different settings for different environments
    const requireVerification = this.configService?.get<boolean>('EMAIL_VERIFICATION_REQUIRED') ?? true;
    return requireVerification;
  }

  async checkOrganizationAccess(userId: string, organizationId: string): Promise<boolean> {
    // Check if the user has access to the organization
    const user = await this.usersService.findById(userId);
    return user?.organizationId === organizationId;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    // Implement the logic to get user permissions
    // This is a placeholder implementation
    return ['permission1', 'permission2'];
  }

  async checkResourceOwnership(userId: string, resourceId: string, resourceType: string): Promise<boolean> {
    // Implement the logic to check resource ownership
    // For example, query the database to verify ownership
    return true; // or false based on the check
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['organization'],
    });

    if (user && (await compare(password, user.password))) {
      // Use destructuring to exclude the password field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto, metadata: { userAgent: string; ip: string }) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify organization subscription status
    const organization = await this.organizationRepository.findOne({
      where: { id: user.organizationId },
    });

    if (!organization) {
      throw new UnauthorizedException('Organization not found');
    }

    if (!organization.isSubscriptionActive) {
      throw new UnauthorizedException('Organization subscription is inactive');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      organizationId: organization.id,
      permissions: [],
      sessionId: uuidv4(),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(user.id, metadata);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        organizationId: organization.id,
      },
    };
  }

  async register(registerDto: RegisterDto, metadata: { userAgent: string; ip: string }) {
    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.user.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Create organization
    const organization = new Organization();
    organization.name = registerDto.organization.name;
    organization.slug = this.generateSlug(registerDto.organization.name);
    organization.status = OrganizationStatus.ACTIVE;
    organization.isSubscriptionActive = true;
    organization.subscriptionTier = SubscriptionTier.FREE;
    organization.subscriptionExpiresAt = new Date();
    organization.subscriptionExpiresAt.setFullYear(
      organization.subscriptionExpiresAt.getFullYear() + 1,
    );

    const savedOrganization = await this.organizationRepository.save(organization);

    // Create user
    const user = new User();
    user.email = registerDto.user.email;
    user.password = await hash(registerDto.user.password, 10);
    user.firstName = registerDto.user.firstName;
    user.lastName = registerDto.user.lastName;
    user.role = registerDto.user.role || Role.ADMIN;
    user.organizationId = savedOrganization.id;
    user.isActive = true;
    user.isEmailVerified = false;
    user.lastLoginAt = new Date();

    // System created
    const savedUser = await this.userRepository.save(user);

    // Create user settings
    const settings = new UserSettings();
    settings.userId = savedUser.id;
    settings.phone = registerDto.user.phone;
    settings.notificationPreferences = {
      email: true,
      sms: !!registerDto.user.phone,
      inApp: true,
      push: false
    };
    settings.metadata = {
      platform: this.extractPlatform(metadata.userAgent),
      browser: this.extractBrowser(metadata.userAgent),
      lastLoginIp: metadata.ip,
      lastUsed: new Date()
    };
    await this.userSettingsRepository.save(settings);

    // Generate tokens
    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
      organizationId: savedOrganization.id,
      permissions: [],
      sessionId: uuidv4(),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(savedUser.id, metadata);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
        organizationId: savedOrganization.id,
      },
    };
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!refreshToken || refreshToken.isExpired() || refreshToken.isRevoked) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Update last used timestamp
    refreshToken.updateLastUsed();
    await this.refreshTokenRepository.save(refreshToken);

    const user = await this.userRepository.findOne({
      where: { id: refreshToken.userId }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayload = {
      sub: refreshToken.userId,
      email: user.email,
      role: user.role,
      organizationId: refreshToken.organizationId || user.organizationId,
      permissions: [],
      sessionId: uuidv4(),
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async generateRefreshToken(userId: string, metadata: { userAgent: string; ip: string }) {
    const refreshToken = new RefreshToken();
    refreshToken.userId = userId;
    refreshToken.token = uuidv4();
    refreshToken.expiresAt = new Date();
    refreshToken.expiresAt.setDate(refreshToken.expiresAt.getDate() + 7); // 7 days
    refreshToken.userAgent = metadata.userAgent;
    refreshToken.ipAddress = metadata.ip;
    refreshToken.isRevoked = false;
    refreshToken.createdAt = new Date();
    refreshToken.updatedAt = new Date();

    return this.refreshTokenRepository.save(refreshToken);
  }

  async logout(userId: string) {
    await this.refreshTokenRepository.update(
      { userId },
      { isRevoked: true, revokedAt: new Date(), revokedReason: 'User logout' }
    );
    return { message: 'Logged out successfully' };
  }

  async validateOrganizationAccess(userId: string, organizationId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['organization'],
    });
    return user?.organizationId === organizationId;
  }

  // Helper methods
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  private extractPlatform(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'windows';
    if (userAgent.includes('Mac')) return 'mac';
    if (userAgent.includes('Linux')) return 'linux';
    if (userAgent.includes('Android')) return 'android';
    if (userAgent.includes('iOS')) return 'ios';
    return 'unknown';
  }

  private extractBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    if (userAgent.includes('Edge')) return 'edge';
    if (userAgent.includes('Opera')) return 'opera';
    return 'unknown';
  }

  // Password reset methods
  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return;
    }

    // Generate reset token
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // 1 hour expiry

    // Save reset token to user
    user.passwordResetToken = resetToken;
    user.passwordResetExpiresAt = resetTokenExpiry;
    await this.userRepository.save(user);

    // Send email with reset link
    // This would typically use a mail service
    console.log(`Password reset link: https://your-app.com/reset-password?token=${resetToken}`);
  }

  async changePassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    if (user.passwordResetExpiresAt < new Date()) {
      throw new UnauthorizedException('Reset token has expired');
    }

    // Update password
    user.password = await hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;
    await this.userRepository.save(user);
  }

  // Email verification methods
  async confirmEmail(token: string): Promise<void> {
    // Validate token and confirm email logic would go here
    // This is a placeholder implementation
  }

  async sendVerificationEmail(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // Generate verification token, save it, and send email logic would go here
    // This is a placeholder implementation
  }
}