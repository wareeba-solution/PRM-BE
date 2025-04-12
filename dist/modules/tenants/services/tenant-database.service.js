"use strict";
// src/modules/tenants/services/tenant-database.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let TenantDatabaseService = class TenantDatabaseService {
    constructor(request) {
        this.request = request;
        this.tenantId = null;
        this.tenantId = request.tenantId || null;
    }
    /**
     * Creates a tenant-aware repository that automatically filters by tenant ID
     * @param repository The TypeORM repository to wrap
     * @returns A tenant-aware repository
     */
    createTenantAwareRepository(repository) {
        const originalFind = repository.find.bind(repository);
        const originalFindOne = repository.findOne.bind(repository);
        const originalCreateQueryBuilder = repository.createQueryBuilder.bind(repository);
        const tenantId = this.tenantId;
        // Override find method to include tenant filter
        repository.find = async function (options = {}) {
            if (!options.where) {
                options.where = {};
            }
            if (typeof options.where === 'object' && !Array.isArray(options.where)) {
                options.where.tenantId = tenantId;
            }
            return originalFind(options);
        };
        // Override findOne method to include tenant filter
        repository.findOne = async function (options = {}) {
            if (!options.where) {
                options.where = {};
            }
            if (typeof options.where === 'object') {
                options.where.tenantId = tenantId;
            }
            return originalFindOne(options);
        };
        // Override createQueryBuilder to include tenant filter
        repository.createQueryBuilder = function (alias, queryRunner) {
            const qb = originalCreateQueryBuilder(alias, queryRunner);
            if (alias) {
                const originalWhere = qb.where.bind(qb);
                qb.where = function (where, parameters) {
                    const newQb = originalWhere(where, parameters);
                    return newQb.andWhere(`${alias}.tenantId = :tenantId`, { tenantId });
                };
            }
            return qb;
        };
        return repository;
    }
    /**
     * Adds tenant filter to an existing query builder
     * @param queryBuilder The query builder to add tenant filter to
     * @param alias The entity alias used in the query builder
     * @returns The modified query builder with tenant filter
     */
    addTenantFilter(queryBuilder, alias) {
        if (this.tenantId) {
            return queryBuilder.andWhere(`${alias}.tenantId = :tenantId`, { tenantId: this.tenantId });
        }
        return queryBuilder;
    }
    /**
     * Gets the current tenant ID from the request
     * @returns The current tenant ID or null if not set
     */
    getCurrentTenantId() {
        return this.tenantId;
    }
    /**
     * Prepares an entity for creation by setting the tenant ID
     * @param entity The entity to prepare
     * @returns The entity with tenant ID set
     */
    prepareEntityForCreate(entity) {
        if (this.tenantId) {
            entity.tenantId = this.tenantId;
        }
        return entity;
    }
};
TenantDatabaseService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], TenantDatabaseService);
exports.TenantDatabaseService = TenantDatabaseService;
//# sourceMappingURL=tenant-database.service.js.map