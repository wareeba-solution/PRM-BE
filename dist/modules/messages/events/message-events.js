export var MessageEventType;
(function (MessageEventType) {
    MessageEventType["CREATED"] = "message.created";
    MessageEventType["UPDATED"] = "message.updated";
    MessageEventType["SENT"] = "message.sent";
    MessageEventType["FAILED"] = "message.failed";
})(MessageEventType || (MessageEventType = {}));
export class MessageEvent {
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}
//# sourceMappingURL=message-events.js.map