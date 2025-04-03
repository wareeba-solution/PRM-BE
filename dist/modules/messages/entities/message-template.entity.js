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
exports.MessageTemplate = exports.TemplateType = exports.TemplateCategory = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/messages/entities/message-template.entity.ts
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
var TemplateCategory;
(function (TemplateCategory) {
    TemplateCategory["WELCOME"] = "welcome";
    TemplateCategory["NOTIFICATION"] = "notification";
    TemplateCategory["REMINDER"] = "reminder";
    TemplateCategory["MARKETING"] = "marketing";
    TemplateCategory["SUPPORT"] = "support";
    TemplateCategory["CUSTOM"] = "custom";
})(TemplateCategory = exports.TemplateCategory || (exports.TemplateCategory = {}));
var TemplateType;
(function (TemplateType) {
    TemplateType["SMS"] = "sms";
    TemplateType["EMAIL"] = "email";
    TemplateType["PUSH"] = "push";
    TemplateType["IN_APP"] = "in_app";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
let MessageTemplate = class MessageTemplate {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, enum: require("./message-template.entity").TemplateCategory }, type: { required: true, enum: require("./message-template.entity").TemplateType }, subject: { required: true, type: () => String }, content: { required: true, type: () => String }, parameters: { required: true, type: () => Object }, isDefault: { required: true, type: () => Boolean }, isActive: { required: true, type: () => Boolean }, createdBy: { required: true, type: () => require("../../users/entities/user.entity").User }, createdById: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, organizationId: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TemplateCategory,
        default: TemplateCategory.CUSTOM
    }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TemplateType
    }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageTemplate.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageTemplate.prototype, "parameters", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MessageTemplate.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], MessageTemplate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", Function)
], MessageTemplate.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_id', nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", organization_entity_1.Organization)
], MessageTemplate.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_id', nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageTemplate.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageTemplate.prototype, "updatedAt", void 0);
MessageTemplate = __decorate([
    (0, typeorm_1.Entity)('message_templates')
], MessageTemplate);
exports.MessageTemplate = MessageTemplate;
//# sourceMappingURL=message-template.entity.js.map