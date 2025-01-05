import React from 'react';
import styled from 'styled-components';
import { DAYS_OF_WEEK } from '../../consts';

const CalendarWeekDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 10px;
`;

export const CalendarWeekDays: React.FC = () => {
    return (
        <CalendarWeekDaysContainer>
            {DAYS_OF_WEEK.map((dow) => (
                <div key={dow}>{dow}</div>
            ))}
        </CalendarWeekDaysContainer>
    );
}

