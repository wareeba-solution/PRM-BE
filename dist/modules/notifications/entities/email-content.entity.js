"use strict";
// import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
// import { EmailLog } from './email-log.entity';
//
// @Entity('email_contents')
// export class EmailContent {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//
//   @Column('uuid')
//   emailLogId: string;
//
//   @OneToOne(() => EmailLog, emailLog => emailLog.content)
//   @JoinColumn({ name: 'emailLogId' })
//   emailLog: EmailLog;
//
//   @Column('text', { nullable: true })
//   htmlContent: string;
//
//   @Column('text', { nullable: true })
//   textContent: string;
//
//   @Column('jsonb', { nullable: true })
//   metadata: Record<string, any>;
//
//   @Column({ nullable: true })
//   messageId: string;
// }
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
exports.EmailContent = void 0;
const typeorm_1 = require("typeorm");
const email_log_entity_1 = require("./email-log.entity");
let EmailContent = class EmailContent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmailContent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], EmailContent.prototype, "emailLogId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => email_log_entity_1.EmailLog, emailLog => emailLog.content),
    (0, typeorm_1.JoinColumn)({ name: 'emailLogId' }),
    __metadata("design:type", email_log_entity_1.EmailLog)
], EmailContent.prototype, "emailLog", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], EmailContent.prototype, "htmlContent", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], EmailContent.prototype, "textContent", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], EmailContent.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailContent.prototype, "messageId", void 0);
EmailContent = __decorate([
    (0, typeorm_1.Entity)('email_contents')
], EmailContent);
exports.EmailContent = EmailContent;
//# sourceMappingURL=email-content.entity.js.map