import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalendarWeekDays } from './CalendarWeekDays';
import { DAYS_OF_WEEK } from '../../consts';

describe('CalendarWeekDays Component', () => {
  it('renders all days of the week', () => {
    render(<CalendarWeekDays />);
    DAYS_OF_WEEK.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<CalendarWeekDays />);
    expect(asFragment()).toMatchSnapshot();
  });
});
