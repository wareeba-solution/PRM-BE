import { User } from './user.entity';
export declare class UserProfile {
    id: string;
    userId: string;
    user: User;
    title?: string;
    department?: string;
    employeeId?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
        address?: string;
    };
    licenseNumber?: string;
    specialization?: string;
    qualifications?: string[];
    certifications?: string[];
    isOnCall: boolean;
    languages?: string[];
    preferences?: {
        theme?: string;
        notifications?: {
            email?: boolean;
            sms?: boolean;
            inApp?: boolean;
        };
        timezone?: string;
        language?: string;
    };
    metadata?: Record<string, any>;
    avatar?: string;
    signature?: string;
    createdAt: Date;
    updatedAt: Date;
}
