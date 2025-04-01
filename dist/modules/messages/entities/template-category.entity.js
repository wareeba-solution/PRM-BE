var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, } from 'typeorm';
import { MessageTemplate } from './message-template.entity';
let TemplateCategory = class TemplateCategory {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TemplateCategory.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TemplateCategory.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TemplateCategory.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TemplateCategory.prototype, "organizationId", void 0);
__decorate([
    OneToMany(() => MessageTemplate, template => template.category),
    __metadata("design:type", Array)
], TemplateCategory.prototype, "templates", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TemplateCategory.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], TemplateCategory.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], TemplateCategory.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], TemplateCategory.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], TemplateCategory.prototype, "deletedAt", void 0);
TemplateCategory = __decorate([
    Entity('template_categories')
], TemplateCategory);
export { TemplateCategory };
//# sourceMappingURL=template-category.entity.js.map