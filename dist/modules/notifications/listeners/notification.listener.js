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
var NotificationListener_1;
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationDeliveryService } from '../services/notification-delivery.service';
import { NotificationTemplate } from '../entities/notification-template.entity';
let NotificationListener = NotificationListener_1 = class NotificationListener {
    constructor(templateRepository, deliveryService) {
        this.templateRepository = templateRepository;
        this.deliveryService = deliveryService;
        this.logger = new Logger(NotificationListener_1.name);
    }
    async handleNotificationCreated(notification) {
        try {
            this.logger.debug(`Processing new notification: ${notification.id}`);
            if (notification.templateId) {
                await this.processTemplate(notification);
            }
            await this.deliveryService.processNotification(notification);
        }
        catch (error) {
            this.logger.error(`Error processing notification ${notification.id}:`, error);
            throw error;
        }
    }
    async handleNotificationResend(notification) {
        try {
            this.logger.debug(`Resending notification: ${notification.id}`);
            await this.deliveryService.retryNotification(notification);
        }
        catch (error) {
            this.logger.error(`Error resending notification ${notification.id}:`, error);
            throw error;
        }
    }
    async processTemplate(notification) {
        var _a, _b;
        const template = await this.templateRepository.findOne({
            where: { id: notification.templateId }
        });
        if (!template) {
            throw new Error(`Template ${notification.templateId} not found`);
        }
        await this.templateRepository.update(template.id, {
            lastUsedAt: new Date(),
            useCount: () => 'use_count + 1'
        });
        const metadata = notification.metadata || {};
        notification.subject = this.interpolateVariables(template.subject, metadata);
        notification.content = this.interpolateVariables(template.content, metadata);
        if (template.channelSpecificContent) {
            notification.channelContent = Object.assign(Object.assign({}, notification.channelContent), this.processChannelContent(template.channelSpecificContent, metadata));
        }
        if (!((_a = notification.channels) === null || _a === void 0 ? void 0 : _a.length) && ((_b = template.channels) === null || _b === void 0 ? void 0 : _b.length)) {
            notification.channels = template.channels.map(channel => ({
                name: channel,
                type: 'default',
                isActive: true,
                additionalProperty: 'value'
            }));
        }
    }
    interpolateVariables(content, variables) {
        return content.replace(/\{\{(.*?)\}\}/g, (match, variable) => {
            const key = variable.trim();
            return variables[key] !== undefined ? variables[key] : match;
        });
    }
    processChannelContent(channelContent, variables) {
        const processed = {};
        for (const [channel, content] of Object.entries(channelContent)) {
            processed[channel] = {};
            for (const [key, value] of Object.entries(content)) {
                if (typeof value === 'string') {
                    processed[channel][key] = this.interpolateVariables(value, variables);
                }
                else {
                    processed[channel][key] = value;
                }
            }
        }
        return processed;
    }
};
__decorate([
    OnEvent('notification.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notification]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "handleNotificationCreated", null);
__decorate([
    OnEvent('notification.resend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Notification]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "handleNotificationResend", null);
NotificationListener = NotificationListener_1 = __decorate([
    Injectable(),
    __param(0, InjectRepository(NotificationTemplate)),
    __metadata("design:paramtypes", [Repository,
        NotificationDeliveryService])
], NotificationListener);
export { NotificationListener };
//# sourceMappingURL=notification.listener.js.map