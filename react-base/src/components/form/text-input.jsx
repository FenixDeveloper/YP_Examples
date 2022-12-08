import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import clsx from 'clsx';

export function TextInput({name, label, type = 'text', value, onChange, className, ...props}) {
    return <label className={styles.field}>
        {label ? <span className={styles.label}>{label}</span> : null}
        <input
            {...props}
            className={clsx(styles.input, className)}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </label>
}

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};