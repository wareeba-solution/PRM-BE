import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere, In, Like, LessThan } from 'typeorm';
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

@Injectable()
export class OrganizationAuditService {
    private readonly logger = new Logger(OrganizationAuditService.name);
    private auditLoggingEnabled = true; // Flag to control audit logging

    constructor(
        @InjectRepository(OrganizationAuditLog)
        private readonly auditLogRepository: Repository<OrganizationAuditLog>
    ) {
        // Check if audit table exists by making a simple query
        this.checkAuditTableExists();
    }

    private async checkAuditTableExists(): Promise<void> {
        try {
            // Try to count records - this will fail if the table doesn't exist
            await this.auditLogRepository.count();
        } catch (error) {
            // If we get an error about the table not existing, disable audit logging
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }
        }
    }

    async logEvent(eventData: AuditEventData): Promise<OrganizationAuditLog | null> {
        // Skip audit logging if disabled
        if (!this.auditLoggingEnabled) {
            this.logger.debug(`Audit logging skipped for ${eventData.eventType} (disabled)`);
            return null;
        }

        try {
            const auditLog = this.auditLogRepository.create({
                organizationId: eventData.organizationId,
                eventType: eventData.eventType,
                data: this.sanitizeData(eventData.data),
                performedBy: eventData.performedBy || 'system',
                timestamp: eventData.timestamp || new Date(),
                metadata: eventData.metadata || {},
            });

            await this.auditLogRepository.save(auditLog);

            this.logger.debug(
                `Audit log created for ${eventData.eventType} in organization ${eventData.organizationId}`
            );

            return auditLog;
        } catch (error) {
            // Log the error but don't make it block the main operation
            this.logger.error('Error creating audit log:', error);

            // If we encounter a table not existing error, disable audit logging for future calls
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }

            // Return null instead of throwing error
            return null;
        }
    }

    async getAuditLogs(
        organizationId: string,
        options: AuditQueryOptions = {}
    ): Promise<{ logs: OrganizationAuditLog[]; total: number }> {
        // Return empty result if audit logging is disabled
        if (!this.auditLoggingEnabled) {
            return { logs: [], total: 0 };
        }

        try {
            const where: FindOptionsWhere<OrganizationAuditLog> = {
                organizationId,
            };

            // Add date range filters if provided
            if (options.startDate || options.endDate) {
                where.timestamp = Between(
                    options.startDate || new Date(0),
                    options.endDate || new Date()
                );
            }

            // Add event type filter if provided
            if (options.eventTypes?.length) {
                where.eventType = In(options.eventTypes);
            }

            // Add performer filter if provided
            if (options.performedBy) {
                where.performedBy = options.performedBy;
            }

            const [logs, total] = await this.auditLogRepository.findAndCount({
                where,
                order: { timestamp: 'DESC' },
                take: options.limit || 50,
                skip: options.offset || 0,
            });

            return { logs, total };
        } catch (error) {
            this.logger.error('Error retrieving audit logs:', error);

            // If we encounter a table not existing error, disable audit logging
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }

            // Return empty result instead of throwing
            return { logs: [], total: 0 };
        }
    }

    // Apply the same pattern to other methods...
    async getEventDetails(eventId: string): Promise<OrganizationAuditLog | null> {
        if (!this.auditLoggingEnabled) {
            return null;
        }

        try {
            const auditLog = await this.auditLogRepository.findOne({
                where: { id: eventId }
            });

            if (!auditLog) {
                this.logger.debug(`Audit log with ID ${eventId} not found`);
                return null;
            }

            return auditLog;
        } catch (error) {
            this.logger.error(`Error retrieving audit log details for ID ${eventId}:`, error);

            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }

            return null;
        }
    }

    async getActivitySummary(
        organizationId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Record<string, number>> {
        if (!this.auditLoggingEnabled) {
            return {};
        }

        try {
            const logs = await this.auditLogRepository.find({
                where: {
                    organizationId,
                    timestamp: Between(startDate, endDate)
                }
            });

            // Group events by type and count occurrences
            return logs.reduce((summary, log) => {
                summary[log.eventType] = (summary[log.eventType] || 0) + 1;
                return summary;
            }, {} as Record<string, number>);
        } catch (error) {
            this.logger.error('Error generating activity summary:', error);

            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }

            return {};
        }
    }

    // The remaining methods would follow the same pattern...

    private sanitizeData(data: Record<string, any>): Record<string, any> {
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'credential'];
        const sanitized = { ...data };

        // Recursively sanitize sensitive data
        const sanitizeObject = (obj: Record<string, any>) => {
            for (const [key, value] of Object.entries(obj)) {
                if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                    obj[key] = '[REDACTED]';
                } else if (typeof value === 'object' && value !== null) {
                    sanitizeObject(value);
                }
            }
        };

        sanitizeObject(sanitized);
        return sanitized;
    }
}