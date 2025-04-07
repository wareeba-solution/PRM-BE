// src/modules/users/dto/update-user.dto.ts

import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsEnum, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { Role } from '../enums/role.enum';

export class UpdateUserDto extends PickType(CreateUserDto, [
    'firstName',
    'lastName',
    'phoneNumber',
    'department'
] as const) {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isLocked?: boolean;

    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;

    @IsOptional()
    @IsBoolean()
    isPhoneVerified?: boolean;
    
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}