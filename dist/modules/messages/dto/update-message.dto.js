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
exports.UpdateMessageDto = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/dto/update-message.dto.ts
const swagger_1 = require("@nestjs/swagger");
const create_message_dto_1 = require("./create-message.dto");
const create_message_dto_2 = require("./create-message.dto");
const class_validator_1 = require("class-validator");
class UpdateMessageDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_message_dto_1.CreateMessageDto, ['type', 'contactId'])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: false, enum: require("./create-message.dto").MessageStatus }, subject: { required: false, type: () => String }, metadata: { required: false, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_message_dto_2.MessageStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_message_dto_2.MessageStatus),
    __metadata("design:type", String)
], UpdateMessageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMessageDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateMessageDto.prototype, "metadata", void 0);
exports.UpdateMessageDto = UpdateMessageDto;
//# sourceMappingURL=update-message.dto.js.map