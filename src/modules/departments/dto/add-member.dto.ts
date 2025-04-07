import { IsNotEmpty, IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';

export enum DepartmentMemberRole {
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  MEMBER = 'MEMBER'
}

export class AddMemberDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsEnum(DepartmentMemberRole)
  role: DepartmentMemberRole;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  responsibilities?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}