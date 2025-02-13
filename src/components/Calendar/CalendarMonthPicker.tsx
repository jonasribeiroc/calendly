import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';
import { getMonthName, getNextMonth, getPreviousMonth, getYear } from '../../utils/dateUtils';

const CalendarMonthPickerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    margin-bottom: 20px;
    position: relative;
`;

const CalendarMonthPickerButton = styled.button`
    position: absolute;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.neutral.mediumDark};

    &:hover {
      color: ${({ theme }) => theme.colors.neutral.dark};
    }
`;

const CalendarMonthPickerPrevButton = styled(CalendarMonthPickerButton)`
    left: 0;
`;

const CalendarMonthPickerNextButton = styled(CalendarMonthPickerButton)`
    right: 0;
`;

const CalendarMonthPickerTitle = styled.span`
    font-size: 15px;
    color: ${({ theme }) => theme.colors.neutral.dark};
`;

interface CalendarMonthPickerProps {
    month: Date,
    onChange: (date: Date) => void
}

export const CalendarMonthPicker: React.FC<CalendarMonthPickerProps> = ({
    month,
    onChange
}) => {

    const handlePrev = () => {
        const newDate = getPreviousMonth(month);
        onChange(newDate);
    };

    const handleNext = () => {
        const newDate = getNextMonth(month);
        onChange(newDate);
    };

    return (
        <CalendarMonthPickerContainer>
            <CalendarMonthPickerPrevButton data-testid="previous-month" aria-label='previous month' onClick={handlePrev}>
                <FiChevronLeft />
            </CalendarMonthPickerPrevButton>
            <CalendarMonthPickerTitle>{getMonthName(month)} {getYear(month)}</CalendarMonthPickerTitle>
            <CalendarMonthPickerNextButton data-testid="next-month" aria-label='next month' onClick={handleNext}>
                <FiChevronRight />
            </CalendarMonthPickerNextButton>
        </CalendarMonthPickerContainer>
    );
}

