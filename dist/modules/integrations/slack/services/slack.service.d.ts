import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
type Block = any;
type KnownBlock = any;
type ChatPostMessageResponse = {
    ts: string;
    ok: boolean;
};
export declare class SlackService {
    private readonly configService;
    private readonly eventEmitter;
    private readonly logger;
    private readonly client;
    constructor(configService: ConfigService, eventEmitter: EventEmitter2);
    /**
     * Send a simple text message to a Slack channel
     */
    sendMessage(channel: string, text: string, threadTs?: string): Promise<ChatPostMessageResponse>;
    sendDirectMessage(arg0: {
        userId: any;
        message: {
            text: string;
            blocks: {
                type: string;
                text: {
                    type: string;
                    text: string;
                };
            }[];
        };
    }): Promise<{
        ok: boolean;
        ts: string;
    }>;
    /**
     * Send a message with block components
     */
    sendBlockMessage(channel: string, blocks: (Block | KnownBlock)[], text?: string): Promise<ChatPostMessageResponse>;
    /**
     * Send a message with attachments
     */
    sendAttachmentMessage(channel: string, attachments: any[], text?: string): Promise<ChatPostMessageResponse>;
    /**
     * Update an existing message
     */
    updateMessage(channel: string, ts: string, text: string, blocks?: any[]): Promise<void>;
    /**
     * Delete a message
     */
    deleteMessage(channel: string, ts: string): Promise<void>;
    /**
     * Get channel information
     */
    getChannelInfo(channelId: string): Promise<{
        id: string;
        name: string;
    }>;
    /**
     * Join a channel
     */
    joinChannel(channelId: string): Promise<{
        ok: boolean;
    }>;
    /**
     * Get message history from a channel
     */
    getChannelHistory(channel: string, limit?: number): Promise<{
        ts: string;
        text: string;
        user: string;
    }[]>;
}
export {};
