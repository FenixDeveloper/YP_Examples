import React from "react";
import PropTypes from "prop-types";
import styles from "./form.module.css";
import clsx from "clsx";


export function withFieldType(Input) {
    function Field({name, label, value, onChange, className, ...props}) {
        return <label className={styles.field}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <Input
                {...props}
                className={clsx(styles.input, className)}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    }

    Field.propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    return Field;
}