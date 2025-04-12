import { TicketStatus, TicketType } from '../enums/ticket.enums';
export declare class UpdateTicketDto {
    title?: string;
    description?: string;
    type?: TicketType;
    status?: TicketStatus;
    assignedToId?: string;
    patientId?: string;
    relatedAppointmentId?: string;
    relatedLabResultId?: string;
    relatedPrescriptionId?: string;
    dueDate?: Date;
    patientCondition?: string;
    timeSensitivity?: number;
    impactLevel?: number;
}
