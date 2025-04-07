// src/modules/messages/dto/update-message.dto.ts

import { CreateMessageDto } from './create-message.dto';
import { MessageStatus } from './create-message.dto';
import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateMessageDto extends PartialType(
    OmitType(CreateMessageDto, ['type', 'contactId'] as const)
) {
    @IsOptional()
    @IsEnum(MessageStatus)
    status?: MessageStatus;

    // Explicitly add subject even though it should be inherited
    @IsOptional()
    @IsString()
    subject?: string;

    // Explicitly add metadata even though it should be inherited
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}