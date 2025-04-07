import { BaseDto } from '../base.dto';
/**
 * Contact DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class ContactDto extends BaseDto {
    organizationId: string;
    type: string;
    status?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
    email?: string;
    phoneNumber?: string;
    alternativePhoneNumber?: string;
    gender?: string;
    dateOfBirth?: Date;
    bloodType: string;
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
        phoneNumber: string;
        address?: string;
    };
    allergies?: string[];
    medications?: string[];
    occupation?: string;
    notes?: string;
    customFields?: Record<string, any>;
    isActive: boolean;
    lastVisitDate?: Date;
    nextAppointmentDate?: Date;
    metadata?: Record<string, any>;
    fullName: string;
    age?: number;
}
