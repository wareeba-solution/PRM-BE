import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from '../entities/message.entity';
export declare class MessageDeliveryService {
    private readonly messageRepository;
    private readonly eventEmitter;
    private readonly logger;
    constructor(messageRepository: Repository<Message>, eventEmitter: EventEmitter2);
    /**
     * Process a single message for delivery
     */
    processMessage(message: Message): Promise<void>;
    /**
     * Process multiple messages in bulk
     */
    processBulkMessages(messages: Message[]): Promise<void>;
    /**
     * Implement actual message delivery logic
     * This is a placeholder that would be replaced with actual delivery implementation
     */
    private deliverMessage;
    /**
     * Retry a failed message
     */
    retryMessage(messageId: string): Promise<void>;
}
