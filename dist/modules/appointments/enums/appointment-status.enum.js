"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_METADATA = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["REQUESTED"] = "REQUESTED";
    AppointmentStatus["PENDING"] = "PENDING";
    AppointmentStatus["SCHEDULED"] = "SCHEDULED";
    AppointmentStatus["CONFIRMED"] = "CONFIRMED";
    AppointmentStatus["CHECKED_IN"] = "CHECKED_IN";
    AppointmentStatus["IN_PROGRESS"] = "IN_PROGRESS";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
    AppointmentStatus["NO_SHOW"] = "NO_SHOW";
    AppointmentStatus["RESCHEDULED"] = "RESCHEDULED";
    AppointmentStatus["WAITING_LIST"] = "WAITING_LIST";
    AppointmentStatus["MISSED"] = "MISSED";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
// Helper constant for status metadata
exports.STATUS_METADATA = (_a = {},
    _a[AppointmentStatus.REQUESTED] = {
        value: AppointmentStatus.REQUESTED,
        label: 'Requested',
        description: 'Appointment has been requested but not yet processed',
        color: '#FFA500', // Orange
        allowedTransitions: [
            AppointmentStatus.PENDING,
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.WAITING_LIST
        ]
    },
    _a[AppointmentStatus.PENDING] = {
        value: AppointmentStatus.PENDING,
        label: 'Pending',
        description: 'Awaiting confirmation from provider',
        color: '#FFD700', // Gold
        allowedTransitions: [
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.WAITING_LIST
        ]
    },
    _a[AppointmentStatus.CONFIRMED] = {
        value: AppointmentStatus.CONFIRMED,
        label: 'Confirmed',
        description: 'Appointment has been confirmed',
        color: '#32CD32', // Lime Green
        allowedTransitions: [
            AppointmentStatus.CHECKED_IN,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.NO_SHOW,
            AppointmentStatus.RESCHEDULED
        ]
    },
    _a[AppointmentStatus.SCHEDULED] = {
        value: AppointmentStatus.SCHEDULED,
        label: 'Scheduled',
        description: 'Appointment has been scheduled',
        color: '#20B2AA', // Light Sea Green
        allowedTransitions: [
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.RESCHEDULED
        ]
    },
    _a[AppointmentStatus.CHECKED_IN] = {
        value: AppointmentStatus.CHECKED_IN,
        label: 'Checked In',
        description: 'Patient has arrived for appointment',
        color: '#1E90FF', // Dodger Blue
        allowedTransitions: [
            AppointmentStatus.IN_PROGRESS,
            AppointmentStatus.CANCELLED
        ]
    },
    _a[AppointmentStatus.IN_PROGRESS] = {
        value: AppointmentStatus.IN_PROGRESS,
        label: 'In Progress',
        description: 'Appointment is currently in progress',
        color: '#4169E1', // Royal Blue
        allowedTransitions: [
            AppointmentStatus.COMPLETED
        ]
    },
    _a[AppointmentStatus.COMPLETED] = {
        value: AppointmentStatus.COMPLETED,
        label: 'Completed',
        description: 'Appointment has been completed',
        color: '#008000', // Green
        allowedTransitions: []
    },
    _a[AppointmentStatus.CANCELLED] = {
        value: AppointmentStatus.CANCELLED,
        label: 'Cancelled',
        description: 'Appointment was cancelled',
        color: '#FF0000', // Red
        allowedTransitions: [
            AppointmentStatus.REQUESTED,
            AppointmentStatus.RESCHEDULED
        ]
    },
    _a[AppointmentStatus.NO_SHOW] = {
        value: AppointmentStatus.NO_SHOW,
        label: 'No Show',
        description: 'Patient did not show up for appointment',
        color: '#8B0000', // Dark Red
        allowedTransitions: [
            AppointmentStatus.RESCHEDULED
        ]
    },
    _a[AppointmentStatus.RESCHEDULED] = {
        value: AppointmentStatus.RESCHEDULED,
        label: 'Rescheduled',
        description: 'Appointment has been rescheduled',
        color: '#9370DB', // Medium Purple
        allowedTransitions: [
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED
        ]
    },
    _a[AppointmentStatus.WAITING_LIST] = {
        value: AppointmentStatus.WAITING_LIST,
        label: 'Waiting List',
        description: 'Patient is on waiting list for cancellations',
        color: '#808080', // Gray
        allowedTransitions: [
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED
        ]
    },
    _a[AppointmentStatus.MISSED] = {
        value: AppointmentStatus.MISSED,
        label: 'Missed',
        description: 'Appointment was missed',
        color: '#A9A9A9', // Dark Gray
        allowedTransitions: [
            AppointmentStatus.RESCHEDULED
        ]
    },
    _a);
//# sourceMappingURL=appointment-status.enum.js.map