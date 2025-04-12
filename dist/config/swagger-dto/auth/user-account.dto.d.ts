import { Role } from '../../../modules/users/enums/role.enum';
import { SubscriptionPlan } from '../../../modules/organizations/dto/create-organization.dto';
export declare class RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    phone?: string;
}
export declare class RegisterOrganizationDto {
    name: string;
    description?: string;
    subscriptionPlan: SubscriptionPlan;
}
export declare class RegisterDto {
    user: RegisterUserDto;
    organization: RegisterOrganizationDto;
    tenantId?: string;
}
export declare class VerifyEmailDto {
    token: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
