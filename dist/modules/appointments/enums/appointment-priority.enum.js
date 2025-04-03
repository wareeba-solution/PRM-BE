"use strict";
var _a;
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
})(AppointmentPriority || (exports.AppointmentPriority = AppointmentPriority = {}));
// Helper constant for priority metadata
exports.PRIORITY_METADATA = (_a = {},
    _a[AppointmentPriority.EMERGENCY] = {
        value: AppointmentPriority.EMERGENCY,
        label: 'Emergency',
        maxWaitTime: 'Immediate',
        color: '#FF0000' // Red
    },
    _a[AppointmentPriority.URGENT] = {
        value: AppointmentPriority.URGENT,
        label: 'Urgent',
        maxWaitTime: '24 hours',
        color: '#FFA500' // Orange
    },
    _a[AppointmentPriority.HIGH] = {
        value: AppointmentPriority.HIGH,
        label: 'High Priority',
        maxWaitTime: '72 hours',
        color: '#FFFF00' // Yellow
    },
    _a[AppointmentPriority.NORMAL] = {
        value: AppointmentPriority.NORMAL,
        label: 'Normal',
        maxWaitTime: '5 days',
        color: '#90EE90' // Light Green
    },
    _a[AppointmentPriority.MEDIUM] = {
        value: AppointmentPriority.MEDIUM,
        label: 'Medium Priority',
        maxWaitTime: '1 week',
        color: '#00FF00' // Green
    },
    _a[AppointmentPriority.LOW] = {
        value: AppointmentPriority.LOW,
        label: 'Low Priority',
        maxWaitTime: '2 weeks',
        color: '#0000FF' // Blue
    },
    _a[AppointmentPriority.FOLLOW_UP] = {
        value: AppointmentPriority.FOLLOW_UP,
        label: 'Follow-up',
        maxWaitTime: 'As scheduled',
        color: '#808080' // Gray
    },
    _a);
//# sourceMappingURL=appointment-priority.enum.js.map