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
exports.NotificationTemplate = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
let NotificationTemplate = class NotificationTemplate {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, subject: { required: true, type: () => String }, content: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, channels: { required: true, type: () => [String] }, isActive: { required: true, type: () => Boolean }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, variables: { required: true }, channelSpecificContent: { required: true, type: () => ({ email: { required: false, type: () => ({ htmlTemplate: { required: false, type: () => String }, plainTextTemplate: { required: false, type: () => String } }) }, sms: { required: false, type: () => ({ template: { required: true, type: () => String } }) }, push: { required: false, type: () => ({ title: { required: true, type: () => String }, body: { required: true, type: () => String } }) }, webhook: { required: false, type: () => ({ payload: { required: true, type: () => Object } }) } }) }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, lastUsedAt: { required: true, type: () => Date }, useCount: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], NotificationTemplate.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: { type: 'string' },
        description: 'Supported notification channels'
    }),
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "channels", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationTemplate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], NotificationTemplate.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "variables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], NotificationTemplate.prototype, "channelSpecificContent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "lastUsedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "useCount", void 0);
NotificationTemplate = __decorate([
    (0, typeorm_1.Entity)('notification_templates')
], NotificationTemplate);
exports.NotificationTemplate = NotificationTemplate;
//# sourceMappingURL=notification-template.entity.js.map