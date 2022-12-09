import React, { useState } from 'react';
import {EmailInput, TextInput} from './text-input';
import PropTypes from 'prop-types';
import styles from "./form.module.css";

function getDefaultValues(fields) {
    return Object.keys(fields).reduce((a, c) => Object.assign(a, {
        [c]: fields[c].value
    }), {})
}

const FIELD_TYPES = {
    default: TextInput,
    email: EmailInput
};

export function Form({name, fields}) {
    const [data, setData] = useState(getDefaultValues(fields));

    const onChange = fieldName => value => {
        setData({...data, [fieldName]: value});
    };

    return <form name={name} className={styles.form}>
        {Object.keys(fields).map(fieldName => {
            const {type, ...fieldProps} = fields[fieldName];
            const Field = FIELD_TYPES[type ?? 'default'];
            return <Field
                {...fieldProps}
                key={`${name}_${fieldName}`}
                name={fieldName}
                value={data[fieldName]}
                onChange={onChange(fieldName)}
            />
        })}
    </form>
}

Form.propTypes = {
    name: PropTypes.string,
    fields: PropTypes.objectOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string
    }))
};