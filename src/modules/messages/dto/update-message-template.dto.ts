import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { TemplateType } from '../entities/message-template.entity';

export class UpdateMessageTemplateDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(TemplateType)
    @IsOptional()
    type?: TemplateType;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 