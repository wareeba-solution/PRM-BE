import { TemplateType } from '../entities/message-template.entity';
export declare class CreateMessageTemplateDto {
    name: string;
    type: TemplateType;
    content: string;
    description?: string;
    isActive?: boolean;
}
