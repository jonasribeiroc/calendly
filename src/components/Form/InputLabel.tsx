import React from 'react';
import styled from 'styled-components';

interface InputLabelProps {
    htmlFor: string;
    label: string;
    required?: boolean;
}

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
`;

const RequiredAsterisk = styled.span`
    color: #333;
    margin-left: 0.25rem;
`;

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, label, required = false }) => {
    return (
        <StyledLabel htmlFor={htmlFor}>
            {label}
            {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </StyledLabel>
    );
};

export default InputLabel;
