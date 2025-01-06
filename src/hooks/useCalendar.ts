import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDateFromString, getDateString, getDateUTC, getFirstDayOfMonth, getLastDayOfMonth, isSameMonth } from '../utils/dateUtils';
import { getAvailableDateTimes } from '../services/getAvailableDateTimes';

export const useCalendar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [month, setMonth] = useState<Date>();
    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);

    const onClickDay = (date: Date) => {
        updateQueryParam('date', getDateString(date, 'yyyy-MM-dd'));
    };

    const onClickTime = (date: Date) => {
        const dateSrt = getDateString(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
        navigate(`/${dateSrt}?month=${getDateString(date, 'yyyy-MM')}&date=${getDateString(date, 'yyyy-MM-dd')}`);
    };

    const onChangeMonth = (newDate: Date) => {
        const updatedParams = new URLSearchParams(searchParams);
    
        deleteQueryParam('date', updatedParams);
        updateQueryParam('month', getDateString(newDate, 'yyyy-MM'), updatedParams);
        setSearchParams(updatedParams);
    };

    const updateQueryParam = useCallback((key: string, value: string, params?: URLSearchParams) => {
        const newParams = params || new URLSearchParams(searchParams);
        newParams.set(key, value);
        if (!params) setSearchParams(newParams);
    }, [searchParams, setSearchParams]);
    
    const deleteQueryParam = useCallback((key: string, params?: URLSearchParams) => {
        const newParams = params || new URLSearchParams(searchParams);
        newParams.delete(key);
        if (!params) setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const fetchAvailableTimes = useCallback(async (month: Date) => {
        setIsLoading(true);
        const dateTimes = await getAvailableDateTimes(
            getDateString(getFirstDayOfMonth(month), 'yyyy-MM-dd\'T\'HH:mm:ss'),
            getDateString(getLastDayOfMonth(month), 'yyyy-MM-dd\'T\'HH:mm:ss')
        );
        setIsLoading(false);
        setAvailableDateTimes(dateTimes);
    }, []);

    useEffect(() => {
        if (month) {
            fetchAvailableTimes(month);
        }
    }, [month]);

    useEffect(() => {
        const newMonth = getDateFromString(searchParams.get('month'), 'yyyy-MM');
        if (newMonth) {
            setMonth(newMonth);
        } else {
            setTimeout(() => updateQueryParam('month', getDateString(getDateUTC())), 100);
        }
    }, [searchParams.get('month')]);

    useEffect(() => {
        const newMonth = getDateFromString(searchParams.get('month'), 'yyyy-MM');
        const newDate = getDateFromString(searchParams.get('date'), 'yyyy-MM-dd');
        if (newMonth && newDate && isSameMonth(newMonth, newDate)) {
            setDate(newDate);
        } else {
            deleteQueryParam('date');
            setDate(undefined);
        }
    }, [searchParams.get('date')]);

    return {
        availableDateTimes,
        month,
        date,
        isLoading,
        onClickDay,
        onClickTime,
        onChangeMonth
    };
};
