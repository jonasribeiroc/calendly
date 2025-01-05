import React from 'react';
import styled from 'styled-components';
import { getMonthDay, getFirstDayOfMonth, getMonthDays, getWeekDay } from '../../utils/dateUtils';

const DayGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 44px;
    gap: 6px;
`;

interface DayCellProps {
    $isSelected?: boolean;
}

const DayCell = styled.button<DayCellProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: #ebf3fe;
    color: #0060e6;
    font-weight: bold;

    &:hover {
        background-color: #dce7fc;
    }
    
    &:disabled {
        background-color: transparent;
        color: #999;
        background-color: ${({ $isSelected }) => ($isSelected ? '#0060e6' : '#transparent')};
        color: ${({ $isSelected }) => ($isSelected ? '#ffffff' : '#999')};
        font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};;
        cursor: default;
    }
`;

interface CalendarDayGridProps {
    month: Date,
    selectedDate?: Date,
    availableDays: Date[]
    onClick: (date: Date) => void
}

export const CalendarDayGrid: React.FC<CalendarDayGridProps> = ({
    month,
    selectedDate,
    availableDays,
    onClick,
}) => {
    const selectedDay = !!selectedDate ? getMonthDay(selectedDate) : undefined;
    const dayWeekIndex = getWeekDay(getFirstDayOfMonth(month));
    const monthDays = getMonthDays(month);
    const cells = Array.from({ length: 42 }).map((_, index) => {
        const dayWeekNumber = index - dayWeekIndex + 1;
        return dayWeekNumber > 0 && dayWeekNumber <= monthDays ? dayWeekNumber : undefined;
    });

    return (
        <DayGrid>
            {cells.map((day, i) => {
                const date = availableDays.find((date) => getMonthDay(date) === day);
                return (
                    <DayCell
                        key={i}
                        disabled={!day || !date || day === selectedDay}
                        onClick={() => date && onClick(date)}
                        $isSelected={!!selectedDay && selectedDay === day}
                    >
                        {day}
                    </DayCell>
                )
            })}
        </DayGrid>
    );
}

