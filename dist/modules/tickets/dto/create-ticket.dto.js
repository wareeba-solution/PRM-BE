var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEnum, IsUUID, IsOptional, IsArray, ValidateNested, IsBoolean, MaxLength, MinLength, IsObject, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export var TicketType;
(function (TicketType) {
    TicketType["GENERAL"] = "GENERAL";
    TicketType["TECHNICAL"] = "TECHNICAL";
    TicketType["BILLING"] = "BILLING";
    TicketType["MEDICAL"] = "MEDICAL";
    TicketType["APPOINTMENT"] = "APPOINTMENT";
    TicketType["ACCESS"] = "ACCESS";
    TicketType["COMPLAINT"] = "COMPLAINT";
    TicketType["FEEDBACK"] = "FEEDBACK";
})(TicketType || (TicketType = {}));
export var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "LOW";
    TicketPriority["NORMAL"] = "NORMAL";
    TicketPriority["HIGH"] = "HIGH";
    TicketPriority["URGENT"] = "URGENT";
})(TicketPriority || (TicketPriority = {}));
export var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["PENDING"] = "PENDING";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
    TicketStatus["ESCALATED"] = "ESCALATED";
    TicketStatus["REOPENED"] = "REOPENED";
    TicketStatus["DELETED"] = "DELETED";
})(TicketStatus || (TicketStatus = {}));
export var TicketSource;
(function (TicketSource) {
    TicketSource["WEB"] = "WEB";
    TicketSource["MOBILE"] = "MOBILE";
    TicketSource["EMAIL"] = "EMAIL";
    TicketSource["PHONE"] = "PHONE";
    TicketSource["CHAT"] = "CHAT";
    TicketSource["SYSTEM"] = "SYSTEM";
})(TicketSource || (TicketSource = {}));
export class TicketAttachment {
}
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(255),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileName", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileType", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileUrl", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileSize", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], TicketAttachment.prototype, "description", void 0);
export class CreateTicketDto {
    constructor() {
        this.priority = TicketPriority.NORMAL;
        this.source = TicketSource.WEB;
    }
}
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(5),
    MaxLength(200),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "title", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    MinLength(10),
    MaxLength(5000),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ enum: TicketType }),
    IsEnum(TicketType),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ enum: TicketPriority }),
    IsOptional(),
    IsEnum(TicketPriority),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
__decorate([
    ApiPropertyOptional({ enum: TicketSource }),
    IsOptional(),
    IsEnum(TicketSource),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "source", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "contactId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "departmentId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "assigneeId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "category", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subCategory", void 0);
__decorate([
    ApiPropertyOptional({ type: [TicketAttachment] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => TicketAttachment),
    __metadata("design:type", Array)
], CreateTicketDto.prototype, "attachments", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateTicketDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "referenceNumber", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "relatedTicketId", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateTicketDto.prototype, "customFields", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTicketDto.prototype, "isPrivate", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "internalNotes", void 0);
//# sourceMappingURL=create-ticket.dto.js.map