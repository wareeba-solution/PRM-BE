import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { TemplateType } from '../entities/message-template.entity';

export class CreateMessageTemplateDto {
    @IsString()
    name: string;

    @IsEnum(TemplateType)
    type: TemplateType;

    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 