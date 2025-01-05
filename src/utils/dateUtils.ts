import {
    addMonths,
    subMonths,
    parseISO,
    isSameDay,
    format,
    parse,
    isValid,
    getYear as getYearFns,
    getMonth as getMonthFns,
    getDay,
    lastDayOfMonth,
    isSameMonth as isSameMonthFns,
    startOfMonth,
    endOfMonth,
    getDate,
} from 'date-fns';

function getDateUTC(date?: Date): Date {
    const baseDate = date instanceof Date ? date : new Date();

    return new Date(Date.UTC(
        baseDate.getUTCFullYear(),
        baseDate.getUTCMonth(),
        baseDate.getUTCDate(),
        baseDate.getUTCHours(),
        baseDate.getUTCMinutes(),
        baseDate.getUTCSeconds(),
        baseDate.getUTCMilliseconds()
    ));
}

function isSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonthFns(date1, date2);
}

function isValidDateString(str: string, formats: string[]): boolean {
    return formats.some(formatStr => {
        const parsedDate = parse(str, formatStr, getDateUTC());

        return isValid(parsedDate) && format(parsedDate, formatStr) === str;
    });
}

function getDateFromString(str: string | null, dateFormat: string): Date | undefined {
    if (str && isValidDateString(str, [dateFormat])) {
        return getDateUTC(new Date(str.replace('-', ',')));
    }
}

function getDateString(date: Date, formatStr?: string): string {
    return format(date, formatStr || 'yyyy-MM');
}

function getYear(date: Date): number {
    return getYearFns(date);
}

function getMonth(date: Date): number {
    return getMonthFns(date);
}

function getMonthName(date: Date): string {
    return format(date, 'MMMM');
}

function getMonthDays(date: Date): number {
    return getDate(lastDayOfMonth(date));
}

function getWeekDay(date: Date): number {
    return getDay(date);
}

function getWeekDayName(date: Date): string {
    return format(date, 'EEEE');
}

function getMonthDay(date: Date): number {
    return Number(format(date, 'd'));
}

function getTime(date: Date): string {
    return format(date, 'HH:mm');
}

function getFirstDayOfMonth(date: Date): Date {
    const firstDay = startOfMonth(date);

    return getDateUTC(new Date(getYear(firstDay), getMonth(firstDay), getMonthDay(firstDay), 0, 0, 0, 0));
}

function getLastDayOfMonth(date: Date): Date {
    const lastDay = endOfMonth(date);

    return getDateUTC(new Date(getYear(lastDay), getMonth(lastDay), getMonthDay(lastDay), 23, 59, 59, 999));
}

function getAvailableDays(availableDateTimes: string[], date: Date): Date[] {
    return availableDateTimes
        .map(dateTime => parseISO(dateTime))
        .filter(d => isSameMonth(d, date))
}

function getAvailableTimes(availableDateTimes: string[], date: Date): Date[] {
    return availableDateTimes
        .map(dateTime => parseISO(dateTime))
        .filter(d => isSameDay(d, date))
}

function getNextMonth(date: Date): Date {
    return addMonths(date, 1);
}

function getPreviousMonth(date: Date): Date {
    return subMonths(date, 1);
}

export {
    isSameMonth,
    isValidDateString,
    getDateUTC,
    getDateFromString,
    getDateString,
    getYear,
    getMonth,
    getMonthName,
    getMonthDays,
    getWeekDay,
    getWeekDayName,
    getMonthDay,
    getTime,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    getAvailableDays,
    getAvailableTimes,
    getNextMonth,
    getPreviousMonth,
}