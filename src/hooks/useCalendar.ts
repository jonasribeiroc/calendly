import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDate, getDateString, isSameYearMonth, isValidDateStr } from '../utils';
import { getAvailableDateTimes } from '../services/getAvailableDateTimes';

export const useCalendar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [month, setMonth] = useState<Date>(new Date());
    const [date, setDate] = useState<Date>();
    const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);

    const onClickDay = (date: Date) => {
        updateQueryParam('date', getDateString(date, 'yyyy-MM-dd'));
    };

    const onClickTime = (date: Date) => {
        const dateSrt = getDateString(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
        navigate(`/${dateSrt}?month=${getDateString(month, 'yyyy-MM')}&date=${getDateString(date, 'yyyy-MM-dd')}`);
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

    useEffect(() => {
        const monthParam = searchParams.get('month');
        if (isValidDateStr(monthParam, ['yyyy-MM'])) {
            setMonth(getDate(monthParam!, 'yyyy-MM'));
        } else {
            setTimeout(() => updateQueryParam('month', getDateString()), 100);
        }
    }, [searchParams, updateQueryParam]);

    useEffect(() => {
        const dateParam = searchParams.get('date');
        const monthParam = searchParams.get('month');
        if (
            isValidDateStr(dateParam, ['yyyy-MM-dd']) &&
            isSameYearMonth(monthParam, dateParam)
        ) {
            setDate(getDate(dateParam!, 'yyyy-MM-dd'));
        } else {
            deleteQueryParam('date');
            setDate(undefined);
        }
    }, [searchParams, deleteQueryParam]);

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            const startDate = new Date(month.getUTCFullYear(), month.getUTCMonth(), 1, 0, 0, 0);
            const endDate = new Date(month.getUTCFullYear(), month.getUTCMonth() + 1, 0, 23, 59, 59);

            const startDateTimeStr = getDateString(startDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
            const endDateTimeStr = getDateString(endDate, 'yyyy-MM-dd\'T\'HH:mm:ss');

            const times = await getAvailableDateTimes(startDateTimeStr, endDateTimeStr);
            setAvailableDateTimes(times);
        };

        fetchAvailableTimes();
    }, [month]);

    return {
        availableDateTimes,
        month,
        date,
        onClickDay,
        onClickTime,
        onChangeMonth
    };
};
