import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 900px;
    margin: auto;
    margin-top: 66px;
    margin-bottom: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.neutral.light};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);

    @media (max-width: 900px) {
        flex-direction: column;
        margin: 0;
        box-shadow: none;
        border: none;
    }
`;