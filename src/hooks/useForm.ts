import React, { useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleChange = (e: ChangeEvent) => {
        const target = e.target;
        const { id, type } = target;

        if (type === 'checkbox' && target instanceof HTMLInputElement) {
            setFormData(prevData => ({
                ...prevData,
                [id]: target.checked,
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: target.value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, callback: (data: T) => void) => {
        e.preventDefault();
        callback(formData);
    };

    const resetForm = () => {
        setFormData(initialValues);
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        resetForm,
    };
};
