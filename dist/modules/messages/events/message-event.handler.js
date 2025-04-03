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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEventHandler = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const message_events_1 = require("./message-events");
let MessageEventHandler = class MessageEventHandler {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    emit(event) {
        this.eventEmitter.emit(event.type, event.message);
    }
    emitCreated(message) {
        this.emit(new message_events_1.MessageEvent(message_events_1.MessageEventType.CREATED, message));
    }
};
MessageEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], MessageEventHandler);
exports.MessageEventHandler = MessageEventHandler;
//# sourceMappingURL=message-event.handler.js.map