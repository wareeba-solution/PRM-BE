var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SlackService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
let SlackService = SlackService_1 = class SlackService {
    constructor(configService, eventEmitter) {
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.logger = new Logger(SlackService_1.name);
        const token = this.configService.get('SLACK_BOT_TOKEN');
        this.client = {
            chat: {
                postMessage: async () => ({ ok: true, ts: String(Date.now()) }),
                update: async () => ({ ok: true }),
                delete: async () => ({ ok: true }),
            },
            conversations: {
                info: async () => ({ channel: { id: 'mock-channel', name: 'mock-channel-name' } }),
                join: async () => ({ ok: true }),
                history: async () => ({ messages: [] }),
            }
        };
    }
    async sendMessage(channel, text, threadTs) {
        try {
            this.logger.log(`[MOCK] Sending Slack message to channel ${channel}: ${text}`);
            const response = { ok: true, ts: String(Date.now()) };
            this.eventEmitter.emit('slack.message.sent', {
                channel,
                messageTs: response.ts,
                text,
            });
            return response;
        }
        catch (error) {
            this.logger.error('Failed to send Slack message', error);
            this.eventEmitter.emit('slack.message.failed', {
                channel,
                text,
                error: error.message,
            });
            throw error;
        }
    }
    sendDirectMessage(arg0) {
        this.logger.log(`[MOCK] Sending direct message to user ${arg0.userId}: ${arg0.message.text}`);
        return Promise.resolve({ ok: true, ts: String(Date.now()) });
    }
    async sendBlockMessage(channel, blocks, text) {
        try {
            this.logger.log(`[MOCK] Sending Slack block message to channel ${channel}`);
            const response = { ok: true, ts: String(Date.now()) };
            this.eventEmitter.emit('slack.message.sent', {
                channel,
                messageTs: response.ts,
                blocks,
            });
            return response;
        }
        catch (error) {
            this.logger.error('Failed to send Slack block message', error);
            this.eventEmitter.emit('slack.message.failed', {
                channel,
                blocks,
                error: error.message,
            });
            throw error;
        }
    }
    async sendAttachmentMessage(channel, attachments, text) {
        try {
            this.logger.log(`[MOCK] Sending Slack attachment message to channel ${channel}`);
            const response = { ok: true, ts: String(Date.now()) };
            this.eventEmitter.emit('slack.message.sent', {
                channel,
                messageTs: response.ts,
                attachments,
            });
            return response;
        }
        catch (error) {
            this.logger.error('Failed to send Slack attachment message', error);
            this.eventEmitter.emit('slack.message.failed', {
                channel,
                attachments,
                error: error.message,
            });
            throw error;
        }
    }
    async updateMessage(channel, ts, text, blocks) {
        try {
            this.logger.log(`[MOCK] Updating Slack message in channel ${channel}, ts: ${ts}, text: ${text}`);
            this.eventEmitter.emit('slack.message.updated', {
                channel,
                messageTs: ts,
                text,
                blocks,
            });
        }
        catch (error) {
            this.logger.error('Failed to update Slack message', error);
            this.eventEmitter.emit('slack.message.update.failed', {
                channel,
                ts,
                error: error.message,
            });
            throw error;
        }
    }
    async deleteMessage(channel, ts) {
        try {
            this.logger.log(`[MOCK] Deleting Slack message from channel ${channel}, ts: ${ts}`);
            this.eventEmitter.emit('slack.message.deleted', {
                channel,
                messageTs: ts,
            });
        }
        catch (error) {
            this.logger.error('Failed to delete Slack message', error);
            this.eventEmitter.emit('slack.message.delete.failed', {
                channel,
                ts,
                error: error.message,
            });
            throw error;
        }
    }
    async getChannelInfo(channelId) {
        this.logger.log(`[MOCK] Getting info for channel ${channelId}`);
        return { id: channelId, name: `mock-channel-${channelId}` };
    }
    async joinChannel(channelId) {
        this.logger.log(`[MOCK] Joining channel ${channelId}`);
        return { ok: true };
    }
    async getChannelHistory(channel, limit = 100) {
        this.logger.log(`[MOCK] Getting history for channel ${channel}, limit: ${limit}`);
        return Array(Math.min(limit, 10)).fill(null).map((_, i) => ({
            ts: String(Date.now() - i * 60000),
            text: `Mock message ${i + 1}`,
            user: `U${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        }));
    }
};
SlackService = SlackService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        EventEmitter2])
], SlackService);
export { SlackService };
//# sourceMappingURL=slack.service.js.map