var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketDto, TicketStatus } from './create-ticket.dto';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
export class UpdateTicketDto extends PartialType(OmitType(CreateTicketDto, ['type', 'source'])) {
}
__decorate([
    IsOptional(),
    IsEnum(TicketStatus),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "statusNote", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "resolution", void 0);
//# sourceMappingURL=update-ticket.dto.js.map