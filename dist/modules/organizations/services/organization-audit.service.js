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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrganizationAuditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationAuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_audit_log_entity_1 = require("../entities/organization-audit-log.entity");
let OrganizationAuditService = OrganizationAuditService_1 = class OrganizationAuditService {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
        this.logger = new common_1.Logger(OrganizationAuditService_1.name);
        this.auditLoggingEnabled = true; // Flag to control audit logging
        // Check if audit table exists by making a simple query
        this.checkAuditTableExists();
    }
    async checkAuditTableExists() {
        try {
            // Try to count records - this will fail if the table doesn't exist
            await this.auditLogRepository.count();
        }
        catch (error) {
            // If we get an error about the table not existing, disable audit logging
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }
        }
    }
    async logEvent(eventData) {
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
            this.logger.debug(`Audit log created for ${eventData.eventType} in organization ${eventData.organizationId}`);
            return auditLog;
        }
        catch (error) {
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
    async getAuditLogs(organizationId, options = {}) {
        var _a;
        // Return empty result if audit logging is disabled
        if (!this.auditLoggingEnabled) {
            return { logs: [], total: 0 };
        }
        try {
            const where = {
                organizationId,
            };
            // Add date range filters if provided
            if (options.startDate || options.endDate) {
                where.timestamp = (0, typeorm_2.Between)(options.startDate || new Date(0), options.endDate || new Date());
            }
            // Add event type filter if provided
            if ((_a = options.eventTypes) === null || _a === void 0 ? void 0 : _a.length) {
                where.eventType = (0, typeorm_2.In)(options.eventTypes);
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
        }
        catch (error) {
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
    async getEventDetails(eventId) {
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
        }
        catch (error) {
            this.logger.error(`Error retrieving audit log details for ID ${eventId}:`, error);
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }
            return null;
        }
    }
    async getActivitySummary(organizationId, startDate, endDate) {
        if (!this.auditLoggingEnabled) {
            return {};
        }
        try {
            const logs = await this.auditLogRepository.find({
                where: {
                    organizationId,
                    timestamp: (0, typeorm_2.Between)(startDate, endDate)
                }
            });
            // Group events by type and count occurrences
            return logs.reduce((summary, log) => {
                summary[log.eventType] = (summary[log.eventType] || 0) + 1;
                return summary;
            }, {});
        }
        catch (error) {
            this.logger.error('Error generating activity summary:', error);
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                this.auditLoggingEnabled = false;
                this.logger.warn('Audit logging disabled: audit_logs table does not exist');
            }
            return {};
        }
    }
    // The remaining methods would follow the same pattern...
    sanitizeData(data) {
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'credential'];
        const sanitized = Object.assign({}, data);
        // Recursively sanitize sensitive data
        const sanitizeObject = (obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                    obj[key] = '[REDACTED]';
                }
                else if (typeof value === 'object' && value !== null) {
                    sanitizeObject(value);
                }
            }
        };
        sanitizeObject(sanitized);
        return sanitized;
    }
};
OrganizationAuditService = OrganizationAuditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_audit_log_entity_1.OrganizationAuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganizationAuditService);
exports.OrganizationAuditService = OrganizationAuditService;
//# sourceMappingURL=organization-audit.service.js.map