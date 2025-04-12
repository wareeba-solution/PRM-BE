import { BaseDto } from '../base.dto';
/**
 * Appointment DTO for Swagger documentation
 * This avoids circular dependencies that occur when using entity classes directly
 */
export declare class AppointmentDto extends BaseDto {
    organizationId: string;
    contactId: string;
    doctorId: string;
    title: string;
    notes?: string;
    startTime: Date;
    endTime: Date;
    status: string;
    type: string;
    location?: string;
    reminderSent: boolean;
    lastReminderSentAt?: Date;
    isConfirmed: boolean;
    confirmedAt?: Date;
    isCancelled: boolean;
    cancelledAt?: Date;
    cancelledById?: string;
    cancellationReason?: string;
    isCompleted: boolean;
    completedAt?: Date;
    completedById?: string;
    metadata?: Record<string, any>;
}
