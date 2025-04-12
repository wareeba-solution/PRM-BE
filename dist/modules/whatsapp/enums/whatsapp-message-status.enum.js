"use strict";
// src/modules/whatsapp/enums/whatsapp-message-status.enum.ts
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
})(WhatsAppMessageStatus = exports.WhatsAppMessageStatus || (exports.WhatsAppMessageStatus = {}));
// Create a record type that maps all enum values to their properties
exports.MESSAGE_STATUS_PROPERTIES = {
    [WhatsAppMessageStatus.DRAFT]: {
        final: false,
        retryable: true,
        description: 'Message is drafted but not yet queued for sending',
    },
    [WhatsAppMessageStatus.QUEUED]: {
        final: false,
        retryable: true,
        description: 'Message is queued for sending',
    },
    [WhatsAppMessageStatus.SCHEDULED]: {
        final: false,
        retryable: true,
        description: 'Message is scheduled to be sent at a later time',
    },
    [WhatsAppMessageStatus.PENDING]: {
        final: false,
        retryable: true,
        description: 'Message is being processed for sending',
    },
    [WhatsAppMessageStatus.SENT]: {
        final: false,
        retryable: false,
        description: 'Message has been sent to WhatsApp servers',
    },
    [WhatsAppMessageStatus.DELIVERED]: {
        final: false,
        retryable: false,
        description: 'Message has been delivered to the recipient',
    },
    [WhatsAppMessageStatus.READ]: {
        final: true,
        retryable: false,
        description: 'Message has been read by the recipient',
    },
    [WhatsAppMessageStatus.FAILED]: {
        final: false,
        retryable: true,
        description: 'Message failed to send but can be retried',
    },
    [WhatsAppMessageStatus.CANCELED]: {
        final: true,
        retryable: false,
        description: 'Message was canceled before it could be sent',
    },
    [WhatsAppMessageStatus.BLOCKED]: {
        final: true,
        retryable: false,
        description: 'Message was blocked by WhatsApp',
    },
    [WhatsAppMessageStatus.EXPIRED]: {
        final: true,
        retryable: false,
        description: 'Message expired before it could be delivered',
    },
    [WhatsAppMessageStatus.DELETED]: {
        final: true,
        retryable: false,
        description: 'Message was deleted',
    },
    [WhatsAppMessageStatus.UNDELIVERABLE]: {
        final: true,
        retryable: false,
        description: 'Message cannot be delivered to the recipient',
    },
    [WhatsAppMessageStatus.UNKNOWN]: {
        final: false,
        retryable: false,
        description: 'Message status is unknown',
    },
    [WhatsAppMessageStatus.PERMANENTLY_FAILED]: {
        final: true,
        retryable: false,
        description: 'Message has permanently failed to send after max retries',
    },
    [WhatsAppMessageStatus.RECEIVED]: {
        final: false,
        retryable: false,
        description: 'Message has been received from a user',
    },
};
//# sourceMappingURL=whatsapp-message-status.enum.js.map