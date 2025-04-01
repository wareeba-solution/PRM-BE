var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Message } from '../entities/message.entity';
import { MessageDeliveryService } from '../services/message-delivery.service';
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
    OnEvent('message.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Message]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleMessageCreated", null);
__decorate([
    OnEvent('message.resend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Message]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleMessageResend", null);
__decorate([
    OnEvent('messages.bulk.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MessageQueueListener.prototype, "handleBulkMessages", null);
MessageQueueListener = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MessageDeliveryService])
], MessageQueueListener);
export { MessageQueueListener };
//# sourceMappingURL=message-queue.listener.js.map