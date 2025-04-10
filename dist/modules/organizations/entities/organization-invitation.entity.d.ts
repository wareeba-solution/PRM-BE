import { Organization } from './organization.entity';
import { User } from '../../users/entities/user.entity';
export declare enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
    EXPIRED = "EXPIRED",
    REVOKED = "REVOKED"
}
export declare class OrganizationInvitation {
    id: string;
    organizationId: string;
    organization: Organization;
    email: string;
    roles: string[];
    invitedById: string;
    invitedBy: User;
    invitedUserId: string;
    invitedUser: User;
    token: string;
    expiresAt: Date;
    status: InvitationStatus;
    departmentIds: string[];
    acceptedAt: Date;
    declinedAt: Date;
    revokedAt: Date;
    revokedById: string;
    revokedBy: User;
    message: string;
    metadata: Record<string, any>;
    isResent: boolean;
    lastResentAt: Date;
    resendCount: number;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Check if invitation has expired
     */
    isExpired(): boolean;
    /**
     * Check if invitation can be resent
     */
    canBeResent(): boolean;
    /**
     * Check if invitation can be accepted
     */
    canBeAccepted(): boolean;
    /**
     * Check if invitation can be revoked
     */
    canBeRevoked(): boolean;
}
