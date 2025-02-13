import React from 'react';
import styled from 'styled-components';
import { getAvailableDays, getAvailableTimes } from '../../utils/dateUtils';
import { Column } from '../Column';
import { CalendarMonthPicker } from './CalendarMonthPicker';
import { CalendarWeekDays } from './CalendarWeekDays';
import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarTimes } from './CalendarTimes';

const CalendarContainer = styled.div`
    display: flex;
    font-family: sans-serif;
    gap: 30px;

    @media (max-width: 900px) {
        flex-direction: column;
        justify-content: center;
        justify-self: center;
    }
`;

interface CalendarProps {
    month: Date,
    selectedDate?: Date,
    availableDateTimes: string[],
    onClickDay: (date: Date) => void,
    onClickTime: (date: Date) => void
    onChangeMonth: (date: Date) => void
}

export const Calendar: React.FC<CalendarProps> = ({
    month,
    selectedDate,
    availableDateTimes,
    onClickDay,
    onClickTime,
    onChangeMonth
}) => {
    const isSelectedDate = !!selectedDate;
    const availableDays = getAvailableDays(availableDateTimes, month);
    const availableTimes = isSelectedDate ? getAvailableTimes(availableDateTimes,selectedDate) : [];

    return (
        <CalendarContainer data-testid="calendar">
            <Column style={{ minWidth: 350, maxWidth: 350 }}>
                <CalendarMonthPicker month={month} onChange={onChangeMonth} />

                <CalendarWeekDays />

                <CalendarDayGrid
                    month={month}
                    selectedDate={selectedDate}
                    availableDays={availableDays}
                    onClick={onClickDay}
                />
            </Column>
            {isSelectedDate && (
                <Column>
                    <CalendarTimes
                        selectedDate={selectedDate}
                        availableTimes={availableTimes}
                        onClick={onClickTime}
                    />
                </Column>
            )}
            
        </CalendarContainer>
    );
};
