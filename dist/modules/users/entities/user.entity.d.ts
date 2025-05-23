import { Role } from '../enums/role.enum';
import { Organization } from '../../organizations/entities/organization.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Message } from '../../messages/entities/message.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { UserActivity } from './user-activity.entity';
import { UserProfile } from './user-profile.entity';
import { UserVerification } from './user-verification.entity';
import { UserSettings } from './user-settings.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
export declare class User {
    id: string;
    tenantId: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    permissions: string[];
    isActive: boolean;
    isLocked: boolean;
    isEmailVerified: boolean;
    requirePasswordChange: boolean;
    lastLoginAt?: Date;
    lastActiveAt?: Date;
    createdById: string;
    updatedById?: string;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    passwordResetToken?: string;
    passwordResetExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    tenant: Tenant;
    organization: Organization;
    createdBy: Promise<User>;
    updatedBy?: Promise<User>;
    profile: Promise<UserProfile>;
    verification: Promise<UserVerification>;
    settings: Promise<UserSettings>;
    assignedTickets: Promise<Ticket[]>;
    createdTickets: Promise<Ticket[]>;
    messages: Promise<Message[]>;
    appointments: Promise<Appointment[]>;
    notifications: Promise<Notification[]>;
    activities: Promise<UserActivity[]>;
    get fullName(): string;
    get isAvailable(): boolean;
    normalizeEmail(): void;
}
