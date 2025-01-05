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
} from 'date-fns';

function isSameYearMonth(str1?: string | null, str2?: string | null): boolean {
    if (!str1 || !str2) return false;

    const [year1, month1] = str1.split('-');
    const [year2, month2] = str2.split('-');

    return year1 === year2 && month1 === month2;
}

function isValidDateStr(str: string | null, formats: string[]): boolean {
    return formats.some(formatStr => {
        const parsedDate = parse(str || '', formatStr, new Date());

        return isValid(parsedDate) && format(parsedDate, formatStr) === str;
    });
}

function getDate(str?: string | null, formatStr?: 'yyyy-MM' | 'yyyy-MM-dd'): Date {
    return !!str && isValidDateStr(str, ['yyyy-MM-dd', 'yyyy-MM']) ? parse(str, formatStr || 'yyyy-MM', new Date()) : new Date();
}

function getDateString(date?: Date | null, formatStr?: 'yyyy-MM' | 'yyyy-MM-dd' | 'yyyy-MM-dd\'T\'HH:mm:ss' | "yyyy-MM-dd'T'HH:mm:ssxxx"): string {
    return format(date || new Date(), formatStr || 'yyyy-MM');
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
    const year = getYear(date);
    const month = getMonth(date);

    return new Date(year, month, 0).getDate();
}

function getWeekDay(date: Date): number {
    return date.getUTCDay();
}

function getWeekDayName(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'long' });
}

function getDay(date: Date): number  {
    return Number(date.toLocaleString('en-US', { day: 'numeric' }));
}

function getTime(date: Date): string {
    return format(date, 'hh:mm');
}

function getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

function getAvailableDays(availableDateTimes: string[], date: Date): number[] {
    const daysSet = new Set<number>();
    const year = getYear(date);
    const month = getMonth(date);

    availableDateTimes.forEach((dateTime) => {
        const date = new Date(dateTime);
        const dateYear = getYear(date);
        const dateMonth = getMonth(date);

        if (dateYear === year && dateMonth === month) {
            daysSet.add(getDay(date));
        }
    });

    return Array.from(daysSet).sort((a, b) => a - b);
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
    isSameYearMonth,
    isValidDateStr,
    getDate,
    getDateString,
    getYear,
    getMonth,
    getMonthName,
    getMonthDays,
    getWeekDay,
    getWeekDayName,
    getDay,
    getTime,
    getFirstDayOfMonth,
    getAvailableDays,
    getAvailableTimes,
    getNextMonth,
    getPreviousMonth,
}