"use strict";
// src/modules/contacts/entities/contact-relationship.entity.ts
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
exports.ContactRelationship = exports.RelationshipStatus = exports.RelationshipType = void 0;
const typeorm_1 = require("typeorm");
/**
 * Represents different types of relationships between contacts
 */
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["SPOUSE"] = "SPOUSE";
    RelationshipType["PARENT"] = "PARENT";
    RelationshipType["CHILD"] = "CHILD";
    RelationshipType["SIBLING"] = "SIBLING";
    RelationshipType["GUARDIAN"] = "GUARDIAN";
    RelationshipType["DEPENDENT"] = "DEPENDENT";
    RelationshipType["EMERGENCY_CONTACT"] = "EMERGENCY_CONTACT";
    RelationshipType["PRIMARY_CARE_PROVIDER"] = "PRIMARY_CARE_PROVIDER";
    RelationshipType["SPECIALIST"] = "SPECIALIST";
    RelationshipType["CAREGIVER"] = "CAREGIVER";
    RelationshipType["RELATIVE"] = "RELATIVE";
    RelationshipType["COLLEAGUE"] = "COLLEAGUE";
    RelationshipType["FRIEND"] = "FRIEND";
    RelationshipType["OTHER"] = "OTHER";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
var RelationshipStatus;
(function (RelationshipStatus) {
    RelationshipStatus["ACTIVE"] = "ACTIVE";
    RelationshipStatus["INACTIVE"] = "INACTIVE";
    RelationshipStatus["PENDING"] = "PENDING";
    RelationshipStatus["TERMINATED"] = "TERMINATED";
})(RelationshipStatus = exports.RelationshipStatus || (exports.RelationshipStatus = {}));
let ContactRelationship = class ContactRelationship {
    get isFamilyRelationship() {
        return [
            RelationshipType.SPOUSE,
            RelationshipType.PARENT,
            RelationshipType.CHILD,
            RelationshipType.SIBLING,
            RelationshipType.GUARDIAN,
            RelationshipType.DEPENDENT,
            RelationshipType.RELATIVE,
        ].includes(this.type);
    }
    get isMedicalRelationship() {
        return [
            RelationshipType.PRIMARY_CARE_PROVIDER,
            RelationshipType.SPECIALIST,
            RelationshipType.CAREGIVER,
        ].includes(this.type);
    }
    get isEmergencyRelationship() {
        return this.type === RelationshipType.EMERGENCY_CONTACT;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContactRelationship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Contact', {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'contactId' }),
    __metadata("design:type", Function)
], ContactRelationship.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "relatedContactId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Contact', {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'relatedContactId' }),
    __metadata("design:type", Function)
], ContactRelationship.prototype, "relatedContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "familyId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RelationshipType,
        default: RelationshipType.OTHER,
    }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RelationshipStatus,
        default: RelationshipStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "isLegalGuardian", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "hasMedicalDecisionAuthority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ContactRelationship.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ContactRelationship.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RelationshipType,
        nullable: true,
    }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "inverseType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "deletedAt", void 0);
ContactRelationship = __decorate([
    (0, typeorm_1.Entity)('contact_relationships'),
    (0, typeorm_1.Index)(['organizationId', 'contactId']),
    (0, typeorm_1.Index)(['organizationId', 'relatedContactId']),
    (0, typeorm_1.Index)(['organizationId', 'familyId'])
], ContactRelationship);
exports.ContactRelationship = ContactRelationship;
//# sourceMappingURL=contact-relationship.entity.js.map