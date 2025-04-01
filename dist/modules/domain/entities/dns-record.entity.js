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
export var DnsRecordType;
(function (DnsRecordType) {
    DnsRecordType["A"] = "A";
    DnsRecordType["AAAA"] = "AAAA";
    DnsRecordType["CNAME"] = "CNAME";
    DnsRecordType["MX"] = "MX";
    DnsRecordType["TXT"] = "TXT";
    DnsRecordType["NS"] = "NS";
    DnsRecordType["SRV"] = "SRV";
    DnsRecordType["CAA"] = "CAA";
    DnsRecordType["PTR"] = "PTR";
    DnsRecordType["SOA"] = "SOA";
})(DnsRecordType || (DnsRecordType = {}));
let DnsRecord = class DnsRecord {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DnsRecord.prototype, "id", void 0);
__decorate([
    Column('uuid'),
    Index(),
    __metadata("design:type", String)
], DnsRecord.prototype, "domainId", void 0);
__decorate([
    ManyToOne('Domain', 'dnsRecords', { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'domainId' }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "domain", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: DnsRecordType
    }),
    Index(),
    __metadata("design:type", String)
], DnsRecord.prototype, "type", void 0);
__decorate([
    Column(),
    Index(),
    __metadata("design:type", String)
], DnsRecord.prototype, "name", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], DnsRecord.prototype, "content", void 0);
__decorate([
    Column('int', { default: 3600 }),
    __metadata("design:type", Number)
], DnsRecord.prototype, "ttl", void 0);
__decorate([
    Column('int', { nullable: true }),
    __metadata("design:type", Number)
], DnsRecord.prototype, "priority", void 0);
__decorate([
    Column('boolean', { default: true }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isActive", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "metadata", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "validation", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "monitoring", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "geolocation", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "loadBalancing", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "failover", void 0);
__decorate([
    Column('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], DnsRecord.prototype, "tags", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isSystem", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isLocked", void 0);
__decorate([
    Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isProtected", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], DnsRecord.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], DnsRecord.prototype, "updatedAt", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "createdBy", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "updatedBy", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DnsRecord.prototype, "history", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "notes", void 0);
__decorate([
    Column('boolean', { default: false }),
    Index(),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isDeleted", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "deletedBy", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], DnsRecord.prototype, "deletedAt", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "propagation", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "analytics", void 0);
DnsRecord = __decorate([
    Entity('dns_records'),
    Index(['domainId', 'type']),
    Index(['domainId', 'name'])
], DnsRecord);
export { DnsRecord };
//# sourceMappingURL=dns-record.entity.js.map