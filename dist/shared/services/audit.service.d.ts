import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuditLog } from '../../modules/audit/entities/audit-log.entity';
export interface AuditLogDto {
    action: string;
    entityType: string;
    entityId: string | number;
    changes?: Record<string, any>;
    metadata?: Record<string, any>;
    actorId?: string | number;
    organizationId?: string | number;
    ipAddress?: string;
    userAgent?: string;
}
export declare class AuditService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLog>);
    /**
     * Create a new audit log entry
     */
    log(dto: AuditLogDto, request?: Request): Promise<AuditLog>;
    /**
     * Get audit logs for a specific entity
     */
    getEntityAuditLogs(entityType: string, entityId: string | number, options?: {
        limit?: number;
        offset?: number;
        startDate?: Date;
        endDate?: Date;
        actions?: string[];
    }): Promise<[AuditLog[], number]>;
    /**
     * Get audit logs for a specific user
     */
    getUserAuditLogs(actorId: string | number, // Changed from userId to actorId
    options?: {
        limit?: number;
        offset?: number;
        startDate?: Date;
        endDate?: Date;
        actions?: string[];
        entityTypes?: string[];
    }): Promise<[AuditLog[], number]>;
    /**
     * Get audit logs for an organization
     */
    getOrganizationAuditLogs(organizationId: string | number, options?: {
        limit?: number;
        offset?: number;
        startDate?: Date;
        endDate?: Date;
        actions?: string[];
        entityTypes?: string[];
        actorIds?: (string | number)[];
    }): Promise<[AuditLog[], number]>;
    /**
     * Clean up old audit logs
     */
    cleanupOldLogs(retentionDays?: number): Promise<number>;
}
