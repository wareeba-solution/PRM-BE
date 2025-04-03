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
exports.CreateTicketDto = exports.TicketAttachment = exports.TicketSource = exports.TicketStatus = exports.TicketPriority = exports.TicketType = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/tickets/dto/create-ticket.dto.ts
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var TicketType;
(function (TicketType) {
    TicketType["GENERAL"] = "GENERAL";
    TicketType["TECHNICAL"] = "TECHNICAL";
    TicketType["BILLING"] = "BILLING";
    TicketType["MEDICAL"] = "MEDICAL";
    TicketType["APPOINTMENT"] = "APPOINTMENT";
    TicketType["ACCESS"] = "ACCESS";
    TicketType["COMPLAINT"] = "COMPLAINT";
    TicketType["FEEDBACK"] = "FEEDBACK";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "LOW";
    TicketPriority["NORMAL"] = "NORMAL";
    TicketPriority["HIGH"] = "HIGH";
    TicketPriority["URGENT"] = "URGENT";
})(TicketPriority = exports.TicketPriority || (exports.TicketPriority = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["PENDING"] = "PENDING";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
    TicketStatus["ESCALATED"] = "ESCALATED";
    TicketStatus["REOPENED"] = "REOPENED";
    TicketStatus["DELETED"] = "DELETED";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
var TicketSource;
(function (TicketSource) {
    TicketSource["WEB"] = "WEB";
    TicketSource["MOBILE"] = "MOBILE";
    TicketSource["EMAIL"] = "EMAIL";
    TicketSource["PHONE"] = "PHONE";
    TicketSource["CHAT"] = "CHAT";
    TicketSource["SYSTEM"] = "SYSTEM";
})(TicketSource = exports.TicketSource || (exports.TicketSource = {}));
class TicketAttachment {
    static _OPENAPI_METADATA_FACTORY() {
        return { fileName: { required: true, type: () => String, maxLength: 255 }, fileType: { required: true, type: () => String, maxLength: 50 }, fileUrl: { required: true, type: () => String }, fileSize: { required: false, type: () => String }, description: { required: false, type: () => String, maxLength: 500 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], TicketAttachment.prototype, "description", void 0);
exports.TicketAttachment = TicketAttachment;
class CreateTicketDto {
    constructor() {
        this.priority = TicketPriority.NORMAL;
        this.source = TicketSource.WEB;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, minLength: 5, maxLength: 200 }, description: { required: true, type: () => String, minLength: 10, maxLength: 5000 }, type: { required: true, enum: require("./create-ticket.dto").TicketType }, priority: { required: false, default: TicketPriority.NORMAL, enum: require("./create-ticket.dto").TicketPriority }, source: { required: false, default: TicketSource.WEB, enum: require("./create-ticket.dto").TicketSource }, contactId: { required: false, type: () => String, format: "uuid" }, departmentId: { required: false, type: () => String, format: "uuid" }, assigneeId: { required: false, type: () => String, format: "uuid" }, category: { required: false, type: () => String, maxLength: 100 }, subCategory: { required: false, type: () => String, maxLength: 100 }, attachments: { required: false, type: () => [require("./create-ticket.dto").TicketAttachment] }, tags: { required: false, type: () => [String] }, referenceNumber: { required: false, type: () => String, maxLength: 100 }, relatedTicketId: { required: false, type: () => String, format: "uuid" }, isPrivate: { required: false, type: () => Boolean }, internalNotes: { required: false, type: () => String, maxLength: 1000 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: TicketType }),
    (0, class_validator_1.IsEnum)(TicketType),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TicketPriority }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TicketPriority),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: TicketSource }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TicketSource),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "contactId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TicketAttachment] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TicketAttachment),
    __metadata("design:type", Array)
], CreateTicketDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTicketDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "referenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "relatedTicketId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateTicketDto.prototype, "customFields", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketDto.prototype, "isPrivate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "internalNotes", void 0);
exports.CreateTicketDto = CreateTicketDto;
//# sourceMappingURL=create-ticket.dto.js.map