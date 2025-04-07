export declare class EmailLogSchema {
    id: string;
    organizationId: string;
    templateId: string;
    recipient: string;
    subject: string;
    status: string;
}
export declare class EmailContentSchema {
    id: string;
    emailLogId: string;
    htmlContent: string;
    textContent: string;
    messageId: string;
}
