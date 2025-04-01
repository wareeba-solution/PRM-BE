var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../../organizations/entities/organization.entity';
let NotificationTemplate = class NotificationTemplate {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "subject", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "content", void 0);
__decorate([
    Column('json', { nullable: true }),
    __metadata("design:type", Object)
], NotificationTemplate.prototype, "metadata", void 0);
__decorate([
    ApiProperty({
        type: 'array',
        items: { type: 'string' },
        description: 'Supported notification channels'
    }),
    Column('simple-array'),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "channels", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], NotificationTemplate.prototype, "isActive", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], NotificationTemplate.prototype, "organization", void 0);
__decorate([
    ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                type: { type: 'string', enum: ['string', 'number', 'boolean', 'date'] },
                required: { type: 'boolean' },
                defaultValue: { type: 'string', nullable: true }
            },
            additionalProperties: false
        },
        nullable: true
    }),
    Column('json', { nullable: true }),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "variables", void 0);
__decorate([
    ApiProperty({
        type: 'object',
        properties: {
            email: {
                type: 'object',
                properties: {
                    htmlTemplate: { type: 'string' },
                    plainTextTemplate: { type: 'string' }
                },
                additionalProperties: true
            },
            sms: {
                type: 'object',
                properties: {
                    template: { type: 'string' }
                },
                additionalProperties: true
            },
            push: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    body: { type: 'string' }
                },
                additionalProperties: true
            },
            webhook: {
                type: 'object',
                properties: {
                    payload: {
                        type: 'object',
                        additionalProperties: true
                    }
                },
                additionalProperties: true
            }
        },
        additionalProperties: true,
        nullable: true
    }),
    Column('json', { nullable: true }),
    __metadata("design:type", Object)
], NotificationTemplate.prototype, "channelSpecificContent", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "updatedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "useCount", void 0);
NotificationTemplate = __decorate([
    Entity('notification_templates')
], NotificationTemplate);
export { NotificationTemplate };
//# sourceMappingURL=notification-template.entity.js.map