var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, } from 'typeorm';
import { User } from '../../users/entities/user.entity';
let RefreshToken = class RefreshToken {
    isExpired() {
        return new Date() > this.expiresAt;
    }
    isValid() {
        return !this.isRevoked && !this.isExpired();
    }
    revoke(userId, reason) {
        this.isRevoked = true;
        this.revokedAt = new Date();
        this.revokedBy = userId;
        this.revokedReason = reason;
    }
    updateLastUsed() {
        if (this.metadata) {
            this.metadata.lastUsed = new Date();
        }
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RefreshToken.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "userId", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'text', unique: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    Column({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expiresAt", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], RefreshToken.prototype, "isRevoked", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "deviceId", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "userAgent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "ipAddress", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "updatedAt", void 0);
__decorate([
    Column({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "revokedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "revokedBy", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "revokedReason", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], RefreshToken.prototype, "user", void 0);
RefreshToken = __decorate([
    Entity('refresh_tokens'),
    Index(['token']),
    Index(['userId', 'deviceId'])
], RefreshToken);
export { RefreshToken };
//# sourceMappingURL=refresh-token.entity.js.map