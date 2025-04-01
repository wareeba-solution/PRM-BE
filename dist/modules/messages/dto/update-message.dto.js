var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PartialType, OmitType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMessageDto } from './create-message.dto';
import { MessageStatus } from './create-message.dto';
import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
export class UpdateMessageDto extends PartialType(OmitType(CreateMessageDto, ['type', 'contactId'])) {
}
__decorate([
    ApiPropertyOptional({ enum: MessageStatus }),
    IsOptional(),
    IsEnum(MessageStatus),
    __metadata("design:type", String)
], UpdateMessageDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateMessageDto.prototype, "subject", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], UpdateMessageDto.prototype, "metadata", void 0);
//# sourceMappingURL=update-message.dto.js.map