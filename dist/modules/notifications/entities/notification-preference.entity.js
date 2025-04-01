var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index, Check, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
export var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["EMAIL"] = "EMAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["PUSH"] = "PUSH";
    NotificationChannel["IN_APP"] = "IN_APP";
    NotificationChannel["WHATSAPP"] = "WHATSAPP";
    NotificationChannel["SLACK"] = "SLACK";
    NotificationChannel["WEBHOOK"] = "WEBHOOK";
})(NotificationChannel || (NotificationChannel = {}));
export var NotificationCategory;
(function (NotificationCategory) {
    NotificationCategory["APPOINTMENT"] = "APPOINTMENT";
    NotificationCategory["TICKET"] = "TICKET";
    NotificationCategory["SYSTEM"] = "SYSTEM";
    NotificationCategory["SECURITY"] = "SECURITY";
    NotificationCategory["BILLING"] = "BILLING";
    NotificationCategory["MESSAGING"] = "MESSAGING";
    NotificationCategory["TASK"] = "TASK";
    NotificationCategory["REMINDER"] = "REMINDER";
    NotificationCategory["ALERT"] = "ALERT";
    NotificationCategory["NEWS"] = "NEWS";
})(NotificationCategory || (NotificationCategory = {}));
export var NotificationFrequency;
(function (NotificationFrequency) {
    NotificationFrequency["IMMEDIATELY"] = "IMMEDIATELY";
    NotificationFrequency["DAILY_DIGEST"] = "DAILY_DIGEST";
    NotificationFrequency["WEEKLY_DIGEST"] = "WEEKLY_DIGEST";
    NotificationFrequency["CUSTOM"] = "CUSTOM";
    NotificationFrequency["NEVER"] = "NEVER";
})(NotificationFrequency || (NotificationFrequency = {}));
let NotificationPreference = class NotificationPreference {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], NotificationPreference.prototype, "id", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "organizationId", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], NotificationPreference.prototype, "userId", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: NotificationCategory,
    }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "category", void 0);
__decorate([
    ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
        },
        description: 'Notification channels'
    }),
    Column({
        type: 'enum',
        enum: NotificationChannel,
        array: true,
        default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
    }),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "channels", void 0);
__decorate([
    ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            enum: ['EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP', 'SLACK', 'WEBHOOK']
        },
        description: 'Enabled notification channels'
    }),
    Column({
        type: 'enum',
        enum: NotificationChannel,
        array: true,
        default: [NotificationChannel.EMAIL, NotificationChannel.IN_APP],
    }),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "enabledChannels", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: NotificationFrequency,
        default: NotificationFrequency.IMMEDIATELY,
    }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "frequency", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "enabled", void 0);
__decorate([
    Column({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "startTime", void 0);
__decorate([
    Column({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "endTime", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], NotificationPreference.prototype, "workDays", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "customSchedule", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "channelSpecificSettings", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "filters", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "importanceThreshold", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "muteAll", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "muteUntil", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "digestSettings", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationPreference.prototype, "allowReminders", void 0);
__decorate([
    Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "reminderInterval", void 0);
__decorate([
    Column({ type: 'int', default: 3 }),
    __metadata("design:type", Number)
], NotificationPreference.prototype, "maxReminders", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationPreference.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], NotificationPreference.prototype, "deletedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], NotificationPreference.prototype, "updatedById", void 0);
__decorate([
    ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    }),
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], NotificationPreference.prototype, "organization", void 0);
__decorate([
    ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' }
        }
    }),
    ManyToOne(() => User),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], NotificationPreference.prototype, "user", void 0);
__decorate([
    ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    }),
    ManyToOne(() => User),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", User)
], NotificationPreference.prototype, "createdBy", void 0);
__decorate([
    ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
        },
        nullable: true
    }),
    ManyToOne(() => User),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", User)
], NotificationPreference.prototype, "updatedBy", void 0);
NotificationPreference = __decorate([
    Entity('notification_preferences'),
    Index(['organizationId', 'userId']),
    Index(['organizationId', 'category']),
    Check(`"startTime" < "endTime"`)
], NotificationPreference);
export { NotificationPreference };
//# sourceMappingURL=notification-preference.entity.js.map