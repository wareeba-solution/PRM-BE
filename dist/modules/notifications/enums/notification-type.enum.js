"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = void 0;
// src/modules/notifications/enums/notification-type.enum.ts
var NotificationType;
(function (NotificationType) {
    // Channel related types
    NotificationType["EMAIL"] = "EMAIL";
    NotificationType["SMS"] = "SMS";
    NotificationType["PUSH"] = "PUSH";
    NotificationType["IN_APP"] = "IN_APP";
    NotificationType["WHATSAPP"] = "WHATSAPP";
    NotificationType["SLACK"] = "SLACK";
    NotificationType["WEBHOOK"] = "WEBHOOK";
    // Entity types
    NotificationType["USER"] = "USER";
    NotificationType["SYSTEM"] = "SYSTEM";
    NotificationType["ORGANIZATION"] = "ORGANIZATION";
    // Department related notifications
    NotificationType["DEPARTMENT_ASSIGNMENT"] = "DEPARTMENT_ASSIGNMENT";
    NotificationType["DEPARTMENT_UNASSIGNMENT"] = "DEPARTMENT_UNASSIGNMENT";
    NotificationType["DEPARTMENT_TRANSFER"] = "DEPARTMENT_TRANSFER";
    NotificationType["DEPARTMENT_MANAGER_ASSIGNMENT"] = "DEPARTMENT_MANAGER_ASSIGNMENT";
    NotificationType["DEPARTMENT_MANAGER_UNASSIGNMENT"] = "DEPARTMENT_MANAGER_UNASSIGNMENT";
    // Ticket related notifications
    NotificationType["TICKET_ASSIGNED"] = "TICKET_ASSIGNED";
    NotificationType["TICKET_UNASSIGNED"] = "TICKET_UNASSIGNED";
    NotificationType["TICKET_UPDATED"] = "TICKET_UPDATED";
    NotificationType["TICKET_COMMENT"] = "TICKET_COMMENT";
    NotificationType["TICKET_STATUS_CHANGED"] = "TICKET_STATUS_CHANGED";
    // General system notifications
    NotificationType["SYSTEM_ANNOUNCEMENT"] = "SYSTEM_ANNOUNCEMENT";
    NotificationType["TASK_REMINDER"] = "TASK_REMINDER";
    // User related notifications
    NotificationType["USER_MENTION"] = "USER_MENTION";
    NotificationType["USER_INVITATION"] = "USER_INVITATION";
    // Custom notification
    NotificationType["CUSTOM"] = "CUSTOM";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
//# sourceMappingURL=notification-type.enum.js.map