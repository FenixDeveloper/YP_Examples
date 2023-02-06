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
        onBlur={() => {
            onChange(state);
        }}
    />;
}