import React, {useEffect, useRef, useState} from "react";

export function Input({value, onChange, ...props}) {
    const [state, setState] = useState(value ?? "");
    const ref = useRef(null);

    useEffect(() => setState(value), [value]);

    return <input
        {...props}
        ref={ref}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onKeyUp={(e) => {
            switch (e.key) {
                case 'Enter':
                    onChange(state);
                    ref.current.blur();
                    break;
                case 'Escape':
                    setState(value);
                    ref.current.blur();
                    break;
                default: break;
            }
        }}
        onBlur={() => {
            onChange(state);
        }}
    />;
}