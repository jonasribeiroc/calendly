import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';
import { render } from '../../utils/test-utils';

describe('InputField Component', () => {
    const mockOnChange = jest.fn();
    const mockId = 'test-input';
    const mockLabel = 'Test Label';
    const mockValue = 'Test Value';
    const mockPlaceholder = 'Enter text';
    const mockErrorMessage = 'This field is required';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the label with correct text', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
            />
        );
        expect(screen.getByText(mockLabel)).toBeInTheDocument();
    });

    it('associates the label with the correct htmlFor', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
            />
        );
        const label = screen.getByText(mockLabel);
        expect(label).toHaveAttribute('for', mockId);
    });

    it('renders the input with correct attributes', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                type="email"
                value={mockValue}
                onChange={mockOnChange}
                placeholder={mockPlaceholder}
            />
        );
        const input = screen.getByPlaceholderText(mockPlaceholder) as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toHaveAttribute('id', mockId);
        expect(input).toHaveValue(mockValue);
    });

    it('shows asterisk when required is true', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                required
                value={mockValue}
                onChange={mockOnChange}
            />
        );
        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show asterisk when required is false', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
            />
        );
        expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value=""
                onChange={mockOnChange}
                placeholder={mockPlaceholder}
            />
        );
        const input = screen.getByPlaceholderText(mockPlaceholder) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it('applies error styles when hasError is true', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
                hasError
            />
        );
        const input = screen.getByDisplayValue(mockValue);
        expect(input).toHaveStyle('border: 2px solid #e74c3c');
    });

    it('renders error message when hasError is true', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
                hasError
                errorMessage={mockErrorMessage}
            />
        );
        expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    });

    it('does not render error message when hasError is false', () => {
        render(
            <InputField
                id={mockId}
                label={mockLabel}
                value={mockValue}
                onChange={mockOnChange}
                hasError={false}
                errorMessage={mockErrorMessage}
            />
        );
        expect(screen.queryByText(mockErrorMessage)).not.toBeInTheDocument();
    });
});
