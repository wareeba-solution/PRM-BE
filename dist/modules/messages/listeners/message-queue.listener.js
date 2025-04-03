"use strict";
// src/modules/messages/listeners/message-queue.listener.ts
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
exports.MessageQueueListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const message_entity_1 = require("../entities/message.entity");
const message_delivery_service_1 = require("../services/message-delivery.service");
let MessageQueueListener = class MessageQueueListener {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }
    handleMessageCreated(message) {
        return this.deliveryService.processMessage(message);
    }
    handleMessageResend(message) {
        return this.deliveryService.processMessage(message);
    }
    handleBulkMessages(messages) {
        return this.deliveryService.processBulkMessages(messages);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('message.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entity_1.Message]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleMessageCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.resend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entity_1.Message]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleMessageResend", null);
__decorate([
    (0, event_emitter_1.OnEvent)('messages.bulk.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleBulkMessages", null);
MessageQueueListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_delivery_service_1.MessageDeliveryService])
], MessageQueueListener);
exports.MessageQueueListener = MessageQueueListener;
//# sourceMappingURL=message-queue.listener.js.map