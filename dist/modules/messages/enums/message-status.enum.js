"use strict";
// src/modules/messages/enums/message-status.enum.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = void 0;
/**
 * Enum representing the possible statuses of a message
 */
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["DRAFT"] = "DRAFT";
    MessageStatus["QUEUED"] = "QUEUED";
    MessageStatus["SENDING"] = "SENDING";
    MessageStatus["SENT"] = "SENT";
    MessageStatus["DELIVERED"] = "DELIVERED";
    MessageStatus["READ"] = "READ";
    MessageStatus["FAILED"] = "FAILED";
    MessageStatus["CANCELLED"] = "CANCELLED";
    MessageStatus["SCHEDULED"] = "SCHEDULED";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
//# sourceMappingURL=message-status.enum.js.map