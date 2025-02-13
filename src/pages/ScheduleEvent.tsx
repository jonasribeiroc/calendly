import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../hooks/useForm';
import { postSchedule } from '../services/postSchedule';
import { InputField, Layout, Loading } from '../components';
import { Context } from '../context/ContextProvider';

interface ScheduleEventFormData {
    name: string;
    email: string;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubmitButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary.medium};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 40px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.mediumDark};
    }
`;

const ScheduleEvent: React.FC = () => {
    const navigate = useNavigate();
    const { date } = useParams<{ date: string }>();
    const { params } = useContext(Context);
    const { formData, handleChange, handleSubmit, resetForm } = useForm<ScheduleEventFormData>({
        name: '',
        email: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data: ScheduleEventFormData) => {
        if (date) {
            setIsLoading(true);
            const response = await postSchedule(date, data.name, data.email);
            setIsLoading(false);
            resetForm();
            navigate(`/success?name=${response.name}&email=${response.email}&date=${response.date}`);
        }
    };

    useEffect(() => {
        console.log(params);
    }, [params])

    return (
        <Layout title='Enter Details'>
            <Loading isLoading={isLoading}>
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

                        <SubmitButton data-testid="submit-button" type="submit">Schedule Event</SubmitButton>
                    </FormContainer>
                </form>
            </Loading>
        </Layout>
    );
};

export default ScheduleEvent;
