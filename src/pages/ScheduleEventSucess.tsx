import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Layout,  Toast } from '../components';

const Details = styled.div`
    border-radius: 8px;
    width: 100%;
`;

const DetailItem = styled.p`
    margin: 10px 0;
    font-size: 16px;
    color: #555;
    background-color: transparent;

    & strong {
        background-color: transparent;
    }
`;

const NewScheduleButton = styled.button`
    background-color: transparent;
    color: #007bff;
    border: none;
    border-radius: 40px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #eeeeee;
        color: #0070e9;
    }
`;

const ScheduleEventSucess: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const date = searchParams.get('date');
    const dateStr = date && new Date(date).toISOString();

    useEffect(() => {
        setShowToast(true);
    },[])

    return (
        <Layout title='Success Schedule'>
            <Details>
                <DetailItem><strong>Name:</strong> {searchParams.get('name')}</DetailItem>
                <DetailItem><strong>Email:</strong> {searchParams.get('email')}</DetailItem>
                <DetailItem><strong>Date:</strong> {dateStr}</DetailItem>
            </Details>
            <Toast
                message={'Created successfully!'}
                isShow={showToast}
                duration={3000}
                onClose={() => { setShowToast(false) }}
            />
            <NewScheduleButton
                onClick={() => navigate(`/`)}
            >
                New Schedule
            </NewScheduleButton>
        </Layout>
    );
};

export default ScheduleEventSucess;
