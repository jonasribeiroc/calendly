import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm Hook', () => {
    interface FormValues {
        name: string;
        email: string;
        subscribed: boolean;
    }

    const initialValues: FormValues = {
        name: '',
        email: '',
        subscribed: false,
    };

    it('should initialize with initial values', () => {
        const { result } = renderHook(() => useForm(initialValues));

        expect(result.current.formData).toEqual(initialValues);
    });

    it('should update the formData when handleChange is called', () => {
        const { result } = renderHook(() => useForm(initialValues));

        act(() => {
            result.current.handleChange({
                target: { id: 'name', value: 'John Doe', type: 'text' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.name).toBe('John Doe');

        act(() => {
            result.current.handleChange({
                target: { id: 'email', value: 'john@example.com', type: 'email' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.formData.email).toBe('john@example.com');
    });

    it('should call the callback with formData on handleSubmit', () => {
        const mockCallback = jest.fn();
        const { result } = renderHook(() => useForm(initialValues));

        act(() => {
            result.current.handleChange({
                target: { id: 'name', value: 'Jane Doe', type: 'text' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleChange({
                target: { id: 'email', value: 'jane@example.com', type: 'email' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleSubmit(
                { preventDefault: jest.fn() } as any,
                mockCallback
            );
        });

        expect(mockCallback).toHaveBeenCalledWith({
            name: 'Jane Doe',
            email: 'jane@example.com',
            subscribed: false,
        });
    });

    it('should reset formData to initialValues when resetForm is called', () => {
        const { result } = renderHook(() => useForm(initialValues));

        act(() => {
            result.current.handleChange({
                target: { id: 'name', value: 'Test Name', type: 'text' },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.formData).toEqual(initialValues);
    });
});
