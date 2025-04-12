"use strict";
// src/modules/messages/listeners/message-delivery.listener.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeliveryListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
const notifications_service_1 = require("../../notifications/services/notifications.service");
let MessageDeliveryListener = class MessageDeliveryListener {
    constructor(messageRepository, notificationsService) {
        this.messageRepository = messageRepository;
        this.notificationsService = notificationsService;
    }
    async handleMessageDelivered(payload) {
        const { message, deliveryDetails } = payload;
        message.status = create_message_dto_1.MessageStatus.DELIVERED;
        message.deliveredAt = new Date();
        message.deliveryDetails = deliveryDetails;
        await this.messageRepository.save(message);
        // Notify relevant users about delivery
        await this.notificationsService.notifyMessageDelivery(message);
    }
    async handleMessageFailed(payload) {
        var _a;
        const { message, error } = payload;
        message.status = create_message_dto_1.MessageStatus.FAILED;
        // Add null check for deliveryDetails
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
        // Null check for deliveryDetails before accessing attempts
        const attempts = ((_a = message.deliveryDetails) === null || _a === void 0 ? void 0 : _a.attempts) || 0;
        // Notify admin about failure if attempts exceed threshold
        if (attempts >= 3) {
            await this.notificationsService.notifyMessageFailure(message);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('message.delivered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageDeliveryListener.prototype, "handleMessageDelivered", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageDeliveryListener.prototype, "handleMessageFailed", null);
MessageDeliveryListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], MessageDeliveryListener);
exports.MessageDeliveryListener = MessageDeliveryListener;
//# sourceMappingURL=message-delivery.listener.js.map