import styled from 'styled-components';

interface TextProps {
    as?: 'h1';
}

export const Text = styled.div<TextProps>`
    margin: 0;
`;
