"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModule = void 0;
// src/modules/domain/domain.module.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const domain_entity_1 = require("./entities/domain.entity");
const dns_record_entity_1 = require("./entities/dns-record.entity");
const domain_verification_token_entity_1 = require("./entities/domain-verification-token.entity");
let DomainModule = class DomainModule {
};
DomainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                domain_entity_1.Domain,
                dns_record_entity_1.DnsRecord,
                domain_verification_token_entity_1.DomainVerificationToken
            ]),
        ],
        controllers: [],
        providers: [],
        exports: [typeorm_1.TypeOrmModule],
    })
], DomainModule);
exports.DomainModule = DomainModule;
//# sourceMappingURL=domain.module.js.map