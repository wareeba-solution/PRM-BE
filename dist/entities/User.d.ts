import { UserSpecialization } from './UserSpecialization';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    specializations: UserSpecialization[];
}
