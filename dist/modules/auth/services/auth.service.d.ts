import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { LoginDto } from '../dto/login.dto';
import { Organization } from '../../organizations/entities/organization.entity';
import { Role } from '../../users/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { TenantsService } from '../../tenants/services/tenants.service';
import { UserAccountService } from './user-account.service';
import { OrganizationsService } from '../../organizations/services/organizations.service';
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
export declare class AuthService {
    private readonly userRepository;
    private readonly refreshTokenRepository;
    private readonly organizationRepository;
    private readonly tenantRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    private readonly tenantsService;
    private readonly userAccountService;
    private readonly organizationsService;
    private readonly logger;
    constructor(userRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>, organizationRepository: Repository<Organization>, tenantRepository: Repository<Tenant>, jwtService: JwtService, configService: ConfigService, usersService: UsersService, tenantsService: TenantsService, userAccountService: UserAccountService, organizationsService: OrganizationsService);
    login(loginDto: LoginDto): Promise<TokenPair & {
        isEmailVerified: boolean;
    }>;
    createBranch(createBranchDto: CreateBranchDto): Promise<TokenPair & {
        isEmailVerified: boolean;
        verificationToken?: string;
    }>;
    refreshToken(refreshToken: string): Promise<TokenPair>;
    validateToken(token: string): Promise<TokenPayload>;
    logout(refreshToken: string): Promise<void>;
    checkOrganizationAccess(userId: string, organizationId: string): Promise<boolean>;
    getUserPermissions(userId: string): Promise<string[]>;
    generateSlug(name: string): string;
    extractPlatform(userAgent: string): string;
    extractBrowser(userAgent: string): string;
    forgotPassword(email: string, tenantId: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string, tenantId: string): Promise<{
        message: string;
    }>;
}
export {};
