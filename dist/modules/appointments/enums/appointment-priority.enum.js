"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIORITY_METADATA = exports.AppointmentPriority = void 0;
var AppointmentPriority;
(function (AppointmentPriority) {
    AppointmentPriority["EMERGENCY"] = "EMERGENCY";
    AppointmentPriority["URGENT"] = "URGENT";
    AppointmentPriority["HIGH"] = "HIGH";
    AppointmentPriority["NORMAL"] = "NORMAL";
    AppointmentPriority["MEDIUM"] = "MEDIUM";
    AppointmentPriority["LOW"] = "LOW";
    AppointmentPriority["FOLLOW_UP"] = "FOLLOW_UP"; // Regular follow-up appointment
})(AppointmentPriority = exports.AppointmentPriority || (exports.AppointmentPriority = {}));
// Helper constant for priority metadata
exports.PRIORITY_METADATA = {
    [AppointmentPriority.EMERGENCY]: {
        value: AppointmentPriority.EMERGENCY,
        label: 'Emergency',
        maxWaitTime: 'Immediate',
        color: '#FF0000' // Red
    },
    [AppointmentPriority.URGENT]: {
        value: AppointmentPriority.URGENT,
        label: 'Urgent',
        maxWaitTime: '24 hours',
        color: '#FFA500' // Orange
    },
    [AppointmentPriority.HIGH]: {
        value: AppointmentPriority.HIGH,
        label: 'High Priority',
        maxWaitTime: '72 hours',
        color: '#FFFF00' // Yellow
    },
    [AppointmentPriority.NORMAL]: {
        value: AppointmentPriority.NORMAL,
        label: 'Normal',
        maxWaitTime: '5 days',
        color: '#90EE90' // Light Green
    },
    [AppointmentPriority.MEDIUM]: {
        value: AppointmentPriority.MEDIUM,
        label: 'Medium Priority',
        maxWaitTime: '1 week',
        color: '#00FF00' // Green
    },
    [AppointmentPriority.LOW]: {
        value: AppointmentPriority.LOW,
        label: 'Low Priority',
        maxWaitTime: '2 weeks',
        color: '#0000FF' // Blue
    },
    [AppointmentPriority.FOLLOW_UP]: {
        value: AppointmentPriority.FOLLOW_UP,
        label: 'Follow-up',
        maxWaitTime: 'As scheduled',
        color: '#808080' // Gray
    }
};
//# sourceMappingURL=appointment-priority.enum.js.map