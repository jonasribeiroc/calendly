import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { CalendarTimes } from './CalendarTimes';
import * as dateUtils from '../../utils/dateUtils';
import { render } from '../../utils/test-utils';

jest.mock('../../utils/dateUtils');

describe('CalendarTimes Component', () => {
  const mockedDateUtils = dateUtils as jest.Mocked<typeof dateUtils>;

  const mockOnClick = jest.fn();

  const mockSelectedDate = new Date('2025-04-15T00:00:00Z');
  const mockAvailableTimes = [
    new Date('2025-04-15T10:00:00Z'),
    new Date('2025-04-15T14:00:00Z'),
    new Date('2025-04-15T16:30:00Z'),
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockedDateUtils.getMonthDay.mockImplementation((date: Date) => date.getUTCDate());

    mockedDateUtils.getMonthName.mockImplementation((date: Date) => {
      return date.toLocaleString('default', { month: 'long' });
    });

    mockedDateUtils.getWeekDayName.mockImplementation((date: Date) => {
      return date.toLocaleString('default', { weekday: 'long' });
    });

    mockedDateUtils.getTime.mockImplementation((date: Date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
  });

  it('renders the correct title based on selectedDate', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const title = screen.getByText(
      `${mockedDateUtils.getWeekDayName(mockSelectedDate)}, ${mockedDateUtils.getMonthName(
        mockSelectedDate
      )} ${mockedDateUtils.getMonthDay(mockSelectedDate)}`
    );

    expect(title).toBeInTheDocument();
  });

  it('renders all available times as buttons', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    mockAvailableTimes.forEach((time) => {
      const timeButton = screen.getByText(mockedDateUtils.getTime(time));
      expect(timeButton).toBeInTheDocument();
      expect(timeButton).toBeEnabled();
    });
  });

  it('does not render SubmitButton when no time is selected', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const submitButtons = screen.queryAllByText('Next');
    expect(submitButtons).toHaveLength(0);
  });

  it('selects a time when a time button is clicked and shows SubmitButton', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const timeToSelect = mockAvailableTimes[0];
    const timeButton = screen.getByText(mockedDateUtils.getTime(timeToSelect));
    
    fireEvent.click(timeButton);

    expect(timeButton).toBeDisabled();

    const submitButton = screen.getByText('Next');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('calls onClick with the selected date when SubmitButton is clicked', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const timeToSelect = mockAvailableTimes[1];
    const timeButton = screen.getByText(mockedDateUtils.getTime(timeToSelect));
    
    fireEvent.click(timeButton);

    const submitButton = screen.getByText('Next');
    fireEvent.click(submitButton);

    expect(mockOnClick).toHaveBeenCalledWith(timeToSelect);
  });

  it('only one SubmitButton is visible at a time', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const firstTimeButton = screen.getByText(mockedDateUtils.getTime(mockAvailableTimes[0]));
    fireEvent.click(firstTimeButton);

    const secondTimeButton = screen.getByText(mockedDateUtils.getTime(mockAvailableTimes[1]));
    fireEvent.click(secondTimeButton);

    const submitButtons = screen.getAllByText('Next');
    expect(submitButtons).toHaveLength(1);
  });

  it('resets selected time when selectedDate changes', () => {
    const { rerender } = render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const timeButton = screen.getByText(mockedDateUtils.getTime(mockAvailableTimes[2]));
    fireEvent.click(timeButton);

    const submitButton = screen.getByText('Next');
    expect(submitButton).toBeInTheDocument();

    const newSelectedDate = new Date('2025-04-16T00:00:00Z');
    rerender(
      <CalendarTimes
        selectedDate={newSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const newSubmitButton = screen.queryByText('Next');
    expect(newSubmitButton).not.toBeInTheDocument();

    expect(timeButton).toBeEnabled();
  });

  it('disables SubmitButton when no time is selected', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const submitButton = screen.queryByText('Next');
    expect(submitButton).not.toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
