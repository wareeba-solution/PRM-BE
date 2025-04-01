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
import { CreateNotificationDto } from './create-notification.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
export var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["SCHEDULED"] = "SCHEDULED";
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["DELIVERED"] = "DELIVERED";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["FAILED"] = "FAILED";
    NotificationStatus["CANCELLED"] = "CANCELLED";
    NotificationStatus["EXPIRED"] = "EXPIRED";
    NotificationStatus["PROCESSING"] = "PROCESSING";
    NotificationStatus["RETRY_PENDING"] = "RETRY_PENDING";
})(NotificationStatus || (NotificationStatus = {}));
export class UpdateNotificationDto extends PartialType(OmitType(CreateNotificationDto, ['type', 'recipients'])) {
}
__decorate([
    IsOptional(),
    IsEnum(NotificationStatus),
    __metadata("design:type", String)
], UpdateNotificationDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateNotificationDto.prototype, "read", void 0);
//# sourceMappingURL=update-notification.dto.js.map