import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentType } from '../enums/appointment-type.enum';
export interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    status: AppointmentStatus;
    type: AppointmentType;
}
