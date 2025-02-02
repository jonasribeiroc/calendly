import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Scheduler from './pages/Scheduler';
import ScheduleEvent from './pages/ScheduleEvent';
import ScheduleEventSucess from './pages/ScheduleEventSucess';
import './index.css';
import ContextProvider from './context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route index element={<Scheduler />} />
                        <Route path="/success" element={<ScheduleEventSucess />} />
                        <Route path="/:date" element={<ScheduleEvent />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </ContextProvider>
    </React.StrictMode>,
);
