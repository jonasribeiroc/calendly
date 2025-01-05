import React from 'react';
import styled from 'styled-components';
import InputLabel from './InputLabel';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    hasError?: boolean;
    errorMessage?: string;
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

interface StyledInputProps {
    $hasError?: boolean
}

const StyledInput = styled.input<StyledInputProps>`
    padding: 12px;
    border: ${(props) => (props.$hasError ? '2px solid red' : '1px solid #ccc')};
    border-radius: 4px;
    font-size: 15px;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 0.875rem;
`;

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type = 'text',
    required = false,
    value,
    onChange,
    placeholder = '',
    hasError = false,
    errorMessage = '',
}) => {
    return (
        <InputContainer>
            <InputLabel htmlFor={id} label={label} required={required} />
            <StyledInput
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                $hasError={hasError}
            />
            {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
    );
};

export default InputField;
