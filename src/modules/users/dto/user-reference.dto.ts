import { User } from '../entities/user.entity';

export class UserReferenceDto {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    static fromUser(user: User): UserReferenceDto {
        const reference = new UserReferenceDto();
        reference.id = user.id;
        reference.firstName = user.firstName;
        reference.lastName = user.lastName;
        reference.email = user.email;
        return reference;
    }
} 