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
exports.DnsRecord = exports.DnsRecordType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
var DnsRecordType;
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
})(DnsRecordType = exports.DnsRecordType || (exports.DnsRecordType = {}));
let DnsRecord = class DnsRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, domainId: { required: true, type: () => String }, domain: { required: true, type: () => Object }, type: { required: true, enum: require("./dns-record.entity").DnsRecordType }, name: { required: true, type: () => String }, content: { required: true, type: () => String }, ttl: { required: true, type: () => Number }, priority: { required: false, type: () => Number }, isActive: { required: true, type: () => Boolean }, metadata: { required: false, type: () => ({ proxied: { required: false, type: () => Boolean }, cloudflare: { required: false, type: () => ({ proxied: { required: false, type: () => Boolean }, proxiedAt: { required: false, type: () => Date }, developmentMode: { required: false, type: () => Boolean } }) }, aws: { required: false, type: () => ({ regionId: { required: false, type: () => String }, healthCheckId: { required: false, type: () => String }, evaluateTargetHealth: { required: false, type: () => Boolean } }) }, google: { required: false, type: () => ({ routingPolicy: { required: false, type: () => String }, healthChecked: { required: false, type: () => Boolean } }) }, azure: { required: false, type: () => ({ trafficManagerProfile: { required: false, type: () => String }, weight: { required: false, type: () => Number } }) } }) }, validation: { required: false, type: () => ({ isValid: { required: true, type: () => Boolean }, lastChecked: { required: true, type: () => Date }, errors: { required: false, type: () => [String] }, warnings: { required: false, type: () => [String] } }) }, monitoring: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, lastCheck: { required: false, type: () => Date }, status: { required: false, type: () => Object }, responseTime: { required: false, type: () => Number }, healthCheckId: { required: false, type: () => String }, alerts: { required: false, type: () => ({ email: { required: false, type: () => [String] }, webhook: { required: false, type: () => [String] } }) } }) }, geolocation: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, regions: { required: false, type: () => [String] }, countries: { required: false, type: () => [String] }, continents: { required: false, type: () => [String] }, defaultResponse: { required: false, type: () => String } }) }, loadBalancing: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, method: { required: false, type: () => Object }, pools: { required: false } }) }, failover: { required: false, type: () => ({ enabled: { required: true, type: () => Boolean }, primary: { required: false, type: () => String }, secondary: { required: false, type: () => String }, healthCheck: { required: false, type: () => ({ type: { required: true, type: () => String }, interval: { required: true, type: () => Number }, timeout: { required: true, type: () => Number }, retries: { required: true, type: () => Number } }) } }) }, tags: { required: false, type: () => [String] }, isSystem: { required: true, type: () => Boolean }, isLocked: { required: true, type: () => Boolean }, isProtected: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, createdBy: { required: false, type: () => String }, updatedBy: { required: false, type: () => String }, history: { required: false }, notes: { required: false, type: () => String }, isDeleted: { required: true, type: () => Boolean }, deletedBy: { required: false, type: () => String }, deletedAt: { required: false, type: () => Date }, propagation: { required: false, type: () => ({ status: { required: true, type: () => Object }, startedAt: { required: false, type: () => Date }, completedAt: { required: false, type: () => Date }, nameservers: { required: false } }) }, analytics: { required: false, type: () => ({ lastUpdated: { required: false, type: () => Date }, queries: { required: false, type: () => ({ total: { required: true, type: () => Number }, timeframe: { required: true, type: () => String }, distribution: { required: false, type: () => Object } }) }, performance: { required: false, type: () => ({ responseTime: { required: true, type: () => Number }, availability: { required: true, type: () => Number } }) } }) } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DnsRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DnsRecord.prototype, "domainId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Domain', 'dnsRecords', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'domainId' }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DnsRecordType
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DnsRecord.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DnsRecord.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DnsRecord.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 3600 }),
    __metadata("design:type", Number)
], DnsRecord.prototype, "ttl", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], DnsRecord.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "validation", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "monitoring", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "geolocation", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "loadBalancing", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "failover", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], DnsRecord.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isSystem", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isProtected", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DnsRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DnsRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], DnsRecord.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], DnsRecord.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], DnsRecord.prototype, "deletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DnsRecord.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "propagation", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], DnsRecord.prototype, "analytics", void 0);
DnsRecord = __decorate([
    (0, typeorm_1.Entity)('dns_records'),
    (0, typeorm_1.Index)(['domainId', 'type']),
    (0, typeorm_1.Index)(['domainId', 'name'])
], DnsRecord);
exports.DnsRecord = DnsRecord;
//# sourceMappingURL=dns-record.entity.js.map