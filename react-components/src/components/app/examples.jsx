import React, {useState} from "react";

export class ButtonsGroup extends React.Component {
    render() {
        return <div className="buttons">
            {this.props.children}
        </div>
    }
}

export function Button({label, ...props}) {
    return <button {...props}>{label}</button>
}

export function Input({label}) {
    return <label>
        <span>{label}: </span>
        <input/>
    </label>
}

export function ControlledInput({label}) {
    const [value, setValue] = useState("");

    return <label>
        <span>{label}: </span>
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </label>
}