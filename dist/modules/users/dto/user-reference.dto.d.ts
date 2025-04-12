import { User } from '../entities/user.entity';
export declare class UserReferenceDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    static fromUser(user: User): UserReferenceDto;
}
