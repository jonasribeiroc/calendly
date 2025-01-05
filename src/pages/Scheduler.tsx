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
            <Calendar
                month={month}
                selectedDate={date}
                availableDateTimes={availableDateTimes}
                onClickDay={onClickDay}
                onClickTime={onClickTime}
                onChangeMonth={onChangeMonth}
            />
        </Layout>
    );
}

export default Scheduler;