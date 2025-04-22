import { Repository } from 'typeorm';
import { OrganizationAuditLog } from '../entities/organization-audit-log.entity';
interface AuditEventData {
    organizationId: string;
    eventType: string;
    data: Record<string, any>;
    performedBy: string;
    timestamp?: Date;
    metadata?: Record<string, any>;
}
interface AuditQueryOptions {
    startDate?: Date;
    endDate?: Date;
    eventTypes?: string[];
    performedBy?: string;
    limit?: number;
    offset?: number;
}
export declare class OrganizationAuditService {
    private readonly auditLogRepository;
    private readonly logger;
    private auditLoggingEnabled;
    constructor(auditLogRepository: Repository<OrganizationAuditLog>);
    private checkAuditTableExists;
    logEvent(eventData: AuditEventData): Promise<OrganizationAuditLog | null>;
    getAuditLogs(organizationId: string, options?: AuditQueryOptions): Promise<{
        logs: OrganizationAuditLog[];
        total: number;
    }>;
    getEventDetails(eventId: string): Promise<OrganizationAuditLog | null>;
    getActivitySummary(organizationId: string, startDate: Date, endDate: Date): Promise<Record<string, number>>;
    private sanitizeData;
}
export {};
