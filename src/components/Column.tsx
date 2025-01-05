import styled from 'styled-components';

export const Column = styled.div`
    flex: 1;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1000px) {
        border: none;
    }
`;