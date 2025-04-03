"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
var date_fns_1 = require("date-fns");
var date_fns_tz_1 = require("date-fns-tz"); // Only import toZonedTime
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    /**
     * Convert date to UTC
     */
    DateUtil.toUTC = function (date, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
        // If the date is in a specific timezone, convert it to UTC by adjusting the offset
        var utcDate = new Date(zonedDate.toLocaleString('en-US', { timeZone: timezone }));
        return new Date(utcDate.toUTCString()); // Ensure UTC output
    };
    /**
     * Convert UTC to timezone
     */
    DateUtil.toTimezone = function (date, timezone) {
        var utcDate = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
        return (0, date_fns_tz_1.toZonedTime)(utcDate, timezone); // Still uses toZonedTime
    };
    /**
     * Format date to string
     */
    DateUtil.format = function (date, formatStr, timezone) {
        if (formatStr === void 0) { formatStr = 'yyyy-MM-dd HH:mm:ss'; }
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return (0, date_fns_1.format)(zonedDate, formatStr);
    };
    /**
     * Parse string to date
     */
    DateUtil.parse = function (dateStr, formatStr, timezone) {
        if (formatStr === void 0) { formatStr = 'yyyy-MM-dd HH:mm:ss'; }
        if (timezone === void 0) { timezone = 'UTC'; }
        var parsedDate = (0, date_fns_1.parse)(dateStr, formatStr, new Date());
        return this.toUTC(parsedDate, timezone);
    };
    /**
     * Get start of day
     */
    DateUtil.startOfDay = function (date, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.startOfDay)(zonedDate), timezone);
    };
    /**
     * Get end of day
     */
    DateUtil.endOfDay = function (date, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.endOfDay)(zonedDate), timezone);
    };
    /**
     * Add days to date
     */
    DateUtil.addDays = function (date, days, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addDays)(zonedDate, days), timezone);
    };
    /**
     * Add months to date
     */
    DateUtil.addMonths = function (date, months, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addMonths)(zonedDate, months), timezone);
    };
    /**
     * Add years to date
     */
    DateUtil.addYears = function (date, years, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addYears)(zonedDate, years), timezone);
    };
    /**
     * Calculate age from date
     */
    DateUtil.calculateAge = function (birthDate, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedBirthDate = this.toTimezone(birthDate, timezone);
        var zonedNow = this.toTimezone(new Date(), timezone);
        return (0, date_fns_1.differenceInYears)(zonedNow, zonedBirthDate);
    };
    /**
     * Check if date is before another date
     */
    DateUtil.isBefore = function (date, compareDate, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        var zonedCompareDate = this.toTimezone(compareDate, timezone);
        return (0, date_fns_1.isBefore)(zonedDate, zonedCompareDate);
    };
    /**
     * Check if date is after another date
     */
    DateUtil.isAfter = function (date, compareDate, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        var zonedCompareDate = this.toTimezone(compareDate, timezone);
        return (0, date_fns_1.isAfter)(zonedDate, zonedCompareDate);
    };
    /**
     * Check if date is valid
     */
    DateUtil.isValid = function (date) {
        if (typeof date === 'string') {
            var parsed = (0, date_fns_1.parseISO)(date);
            return (0, date_fns_1.isValid)(parsed);
        }
        return (0, date_fns_1.isValid)(date);
    };
    /**
     * Get date parts
     */
    DateUtil.getDateParts = function (date, timezone) {
        if (timezone === void 0) { timezone = 'UTC'; }
        var zonedDate = this.toTimezone(date, timezone);
        return {
            year: (0, date_fns_1.format)(zonedDate, 'yyyy'),
            month: (0, date_fns_1.format)(zonedDate, 'MM'),
            day: (0, date_fns_1.format)(zonedDate, 'dd'),
            hour: (0, date_fns_1.format)(zonedDate, 'HH'),
            minute: (0, date_fns_1.format)(zonedDate, 'mm'),
            second: (0, date_fns_1.format)(zonedDate, 'ss'),
            weekday: (0, date_fns_1.format)(zonedDate, 'EEEE'),
        };
    };
    /**
     * Get formatted duration between two dates
     */
    DateUtil.formatDuration = function (startDate, endDate) {
        var start = typeof startDate === 'string' ? (0, date_fns_1.parseISO)(startDate) : startDate;
        var end = typeof endDate === 'string' ? (0, date_fns_1.parseISO)(endDate) : endDate;
        var diffMs = Math.abs(end.getTime() - start.getTime());
        var days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        var parts = [];
        if (days > 0)
            parts.push("".concat(days, "d"));
        if (hours > 0)
            parts.push("".concat(hours, "h"));
        if (minutes > 0)
            parts.push("".concat(minutes, "m"));
        return parts.join(' ') || '0m';
    };
    return DateUtil;
}());
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map