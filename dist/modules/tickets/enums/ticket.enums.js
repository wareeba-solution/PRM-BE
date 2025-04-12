"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketType = exports.TicketStatus = void 0;
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["WAITING_FOR_PATIENT"] = "WAITING_FOR_PATIENT";
    TicketStatus["WAITING_FOR_DOCTOR"] = "WAITING_FOR_DOCTOR";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
var TicketType;
(function (TicketType) {
    TicketType["MEDICAL_QUERY"] = "MEDICAL_QUERY";
    TicketType["APPOINTMENT_REQUEST"] = "APPOINTMENT_REQUEST";
    TicketType["PRESCRIPTION_REFILL"] = "PRESCRIPTION_REFILL";
    TicketType["LAB_RESULTS"] = "LAB_RESULTS";
    TicketType["REFERRAL"] = "REFERRAL";
    TicketType["GENERAL"] = "GENERAL";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
//# sourceMappingURL=ticket.enums.js.map