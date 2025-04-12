import { CreateUserDto } from './create-user.dto';
import { Role } from '../enums/role.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "department" | "firstName" | "lastName" | "phoneNumber">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    isActive?: boolean;
    isLocked?: boolean;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    role?: Role;
}
export {};
