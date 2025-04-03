"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateDto = exports.TemplateVariablesDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/dto/message-template.dto.ts
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const message_type_enum_1 = require("../enums/message-type.enum");
// This class represents variables that can be used in templates
class TemplateVariablesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contact: { required: false, type: () => Object }, organization: { required: false, type: () => Object }, custom: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Contact variables' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Organization variables' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Custom variables' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], TemplateVariablesDto.prototype, "custom", void 0);
exports.TemplateVariablesDto = TemplateVariablesDto;
class MessageTemplateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, type: { required: true, enum: require("../enums/message-type.enum").MessageType }, subject: { required: false, type: () => String }, content: { required: true, type: () => String }, variables: { required: false, type: () => require("./message-template.dto").TemplateVariablesDto }, isDefault: { required: false, type: () => Boolean }, category: { required: false, type: () => String }, organizationId: { required: false, type: () => String }, createdBy: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message type', enum: message_type_enum_1.MessageType }),
    (0, class_validator_1.IsEnum)(message_type_enum_1.MessageType),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template subject (for email)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template content' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Template variables' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TemplateVariablesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TemplateVariablesDto)
], MessageTemplateDto.prototype, "variables", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is this a default template?' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MessageTemplateDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Category or tag for the template' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageTemplateDto.prototype, "category", void 0);
exports.MessageTemplateDto = MessageTemplateDto;
//# sourceMappingURL=message-template.dto.js.map