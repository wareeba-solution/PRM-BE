import { Role } from '../../users/enums/role.enum';
import { SubscriptionPlan } from '../../organizations/enums/subscription-plan.enum';
export declare class BranchAddressDto {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export declare class BranchAdminDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
}
export declare class BranchDetailsDto {
    name: string;
    website?: string;
    phone?: string;
    address?: BranchAddressDto;
    subscriptionPlan?: SubscriptionPlan;
}
export declare class CreateBranchDto {
    user: BranchAdminDto;
    organization: BranchDetailsDto;
    tenantId?: string;
}
export interface CreateBranchResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        organizationId: string;
    };
    branch: {
        id: string;
        name: string;
        subscriptionPlan: string;
        status: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
    isEmailVerified: boolean;
    verificationToken?: string;
}
