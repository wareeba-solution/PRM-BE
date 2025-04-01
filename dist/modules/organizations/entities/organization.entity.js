var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn, Index, } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export var SubscriptionTier;
(function (SubscriptionTier) {
    SubscriptionTier["FREE"] = "FREE";
    SubscriptionTier["BASIC"] = "BASIC";
    SubscriptionTier["PROFESSIONAL"] = "PROFESSIONAL";
    SubscriptionTier["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionTier || (SubscriptionTier = {}));
export var OrganizationStatus;
(function (OrganizationStatus) {
    OrganizationStatus["ACTIVE"] = "ACTIVE";
    OrganizationStatus["SUSPENDED"] = "SUSPENDED";
    OrganizationStatus["PENDING"] = "PENDING";
})(OrganizationStatus || (OrganizationStatus = {}));
let Organization = class Organization {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    Column({ length: 100, unique: true }),
    Index(),
    __metadata("design:type", String)
], Organization.prototype, "slug", void 0);
__decorate([
    Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "logo", void 0);
__decorate([
    Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "domain", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isDomainVerified", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: OrganizationStatus,
        default: OrganizationStatus.PENDING
    }),
    __metadata("design:type", String)
], Organization.prototype, "status", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: SubscriptionTier,
        default: SubscriptionTier.FREE
    }),
    __metadata("design:type", String)
], Organization.prototype, "subscriptionTier", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "subscriptionStartDate", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "subscriptionEndDate", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isSubscriptionActive", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "settings", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "maxUsers", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "maxStorage", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "createdById", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "updatedById", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Organization.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Organization.prototype, "updatedBy", void 0);
__decorate([
    OneToMany(() => User, user => user.organization, { lazy: true }),
    __metadata("design:type", Promise)
], Organization.prototype, "users", void 0);
__decorate([
    OneToMany(() => Ticket, ticket => ticket.organization, { lazy: true }),
    __metadata("design:type", Promise)
], Organization.prototype, "tickets", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Organization.prototype, "deletedAt", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "metadata", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "contactInfo", void 0);
__decorate([
    Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Organization.prototype, "allowedDomains", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isEmailVerificationRequired", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "isTwoFactorAuthRequired", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Organization.prototype, "auditConfig", void 0);
Organization = __decorate([
    Entity('organizations'),
    Index(['domain'])
], Organization);
export { Organization };
//# sourceMappingURL=organization.entity.js.map