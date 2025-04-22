import { Organization } from '../../organizations/entities/organization.entity';
export declare class EmailVerification {
    id: string;
    userId: string;
    email: string;
    token: string;
    organizationId?: string;
    organization: Promise<Organization>;
    createdAt: Date;
    expiresAt: Date;
    verifiedAt?: Date;
    isVerified: boolean;
}
