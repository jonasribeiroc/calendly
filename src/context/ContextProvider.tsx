import React from "react";

type ContextProps = {
    month?: string;
    date?: string;
}

export const Context = React.createContext<any  | null>(null);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [params, setParams] = React.useState<ContextProps>();

    const updateParams = (param: string, value: string) => {
        const newParams = {
            ...params,
            [param]: value
        }
        setParams(newParams);
    };
    return <Context.Provider value={{ params, updateParams }}>{children}</Context.Provider>;
};

export default ContextProvider;