import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scheduler from './pages/Scheduler';
import ScheduleEvent from './pages/ScheduleEvent';
import ScheduleEventSucess from './pages/ScheduleEventSucess';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route index element={<Scheduler />} />
                <Route path="/success" element={<ScheduleEventSucess />} />
                <Route path="/:date" element={<ScheduleEvent />} />
            </Routes>
        </Router>
    </React.StrictMode>,
);
