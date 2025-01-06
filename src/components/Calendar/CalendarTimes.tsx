import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMonthDay, getMonthName, getTime, getWeekDayName } from '../../utils/dateUtils';
import { Column } from '../Column';
import { Text } from '../Text';
import { Row } from '../Row';

const CalendarTimesContainer = styled.div`
    justify-items: center;
    width: 100%;
`;

const CalendarTimesTitle = styled(Text)`
    font-size: 15px;
    margin-bottom: 20px;
`;

const CalendarTimesColumn = styled(Column)`
    display: flex;
    gap: 10px;
    width: 90%;
`;

const CalendarTimesRow = styled(Row)`
    display: flex;
    width: 100%;
    gap: 6px;
`;

interface CalendarTimesButtonProps {
    $isSelected?: boolean 
}

const CalendarTimesButton = styled.button<CalendarTimesButtonProps>`
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.primary.mendium};
    background: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary.medium : theme.colors.white)};
    color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : theme.colors.primary.medium)};
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    width: ${({ $isSelected }) => ($isSelected ? '50%' : '100%')};
    font-size: 15px;
    transition: all 0.3s ease;

    &:hover {
        border: 2px solid ${({ theme }) => theme.colors.primary.medium};
    }

    &:disabled {
        background-color: #717171;
        border: none;
        cursor: default;
    }
`;

const SubmitButton = styled.button`
    height: 50px;
    background-color: ${({ theme }) => theme.colors.primary.medium};
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    width: 50%;
    font-size: 15px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.mediumDark};
    }
`;

interface CalendarTimesProps {
    selectedDate: Date;
    availableTimes: Date[];
    onClick: (date: Date) => void;
}

export const CalendarTimes: React.FC<CalendarTimesProps> = ({
    selectedDate,
    availableTimes,
    onClick,
}) => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    const handleTimeClick = (date: Date) => {
        setCurrentDate(date);
    };

    const handleSubmit = () => {
        if (currentDate) {
            onClick(currentDate);
        }
    };

    useEffect(() => {
        setCurrentDate(null);
    }, [selectedDate]);

    return (
        <CalendarTimesContainer>
            <CalendarTimesTitle>
                {getWeekDayName(selectedDate)}, {getMonthName(selectedDate)} {getMonthDay(selectedDate)}
            </CalendarTimesTitle>

            <CalendarTimesColumn>
                {availableTimes.map((date: Date, index: number) => (
                    <CalendarTimesRow key={index}>
                        <CalendarTimesButton
                            $isSelected={currentDate === date}
                            onClick={() => handleTimeClick(date)}
                            disabled={currentDate === date}
                        >
                            {getTime(date)}
                        </CalendarTimesButton>
                        {currentDate && currentDate === date &&(
                            <SubmitButton onClick={handleSubmit}>
                                Next
                            </SubmitButton>
                        )}
                    </CalendarTimesRow>
                ))}
            </CalendarTimesColumn>


        </CalendarTimesContainer>
    );
};
