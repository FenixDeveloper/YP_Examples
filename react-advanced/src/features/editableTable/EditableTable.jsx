import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { Table } from "../../components/table/table";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setValue, selectCell } from "./tableSlice";

function Input({value, onChange, ...props}) {
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
    />;
}

export function Cell({id, ...props}) {
    const { value } = useSelector(selectCell(id), shallowEqual);
    const dispatch = useDispatch();

    return <Input
        {...props}
        type="text"
        value={value}
        onChange={(value) => dispatch(setValue({ id, value }))}
    />;
}

export function EditableTable() {
    return <Table>
        {props => <Cell {...props} />}
    </Table>
}
