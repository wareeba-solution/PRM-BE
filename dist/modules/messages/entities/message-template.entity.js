var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
export var TemplateCategory;
(function (TemplateCategory) {
    TemplateCategory["WELCOME"] = "welcome";
    TemplateCategory["NOTIFICATION"] = "notification";
    TemplateCategory["REMINDER"] = "reminder";
    TemplateCategory["MARKETING"] = "marketing";
    TemplateCategory["SUPPORT"] = "support";
    TemplateCategory["CUSTOM"] = "custom";
})(TemplateCategory || (TemplateCategory = {}));
export var TemplateType;
(function (TemplateType) {
    TemplateType["SMS"] = "sms";
    TemplateType["EMAIL"] = "email";
    TemplateType["PUSH"] = "push";
    TemplateType["IN_APP"] = "in_app";
})(TemplateType || (TemplateType = {}));
let MessageTemplate = class MessageTemplate {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], MessageTemplate.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageTemplate.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "description", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: TemplateCategory,
        default: TemplateCategory.CUSTOM
    }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "category", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: TemplateType
    }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageTemplate.prototype, "subject", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "content", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageTemplate.prototype, "parameters", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], MessageTemplate.prototype, "isDefault", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], MessageTemplate.prototype, "isActive", void 0);
__decorate([
    ManyToOne('User', { nullable: true }),
    JoinColumn({ name: 'created_by_id' }),
    __metadata("design:type", Function)
], MessageTemplate.prototype, "createdBy", void 0);
__decorate([
    Column({ name: 'created_by_id', nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "createdById", void 0);
__decorate([
    ManyToOne(() => Organization, { nullable: true }),
    JoinColumn({ name: 'organization_id' }),
    __metadata("design:type", Organization)
], MessageTemplate.prototype, "organization", void 0);
__decorate([
    Column({ name: 'organization_id', nullable: true }),
    __metadata("design:type", String)
], MessageTemplate.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MessageTemplate.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MessageTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], MessageTemplate.prototype, "updatedAt", void 0);
MessageTemplate = __decorate([
    Entity('message_templates')
], MessageTemplate);
export { MessageTemplate };
//# sourceMappingURL=message-template.entity.js.map