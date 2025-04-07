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
exports.OrganizationInvitation = exports.InvitationStatus = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("./organization.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "PENDING";
    InvitationStatus["ACCEPTED"] = "ACCEPTED";
    InvitationStatus["DECLINED"] = "DECLINED";
    InvitationStatus["EXPIRED"] = "EXPIRED";
    InvitationStatus["REVOKED"] = "REVOKED";
})(InvitationStatus = exports.InvitationStatus || (exports.InvitationStatus = {}));
let OrganizationInvitation = class OrganizationInvitation {
    /**
     * Check if invitation has expired
     */
    isExpired() {
        return new Date() > this.expiresAt;
    }
    /**
     * Check if invitation can be resent
     */
    canBeResent() {
        return (this.status === InvitationStatus.PENDING &&
            !this.isExpired() &&
            this.resendCount < 3);
    }
    /**
     * Check if invitation can be accepted
     */
    canBeAccepted() {
        return (this.status === InvitationStatus.PENDING &&
            !this.isExpired());
    }
    /**
     * Check if invitation can be revoked
     */
    canBeRevoked() {
        return this.status === InvitationStatus.PENDING;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], OrganizationInvitation.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], OrganizationInvitation.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "invitedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'invitedById' }),
    __metadata("design:type", user_entity_1.User)
], OrganizationInvitation.prototype, "invitedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "invitedUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'invitedUserId' }),
    __metadata("design:type", user_entity_1.User)
], OrganizationInvitation.prototype, "invitedUser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvitationStatus,
        default: InvitationStatus.PENDING
    }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { array: true, nullable: true }),
    __metadata("design:type", Array)
], OrganizationInvitation.prototype, "departmentIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "acceptedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "declinedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "revokedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'revokedById' }),
    __metadata("design:type", user_entity_1.User)
], OrganizationInvitation.prototype, "revokedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationInvitation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationInvitation.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrganizationInvitation.prototype, "isResent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "lastResentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrganizationInvitation.prototype, "resendCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrganizationInvitation.prototype, "updatedAt", void 0);
OrganizationInvitation = __decorate([
    (0, typeorm_1.Entity)('organization_invitations')
], OrganizationInvitation);
exports.OrganizationInvitation = OrganizationInvitation;
//# sourceMappingURL=organization-invitation.entity.js.map