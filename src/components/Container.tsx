import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    margin-top: 66px;
    margin-bottom: 30px;
    background-color: #fff;
    border: 1px solid var(--text-color-level3, rgba(26, 26, 26, 0.1));
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;