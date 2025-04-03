"use strict";
// src/modules/whatsapp/enums/whatsapp-message-status.enum.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_STATUS_PROPERTIES = exports.WhatsAppMessageStatus = void 0;
var WhatsAppMessageStatus;
(function (WhatsAppMessageStatus) {
    WhatsAppMessageStatus["DRAFT"] = "DRAFT";
    WhatsAppMessageStatus["QUEUED"] = "QUEUED";
    WhatsAppMessageStatus["SCHEDULED"] = "SCHEDULED";
    WhatsAppMessageStatus["PENDING"] = "PENDING";
    WhatsAppMessageStatus["SENT"] = "SENT";
    WhatsAppMessageStatus["DELIVERED"] = "DELIVERED";
    WhatsAppMessageStatus["READ"] = "READ";
    WhatsAppMessageStatus["FAILED"] = "FAILED";
    WhatsAppMessageStatus["CANCELED"] = "CANCELED";
    WhatsAppMessageStatus["BLOCKED"] = "BLOCKED";
    WhatsAppMessageStatus["EXPIRED"] = "EXPIRED";
    WhatsAppMessageStatus["DELETED"] = "DELETED";
    WhatsAppMessageStatus["UNDELIVERABLE"] = "UNDELIVERABLE";
    WhatsAppMessageStatus["UNKNOWN"] = "UNKNOWN";
    WhatsAppMessageStatus["PERMANENTLY_FAILED"] = "PERMANENTLY_FAILED";
    WhatsAppMessageStatus["RECEIVED"] = "RECEIVED";
})(WhatsAppMessageStatus || (exports.WhatsAppMessageStatus = WhatsAppMessageStatus = {}));
// Create a record type that maps all enum values to their properties
exports.MESSAGE_STATUS_PROPERTIES = (_a = {},
    _a[WhatsAppMessageStatus.DRAFT] = {
        final: false,
        retryable: true,
        description: 'Message is drafted but not yet queued for sending',
    },
    _a[WhatsAppMessageStatus.QUEUED] = {
        final: false,
        retryable: true,
        description: 'Message is queued for sending',
    },
    _a[WhatsAppMessageStatus.SCHEDULED] = {
        final: false,
        retryable: true,
        description: 'Message is scheduled to be sent at a later time',
    },
    _a[WhatsAppMessageStatus.PENDING] = {
        final: false,
        retryable: true,
        description: 'Message is being processed for sending',
    },
    _a[WhatsAppMessageStatus.SENT] = {
        final: false,
        retryable: false,
        description: 'Message has been sent to WhatsApp servers',
    },
    _a[WhatsAppMessageStatus.DELIVERED] = {
        final: false,
        retryable: false,
        description: 'Message has been delivered to the recipient',
    },
    _a[WhatsAppMessageStatus.READ] = {
        final: true,
        retryable: false,
        description: 'Message has been read by the recipient',
    },
    _a[WhatsAppMessageStatus.FAILED] = {
        final: false,
        retryable: true,
        description: 'Message failed to send but can be retried',
    },
    _a[WhatsAppMessageStatus.CANCELED] = {
        final: true,
        retryable: false,
        description: 'Message was canceled before it could be sent',
    },
    _a[WhatsAppMessageStatus.BLOCKED] = {
        final: true,
        retryable: false,
        description: 'Message was blocked by WhatsApp',
    },
    _a[WhatsAppMessageStatus.EXPIRED] = {
        final: true,
        retryable: false,
        description: 'Message expired before it could be delivered',
    },
    _a[WhatsAppMessageStatus.DELETED] = {
        final: true,
        retryable: false,
        description: 'Message was deleted',
    },
    _a[WhatsAppMessageStatus.UNDELIVERABLE] = {
        final: true,
        retryable: false,
        description: 'Message cannot be delivered to the recipient',
    },
    _a[WhatsAppMessageStatus.UNKNOWN] = {
        final: false,
        retryable: false,
        description: 'Message status is unknown',
    },
    _a[WhatsAppMessageStatus.PERMANENTLY_FAILED] = {
        final: true,
        retryable: false,
        description: 'Message has permanently failed to send after max retries',
    },
    _a[WhatsAppMessageStatus.RECEIVED] = {
        final: false,
        retryable: false,
        description: 'Message has been received from a user',
    },
    _a);
//# sourceMappingURL=whatsapp-message-status.enum.js.map