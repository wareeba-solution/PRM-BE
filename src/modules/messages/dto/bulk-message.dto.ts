// src/modules/messages/dto/bulk-message.dto.ts

import { CreateMessageDto } from './create-message.dto';
import { IsNotEmpty, IsString, IsArray, IsUUID, IsOptional, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageType } from '../enums/message-type.enum';

// Optionally define attachment info if your system supports attachments
export class AttachmentDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class BulkMessageDto {
  @IsArray()
  @IsUUID('4', { each: true })
  contactIds: string[];
  messageData: CreateMessageDto;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsUUID('4')
  @IsOptional()
  templateId?: string;

  @IsObject()
  @IsOptional()
  variables?: Record<string, any>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsOptional()
  attachments?: AttachmentDto[];

  @IsString()
  @IsOptional()
  scheduledFor?: string;

  // These fields will be set by the service
  organizationId?: string;
  senderId?: string;


  
}