var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID, IsString, IsBoolean, IsDate, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageStatus } from '../enums/message-status.enum';
import { MessageType } from '../enums/message-type.enum';
export class MessageQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
__decorate([
    ApiPropertyOptional({ description: 'Filter by message status' }),
    IsEnum(MessageStatus, { each: true }),
    IsOptional(),
    __metadata("design:type", String)
], MessageQueryDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by message type' }),
    IsEnum(MessageType, { each: true }),
    IsOptional(),
    __metadata("design:type", String)
], MessageQueryDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by contact ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], MessageQueryDto.prototype, "contactId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by sender ID' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], MessageQueryDto.prototype, "senderId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Search messages by content' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MessageQueryDto.prototype, "search", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter by read status' }),
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], MessageQueryDto.prototype, "isRead", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter messages from date', type: Date }),
    Type(() => Date),
    IsDate(),
    IsOptional(),
    __metadata("design:type", Date)
], MessageQueryDto.prototype, "fromDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Filter messages to date', type: Date }),
    Type(() => Date),
    IsDate(),
    IsOptional(),
    __metadata("design:type", Date)
], MessageQueryDto.prototype, "toDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Page number for pagination', default: 1 }),
    Type(() => Number),
    IsInt(),
    Min(1),
    IsOptional(),
    __metadata("design:type", Number)
], MessageQueryDto.prototype, "page", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Items per page for pagination', default: 10 }),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(100),
    IsOptional(),
    __metadata("design:type", Number)
], MessageQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=message-query.dto.js.map