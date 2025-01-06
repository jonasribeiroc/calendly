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
    color: ${({ theme }) => theme.colors.neutral.mediumDark};
    background-color: transparent;

    & strong {
        background-color: transparent;
    }
`;

const NewScheduleButton = styled.button`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary.medium};
    border: 1px solid ${({ theme }) => theme.colors.primary.medium};
    border-radius: 40px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.medium};
        color: ${({ theme }) => theme.colors.white};
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
                type='success'
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
