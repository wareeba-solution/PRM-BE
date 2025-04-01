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
import { Organization } from '../../organizations/entities/organization.entity';
let EmailTemplate = class EmailTemplate {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], EmailTemplate.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailTemplate.prototype, "subject", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], EmailTemplate.prototype, "htmlContent", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "textContent", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailTemplate.prototype, "variables", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "description", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], EmailTemplate.prototype, "isActive", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], EmailTemplate.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], EmailTemplate.prototype, "organization", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], EmailTemplate.prototype, "updatedAt", void 0);
EmailTemplate = __decorate([
    Entity('email_templates')
], EmailTemplate);
export { EmailTemplate };
//# sourceMappingURL=email-template.entity.js.map