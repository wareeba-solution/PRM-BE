var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from '../../users/entities/user.entity';
export var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "PENDING";
    InvitationStatus["ACCEPTED"] = "ACCEPTED";
    InvitationStatus["DECLINED"] = "DECLINED";
    InvitationStatus["EXPIRED"] = "EXPIRED";
    InvitationStatus["REVOKED"] = "REVOKED";
})(InvitationStatus || (InvitationStatus = {}));
let OrganizationInvitation = class OrganizationInvitation {
    isExpired() {
        return new Date() > this.expiresAt;
    }
    canBeResent() {
        return (this.status === InvitationStatus.PENDING &&
            !this.isExpired() &&
            this.resendCount < 3);
    }
    canBeAccepted() {
        return (this.status === InvitationStatus.PENDING &&
            !this.isExpired());
    }
    canBeRevoked() {
        return this.status === InvitationStatus.PENDING;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], OrganizationInvitation.prototype, "organization", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "email", void 0);
__decorate([
    Column('simple-array'),
    __metadata("design:type", Array)
], OrganizationInvitation.prototype, "roles", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "invitedById", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'invitedById' }),
    __metadata("design:type", User)
], OrganizationInvitation.prototype, "invitedBy", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "invitedUserId", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    JoinColumn({ name: 'invitedUserId' }),
    __metadata("design:type", User)
], OrganizationInvitation.prototype, "invitedUser", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "token", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "expiresAt", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: InvitationStatus,
        default: InvitationStatus.PENDING
    }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "status", void 0);
__decorate([
    Column('uuid', { array: true, nullable: true }),
    __metadata("design:type", Array)
], OrganizationInvitation.prototype, "departmentIds", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "acceptedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "declinedAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "revokedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "revokedById", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    JoinColumn({ name: 'revokedById' }),
    __metadata("design:type", User)
], OrganizationInvitation.prototype, "revokedBy", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "message", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationInvitation.prototype, "metadata", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], OrganizationInvitation.prototype, "isResent", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "lastResentAt", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationInvitation.prototype, "resendCount", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "updatedAt", void 0);
OrganizationInvitation = __decorate([
    Entity('organization_invitations')
], OrganizationInvitation);
export { OrganizationInvitation };
//# sourceMappingURL=organization-invitation.entity.js.map