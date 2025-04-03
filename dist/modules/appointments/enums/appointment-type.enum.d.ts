export declare enum AppointmentType {
    INITIAL_CONSULTATION = "INITIAL_CONSULTATION",// First time visit
    FOLLOW_UP = "FOLLOW_UP",// Follow-up visit
    ROUTINE_CHECKUP = "ROUTINE_CHECKUP",// Regular check-up
    SPECIALIST_CONSULTATION = "SPECIALIST_CONSULTATION",// Specialist visit
    URGENT_CARE = "URGENT_CARE",// Urgent care visit
    PROCEDURE = "PROCEDURE",// Medical procedure
    SURGERY = "SURGERY",// Surgical appointment
    DIAGNOSTIC = "DIAGNOSTIC",// Tests and diagnostics
    THERAPY = "THERAPY",// Therapy session
    VACCINATION = "VACCINATION",// Vaccination appointment
    SCREENING = "SCREENING",// Health screening
    TELEHEALTH = "TELEHEALTH",// Virtual consultation
    LAB_WORK = "LAB_WORK",// Laboratory tests
    IMAGING = "IMAGING",// Medical imaging
    DENTAL = "DENTAL",// Dental appointment
    PHARMACY = "PHARMACY",// Pharmacy consultation
    IN_PERSON = "IN_PERSON",
    VIRTUAL = "VIRTUAL",
    PHONE = "PHONE",
    HOME_VISIT = "HOME_VISIT",
    EMERGENCY = "EMERGENCY",
    CONSULTATION = "CONSULTATION",
    MATERNITY = "MATERNITY",
    SPECIALIZED = "SPECIALIZED",
    PEDIATRIC = "PEDIATRIC",
    WELLNESS_CHECK = "WELLNESS_CHECK"
}
export type AppointmentTypeMetadata = {
    value: AppointmentType;
    label: string;
    description: string;
    defaultDuration: number;
    requiresPreparation: boolean;
    preparationInstructions?: string;
    category: 'PRIMARY' | 'SPECIALIST' | 'DIAGNOSTIC' | 'PROCEDURE' | 'OTHER';
    resources?: string[];
    virtualEnabled: boolean;
};
export declare const APPOINTMENT_TYPE_METADATA: Record<AppointmentType, AppointmentTypeMetadata>;
