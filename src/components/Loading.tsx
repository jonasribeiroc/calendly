import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpinnerIcon = styled(FiLoader)`
  animation: ${spin} 2s linear infinite;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.primary.medium};
`;

const ChildrenWrapper = styled.div<{ $isLoading: boolean }>`
  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

export const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  return (
    <LoadingContainer data-testid="spinner-icon">
      <ChildrenWrapper $isLoading={isLoading}>
        {children}
      </ChildrenWrapper>
      {isLoading && (
        <SpinnerOverlay>
          <SpinnerIcon data-testid="spinner-icon" />
        </SpinnerOverlay>
      )}
    </LoadingContainer>
  );
};
