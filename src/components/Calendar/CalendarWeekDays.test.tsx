import React from 'react';
import { screen } from '@testing-library/react';
import { CalendarWeekDays } from './CalendarWeekDays';
import { DAYS_OF_WEEK } from '../../consts';
import { render } from '../../utils/test-utils';

describe('CalendarWeekDays Component', () => {
  it('renders all days of the week', () => {
    render(<CalendarWeekDays />);
    DAYS_OF_WEEK.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
