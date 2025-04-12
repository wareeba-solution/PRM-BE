"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz"); // Only import toZonedTime
class DateUtil {
    /**
     * Convert date to UTC
     */
    static toUTC(date, timezone = 'UTC') {
        const zonedDate = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
        // If the date is in a specific timezone, convert it to UTC by adjusting the offset
        const utcDate = new Date(zonedDate.toLocaleString('en-US', { timeZone: timezone }));
        return new Date(utcDate.toUTCString()); // Ensure UTC output
    }
    /**
     * Convert UTC to timezone
     */
    static toTimezone(date, timezone) {
        const utcDate = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
        return (0, date_fns_tz_1.toZonedTime)(utcDate, timezone); // Still uses toZonedTime
    }
    /**
     * Format date to string
     */
    static format(date, formatStr = 'yyyy-MM-dd HH:mm:ss', timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return (0, date_fns_1.format)(zonedDate, formatStr);
    }
    /**
     * Parse string to date
     */
    static parse(dateStr, formatStr = 'yyyy-MM-dd HH:mm:ss', timezone = 'UTC') {
        const parsedDate = (0, date_fns_1.parse)(dateStr, formatStr, new Date());
        return this.toUTC(parsedDate, timezone);
    }
    /**
     * Get start of day
     */
    static startOfDay(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.startOfDay)(zonedDate), timezone);
    }
    /**
     * Get end of day
     */
    static endOfDay(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.endOfDay)(zonedDate), timezone);
    }
    /**
     * Add days to date
     */
    static addDays(date, days, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addDays)(zonedDate, days), timezone);
    }
    /**
     * Add months to date
     */
    static addMonths(date, months, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addMonths)(zonedDate, months), timezone);
    }
    /**
     * Add years to date
     */
    static addYears(date, years, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC((0, date_fns_1.addYears)(zonedDate, years), timezone);
    }
    /**
     * Calculate age from date
     */
    static calculateAge(birthDate, timezone = 'UTC') {
        const zonedBirthDate = this.toTimezone(birthDate, timezone);
        const zonedNow = this.toTimezone(new Date(), timezone);
        return (0, date_fns_1.differenceInYears)(zonedNow, zonedBirthDate);
    }
    /**
     * Check if date is before another date
     */
    static isBefore(date, compareDate, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        const zonedCompareDate = this.toTimezone(compareDate, timezone);
        return (0, date_fns_1.isBefore)(zonedDate, zonedCompareDate);
    }
    /**
     * Check if date is after another date
     */
    static isAfter(date, compareDate, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        const zonedCompareDate = this.toTimezone(compareDate, timezone);
        return (0, date_fns_1.isAfter)(zonedDate, zonedCompareDate);
    }
    /**
     * Check if date is valid
     */
    static isValid(date) {
        if (typeof date === 'string') {
            const parsed = (0, date_fns_1.parseISO)(date);
            return (0, date_fns_1.isValid)(parsed);
        }
        return (0, date_fns_1.isValid)(date);
    }
    /**
     * Get date parts
     */
    static getDateParts(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return {
            year: (0, date_fns_1.format)(zonedDate, 'yyyy'),
            month: (0, date_fns_1.format)(zonedDate, 'MM'),
            day: (0, date_fns_1.format)(zonedDate, 'dd'),
            hour: (0, date_fns_1.format)(zonedDate, 'HH'),
            minute: (0, date_fns_1.format)(zonedDate, 'mm'),
            second: (0, date_fns_1.format)(zonedDate, 'ss'),
            weekday: (0, date_fns_1.format)(zonedDate, 'EEEE'),
        };
    }
    /**
     * Get formatted duration between two dates
     */
    static formatDuration(startDate, endDate) {
        const start = typeof startDate === 'string' ? (0, date_fns_1.parseISO)(startDate) : startDate;
        const end = typeof endDate === 'string' ? (0, date_fns_1.parseISO)(endDate) : endDate;
        const diffMs = Math.abs(end.getTime() - start.getTime());
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const parts = [];
        if (days > 0)
            parts.push(`${days}d`);
        if (hours > 0)
            parts.push(`${hours}h`);
        if (minutes > 0)
            parts.push(`${minutes}m`);
        return parts.join(' ') || '0m';
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map