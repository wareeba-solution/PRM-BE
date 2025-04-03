export declare enum AppointmentStatus {
    REQUESTED = "REQUESTED",// Initial request made
    PENDING = "PENDING",// Awaiting confirmation
    SCHEDULED = "SCHEDULED",
    CONFIRMED = "CONFIRMED",// Appointment confirmed
    CHECKED_IN = "CHECKED_IN",// Patient has arrived
    IN_PROGRESS = "IN_PROGRESS",// Currently being seen
    COMPLETED = "COMPLETED",// Appointment finished
    CANCELLED = "CANCELLED",// Cancelled by either party
    NO_SHOW = "NO_SHOW",// Patient didn't show up
    RESCHEDULED = "RESCHEDULED",// Appointment was rescheduled
    WAITING_LIST = "WAITING_LIST",// On waiting list for cancellation
    MISSED = "MISSED"
}
export type StatusMetadata = {
    value: AppointmentStatus;
    label: string;
    description: string;
    color: string;
    allowedTransitions: AppointmentStatus[];
};
export declare const STATUS_METADATA: Record<AppointmentStatus, StatusMetadata>;
