import { EmailLog } from './email-log.entity';
export declare class EmailContent {
    id: string;
    emailLogId: string;
    emailLog: EmailLog;
    htmlContent: string;
    textContent: string;
    metadata: Record<string, any>;
    messageId: string;
}
