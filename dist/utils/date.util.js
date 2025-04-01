import { addDays, addMonths, addYears, differenceInYears, format, parse, parseISO, startOfDay, endOfDay, isBefore, isAfter, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
export class DateUtil {
    static toUTC(date, timezone = 'UTC') {
        const zonedDate = typeof date === 'string' ? parseISO(date) : date;
        const utcDate = new Date(zonedDate.toLocaleString('en-US', { timeZone: timezone }));
        return new Date(utcDate.toUTCString());
    }
    static toTimezone(date, timezone) {
        const utcDate = typeof date === 'string' ? parseISO(date) : date;
        return toZonedTime(utcDate, timezone);
    }
    static format(date, formatStr = 'yyyy-MM-dd HH:mm:ss', timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return format(zonedDate, formatStr);
    }
    static parse(dateStr, formatStr = 'yyyy-MM-dd HH:mm:ss', timezone = 'UTC') {
        const parsedDate = parse(dateStr, formatStr, new Date());
        return this.toUTC(parsedDate, timezone);
    }
    static startOfDay(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC(startOfDay(zonedDate), timezone);
    }
    static endOfDay(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC(endOfDay(zonedDate), timezone);
    }
    static addDays(date, days, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC(addDays(zonedDate, days), timezone);
    }
    static addMonths(date, months, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC(addMonths(zonedDate, months), timezone);
    }
    static addYears(date, years, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return this.toUTC(addYears(zonedDate, years), timezone);
    }
    static calculateAge(birthDate, timezone = 'UTC') {
        const zonedBirthDate = this.toTimezone(birthDate, timezone);
        const zonedNow = this.toTimezone(new Date(), timezone);
        return differenceInYears(zonedNow, zonedBirthDate);
    }
    static isBefore(date, compareDate, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        const zonedCompareDate = this.toTimezone(compareDate, timezone);
        return isBefore(zonedDate, zonedCompareDate);
    }
    static isAfter(date, compareDate, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        const zonedCompareDate = this.toTimezone(compareDate, timezone);
        return isAfter(zonedDate, zonedCompareDate);
    }
    static isValid(date) {
        if (typeof date === 'string') {
            const parsed = parseISO(date);
            return isValid(parsed);
        }
        return isValid(date);
    }
    static getDateParts(date, timezone = 'UTC') {
        const zonedDate = this.toTimezone(date, timezone);
        return {
            year: format(zonedDate, 'yyyy'),
            month: format(zonedDate, 'MM'),
            day: format(zonedDate, 'dd'),
            hour: format(zonedDate, 'HH'),
            minute: format(zonedDate, 'mm'),
            second: format(zonedDate, 'ss'),
            weekday: format(zonedDate, 'EEEE'),
        };
    }
    static formatDuration(startDate, endDate) {
        const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
        const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
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
//# sourceMappingURL=date.util.js.map