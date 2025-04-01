var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
export var SessionStatus;
(function (SessionStatus) {
    SessionStatus["ACTIVE"] = "ACTIVE";
    SessionStatus["EXPIRED"] = "EXPIRED";
    SessionStatus["REVOKED"] = "REVOKED";
    SessionStatus["LOGGED_OUT"] = "LOGGED_OUT";
})(SessionStatus || (SessionStatus = {}));
let UserSession = class UserSession {
    isExpired() {
        return new Date() > this.expiresAt;
    }
    isActive() {
        return (this.status === SessionStatus.ACTIVE &&
            !this.isExpired());
    }
    canBeExtended() {
        return (this.isActive() &&
            this.isRemembered &&
            this.tokenRotationCount < 10);
    }
    requiresRotation() {
        if (!this.lastTokenRotation) {
            return false;
        }
        const rotationThreshold = 24 * 60 * 60 * 1000;
        const timeSinceLastRotation = Date.now() - this.lastTokenRotation.getTime();
        return timeSinceLastRotation >= rotationThreshold;
    }
    extend(duration) {
        if (!this.canBeExtended()) {
            throw new Error('Session cannot be extended');
        }
        const newExpiryDate = new Date();
        newExpiryDate.setTime(newExpiryDate.getTime() + duration);
        this.expiresAt = newExpiryDate;
        this.tokenRotationCount += 1;
        this.lastTokenRotation = new Date();
    }
    updateActivity() {
        this.lastActivityAt = new Date();
    }
    revoke(revokedBy, reason = '') {
        this.status = SessionStatus.REVOKED;
        this.revokedAt = new Date();
        this.revokedBy = revokedBy;
        this.revokedReason = reason;
    }
    logout() {
        this.status = SessionStatus.LOGGED_OUT;
    }
    isSameIp(ip) {
        return this.ipAddress === ip;
    }
    isSameDevice(deviceId) {
        return this.deviceId === deviceId;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserSession.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], UserSession.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], UserSession.prototype, "user", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "organizationId", void 0);
__decorate([
    Column({ unique: true }),
    Index(),
    __metadata("design:type", String)
], UserSession.prototype, "token", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "refreshToken", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: SessionStatus,
        default: SessionStatus.ACTIVE
    }),
    __metadata("design:type", String)
], UserSession.prototype, "status", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserSession.prototype, "expiresAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastActivityAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "userAgent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceType", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "browser", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "operatingSystem", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "location", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], UserSession.prototype, "metadata", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isMobile", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isRemembered", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "revokedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "revokedBy", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "revokedReason", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], UserSession.prototype, "tokenRotationCount", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastTokenRotation", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], UserSession.prototype, "updatedAt", void 0);
UserSession = __decorate([
    Entity('user_sessions')
], UserSession);
export { UserSession };
//# sourceMappingURL=user-session.entity.js.map