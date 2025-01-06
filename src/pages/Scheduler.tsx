import React from 'react';
import { Calendar, Loading } from '../components';
import { useCalendar } from '../hooks/useCalendar';
import { Layout } from '../components';

const Scheduler: React.FC = () => {
    const {
        availableDateTimes,
        month,
        date,
        isLoading,
        onClickDay,
        onClickTime,
        onChangeMonth
    } = useCalendar();

    return (
        <Layout title='Select a Date & Time' isExpanded={!!date}>
            <Loading isLoading={isLoading}>
                {month ? (<Calendar
                    month={month}
                    selectedDate={date}
                    availableDateTimes={availableDateTimes}
                    onClickDay={onClickDay}
                    onClickTime={onClickTime}
                    onChangeMonth={onChangeMonth}
                />) : null}
            </Loading>
        </Layout>
    );
}

export default Scheduler;