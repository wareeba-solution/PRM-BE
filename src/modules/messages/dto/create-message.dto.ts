// src/modules/messages/dto/create-message.dto.ts

import { 
    IsString, 
    IsEnum, 
    IsUUID, 
    IsOptional, 
    IsArray, 
    ValidateNested,
    IsBoolean,
    IsNotEmpty,
    MaxLength,
    IsISO8601,
    IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum MessageType {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    WHATSAPP = 'WHATSAPP',
    INTERNAL_NOTE = 'INTERNAL_NOTE',
}

export enum MessagePriority {
    LOW = 'LOW',
    NORMAL = 'NORMAL',
    HIGH = 'HIGH',
    URGENT = 'URGENT',
}

export enum MessageStatus {
    DRAFT = 'DRAFT',
    QUEUED = 'QUEUED',
    SENDING = 'SENDING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    FAILED = 'FAILED',
    SCHEDULED = 'SCHEDULED',
    DELIVERING = 'DELIVERING',
    PENDING = 'PENDING',
}

export class Attachment {
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    fileType: string;

    @IsString()
    @IsNotEmpty()
    fileUrl: string;

    @IsOptional()
    @IsString()
    fileSize?: string;
}

export class EmailOptions {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsOptional()
    @IsString()
    cc?: string;

    @IsOptional()
    @IsString()
    bcc?: string;

    @IsOptional()
    @IsBoolean()
    trackOpens?: boolean;

    @IsOptional()
    @IsBoolean()
    trackClicks?: boolean;
}

export class CreateMessageDto {
    @IsEnum(MessageType)
    type: MessageType;

    @IsUUID()
    contactId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5000)
    content: string;

    @IsOptional()
    @IsEnum(MessagePriority)
    priority?: MessagePriority = MessagePriority.NORMAL;

    @IsOptional()
    @IsEnum(MessageStatus)
    status?: MessageStatus = MessageStatus.QUEUED;

    @IsOptional()
    @IsISO8601()
    scheduledFor?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => EmailOptions)
    emailOptions?: EmailOptions;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Attachment)
    attachments?: Attachment[];

    @IsOptional()
    @IsString()
    templateId?: string;

    @IsOptional()
    @IsBoolean()
    requireConfirmation?: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    notes?: string;

    @IsOptional()
    @IsString()
    externalId?: string;

    @IsOptional()
    @IsString()
    subject?: string;


    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}