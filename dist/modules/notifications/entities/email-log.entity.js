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
exports.EmailLog = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const email_status_enum_1 = require("../enums/email-status.enum");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
const email_template_entity_1 = require("./email-template.entity");
let EmailLog = class EmailLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, templateId: { required: true, type: () => String }, template: { required: true, type: () => require("./email-template.entity").EmailTemplate }, recipient: { required: true, type: () => String }, subject: { required: true, type: () => String }, htmlContent: { required: true, type: () => String }, textContent: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, status: { required: true, enum: require("../enums/email-status.enum").EmailStatus }, error: { required: true, type: () => String }, messageId: { required: true, type: () => String }, providerResponse: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, sentAt: { required: true, type: () => Date }, deliveredAt: { required: true, type: () => Date }, openedAt: { required: true, type: () => Date }, clickedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], EmailLog.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => email_template_entity_1.EmailTemplate),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", email_template_entity_1.EmailTemplate)
], EmailLog.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailLog.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "htmlContent", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "textContent", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: email_status_enum_1.EmailStatus,
        default: email_status_enum_1.EmailStatus.PENDING
    }),
    __metadata("design:type", String)
], EmailLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "providerResponse", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "clickedAt", void 0);
EmailLog = __decorate([
    (0, typeorm_1.Entity)('email_logs')
], EmailLog);
exports.EmailLog = EmailLog;
//# sourceMappingURL=email-log.entity.js.map