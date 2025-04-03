import { ConfigService } from '@nestjs/config';
export declare class SmsService {
    private readonly configService;
    private readonly logger;
    private twilioClient;
    private mockMode;
    constructor(configService: ConfigService);
    private initializeTwilioClient;
    /**
     * Send an SMS message
     * @param to Recipient phone number
     * @param message SMS message content
     */
    sendSms(to: string, message: string): Promise<any>;
    private sendMockSms;
    /**
     * Send an appointment reminder
     * @param appointment The appointment data
     */
    sendAppointmentReminder(appointment: any): Promise<void>;
    private formatReminderMessage;
    isMockMode(): boolean;
}
