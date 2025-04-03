export declare enum AppointmentPriority {
    EMERGENCY = "EMERGENCY",// Immediate attention required
    URGENT = "URGENT",// Needs to be seen within 24 hours
    HIGH = "HIGH",// Priority but not urgent (within 48-72 hours)
    NORMAL = "NORMAL",// Regular appointment priority
    MEDIUM = "MEDIUM",// Standard priority (within a week)
    LOW = "LOW",// Routine appointment
    FOLLOW_UP = "FOLLOW_UP"
}
export type PriorityLevel = {
    value: AppointmentPriority;
    label: string;
    maxWaitTime: string;
    color: string;
};
export declare const PRIORITY_METADATA: Record<AppointmentPriority, PriorityLevel>;
