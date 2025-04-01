var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
let PushSubscription = class PushSubscription {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], PushSubscription.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], PushSubscription.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], PushSubscription.prototype, "user", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], PushSubscription.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], PushSubscription.prototype, "organization", void 0);
__decorate([
    Column({ type: 'text' }),
    __metadata("design:type", String)
], PushSubscription.prototype, "subscription", void 0);
__decorate([
    Column({ type: 'text' }),
    Index(),
    __metadata("design:type", String)
], PushSubscription.prototype, "endpoint", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PushSubscription.prototype, "userAgent", void 0);
__decorate([
    Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], PushSubscription.prototype, "active", void 0);
__decorate([
    Column({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], PushSubscription.prototype, "lastUsed", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], PushSubscription.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], PushSubscription.prototype, "updatedAt", void 0);
PushSubscription = __decorate([
    Entity('push_subscriptions'),
    Index(['userId', 'endpoint']),
    Index(['organizationId', 'active'])
], PushSubscription);
export { PushSubscription };
//# sourceMappingURL=push-subscription.entity.js.map