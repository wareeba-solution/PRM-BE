// src/modules/tenants/services/tenant-database.service.ts

import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TenantDatabaseService {
  private tenantId: string | null = null;

  constructor(@Inject(REQUEST) private readonly request: Request) {
    this.tenantId = request.tenantId || null;
  }

  /**
   * Creates a tenant-aware repository that automatically filters by tenant ID
   * @param repository The TypeORM repository to wrap
   * @returns A tenant-aware repository
   */
  createTenantAwareRepository<T>(repository: Repository<T>): Repository<T> {
    const originalFind = repository.find.bind(repository);
    const originalFindOne = repository.findOne.bind(repository);
    const originalCreateQueryBuilder = repository.createQueryBuilder.bind(repository);
    const tenantId = this.tenantId;

    // Override find method to include tenant filter
    repository.find = async function (options: any = {}) {
      if (!options.where) {
        options.where = {};
      }

      if (typeof options.where === 'object' && !Array.isArray(options.where)) {
        options.where.tenantId = tenantId;
      }

      return originalFind(options);
    };

    // Override findOne method to include tenant filter
    repository.findOne = async function (options: any = {}) {
      if (!options.where) {
        options.where = {};
      }

      if (typeof options.where === 'object') {
        options.where.tenantId = tenantId;
      }

      return originalFindOne(options);
    };

    // Override createQueryBuilder to include tenant filter
    repository.createQueryBuilder = function (alias?: string, queryRunner?: any) {
      const qb = originalCreateQueryBuilder(alias, queryRunner);
      
      if (alias) {
        const originalWhere = qb.where.bind(qb);
        
        qb.where = function (where: string | any, parameters?: any) {
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
  addTenantFilter<T>(queryBuilder: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T> {
    if (this.tenantId) {
      return queryBuilder.andWhere(`${alias}.tenantId = :tenantId`, { tenantId: this.tenantId });
    }
    return queryBuilder;
  }

  /**
   * Gets the current tenant ID from the request
   * @returns The current tenant ID or null if not set
   */
  getCurrentTenantId(): string | null {
    return this.tenantId;
  }

  /**
   * Prepares an entity for creation by setting the tenant ID
   * @param entity The entity to prepare
   * @returns The entity with tenant ID set
   */
  prepareEntityForCreate<T extends { tenantId?: string }>(entity: T): T {
    if (this.tenantId) {
      entity.tenantId = this.tenantId;
    }
    return entity;
  }
}
