import styled from 'styled-components';

interface AvatarProps {
    width?: string;
    height?: string;
}

export const Avatar = styled.img<AvatarProps>`
    width: ${({ width }) => width || '50px'};
    height: ${({ height }) => height || '50px'};
    border-radius: 50%;
    object-fit: cover;
`;
