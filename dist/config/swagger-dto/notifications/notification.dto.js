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
exports.NotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_dto_1 = require("../base.dto");
/**
 * Notification DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
class NotificationDto extends base_dto_1.BaseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization ID this notification belongs to',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID this notification is for',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid'
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the notification',
        example: 'New appointment scheduled'
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content of the notification',
        example: 'You have a new appointment scheduled for tomorrow at 10:00 AM.'
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of notification',
        example: 'APPOINTMENT',
        enum: ['APPOINTMENT', 'MESSAGE', 'TICKET', 'SYSTEM', 'OTHER']
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the notification has been read',
        example: false,
        default: false
    }),
    __metadata("design:type", Boolean)
], NotificationDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the notification was read',
        example: null,
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], NotificationDto.prototype, "readAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference ID related to this notification (e.g., appointment ID)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reference type for this notification',
        example: 'APPOINTMENT',
        enum: ['APPOINTMENT', 'MESSAGE', 'TICKET', 'USER', 'CONTACT', 'OTHER'],
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to navigate to when clicking on the notification',
        example: '/appointments/550e8400-e29b-41d4-a716-446655440000',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "actionUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Priority level of the notification',
        example: 'NORMAL',
        enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
        default: 'NORMAL'
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Icon to display with the notification',
        example: 'calendar',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], NotificationDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for the notification',
        example: {
            appointmentTime: '2023-05-15T10:00:00.000Z',
            patientName: 'John Doe',
            location: 'Main Office'
        },
        required: false,
        nullable: true
    }),
    __metadata("design:type", Object)
], NotificationDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Channels this notification was sent through',
        example: ['APP', 'EMAIL'],
        type: [String],
        required: false,
        nullable: true
    }),
    __metadata("design:type", Array)
], NotificationDto.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the notification was successfully delivered',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], NotificationDto.prototype, "isDelivered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the notification expires',
        example: '2023-06-15T00:00:00.000Z',
        format: 'date-time',
        required: false,
        nullable: true
    }),
    __metadata("design:type", Date)
], NotificationDto.prototype, "expiresAt", void 0);
exports.NotificationDto = NotificationDto;
//# sourceMappingURL=notification.dto.js.map