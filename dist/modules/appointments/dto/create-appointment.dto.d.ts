import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
declare class ReminderPreferencesDto {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    reminderTimes?: number[];
}
declare class AppointmentFormDataDto {
    fields?: Record<string, any>;
    templateId?: string;
}
declare class AppointmentMetadataDto {
    customFields?: Record<string, any>;
    externalRefs?: Record<string, string>;
    tags?: string[];
}
export declare class CreateAppointmentDto {
    patientId: string;
    isRecurring?: boolean;
    recurrencePattern?: any;
    doctorId: string;
    startTime: string;
    endTime: string;
    type: AppointmentType;
    priority?: AppointmentPriority;
    title: string;
    description?: string;
    location?: string;
    meetingLink?: string;
    sendReminders?: boolean;
    reminderPreferences?: ReminderPreferencesDto;
    formData?: AppointmentFormDataDto;
    metadata?: AppointmentMetadataDto;
}
export {};
