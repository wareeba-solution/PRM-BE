"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPOINTMENT_TYPE_METADATA = exports.AppointmentType = void 0;
var AppointmentType;
(function (AppointmentType) {
    AppointmentType["INITIAL_CONSULTATION"] = "INITIAL_CONSULTATION";
    AppointmentType["FOLLOW_UP"] = "FOLLOW_UP";
    AppointmentType["ROUTINE_CHECKUP"] = "ROUTINE_CHECKUP";
    AppointmentType["SPECIALIST_CONSULTATION"] = "SPECIALIST_CONSULTATION";
    AppointmentType["URGENT_CARE"] = "URGENT_CARE";
    AppointmentType["PROCEDURE"] = "PROCEDURE";
    AppointmentType["SURGERY"] = "SURGERY";
    AppointmentType["DIAGNOSTIC"] = "DIAGNOSTIC";
    AppointmentType["THERAPY"] = "THERAPY";
    AppointmentType["VACCINATION"] = "VACCINATION";
    AppointmentType["SCREENING"] = "SCREENING";
    AppointmentType["TELEHEALTH"] = "TELEHEALTH";
    AppointmentType["LAB_WORK"] = "LAB_WORK";
    AppointmentType["IMAGING"] = "IMAGING";
    AppointmentType["DENTAL"] = "DENTAL";
    AppointmentType["PHARMACY"] = "PHARMACY";
    AppointmentType["IN_PERSON"] = "IN_PERSON";
    AppointmentType["VIRTUAL"] = "VIRTUAL";
    AppointmentType["PHONE"] = "PHONE";
    AppointmentType["HOME_VISIT"] = "HOME_VISIT";
    AppointmentType["EMERGENCY"] = "EMERGENCY";
    AppointmentType["CONSULTATION"] = "CONSULTATION";
    AppointmentType["MATERNITY"] = "MATERNITY";
    AppointmentType["SPECIALIZED"] = "SPECIALIZED";
    AppointmentType["PEDIATRIC"] = "PEDIATRIC";
    AppointmentType["WELLNESS_CHECK"] = "WELLNESS_CHECK";
})(AppointmentType || (exports.AppointmentType = AppointmentType = {}));
// Helper constant for appointment type metadata
exports.APPOINTMENT_TYPE_METADATA = (_a = {},
    _a[AppointmentType.INITIAL_CONSULTATION] = {
        value: AppointmentType.INITIAL_CONSULTATION,
        label: 'Initial Consultation',
        description: 'First-time visit with healthcare provider',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Please bring medical history and current medications list',
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.IN_PERSON] = {
        value: AppointmentType.IN_PERSON,
        label: 'In-Person Visit',
        description: 'Standard in-person medical visit',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[AppointmentType.FOLLOW_UP] = {
        value: AppointmentType.FOLLOW_UP,
        label: 'Follow-up Visit',
        description: 'Follow-up appointment to review progress',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.ROUTINE_CHECKUP] = {
        value: AppointmentType.ROUTINE_CHECKUP,
        label: 'Routine Check-up',
        description: 'Regular health check-up',
        defaultDuration: 45,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[AppointmentType.SPECIALIST_CONSULTATION] = {
        value: AppointmentType.SPECIALIST_CONSULTATION,
        label: 'Specialist Consultation',
        description: 'Consultation with a specialist',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Please bring referral and previous test results',
        category: 'SPECIALIST',
        virtualEnabled: true
    },
    _a[AppointmentType.URGENT_CARE] = {
        value: AppointmentType.URGENT_CARE,
        label: 'Urgent Care',
        description: 'Immediate medical attention required',
        defaultDuration: 45,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[AppointmentType.PROCEDURE] = {
        value: AppointmentType.PROCEDURE,
        label: 'Medical Procedure',
        description: 'Minor medical procedure',
        defaultDuration: 90,
        requiresPreparation: true,
        preparationInstructions: 'Specific preparation instructions will be provided',
        category: 'PROCEDURE',
        resources: ['Procedure Room', 'Standard Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.SURGERY] = {
        value: AppointmentType.SURGERY,
        label: 'Surgery',
        description: 'Surgical procedure',
        defaultDuration: 180,
        requiresPreparation: true,
        preparationInstructions: 'Detailed pre-surgery instructions will be provided',
        category: 'PROCEDURE',
        resources: ['Operating Room', 'Surgical Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.DIAGNOSTIC] = {
        value: AppointmentType.DIAGNOSTIC,
        label: 'Diagnostic Test',
        description: 'Medical diagnostic testing',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Test-specific preparation instructions will be provided',
        category: 'DIAGNOSTIC',
        resources: ['Testing Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.THERAPY] = {
        value: AppointmentType.THERAPY,
        label: 'Therapy Session',
        description: 'Therapeutic treatment session',
        defaultDuration: 60,
        requiresPreparation: false,
        category: 'OTHER',
        virtualEnabled: true
    },
    _a[AppointmentType.VACCINATION] = {
        value: AppointmentType.VACCINATION,
        label: 'Vaccination',
        description: 'Vaccine administration',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PROCEDURE',
        resources: ['Vaccine Storage'],
        virtualEnabled: false
    },
    _a[AppointmentType.SCREENING] = {
        value: AppointmentType.SCREENING,
        label: 'Health Screening',
        description: 'Preventive health screening',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Please follow screening-specific preparation guidelines',
        category: 'DIAGNOSTIC',
        virtualEnabled: false
    },
    _a[AppointmentType.TELEHEALTH] = {
        value: AppointmentType.TELEHEALTH,
        label: 'Telehealth Visit',
        description: 'Virtual healthcare consultation',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.LAB_WORK] = {
        value: AppointmentType.LAB_WORK,
        label: 'Laboratory Tests',
        description: 'Laboratory testing and sample collection',
        defaultDuration: 30,
        requiresPreparation: true,
        preparationInstructions: 'Specific lab test preparation instructions will be provided',
        category: 'DIAGNOSTIC',
        resources: ['Lab Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.IMAGING] = {
        value: AppointmentType.IMAGING,
        label: 'Medical Imaging',
        description: 'Medical imaging services',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Imaging-specific preparation instructions will be provided',
        category: 'DIAGNOSTIC',
        resources: ['Imaging Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.DENTAL] = {
        value: AppointmentType.DENTAL,
        label: 'Dental Visit',
        description: 'Dental care appointment',
        defaultDuration: 60,
        requiresPreparation: false,
        category: 'SPECIALIST',
        resources: ['Dental Equipment'],
        virtualEnabled: false
    },
    _a[AppointmentType.PHARMACY] = {
        value: AppointmentType.PHARMACY,
        label: 'Pharmacy Consultation',
        description: 'Consultation with pharmacist',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'OTHER',
        virtualEnabled: true
    },
    _a[AppointmentType.VIRTUAL] = {
        value: AppointmentType.VIRTUAL,
        label: 'Virtual Appointment',
        description: 'Virtual healthcare appointment',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.PHONE] = {
        value: AppointmentType.PHONE,
        label: 'Phone Consultation',
        description: 'Consultation over the phone',
        defaultDuration: 20,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.HOME_VISIT] = {
        value: AppointmentType.HOME_VISIT,
        label: 'Home Visit',
        description: 'Healthcare provider visits patient at home',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Ensure a clean and safe environment for the visit',
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[AppointmentType.EMERGENCY] = {
        value: AppointmentType.EMERGENCY,
        label: 'Emergency Visit',
        description: 'Emergency medical attention',
        defaultDuration: 120,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[AppointmentType.CONSULTATION] = {
        value: AppointmentType.CONSULTATION,
        label: 'General Consultation',
        description: 'General medical consultation',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[AppointmentType.MATERNITY] = {
        value: AppointmentType.MATERNITY,
        label: 'Maternity Care',
        description: 'Maternity care appointment',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Bring maternity records and previous test results',
        category: 'SPECIALIST',
        virtualEnabled: false
    },
    _a[AppointmentType.SPECIALIZED] = {
        value: AppointmentType.SPECIALIZED,
        label: 'Specialized Care',
        description: 'Specialized medical care',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Bring relevant medical records and test results',
        category: 'SPECIALIST',
        virtualEnabled: false
    },
    _a[AppointmentType.PEDIATRIC] = {
        value: AppointmentType.PEDIATRIC,
        label: 'Pediatric Care',
        description: 'Pediatric care appointment',
        defaultDuration: 45,
        requiresPreparation: false,
        category: 'SPECIALIST',
        virtualEnabled: false
    },
    _a[AppointmentType.WELLNESS_CHECK] = {
        value: AppointmentType.WELLNESS_CHECK,
        label: 'Wellness Check',
        description: 'Routine wellness check-up',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a);
//# sourceMappingURL=appointment-type.enum.js.map