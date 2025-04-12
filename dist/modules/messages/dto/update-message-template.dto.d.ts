import { TemplateType } from '../entities/message-template.entity';
export declare class UpdateMessageTemplateDto {
    name?: string;
    type?: TemplateType;
    content?: string;
    description?: string;
    isActive?: boolean;
}
