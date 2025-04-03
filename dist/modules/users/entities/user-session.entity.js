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
exports.UserSession = exports.SessionStatus = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["ACTIVE"] = "ACTIVE";
    SessionStatus["EXPIRED"] = "EXPIRED";
    SessionStatus["REVOKED"] = "REVOKED";
    SessionStatus["LOGGED_OUT"] = "LOGGED_OUT";
})(SessionStatus = exports.SessionStatus || (exports.SessionStatus = {}));
let UserSession = class UserSession {
    /**
     * Check if session is expired
     */
    isExpired() {
        return new Date() > this.expiresAt;
    }
    /**
     * Check if session is active
     */
    isActive() {
        return (this.status === SessionStatus.ACTIVE &&
            !this.isExpired());
    }
    /**
     * Check if session can be extended
     */
    canBeExtended() {
        return (this.isActive() &&
            this.isRemembered &&
            this.tokenRotationCount < 10);
    }
    /**
     * Check if session requires rotation
     */
    requiresRotation() {
        if (!this.lastTokenRotation) {
            return false;
        }
        const rotationThreshold = 24 * 60 * 60 * 1000; // 24 hours
        const timeSinceLastRotation = Date.now() - this.lastTokenRotation.getTime();
        return timeSinceLastRotation >= rotationThreshold;
    }
    /**
     * Extend session expiry
     */
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
    /**
     * Update last activity
     */
    updateActivity() {
        this.lastActivityAt = new Date();
    }
    /**
     * Revoke session
     */
    revoke(revokedBy, reason = '') {
        this.status = SessionStatus.REVOKED;
        this.revokedAt = new Date();
        this.revokedBy = revokedBy;
        this.revokedReason = reason;
    }
    /**
     * Mark session as logged out
     */
    logout() {
        this.status = SessionStatus.LOGGED_OUT;
    }
    /**
     * Check if session is from same IP
     */
    isSameIp(ip) {
        return this.ipAddress === ip;
    }
    /**
     * Check if session is from same device
     */
    isSameDevice(deviceId) {
        return this.deviceId === deviceId;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, user: { required: true, type: () => require("./user.entity").User }, organizationId: { required: true, type: () => String }, token: { required: true, type: () => String }, refreshToken: { required: true, type: () => String }, status: { required: true, enum: require("./user-session.entity").SessionStatus }, expiresAt: { required: true, type: () => Date }, lastActivityAt: { required: true, type: () => Date }, ipAddress: { required: true, type: () => String }, userAgent: { required: true, type: () => String }, deviceId: { required: true, type: () => String }, deviceType: { required: true, type: () => String }, browser: { required: true, type: () => String }, operatingSystem: { required: true, type: () => String }, location: { required: true, type: () => String }, metadata: { required: true, type: () => Object }, isMobile: { required: true, type: () => Boolean }, isRemembered: { required: true, type: () => Boolean }, revokedAt: { required: true, type: () => Date }, revokedBy: { required: true, type: () => String }, revokedReason: { required: true, type: () => String }, tokenRotationCount: { required: true, type: () => Number }, lastTokenRotation: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserSession.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], UserSession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserSession.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SessionStatus,
        default: SessionStatus.ACTIVE
    }),
    __metadata("design:type", String)
], UserSession.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserSession.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastActivityAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "operatingSystem", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], UserSession.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isMobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isRemembered", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "revokedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "revokedReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserSession.prototype, "tokenRotationCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastTokenRotation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserSession.prototype, "updatedAt", void 0);
UserSession = __decorate([
    (0, typeorm_1.Entity)('user_sessions')
], UserSession);
exports.UserSession = UserSession;
//# sourceMappingURL=user-session.entity.js.map