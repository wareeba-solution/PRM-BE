import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "email" | "password">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    isActive?: boolean;
    isLocked?: boolean;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
}
export {};
