"use strict";
// src/modules/appointments/enums/day-of-week.enum.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = void 0;
/**
 * Enum representing days of the week, aligned with JavaScript's Date.getDay() values
 * Sunday = 0, Monday = 1, etc.
 */
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["SUNDAY"] = 0] = "SUNDAY";
    DayOfWeek[DayOfWeek["MONDAY"] = 1] = "MONDAY";
    DayOfWeek[DayOfWeek["TUESDAY"] = 2] = "TUESDAY";
    DayOfWeek[DayOfWeek["WEDNESDAY"] = 3] = "WEDNESDAY";
    DayOfWeek[DayOfWeek["THURSDAY"] = 4] = "THURSDAY";
    DayOfWeek[DayOfWeek["FRIDAY"] = 5] = "FRIDAY";
    DayOfWeek[DayOfWeek["SATURDAY"] = 6] = "SATURDAY";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
//# sourceMappingURL=day-of-week.enum.js.map