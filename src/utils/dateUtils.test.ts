import {
    isSameMonth,
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
    getAvailableDays,
    getAvailableTimes,
    getNextMonth,
    getPreviousMonth,
    getDateUTC,
} from './dateUtils';

describe('Date Utilities (UTC)', () => {
    const date = getDateUTC(new Date('2025,02,01'));

    describe('getDateUTC', () => {
        it('should return the same UTC date when a valid date is provided', () => {
            const originalDate = new Date('2025-01-01T12:34:56.789Z');
            const utcDate = getDateUTC(originalDate);
            expect(utcDate.toISOString()).toBe('2025-01-01T12:34:56.789Z');
        });

        it('should return the current UTC date when no argument is provided', () => {
            const before = new Date();
            const utcDate = getDateUTC();
            const after = new Date();

            const utcTimestamp = utcDate.getTime();
            const beforeTimestamp = before.getTime();
            const afterTimestamp = after.getTime();

            expect(utcTimestamp).toBeGreaterThanOrEqual(beforeTimestamp);
            expect(utcTimestamp).toBeLessThanOrEqual(afterTimestamp);

            expect(utcDate.toISOString()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
        });

        it('should return an invalid Date when an invalid date is provided', () => {
            const invalidDate = new Date('invalid-date-string');
            const utcDate = getDateUTC(invalidDate);
            expect(isNaN(utcDate.getTime())).toBe(true);
        });

        it('should correctly handle Dates from different time zones', () => {
            // Date in GMT+3 timezone
            const dateInGMTPlus3 = new Date('2025-01-01T15:00:00+03:00'); // Equivalent to 12:00:00 UTC
            const utcDate = getDateUTC(dateInGMTPlus3);
            expect(utcDate.toISOString()).toBe('2025-01-01T12:00:00.000Z');
        });

        it('should not modify the original Date object', () => {
            const originalDate = new Date('2025-01-01T12:34:56.789Z');
            const utcDate = getDateUTC(originalDate);
            expect(originalDate.toISOString()).toBe('2025-01-01T12:34:56.789Z');
            expect(utcDate).not.toBe(originalDate); // Ensures a new object is returned
        });
    });

    test('getDateString', () => {
        expect(getDateString(date, 'yyyy-MM')).toBe('2025-02');
        expect(getDateString(date, 'yyyy-MM-dd')).toBe('2025-02-01');
    });

    test('getYear', () => {
        expect(getYear(date)).toBe(2025);
    });

    test('getMonth', () => {
        expect(getMonth(date)).toBe(1);
    });

    test('getMonthName', () => {
        expect(getMonthName(date)).toBe('February');
    });

    test('getMonthDays', () => {
        expect(getMonthDays(getDateUTC(new Date('2025,02')))).toBe(28); // Fevereiro de 2025
        expect(getMonthDays(getDateUTC(new Date('2024,02')))).toBe(29); // Ano bissexto
    });

    test('getWeekDay', () => {
        expect(getWeekDay(date)).toBe(6);
    });

    test('getWeekDayName', () => {
        expect(getWeekDayName(date)).toBe('Saturday');
    });

    test('getMonthDay', () => {
        expect(getMonthDay(date)).toBe(1);
    });

    test('getTime', () => {
        expect(getTime(date)).toBe('12:00');
    });

    test('getFirstDayOfMonth', () => {
        expect(getFirstDayOfMonth(date)).toEqual(getDateUTC(new Date('2025,02,01')));
    });

    test('getAvailableDays', () => {
        const availableDateTimes = [
            '2025-02-15T12:00:00Z',
            '2025-02-16T13:00:00Z',
            '2025-03-01T10:00:00Z',
        ];
        expect(getAvailableDays(availableDateTimes, getDateUTC(new Date('2025,02')))).toEqual([
            new Date('2025-02-15T12:00:00Z'),
            new Date('2025-02-16T13:00:00Z'),
        ]);
    });

    test('getAvailableTimes', () => {
        const availableDateTimes = [
            '2025-02-15T12:00:00Z',
            '2025-02-15T13:00:00Z',
            '2025-02-16T10:00:00Z',
        ];
        expect(getAvailableTimes(availableDateTimes, getDateUTC(new Date('2025,02,15')))).toEqual([
            new Date('2025-02-15T12:00:00Z'),
            new Date('2025-02-15T13:00:00Z'),
        ]);
    });

    test('getNextMonth', () => {
        expect(getNextMonth(getDateUTC(new Date('2025,02')))).toEqual(getDateUTC(new Date('2025,03')));
    });

    test('getPreviousMonth', () => {
        expect(getPreviousMonth(getDateUTC(new Date('2025,02')))).toEqual(getDateUTC(new Date('2025,01')));
    });
});
