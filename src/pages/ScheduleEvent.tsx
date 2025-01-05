import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import InputField from '../components/Form/InputField';
import { useForm } from '../hooks/useForm';
import { postSchedule } from '../services/postSchedule';
import Toast from '../components/Toast';

interface ScheduleEventFormData {
    name: string;
    email: string;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 40px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const ScheduleEvent: React.FC = () => {
    const navigate = useNavigate();
    const { date } = useParams<{ date: string }>();
    const { formData, handleChange, handleSubmit, resetForm } = useForm<ScheduleEventFormData>({
        name: '',
        email: '',
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const onSubmit = async (data: ScheduleEventFormData) => {
        if (date) {
            const response = await postSchedule(date, data.name, data.email);
            setToastMessage(`
                Created successfully!
                ID: ${response.id}
                Date: ${new Date(response.date)}
                Name: ${response.name}
                Email: ${response.email}`
            )
            setShowToast(true);
            resetForm();
            setTimeout(() => navigate(`/`), 3000);
        }
    };

    return (
        <Layout title='Enter Details'>
            <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                <FormContainer>
                    <InputField
                        id="name"
                        label="Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <SubmitButton type="submit">Schedule Event</SubmitButton>
                </FormContainer>
            </form>
            {showToast && (
                <Toast
                    message={toastMessage}
                    duration={3000}
                    onClose={() => {setShowToast(false)}}
                />
            )}
        </Layout>
    );
};

export default ScheduleEvent;
