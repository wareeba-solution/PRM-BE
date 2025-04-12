"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketActivityType = void 0;
var TicketActivityType;
(function (TicketActivityType) {
    // Creation and Deletion
    TicketActivityType["TICKET_CREATED"] = "ticket_created";
    TicketActivityType["TICKET_DELETED"] = "ticket_deleted";
    TicketActivityType["TICKET_RESTORED"] = "ticket_restored";
    // Status Changes
    TicketActivityType["STATUS_CHANGED"] = "status_changed";
    TicketActivityType["PRIORITY_CHANGED"] = "priority_changed";
    TicketActivityType["CATEGORY_CHANGED"] = "category_changed";
    TicketActivityType["ESCALATION"] = "ESCALATION";
    TicketActivityType["RESPONSE"] = "RESPONSE";
    TicketActivityType["RESOLUTION"] = "RESOLUTION";
    // Assignment
    TicketActivityType["ASSIGNED"] = "assigned";
    TicketActivityType["UNASSIGNED"] = "unassigned";
    TicketActivityType["SELF_ASSIGNED"] = "self_assigned";
    TicketActivityType["TEAM_ASSIGNED"] = "team_assigned";
    // Comments and Communication
    TicketActivityType["COMMENT_ADDED"] = "comment_added";
    TicketActivityType["COMMENT_UPDATED"] = "comment_updated";
    TicketActivityType["COMMENT_DELETED"] = "comment_deleted";
    TicketActivityType["INTERNAL_NOTE_ADDED"] = "internal_note_added";
    TicketActivityType["EMAIL_SENT"] = "email_sent";
    TicketActivityType["EMAIL_RECEIVED"] = "email_received";
    // Attachments
    TicketActivityType["ATTACHMENT_ADDED"] = "attachment_added";
    TicketActivityType["ATTACHMENT_REMOVED"] = "attachment_removed";
    // Tags
    TicketActivityType["TAG_ADDED"] = "tag_added";
    TicketActivityType["TAG_REMOVED"] = "tag_removed";
    // Linking and References
    TicketActivityType["LINKED_TO_TICKET"] = "linked_to_ticket";
    TicketActivityType["UNLINKED_FROM_TICKET"] = "unlinked_from_ticket";
    TicketActivityType["DUPLICATED_FROM"] = "duplicated_from";
    TicketActivityType["MERGED_WITH"] = "merged_with";
    // Workflow and Automation
    TicketActivityType["WORKFLOW_TRIGGERED"] = "workflow_triggered";
    TicketActivityType["AUTOMATION_EXECUTED"] = "automation_executed";
    TicketActivityType["SLA_UPDATED"] = "sla_updated";
    TicketActivityType["SLA_BREACHED"] = "sla_breached";
    TicketActivityType["ESCALATED"] = "escalated";
    // Time Tracking
    TicketActivityType["TIME_LOGGED"] = "time_logged";
    TicketActivityType["TIME_ESTIMATE_UPDATED"] = "time_estimate_updated";
    TicketActivityType["DEADLINE_UPDATED"] = "deadline_updated";
    // Collaboration
    TicketActivityType["SHARED_WITH_USER"] = "shared_with_user";
    TicketActivityType["MENTIONED_USER"] = "mentioned_user";
    TicketActivityType["SUBSCRIPTION_ADDED"] = "subscription_added";
    TicketActivityType["SUBSCRIPTION_REMOVED"] = "subscription_removed";
    // Customer Interaction
    TicketActivityType["CUSTOMER_REPLIED"] = "customer_replied";
    TicketActivityType["CUSTOMER_VIEWED"] = "customer_viewed";
    TicketActivityType["FEEDBACK_SUBMITTED"] = "feedback_submitted";
    TicketActivityType["SATISFACTION_RATED"] = "satisfaction_rated";
    // Knowledge Base
    TicketActivityType["KB_ARTICLE_LINKED"] = "kb_article_linked";
    TicketActivityType["KB_ARTICLE_UNLINKED"] = "kb_article_unlinked";
    TicketActivityType["SOLUTION_ADDED"] = "solution_added";
    TicketActivityType["SOLUTION_APPROVED"] = "solution_approved";
    // Access and Visibility
    TicketActivityType["VISIBILITY_CHANGED"] = "visibility_changed";
    TicketActivityType["PERMISSIONS_UPDATED"] = "permissions_updated";
    TicketActivityType["CONFIDENTIALITY_CHANGED"] = "confidentiality_changed";
    // Custom Fields
    TicketActivityType["CUSTOM_FIELD_UPDATED"] = "custom_field_updated";
    TicketActivityType["CUSTOM_FIELD_ADDED"] = "custom_field_added";
    TicketActivityType["CUSTOM_FIELD_REMOVED"] = "custom_field_removed";
    // Integrations
    TicketActivityType["INTEGRATION_TRIGGERED"] = "integration_triggered";
    TicketActivityType["WEBHOOK_SENT"] = "webhook_sent";
    TicketActivityType["EXTERNAL_REFERENCE_ADDED"] = "external_reference_added";
    TicketActivityType["EXTERNAL_REFERENCE_REMOVED"] = "external_reference_removed";
    // System Activities
    TicketActivityType["SYSTEM_UPDATE"] = "system_update";
    TicketActivityType["MAINTENANCE_NOTE"] = "maintenance_note";
    TicketActivityType["ERROR_LOGGED"] = "error_logged";
    TicketActivityType["WARNING_LOGGED"] = "warning_logged";
    // Archive and History
    TicketActivityType["ARCHIVED"] = "archived";
    TicketActivityType["UNARCHIVED"] = "unarchived";
    TicketActivityType["HISTORY_CLEARED"] = "history_cleared";
    TicketActivityType["EXPORTED"] = "exported";
    // Reports and Analytics
    TicketActivityType["REPORT_GENERATED"] = "report_generated";
    TicketActivityType["METRICS_UPDATED"] = "metrics_updated";
    TicketActivityType["ANALYTICS_EVENT"] = "analytics_event";
    // Billing and Costs
    TicketActivityType["COST_UPDATED"] = "cost_updated";
    TicketActivityType["BILLING_STATUS_CHANGED"] = "billing_status_changed";
    TicketActivityType["EXPENSE_ADDED"] = "expense_added";
    TicketActivityType["EXPENSE_REMOVED"] = "expense_removed";
    // Compliance and Audit
    TicketActivityType["COMPLIANCE_CHECK"] = "compliance_check";
    TicketActivityType["AUDIT_LOG_CREATED"] = "audit_log_created";
    TicketActivityType["SECURITY_REVIEW"] = "security_review";
    TicketActivityType["GDPR_REQUEST"] = "gdpr_request";
})(TicketActivityType = exports.TicketActivityType || (exports.TicketActivityType = {}));
//# sourceMappingURL=ticket-activity-type.enum.js.map