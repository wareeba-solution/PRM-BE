var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
export var EmailStatus;
(function (EmailStatus) {
    EmailStatus["QUEUED"] = "QUEUED";
    EmailStatus["SENDING"] = "SENDING";
    EmailStatus["SUCCESS"] = "SUCCESS";
    EmailStatus["FAILED"] = "FAILED";
    EmailStatus["BOUNCED"] = "BOUNCED";
})(EmailStatus || (EmailStatus = {}));
let EmailLog = class EmailLog {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], EmailLog.prototype, "id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "jobId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailLog.prototype, "to", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "cc", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "bcc", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailLog.prototype, "subject", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], EmailLog.prototype, "template", void 0);
__decorate([
    Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], EmailLog.prototype, "context", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: EmailStatus,
        default: EmailStatus.QUEUED
    }),
    __metadata("design:type", String)
], EmailLog.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "error", void 0);
__decorate([
    Column({ nullable: true }),
    Index(),
    __metadata("design:type", String)
], EmailLog.prototype, "organizationId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], EmailLog.prototype, "userId", void 0);
__decorate([
    CreateDateColumn(),
    Index(),
    __metadata("design:type", Date)
], EmailLog.prototype, "createdAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], EmailLog.prototype, "sentAt", void 0);
EmailLog = __decorate([
    Entity('email_logs')
], EmailLog);
export { EmailLog };
//# sourceMappingURL=email-log.entity.js.map