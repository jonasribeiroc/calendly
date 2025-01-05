// CalendarMonthPicker.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarMonthPicker } from './CalendarMonthPicker';
import * as dateUtils from '../../utils/dateUtils';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Mock das funções de dateUtils
jest.mock('../../utils/dateUtils');

// Mock dos ícones do react-icons
jest.mock('react-icons/fi', () => ({
  FiChevronLeft: () => <div data-testid="fi-chevron-left" />,
  FiChevronRight: () => <div data-testid="fi-chevron-right" />,
}));

describe('CalendarMonthPicker Component', () => {
  // Tipagem dos mocks para TypeScript
  const mockedDateUtils = dateUtils as jest.Mocked<typeof dateUtils>;

  // Função mock para onChange
  const mockOnChange = jest.fn();

  // Dados de teste
  const mockMonth = new Date('2025-04-15T00:00:00Z'); // Abril de 2025

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock das funções dateUtils
    mockedDateUtils.getMonthName.mockImplementation((date: Date) => {
      return date.toLocaleString('default', { month: 'long' });
    });

    mockedDateUtils.getYear.mockImplementation((date: Date) => {
      return date.getUTCFullYear();
    });

    mockedDateUtils.getNextMonth.mockImplementation((date: Date) => {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      return new Date(Date.UTC(month === 11 ? year + 1 : year, (month + 1) % 12, 1));
    });

    mockedDateUtils.getPreviousMonth.mockImplementation((date: Date) => {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      return new Date(Date.UTC(month === 0 ? year - 1 : year, (month - 1 + 12) % 12, 1));
    });
  });

  it('renders the correct month and year', () => {
    render(<CalendarMonthPicker month={mockMonth} onChange={mockOnChange} />);

    const monthYearTitle = screen.getByText(`${mockedDateUtils.getMonthName(mockMonth)} ${mockedDateUtils.getYear(mockMonth)}`);
    expect(monthYearTitle).toBeInTheDocument();
  });

  it('renders the previous and next buttons', () => {
    render(<CalendarMonthPicker month={mockMonth} onChange={mockOnChange} />);

    const prevButton = screen.getByRole('button', { name: /previous month/i });
    const nextButton = screen.getByRole('button', { name: /next month/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Verificar se os ícones estão presentes
    expect(screen.getByTestId('fi-chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('fi-chevron-right')).toBeInTheDocument();
  });

  it('calls onChange with the previous month when prev button is clicked', () => {
    render(<CalendarMonthPicker month={mockMonth} onChange={mockOnChange} />);

    const prevButton = screen.getByRole('button', { name: /previous month/i });

    fireEvent.click(prevButton);

    const expectedPreviousMonth = mockedDateUtils.getPreviousMonth(mockMonth);
    expect(mockOnChange).toHaveBeenCalledWith(expectedPreviousMonth);
  });

  it('calls onChange with the next month when next button is clicked', () => {
    render(<CalendarMonthPicker month={mockMonth} onChange={mockOnChange} />);

    const nextButton = screen.getByRole('button', { name: /next month/i });

    fireEvent.click(nextButton);

    const expectedNextMonth = mockedDateUtils.getNextMonth(mockMonth);
    expect(mockOnChange).toHaveBeenCalledWith(expectedNextMonth);
  });

  it('handles year boundaries correctly when navigating from December to January', () => {
    const december = new Date('2025-12-15T00:00:00Z');
    mockedDateUtils.getMonthName.mockReturnValue('December');
    mockedDateUtils.getYear.mockReturnValue(december.getUTCFullYear());

    render(<CalendarMonthPicker month={december} onChange={mockOnChange} />);

    const nextButton = screen.getByRole('button', { name: /next month/i });
    fireEvent.click(nextButton);

    const expectedNextMonth = new Date(Date.UTC(2026, 0, 1)); // Janeiro de 2026
    expect(mockOnChange).toHaveBeenCalledWith(expectedNextMonth);
  });

  it('handles year boundaries correctly when navigating from January to December', () => {
    const january = new Date('2025-01-15T00:00:00Z');
    mockedDateUtils.getMonthName.mockReturnValue('January');
    mockedDateUtils.getYear.mockReturnValue(january.getUTCFullYear());

    render(<CalendarMonthPicker month={january} onChange={mockOnChange} />);

    const prevButton = screen.getByRole('button', { name: /previous month/i });
    fireEvent.click(prevButton);

    const expectedPreviousMonth = new Date(Date.UTC(2024, 11, 1)); // Dezembro de 2024
    expect(mockOnChange).toHaveBeenCalledWith(expectedPreviousMonth);
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<CalendarMonthPicker month={mockMonth} onChange={mockOnChange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
