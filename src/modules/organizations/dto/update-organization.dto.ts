// src/modules/organizations/dto/update-organization.dto.ts

import { CreateOrganizationDto } from './create-organization.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateOrganizationDto extends PartialType(
    OmitType(CreateOrganizationDto, ['subscriptionPlan'] as const)
) {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;
}