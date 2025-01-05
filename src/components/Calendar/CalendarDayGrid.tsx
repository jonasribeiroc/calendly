import React from 'react';
import styled from 'styled-components';
import { getDay, getFirstDayOfMonth, getMonthDays, getWeekDay } from '../../utils';

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
    availableDays: number[]
    onClick: (date: Date) => void
}

export const CalendarDayGrid: React.FC<CalendarDayGridProps> = ({
    month,
    selectedDate,
    availableDays,
    onClick,
}) => {
    const selectedDay = !!selectedDate ? getDay(selectedDate) : undefined;
    const dayWeekIndex = getWeekDay(getFirstDayOfMonth(month));
    const monthDays = getMonthDays(month);
    const cells = Array.from({ length: 42 }).map((_, index) => {
        const dayWeekNumber = index - dayWeekIndex + 1;
        return dayWeekNumber > 0 && dayWeekNumber <= monthDays ? dayWeekNumber : undefined;
    });

    const handleClick = (day: number) => {
        const newDate = new Date(month.getTime());
        newDate.setDate(day);
        onClick(newDate);
    };

    return (
        <DayGrid>
            {cells.map((day, i) => (
                <DayCell
                    key={i}
                    disabled={!day || !availableDays.includes(day) || day === selectedDay}
                    onClick={() => day && handleClick(day)}
                    $isSelected={!!selectedDay && day === selectedDay}
                >
                    {day}
                </DayCell>
            ))}
        </DayGrid>
    );
}

