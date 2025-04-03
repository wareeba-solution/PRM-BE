"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = exports.MessageEventType = void 0;
var MessageEventType;
(function (MessageEventType) {
    MessageEventType["CREATED"] = "message.created";
    MessageEventType["UPDATED"] = "message.updated";
    MessageEventType["SENT"] = "message.sent";
    MessageEventType["FAILED"] = "message.failed";
})(MessageEventType = exports.MessageEventType || (exports.MessageEventType = {}));
class MessageEvent {
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
exports.MessageEvent = MessageEvent;
//# sourceMappingURL=message-events.js.map