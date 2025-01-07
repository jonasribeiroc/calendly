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
    mockedDateUtils.getMonthName.mockImplementation((date: Date) =>
      date.toLocaleString('default', { month: 'long' })
    );
    mockedDateUtils.getWeekDayName.mockImplementation((date: Date) =>
      date.toLocaleString('default', { weekday: 'long' })
    );
    mockedDateUtils.getTime.mockImplementation((date: Date) =>
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    mockedDateUtils.getDateUTC.mockImplementation(() => new Date('2025-04-15T12:00:00Z'));
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

  it('filters and renders only available future times', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const filteredTimes = mockAvailableTimes.slice(1);
    filteredTimes.forEach((time) => {
      const timeButton = screen.getByText(mockedDateUtils.getTime(time));
      expect(timeButton).toBeInTheDocument();
      expect(timeButton).toBeEnabled();
    });

    const excludedTime = screen.queryByText(mockedDateUtils.getTime(mockAvailableTimes[0]));
    expect(excludedTime).not.toBeInTheDocument();
  });

  it('renders a message when no available times', () => {
    render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={[]}
        onClick={mockOnClick}
      />
    );

    const noTimesMessage = screen.getByText('No available times');
    expect(noTimesMessage).toBeInTheDocument();
  });

  it('selects a time when a time button is clicked and shows SubmitButton', () => {
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

    const timeToSelect = mockAvailableTimes[2];
    const timeButton = screen.getByText(mockedDateUtils.getTime(timeToSelect));

    fireEvent.click(timeButton);

    const submitButton = screen.getByText('Next');
    fireEvent.click(submitButton);

    expect(mockOnClick).toHaveBeenCalledWith(timeToSelect);
  });

  it('resets selected time when selectedDate changes', () => {
    const { rerender } = render(
      <CalendarTimes
        selectedDate={mockSelectedDate}
        availableTimes={mockAvailableTimes}
        onClick={mockOnClick}
      />
    );

    const timeButton = screen.getByText(mockedDateUtils.getTime(mockAvailableTimes[1]));
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

    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    expect(timeButton).toBeEnabled();
  });

  it('renders a SubmitButton only for the selected time', () => {
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

    const submitButtons = screen.getAllByTestId('next-button');
    expect(submitButtons).toHaveLength(1);
  });
});
