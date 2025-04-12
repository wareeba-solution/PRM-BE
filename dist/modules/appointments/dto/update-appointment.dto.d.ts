import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';
export declare class UpdateReminderPreferencesDto {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    reminderTimes?: number[];
}
export declare class UpdateAppointmentFormDataDto {
    fields?: Record<string, any>;
    templateId?: string;
}
export declare class UpdateAppointmentMetadataDto {
    customFields?: Record<string, any>;
    externalRefs?: Record<string, string>;
    tags?: string[];
}
export declare class UpdateAppointmentDto {
    doctorId?: string;
    startTime?: string;
    endTime?: string;
    type?: AppointmentType;
    priority?: AppointmentPriority;
    status?: AppointmentStatus;
    title?: string;
    description?: string;
    location?: string;
    meetingLink?: string;
    sendReminders?: boolean;
    reminderPreferences?: UpdateReminderPreferencesDto;
    formData?: UpdateAppointmentFormDataDto;
    metadata?: UpdateAppointmentMetadataDto;
    cancellationReason?: string;
    reschedulingReason?: string;
}
