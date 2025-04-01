var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, } from 'typeorm';
export var RelationshipType;
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
})(RelationshipType || (RelationshipType = {}));
let ContactRelationship = class ContactRelationship {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ContactRelationship.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "organizationId", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "contactId", void 0);
__decorate([
    ManyToOne('Contact', {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'contactId' }),
    __metadata("design:type", Function)
], ContactRelationship.prototype, "contact", void 0);
__decorate([
    Column({ type: 'uuid' }),
    Index(),
    __metadata("design:type", String)
], ContactRelationship.prototype, "relatedContactId", void 0);
__decorate([
    ManyToOne('Contact', {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'relatedContactId' }),
    __metadata("design:type", Function)
], ContactRelationship.prototype, "relatedContact", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: RelationshipType,
        default: RelationshipType.OTHER,
    }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "type", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "notes", void 0);
__decorate([
    Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "isActive", void 0);
__decorate([
    Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ContactRelationship.prototype, "isPrimary", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "createdById", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "updatedById", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "deletedAt", void 0);
__decorate([
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ContactRelationship.prototype, "metadata", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: RelationshipType,
        nullable: true,
    }),
    __metadata("design:type", String)
], ContactRelationship.prototype, "inverseType", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "startDate", void 0);
__decorate([
    Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ContactRelationship.prototype, "endDate", void 0);
ContactRelationship = __decorate([
    Entity('contact_relationships'),
    Index(['organizationId', 'contactId']),
    Index(['organizationId', 'relatedContactId'])
], ContactRelationship);
export { ContactRelationship };
//# sourceMappingURL=contact-relationship.entity.js.map