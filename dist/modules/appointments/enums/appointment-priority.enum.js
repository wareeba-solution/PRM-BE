export var AppointmentPriority;
(function (AppointmentPriority) {
    AppointmentPriority["EMERGENCY"] = "EMERGENCY";
    AppointmentPriority["URGENT"] = "URGENT";
    AppointmentPriority["HIGH"] = "HIGH";
    AppointmentPriority["NORMAL"] = "NORMAL";
    AppointmentPriority["MEDIUM"] = "MEDIUM";
    AppointmentPriority["LOW"] = "LOW";
    AppointmentPriority["FOLLOW_UP"] = "FOLLOW_UP";
})(AppointmentPriority || (AppointmentPriority = {}));
export const PRIORITY_METADATA = {
    [AppointmentPriority.EMERGENCY]: {
        value: AppointmentPriority.EMERGENCY,
        label: 'Emergency',
        maxWaitTime: 'Immediate',
        color: '#FF0000'
    },
    [AppointmentPriority.URGENT]: {
        value: AppointmentPriority.URGENT,
        label: 'Urgent',
        maxWaitTime: '24 hours',
        color: '#FFA500'
    },
    [AppointmentPriority.HIGH]: {
        value: AppointmentPriority.HIGH,
        label: 'High Priority',
        maxWaitTime: '72 hours',
        color: '#FFFF00'
    },
    [AppointmentPriority.NORMAL]: {
        value: AppointmentPriority.NORMAL,
        label: 'Normal',
        maxWaitTime: '5 days',
        color: '#90EE90'
    },
    [AppointmentPriority.MEDIUM]: {
        value: AppointmentPriority.MEDIUM,
        label: 'Medium Priority',
        maxWaitTime: '1 week',
        color: '#00FF00'
    },
    [AppointmentPriority.LOW]: {
        value: AppointmentPriority.LOW,
        label: 'Low Priority',
        maxWaitTime: '2 weeks',
        color: '#0000FF'
    },
    [AppointmentPriority.FOLLOW_UP]: {
        value: AppointmentPriority.FOLLOW_UP,
        label: 'Follow-up',
        maxWaitTime: 'As scheduled',
        color: '#808080'
    }
};
//# sourceMappingURL=appointment-priority.enum.js.map