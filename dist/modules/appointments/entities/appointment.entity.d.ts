import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentPriority } from '../enums/appointment-priority.enum';
export declare class Appointment {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    notes?: string;
    organizationId: string;
    patientId: string;
    doctorId: string;
    createdById: string;
    updatedById?: string;
    confirmedAt?: Date;
    scheduledFor: Date;
    type: AppointmentType;
    status: AppointmentStatus;
    priority: AppointmentPriority;
    description: string;
    location: string;
    meetingLink: string;
    sendReminders: boolean;
    reminderPreferences: {
        email: boolean;
        sms: boolean;
        whatsapp: boolean;
        reminderTimes: number[];
    };
    formData: {
        chiefComplaint?: string;
        symptoms?: string[];
        duration?: string;
        notes?: string;
        diagnosis?: string;
        treatmentPlan?: string;
        prescriptions?: string[];
        followUpInstructions?: string;
    };
    metadata: {
        referralSource?: string;
        insurance?: string;
        tags?: string[];
        externalId?: string;
        followUpAppointmentId?: string;
        previousAppointmentId?: string;
        billingStatus?: string;
        claimStatus?: string;
        followUpSentAt?: string;
    };
    isRecurring: boolean;
    recurrencePattern: {
        frequency: 'daily' | 'weekly' | 'monthly';
        interval: number;
        endDate?: Date;
        daysOfWeek?: number[];
    };
    parentAppointmentId: string;
    cancellationReason: string;
    reschedulingReason: string;
    reminderSent: boolean;
    reminderSentAt: Date;
    checkedInAt: Date;
    completedAt: Date;
    cancelledAt: Date;
    createdAt: Date;
    updatedAt: Date;
    organization: any;
    patient: any;
    doctor: any;
    createdBy: any;
    updatedBy: any;
    parentAppointment: Appointment;
    recurrentAppointments: Appointment[];
    provider: any;
    isUpcoming(): boolean;
    isInProgress(): boolean;
    isOverdue(): boolean;
    getDuration(): number;
    canBeModified(): boolean;
    needsReminder(): boolean;
}
