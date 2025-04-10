import { Repository } from 'typeorm';
import { UserActivity } from '../entities/user-activity.entity';
import { User } from '../entities/user.entity';
export declare enum ActivityType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    PASSWORD_CHANGE = "PASSWORD_CHANGE",
    PROFILE_UPDATE = "PROFILE_UPDATE",
    MFA_ENABLED = "MFA_ENABLED",
    MFA_DISABLED = "MFA_DISABLED",
    API_ACCESS = "API_ACCESS",
    SETTINGS_CHANGE = "SETTINGS_CHANGE",
    ROLE_CHANGE = "ROLE_CHANGE",
    DEPARTMENT_ASSIGNMENT = "DEPARTMENT_ASSIGNMENT",
    PERMISSION_CHANGE = "PERMISSION_CHANGE",
    EXPORT_DATA = "EXPORT_DATA",
    BULK_ACTION = "BULK_ACTION"
}
interface ActivityOptions {
    userId: string;
    organizationId?: string;
    type: ActivityType;
    description?: string;
    metadata?: Record<string, any>;
    ip?: string;
    userAgent?: string;
    referrer?: string;
    status?: 'SUCCESS' | 'FAILURE';
    failureReason?: string;
}
export declare class UserActivityService {
    private readonly activityRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(activityRepository: Repository<UserActivity>, userRepository: Repository<User>);
    /**
     * Log user activity
     */
    logActivity(options: ActivityOptions): Promise<UserActivity>;
    /**
     * Get user activity history
     */
    getUserActivity(userId: string, options?: {
        startDate?: Date;
        endDate?: Date;
        types?: ActivityType[];
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<[UserActivity[], number]>;
    /**
     * Get organization user activity
     */
    getOrganizationActivity(organizationId: string, options?: {
        startDate?: Date;
        endDate?: Date;
        types?: ActivityType[];
        userIds?: string[];
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<[UserActivity[], number]>;
    /**
     * Get activity summary for a user
     */
    getUserActivitySummary(userId: string, days?: number): Promise<Record<string, number>>;
    /**
     * Get most active users in organization
     */
    getMostActiveUsers(organizationId: string, options?: {
        startDate?: Date;
        endDate?: Date;
        limit?: number;
    }): Promise<Array<{
        userId: string;
        count: number;
    }>>;
    /**
     * Clean up old activity logs
     */
    cleanupOldLogs(retentionDays?: number): Promise<number>;
}
export {};
