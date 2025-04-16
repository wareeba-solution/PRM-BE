import { AppointmentType } from '../enums/appointment-type.enum';
import { AppointmentStatus } from '../enums/appointment-status.enum';
export declare class CreateAppointmentDto {
    patientId: string;
    doctorId: string;
    startTime: string;
    endTime: string;
    type?: AppointmentType;
    status?: AppointmentStatus;
    title: string;
    description?: string;
    location?: string;
    notes?: string;
    isRecurring?: boolean;
    recurrenceRule?: any;
}
