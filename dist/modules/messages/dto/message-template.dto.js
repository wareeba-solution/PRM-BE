var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageType } from '../enums/message-type.enum';
export class TemplateVariablesDto {
}
__decorate([
    ApiPropertyOptional({ description: 'Contact variables' }),
    IsObject(),
    IsOptional(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "contact", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Organization variables' }),
    IsObject(),
    IsOptional(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "organization", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Custom variables' }),
    IsObject(),
    IsOptional(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "custom", void 0);
export class MessageTemplateDto {
}
__decorate([
    ApiProperty({ description: 'Template name' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: 'Template description' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ description: 'Message type', enum: MessageType }),
    IsEnum(MessageType),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: 'Template subject (for email)' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "subject", void 0);
__decorate([
    ApiProperty({ description: 'Template content' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "content", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Template variables' }),
    ValidateNested(),
    Type(() => TemplateVariablesDto),
    IsOptional(),
    __metadata("design:type", TemplateVariablesDto)
], MessageTemplateDto.prototype, "variables", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Is this a default template?' }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], MessageTemplateDto.prototype, "isDefault", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Category or tag for the template' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "category", void 0);
//# sourceMappingURL=message-template.dto.js.map