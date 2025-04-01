var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
let CallLog = class CallLog {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CallLog.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CallLog.prototype, "callUuid", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CallLog.prototype, "callerNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CallLog.prototype, "destinationNumber", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], CallLog.prototype, "provider", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CallLog.prototype, "status", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CallLog.prototype, "startTime", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CallLog.prototype, "answerTime", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CallLog.prototype, "endTime", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], CallLog.prototype, "duration", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], CallLog.prototype, "hangupCause", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], CallLog.prototype, "recordingUrl", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], CallLog.prototype, "callDirection", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], CallLog.prototype, "appointmentId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], CallLog.prototype, "contactId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], CallLog.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], CallLog.prototype, "updatedAt", void 0);
CallLog = __decorate([
    Entity('call_logs')
], CallLog);
export { CallLog };
//# sourceMappingURL=call-log.entity.js.map