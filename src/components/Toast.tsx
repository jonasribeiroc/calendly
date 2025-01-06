import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ToastProps {
    message: string;
    type: 'success';
    isShow: boolean;
    duration?: number;
    onClose: () => void; 
}

interface ToastContainerProps {
    $type?: string; 
    $duration?: number; 
}

const ToastContainer = styled.div<ToastContainerProps>`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background-color: ${({ $type, theme }) => theme.colors[$type || 'info']};
    color: white;
    font-size: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slide-in 0.3s ease-out, fade-out 0.5s ease-in ${props => (props as any).$duration || 3000}ms;
    white-space: pre-line;

    @keyframes slide-in {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fade-out {
        to {
            opacity: 0;
        }
    }
`;

export const Toast: React.FC<ToastProps> = ({ message, isShow, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return isShow && (<ToastContainer $type={type} $duration={duration}>{message}</ToastContainer>);
};
