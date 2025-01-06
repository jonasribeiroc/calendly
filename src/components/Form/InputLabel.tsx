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
    color: ${({ theme }) => theme.colors.neutral.dark};
`;

const RequiredAsterisk = styled.span`
    color: ${({ theme }) => theme.colors.neutral.dark};
    margin-left: 0.25rem;
`;

export const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, label, required = false }) => {
    return (
        <StyledLabel htmlFor={htmlFor}>
            {label}
            {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </StyledLabel>
    );
};
