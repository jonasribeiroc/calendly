import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarDayGrid } from './CalendarDayGrid';
import * as dateUtils from '../../utils/dateUtils';

jest.mock('../../utils/dateUtils');

describe('CalendarDayGrid Component', () => {
    const mockedDateUtils = dateUtils as jest.Mocked<typeof dateUtils>;

    const mockMonth = new Date('2025-04-01T00:00:00Z');
    const mockSelectedDate = new Date('2025-04-15T00:00:00Z');
    const mockAvailableDays = [
        new Date('2025-04-01T00:00:00Z'),
        new Date('2025-04-05T00:00:00Z'),
        new Date('2025-04-15T00:00:00Z'),
        new Date('2025-04-20T00:00:00Z'),
    ];
    const mockOnClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        mockedDateUtils.getMonthDay.mockImplementation((date: Date) => date.getUTCDate());

        mockedDateUtils.getFirstDayOfMonth.mockImplementation((date: Date) => {
            return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        });

        mockedDateUtils.getMonthDays.mockImplementation((date: Date) => {
            const nextMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
            const lastDay = new Date(nextMonth.getTime() - 1);
            return lastDay.getUTCDate();
        });

        mockedDateUtils.getWeekDay.mockImplementation((date: Date) => date.getUTCDay());

        mockedDateUtils.getDateString.mockImplementation((date: Date, format?: string) => {
            if (format === 'yyyy-MM') {
                return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
            }
            if (format === 'yyyy-MM-dd') {
                return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
                    date.getUTCDate()
                ).padStart(2, '0')}`;
            }
            if (format === "yyyy-MM-dd'T'HH:mm:ssxxx") {
                return date.toISOString();
            }
            return '';
        });

        mockedDateUtils.getDateFromString.mockImplementation((value: string | null, format?: string) => {
            if (!value) return undefined
            return new Date(value);
        });

        mockedDateUtils.isSameMonth.mockImplementation((date1: Date, date2: Date) => {
            return (
                date1.getUTCFullYear() === date2.getUTCFullYear() &&
                date1.getUTCMonth() === date2.getUTCMonth()
            );
        });
    });

    it('renders 42 day cells', () => {
        render(
            <CalendarDayGrid
                month={mockMonth}
                selectedDate={mockSelectedDate}
                availableDays={mockAvailableDays}
                onClick={mockOnClick}
            />
        );

        const dayButtons = screen.getAllByRole('button');
        expect(dayButtons).toHaveLength(42);
    });

    it('disables the selected day', () => {
        render(
            <CalendarDayGrid
                month={mockMonth}
                selectedDate={mockSelectedDate}
                availableDays={mockAvailableDays}
                onClick={mockOnClick}
            />
        );

        const selectedDayButton = screen.getByText(String(mockSelectedDate.getUTCDate()));
        expect(selectedDayButton).toBeDisabled();
        expect(selectedDayButton).toHaveStyle('color: #ffffff');
        expect(selectedDayButton).toHaveStyle('background-color: #0060e6');
    });

    it('calls onClick with the correct date when an available day is clicked', () => {
        render(
            <CalendarDayGrid
                month={mockMonth}
                selectedDate={mockSelectedDate}
                availableDays={mockAvailableDays}
                onClick={mockOnClick}
            />
        );

        const dayToClick = mockAvailableDays.find((date) => date.getUTCDate() !== mockSelectedDate.getUTCDate());
        if (dayToClick) {
            const button = screen.getByText(String(dayToClick.getUTCDate()));
            fireEvent.click(button);
            expect(mockOnClick).toHaveBeenCalledWith(dayToClick);
        }
    });

    it('does not call onClick when a disabled day is clicked', () => {
        render(
            <CalendarDayGrid
                month={mockMonth}
                selectedDate={mockSelectedDate}
                availableDays={mockAvailableDays}
                onClick={mockOnClick}
            />
        );

        const unavailableDay = 10;
        const button = screen.getByText(String(unavailableDay));
        fireEvent.click(button);
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('handles months starting on different weekdays correctly', () => {
        const sundayMonth = new Date('2025-03-01T00:00:00Z');
        mockedDateUtils.getWeekDay.mockReturnValue(6);

        render(
            <CalendarDayGrid
                month={sundayMonth}
                selectedDate={undefined}
                availableDays={[]}
                onClick={mockOnClick}
            />
        );

        const dayButtons = screen.getAllByRole('button');

        for (let i = 0; i < 6; i++) {
            expect(dayButtons[i]).toBeDisabled();
        }

        expect(dayButtons[6]).toBeDisabled();
    });
});
