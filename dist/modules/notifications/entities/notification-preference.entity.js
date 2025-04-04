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
exports.NotificationPreference = exports.NotificationFrequency = exports.NotificationCategory = exports.NotificationChannel = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_channel_enum_1 = require("../enums/notification-channel.enum");
Object.defineProperty(exports, "NotificationChannel", { enumerable: true, get: function () { return notification_channel_enum_1.NotificationChannel; } });
const notification_category_enum_1 = require("../enums/notification-category.enum");
Object.defineProperty(exports, "NotificationCategory", { enumerable: true, get: function () { return notification_category_enum_1.NotificationCategory; } });
const notification_frequency_enum_1 = require("../enums/notification-frequency.enum");
Object.defineProperty(exports, "NotificationFrequency", { enumerable: true, get: function () { return notification_frequency_enum_1.NotificationFrequency; } });
let NotificationPreference = class NotificationPreference {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, userId: { required: true, type: () => String }, category: { required: true, enum: require("../enums/notification-category.enum").NotificationCategory }, channels: { required: true, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, enabledChannels: { required: true, enum: require("../enums/notification-channel.enum").NotificationChannel, isArray: true }, frequency: { required: true, enum: require("../enums/notification-frequency.enum").NotificationFrequency }, enabled: { required: true, type: () => Boolean }, startTime: { required: false, type: () => String }, endTime: { required: false, type: () => String }, workDays: { required: false, type: () => [String] }, customSchedule: { required: false, type: () => ({ days: { required: true, type: () => [String] }, times: { required: true, type: () => [String] }, timezone: { required: true, type: () => String } }) }, channelSpecificSettings: { required: false, type: () => ({ email: { required: false, type: () => ({ addresses: { required: false, type: () => [String] }, format: { required: false, type: () => Object }, includeAttachments: { required: false, type: () => Boolean } }) }, sms: { required: false, type: () => ({ phoneNumbers: { required: false, type: () => [String] }, includeMedia: { required: false, type: () => Boolean } }) }, push: { required: false, type: () => ({ deviceTokens: { required: false, type: () => [String] }, sound: { required: false, type: () => Boolean }, badge: { required: false, type: () => Boolean } }) }, inApp: { required: false, type: () => ({ showBadge: { required: false, type: () => Boolean }, playSound: { required: false, type: () => Boolean }, markAsRead: { required: false, type: () => Boolean } }) }, whatsapp: { required: false, type: () => ({ numbers: { required: false, type: () => [String] }, allowMedia: { required: false, type: () => Boolean } }) }, slack: { required: false, type: () => ({ channels: { required: false, type: () => [String] }, mentionUser: { required: false, type: () => Boolean } }) } }) }, filters: { required: false, type: () => ({ priority: { required: false, type: () => [String] }, status: { required: false, type: () => [String] }, types: { required: false, type: () => [String] }, senders: { required: false, type: () => [String] }, keywords: { required: false, type: () => [String] }, excludeKeywords: { required: false, type: () => [String] } }) }, importanceThreshold: { required: true, type: () => Number }, muteAll: { required: true, type: () => Boolean }, muteUntil: { required: false, type: () => Date }, digestSettings: { required: false, type: () => ({ groupBy: { required: false, type: () => [String] }, sortBy: { required: false, type: () => String }, maxItems: { required: false, type: () => Number }, format: { required: false, type: () => String } }) }, allowReminders: { required: true, type: () => Boolean }, reminderInterval: { required: false, type: () => Number }, maxReminders: { required: true, type: () => Number }, createdById: { required: true, type: () => String }, updatedById: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date }, organization: { required: true, type: () => Object }, user: { required: true, type: () => Object }, createdBy: { required: true, type: () => Object }, updatedBy: { required: false, type: () => Object } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificationPreference.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "organizationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_category_enum_1.NotificationCategory }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_category_enum_1.NotificationCategory,
        default: notification_category_enum_1.NotificationCategory.GENERAL,
    }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], enum: notification_channel_enum_1.NotificationChannel }),
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], enum: notification_channel_enum_1.NotificationChannel }),
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "enabledChannels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_frequency_enum_1.NotificationFrequency }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_frequency_enum_1.NotificationFrequency,
        default: notification_frequency_enum_1.NotificationFrequency.IMMEDIATELY,
    }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "workDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "customSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "channelSpecificSettings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "filters", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "importanceThreshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "muteAll", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "muteUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "digestSettings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "allowReminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "reminderInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 3 }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "maxReminders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)('Organization'),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Promise)
], NotificationPreference.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        }
    }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", Promise)
], NotificationPreference.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    }),
    (0, typeorm_1.ManyToOne)('User', { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], NotificationPreference.prototype, "updatedBy", void 0);
NotificationPreference = __decorate([
    (0, typeorm_1.Entity)('notification_preferences'),
    (0, typeorm_1.Index)(['organizationId', 'userId']),
    (0, typeorm_1.Index)(['organizationId', 'category']),
    (0, typeorm_1.Check)(`"startTime" < "endTime"`)
], NotificationPreference);
exports.NotificationPreference = NotificationPreference;
//# sourceMappingURL=notification-preference.entity.js.map