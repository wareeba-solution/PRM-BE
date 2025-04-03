"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = exports.MessageEventType = void 0;
var MessageEventType;
(function (MessageEventType) {
    MessageEventType["CREATED"] = "message.created";
    MessageEventType["UPDATED"] = "message.updated";
    MessageEventType["SENT"] = "message.sent";
    MessageEventType["FAILED"] = "message.failed";
})(MessageEventType || (exports.MessageEventType = MessageEventType = {}));
var MessageEvent = /** @class */ (function () {
    function MessageEvent(type, message) {
        this.type = type;
        this.message = message;
    }
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;
//# sourceMappingURL=message-events.js.map