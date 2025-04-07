// src/modules/messages/dto/message-template.dto.ts

import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageType } from '../enums/message-type.enum';

// This class represents variables that can be used in templates
export class TemplateVariablesDto {
  @IsObject()
  @IsOptional()
  contact?: Record<string, any>;

  @IsObject()
  @IsOptional()
  organization?: Record<string, any>;

  @IsObject()
  @IsOptional()
  custom?: Record<string, any>;
}

export class MessageTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => TemplateVariablesDto)
  @IsOptional()
  variables?: TemplateVariablesDto;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @IsString()
  @IsOptional()
  category?: string;

  // These fields will be set by the service
  organizationId?: string;
  createdBy?: string;
}