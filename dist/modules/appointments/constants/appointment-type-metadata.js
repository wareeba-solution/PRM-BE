"use strict";
// src/modules/appointments/constants/appointment-type-metadata.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPOINTMENT_TYPE_METADATA = void 0;
var appointment_type_enum_1 = require("../enums/appointment-type.enum");
exports.APPOINTMENT_TYPE_METADATA = (_a = {},
    _a[appointment_type_enum_1.AppointmentType.INITIAL_CONSULTATION] = {
        value: appointment_type_enum_1.AppointmentType.INITIAL_CONSULTATION,
        label: 'Initial Consultation',
        description: 'First visit with a doctor to discuss health concerns',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Please bring all medical records and a list of current medications',
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.IN_PERSON] = {
        value: appointment_type_enum_1.AppointmentType.IN_PERSON,
        label: 'In-Person Visit',
        description: 'Face-to-face appointment at the clinic',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.VIRTUAL] = {
        value: appointment_type_enum_1.AppointmentType.VIRTUAL,
        label: 'Virtual Appointment',
        description: 'Remote consultation via video call',
        defaultDuration: 30,
        requiresPreparation: true,
        preparationInstructions: 'Ensure you have a stable internet connection and a private space',
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.PHONE] = {
        value: appointment_type_enum_1.AppointmentType.PHONE,
        label: 'Phone Consultation',
        description: 'Consultation over the phone',
        defaultDuration: 20,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.HOME_VISIT] = {
        value: appointment_type_enum_1.AppointmentType.HOME_VISIT,
        label: 'Home Visit',
        description: 'Doctor visits patient at their residence',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Please provide accurate address details and any special access instructions',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.EMERGENCY] = {
        value: appointment_type_enum_1.AppointmentType.EMERGENCY,
        label: 'Emergency',
        description: 'Urgent care appointment',
        defaultDuration: 45,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.FOLLOW_UP] = {
        value: appointment_type_enum_1.AppointmentType.FOLLOW_UP,
        label: 'Follow-Up',
        description: 'Review progress since previous appointment',
        defaultDuration: 20,
        requiresPreparation: false,
        category: 'SECONDARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.CONSULTATION] = {
        value: appointment_type_enum_1.AppointmentType.CONSULTATION,
        label: 'General Consultation',
        description: 'General health consultation',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.ROUTINE_CHECKUP] = {
        value: appointment_type_enum_1.AppointmentType.ROUTINE_CHECKUP,
        label: 'Routine Checkup',
        description: 'Regular health assessment',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.SPECIALIZED] = {
        value: appointment_type_enum_1.AppointmentType.SPECIALIZED,
        label: 'Specialized Consultation',
        description: 'Consultation with a specialist',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Please bring any referral documents and previous test results',
        category: 'SPECIALIZED',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.DIAGNOSTIC] = {
        value: appointment_type_enum_1.AppointmentType.DIAGNOSTIC,
        label: 'Diagnostic Procedure',
        description: 'Tests and procedures to diagnose health conditions',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Specific preparation instructions will be provided based on the diagnostic test',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.THERAPY] = {
        value: appointment_type_enum_1.AppointmentType.THERAPY,
        label: 'Therapy Session',
        description: 'Therapeutic intervention or treatment',
        defaultDuration: 60,
        requiresPreparation: false,
        category: 'SPECIALIZED',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.VACCINATION] = {
        value: appointment_type_enum_1.AppointmentType.VACCINATION,
        label: 'Vaccination',
        description: 'Immunization or vaccine administration',
        defaultDuration: 15,
        requiresPreparation: true,
        preparationInstructions: 'Bring your immunization record. If you feel unwell on the day, please reschedule',
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.SCREENING] = {
        value: appointment_type_enum_1.AppointmentType.SCREENING,
        label: 'Health Screening',
        description: 'Preventive screening for various health conditions',
        defaultDuration: 30,
        requiresPreparation: true,
        preparationInstructions: 'Specific preparation instructions will be provided based on the screening type',
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.SURGERY] = {
        value: appointment_type_enum_1.AppointmentType.SURGERY,
        label: 'Surgical Procedure',
        description: 'Minor or major surgical intervention',
        defaultDuration: 120,
        requiresPreparation: true,
        preparationInstructions: 'Follow all pre-surgery instructions. No food or drink after midnight before surgery',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.DENTAL] = {
        value: appointment_type_enum_1.AppointmentType.DENTAL,
        label: 'Dental Appointment',
        description: 'Dental check-up or procedure',
        defaultDuration: 60,
        requiresPreparation: false,
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.PEDIATRIC] = {
        value: appointment_type_enum_1.AppointmentType.PEDIATRIC,
        label: 'Pediatric Visit',
        description: 'Healthcare visit for children',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.MATERNITY] = {
        value: appointment_type_enum_1.AppointmentType.MATERNITY,
        label: 'Maternity Appointment',
        description: 'Prenatal, postnatal, or maternity care',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Bring any prenatal records and recent test results',
        category: 'SPECIALIZED',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.PHARMACY] = {
        value: appointment_type_enum_1.AppointmentType.PHARMACY,
        label: 'Pharmacy Consultation',
        description: 'Medication review or consultation with pharmacist',
        defaultDuration: 15,
        requiresPreparation: true,
        preparationInstructions: 'Bring a list of all medications you are currently taking',
        category: 'SECONDARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.SPECIALIST_CONSULTATION] = {
        value: appointment_type_enum_1.AppointmentType.SPECIALIST_CONSULTATION,
        label: 'Specialist Consultation',
        description: 'Consultation with a medical specialist',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Bring any referral documents and previous test results',
        category: 'SPECIALIZED',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.URGENT_CARE] = {
        value: appointment_type_enum_1.AppointmentType.URGENT_CARE,
        label: 'Urgent Care',
        description: 'Immediate care for urgent medical issues',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.PROCEDURE] = {
        value: appointment_type_enum_1.AppointmentType.PROCEDURE,
        label: 'Medical Procedure',
        description: 'Scheduled medical procedure',
        defaultDuration: 60,
        requiresPreparation: true,
        preparationInstructions: 'Follow specific preparation instructions provided by your doctor',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.TELEHEALTH] = {
        value: appointment_type_enum_1.AppointmentType.TELEHEALTH,
        label: 'Telehealth Consultation',
        description: 'Remote consultation via telehealth platform',
        defaultDuration: 30,
        requiresPreparation: true,
        preparationInstructions: 'Ensure you have a stable internet connection and a private space',
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.WELLNESS_CHECK] = {
        value: appointment_type_enum_1.AppointmentType.WELLNESS_CHECK,
        label: 'Wellness Check',
        description: 'Routine wellness check-up',
        defaultDuration: 30,
        requiresPreparation: false,
        category: 'PRIMARY',
        virtualEnabled: true
    },
    _a[appointment_type_enum_1.AppointmentType.LAB_WORK] = {
        value: appointment_type_enum_1.AppointmentType.LAB_WORK,
        label: 'Lab Work',
        description: 'Laboratory tests and procedures',
        defaultDuration: 30,
        requiresPreparation: true,
        preparationInstructions: 'Follow specific instructions provided for the lab test',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a[appointment_type_enum_1.AppointmentType.IMAGING] = {
        value: appointment_type_enum_1.AppointmentType.IMAGING,
        label: 'Imaging',
        description: 'Radiology and imaging procedures',
        defaultDuration: 45,
        requiresPreparation: true,
        preparationInstructions: 'Follow specific instructions provided for the imaging procedure',
        category: 'SPECIALIZED',
        virtualEnabled: false
    },
    _a);
//# sourceMappingURL=appointment-type-metadata.js.map