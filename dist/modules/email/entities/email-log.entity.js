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
exports.EmailLog = exports.EmailStatus = void 0;
const openapi = require("@nestjs/swagger");
// src/modules/email/entities/email-log.entity.ts
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../../organizations/entities/organization.entity");
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENDING"] = "SENDING";
    EmailStatus["SUCCESS"] = "SUCCESS";
    EmailStatus["FAILED"] = "FAILED";
    EmailStatus["BOUNCED"] = "BOUNCED";
})(EmailStatus = exports.EmailStatus || (exports.EmailStatus = {}));
let EmailLog = class EmailLog {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, jobId: { required: false, type: () => String }, to: { required: true, type: () => String }, cc: { required: false, type: () => String }, bcc: { required: false, type: () => String }, subject: { required: true, type: () => String }, template: { required: true, type: () => String }, context: { required: false, type: () => Object }, status: { required: true, type: () => String }, error: { required: false, type: () => String }, organizationId: { required: false, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").Organization }, userId: { required: false, type: () => String }, createdAt: { required: true, type: () => Date }, sentAt: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailLog.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "cc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "bcc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailLog.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailLog.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], EmailLog.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EmailStatus,
        default: EmailStatus.QUEUED
    }),
    __metadata("design:type", String)
], EmailLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], EmailLog.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", Promise)
], EmailLog.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], EmailLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "sentAt", void 0);
EmailLog = __decorate([
    (0, typeorm_1.Entity)('email_logs')
], EmailLog);
exports.EmailLog = EmailLog;
//# sourceMappingURL=email-log.entity.js.map