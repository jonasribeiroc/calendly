import React from 'react';
import { Calendar } from '../components';
import { useCalendar } from '../hooks/useCalendar';
import Layout from '../components/Layout';

const Scheduler: React.FC = () => {
    const {
        availableDateTimes,
        month,
        date,
        onClickDay,
        onClickTime,
        onChangeMonth
    } = useCalendar();

    return (
        <Layout title='Select a Date & Time' isExpanded={!!date}>
            {month ? (<Calendar
                month={month}
                selectedDate={date}
                availableDateTimes={availableDateTimes}
                onClickDay={onClickDay}
                onClickTime={onClickTime}
                onChangeMonth={onChangeMonth}
            />) : null}
        </Layout>
    );
}

export default Scheduler;