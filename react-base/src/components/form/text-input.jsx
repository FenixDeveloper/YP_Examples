import React from 'react';
import styles from './form.module.css';
import clsx from 'clsx';
import {withFieldType} from "./field";

function Text({name, value, onChange, className, ...props}) {
    return <input
        {...props}
        className={clsx(styles.input, className)}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
}

function Email({name, value, onChange, className, ...props}) {
    return <input
        {...props}
        className={clsx(styles.input, className)}
        name={name}
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
}

export const TextInput = withFieldType(Text);
export const EmailInput = withFieldType(Email);

