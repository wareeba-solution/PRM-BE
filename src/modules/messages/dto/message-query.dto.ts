// src/modules/messages/dto/message-query.dto.ts

import { IsEnum, IsOptional, IsUUID, IsString, IsBoolean, IsDate, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageStatus } from '../enums/message-status.enum';
import { MessageType } from '../enums/message-type.enum';

export class MessageQueryDto {
  @IsEnum(MessageStatus, { each: true })
  @IsOptional()
  status?: MessageStatus;
  startDate?: Date;
    endDate?: Date;

  @IsEnum(MessageType, { each: true })
  @IsOptional()
  type?: MessageType;

  @IsUUID()
  @IsOptional()
  contactId?: string;

  @IsUUID()
  @IsOptional()
  senderId?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fromDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  toDate?: Date;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  // This is for internal use only, not exposed in API docs
  organizationId?: string;
}