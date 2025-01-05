import { renderHook, act } from '@testing-library/react';
import { useCalendar } from './useCalendar';
import * as dateUtils from '../utils/dateUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('../utils/dateUtils');
jest.mock('../services/getAvailableDateTimes');

describe('useCalendar Hook', () => {
    let setSearchParams: jest.Mock;
    let searchParams: URLSearchParams;
    let navigate: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        // Configurar mock para useNavigate
        navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        // Configurar mocks para useSearchParams
        const mockSetSearchParamsFn = jest.fn();
        const mockSearchParamsObj = new URLSearchParams();
        (useSearchParams as jest.Mock).mockReturnValue([mockSearchParamsObj, mockSetSearchParamsFn]);

        searchParams = mockSearchParamsObj;
        setSearchParams = mockSetSearchParamsFn;

        // Tipar dateUtils como jest.Mocked
        const mockedDateUtils = dateUtils as jest.Mocked<typeof dateUtils>;

        // Mock das funções de dateUtils
        mockedDateUtils.getDateUTC.mockReturnValue(new Date('2025-04-01T00:00:00Z'));
        mockedDateUtils.getDateString.mockReturnValue('2025-04');
        mockedDateUtils.getDateFromString.mockReturnValue(undefined); // Exemplo de ausência de param
    });

    it('should initialize month and date from query param when valid', () => {
        // Arrange
        const parsedMonth = new Date('2025-04-01T00:00:00Z');
        (dateUtils.getDateFromString as jest.Mock).mockImplementation(() => parsedMonth)('2025-04', 'yyyy-MM');
        (dateUtils.isSameMonth as jest.Mock).mockReturnValue(true);

        // Act
        const { result } = renderHook(() => useCalendar());

        // Assert
        expect(dateUtils.getDateFromString).toHaveBeenCalledWith('2025-04', 'yyyy-MM');
        expect(result.current.month).toEqual(new Date('2025-04-01T00:00:00.000Z'));
        expect(result.current.date).toEqual(new Date('2025-04-01T00:00:00.000Z'));
    });

    it('should delete date param and set date to undefined when date does not match month', () => {
        // Arrange
        const parsedMonth = new Date('2025-04-01T00:00:00Z');
        const parsedDate = new Date('2025-05-15T00:00:00Z');
        (dateUtils.getDateFromString as jest.Mock).mockImplementation((value, format) => {
            if (format === 'yyyy-MM') return parsedMonth;
            if (format === 'yyyy-MM-dd') return parsedDate;
            return undefined;
        })('2025-05', 'yyyy-MM');
        (dateUtils.getDateFromString as jest.Mock).mockImplementation((value, format) => {
            if (format === 'yyyy-MM') return parsedMonth;
            if (format === 'yyyy-MM-dd') return parsedDate;
            return undefined;
        })('2025-05-15', 'yyyy-MM-dd');
        (dateUtils.isSameMonth as jest.Mock).mockReturnValue(false);

        // Act
        const { result } = renderHook(() => useCalendar());

        // Assert
        expect(dateUtils.getDateFromString).toHaveBeenCalledWith('2025-05', 'yyyy-MM');
        expect(dateUtils.getDateFromString).toHaveBeenCalledWith('2025-05-15', 'yyyy-MM-dd');
        expect(dateUtils.isSameMonth).toHaveBeenCalledWith(parsedMonth, parsedDate);
        expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
        expect(result.current.date).toEqual(undefined);
    });

    it('should update date query param when onClickDay is called', () => {
        // Arrange
        const testDate = new Date('2025-04-15T00:00:00Z');
        (dateUtils.getDateString as jest.Mock).mockReturnValue('2025-04-15');

        // Act
        const { result } = renderHook(() => useCalendar());

        act(() => {
            result.current.onClickDay(testDate);
        });

        // Assert
        expect(dateUtils.getDateString).toHaveBeenCalledWith(testDate, 'yyyy-MM-dd');
        expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    });

    it('should navigate to the correct URL when onClickTime is called', () => {
        // Arrange
        const testDate = new Date('2025-04-15T14:30:00Z');
        const parsedMonth = new Date('2025-04-01T00:00:00Z');
        const parsedDate = new Date('2025-04-15T00:00:00Z');

        const mockedDateUtils = dateUtils as jest.Mocked<typeof dateUtils>;
        mockedDateUtils.getDateFromString.mockImplementation((value, format) => {
            if (format === 'yyyy-MM') return parsedMonth;
            if (format === 'yyyy-MM-dd') return parsedDate;
            return undefined;
        });

        mockedDateUtils.getDateString.mockImplementation((date: Date, format?: string) => {
            if (format === "yyyy-MM-dd'T'HH:mm:ssxxx") return '2025-04-15T14:30:00Z';
            if (format === 'yyyy-MM') return '2025-04';
            if (format === 'yyyy-MM-dd') return '2025-04-15';
            return '';
        });

        // Act
        const { result } = renderHook(() => useCalendar());

        act(() => {
            result.current.onClickTime(testDate);
        });

        // Assert
        expect(mockedDateUtils.getDateString).toHaveBeenCalledWith(testDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
        expect(mockedDateUtils.getDateString).toHaveBeenCalledWith(testDate, 'yyyy-MM');
        expect(mockedDateUtils.getDateString).toHaveBeenCalledWith(testDate, 'yyyy-MM-dd');
        expect(navigate).toHaveBeenCalledWith('/2025-04-15T14:30:00Z?month=2025-04&date=2025-04-15');
    });

    it('should update month query param and remove date param when onChangeMonth is called', () => {
        // Arrange
        const newMonthDate = new Date('2025-05-01T00:00:00Z');
        (dateUtils.getDateString as jest.Mock).mockReturnValue('2025-05');

        // Act
        const { result } = renderHook(() => useCalendar());

        act(() => {
            result.current.onChangeMonth(newMonthDate);
        });

        // Assert
        expect(dateUtils.getDateString).toHaveBeenCalledWith(newMonthDate, 'yyyy-MM');
        expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    });
});
