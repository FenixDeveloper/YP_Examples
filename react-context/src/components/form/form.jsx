import React, { useContext } from 'react';

export const FormContext = React.createContext({
    getValue: (name) => {},
    setValue: (name, value) => {}
});

export function Form({children, getValue, setValue, getName, onSubmit, ...props}) {
    return <form {...props} onSubmit={onSubmit}>
        <FormContext.Provider value={{
            getValue,
            setValue,
            getName
        }}>
            {children}
        </FormContext.Provider>
    </form>
}

export function useField(name) {
    const {setValue, getValue, getName} = useContext(FormContext);

    return {
        name: getName(name),
        value: getValue(name),
        onChange: (value) => setValue(name, value)
    };
}