var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { MessageStatus } from '../dto/create-message.dto';
import { NotificationsService } from '../../notifications/services/notifications.service';
let MessageDeliveryListener = class MessageDeliveryListener {
    constructor(messageRepository, notificationsService) {
        this.messageRepository = messageRepository;
        this.notificationsService = notificationsService;
    }
    async handleMessageDelivered(payload) {
        const { message, deliveryDetails } = payload;
        message.status = MessageStatus.DELIVERED;
        message.deliveredAt = new Date();
        message.deliveryDetails = deliveryDetails;
        await this.messageRepository.save(message);
        await this.notificationsService.notifyMessageDelivery(message);
    }
    async handleMessageFailed(payload) {
        var _a;
        const { message, error } = payload;
        message.status = MessageStatus.FAILED;
        if (!message.deliveryDetails) {
            message.deliveryDetails = {
                provider: '',
                errorCode: error.code,
                errorMessage: error.message,
                lastAttempt: new Date(),
                attempts: 1
            };
        }
        else {
            message.deliveryDetails = Object.assign(Object.assign({}, message.deliveryDetails), { errorCode: error.code, errorMessage: error.message, lastAttempt: new Date(), attempts: (message.deliveryDetails.attempts || 0) + 1 });
        }
        await this.messageRepository.save(message);
        const attempts = ((_a = message.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0;
        if (attempts >= 3) {
            await this.notificationsService.notifyMessageFailure(message);
        }
    }
};
__decorate([
    OnEvent('message.delivered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageDeliveryListener.prototype, "handleMessageDelivered", null);
__decorate([
    OnEvent('message.failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageDeliveryListener.prototype, "handleMessageFailed", null);
MessageDeliveryListener = __decorate([
    Injectable(),
    __param(0, InjectRepository(Message)),
    __metadata("design:paramtypes", [Repository,
        NotificationsService])
], MessageDeliveryListener);
export { MessageDeliveryListener };
//# sourceMappingURL=message-delivery.listener.js.map