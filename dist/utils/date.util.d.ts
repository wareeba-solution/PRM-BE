export declare class DateUtil {
    /**
     * Convert date to UTC
     */
    static toUTC(date: Date | string, timezone?: string): Date;
    /**
     * Convert UTC to timezone
     */
    static toTimezone(date: Date | string, timezone: string): Date;
    /**
     * Format date to string
     */
    static format(date: Date | string, formatStr?: string, timezone?: string): string;
    /**
     * Parse string to date
     */
    static parse(dateStr: string, formatStr?: string, timezone?: string): Date;
    /**
     * Get start of day
     */
    static startOfDay(date: Date | string, timezone?: string): Date;
    /**
     * Get end of day
     */
    static endOfDay(date: Date | string, timezone?: string): Date;
    /**
     * Add days to date
     */
    static addDays(date: Date | string, days: number, timezone?: string): Date;
    /**
     * Add months to date
     */
    static addMonths(date: Date | string, months: number, timezone?: string): Date;
    /**
     * Add years to date
     */
    static addYears(date: Date | string, years: number, timezone?: string): Date;
    /**
     * Calculate age from date
     */
    static calculateAge(birthDate: Date | string, timezone?: string): number;
    /**
     * Check if date is before another date
     */
    static isBefore(date: Date | string, compareDate: Date | string, timezone?: string): boolean;
    /**
     * Check if date is after another date
     */
    static isAfter(date: Date | string, compareDate: Date | string, timezone?: string): boolean;
    /**
     * Check if date is valid
     */
    static isValid(date: Date | string): boolean;
    /**
     * Get date parts
     */
    static getDateParts(date: Date | string, timezone?: string): {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
        weekday: string;
    };
    /**
     * Get formatted duration between two dates
     */
    static formatDuration(startDate: Date | string, endDate: Date | string): string;
}
