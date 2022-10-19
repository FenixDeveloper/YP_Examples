const validator = {
    'text.min': [
        (value, rule) => value.length >= rule,
        (rule) => `Length must be more than ${rule}`
    ],
    'number.min': [
        (value, rule) => value >= rule,
        (rule) => `Value must be more than ${rule}`
    ],
    'text.max': [
        (value, rule) => value.length <= rule,
        (rule) => `Length must be less than ${rule}`
    ],
    'number.max': [
        (value, rule) => value <= rule,
        (rule) => `Value must be less than ${rule}`
    ],
    'boolean.value': [
        (value, rule) => value === rule,
        (rule) => `You must agree`
    ]
};

function validateValue(value, type, rules) {
    let errors = [];
    for (let ruleName in rules) {
        const validatorName = `${type}.${ruleName}`;
        if (validator[validatorName]) {
            const [check, message] = validator[validatorName];
            if (!check(value, rules[ruleName])) {
                errors.push(message(rules[ruleName]));
            }
        }
    }
    return errors;
}

function getValue(element) {
    switch (element.type) {
        case 'checkbox': return () => element.checked;
        default:
            return () => element.value;
    }
}

const supportedInputs = {
    'text': 'text',
    'textarea': 'text',
    'number': 'number',
    'checkbox': 'boolean'
};

function getField(input, type, rules) {
    const error = input.parentElement.querySelector('.field-error');
    return {
        parent: input.parentElement,
        setError: (msg) => error ? error.innerText = msg : false,
        getValue: getValue(input),
        input,
        type,
        rules,
    };
}

function setupForm({form, schema, onReady, onChange, onSubmit}) {
    const fields = {};
    const submit = [...form.elements].filter(el => el.type === 'submit').pop();

    if (!schema) {
        for (let input of form.elements) {
            const type = supportedInputs[input.type];
            if (!type || !input.name) continue;
            const rules = {...input.dataset};
            for (let key in rules) rules[key] = JSON.parse(rules[key]);

            const error = input.parentElement.querySelector('.field-error');
            fields[input.name] = getField(input, type, rules);
        }
    } else {
        for (let fieldName in schema) {
            const {type, ...rules} = schema[fieldName];
            const input = form.elements[fieldName];
            fields[fieldName] = getField(input, type, rules);
        }
    }

    if (onReady) onReady({form, fields, submit});

    form.addEventListener('keyup', (event) => {
        return onChange({event, form, fields, submit});
    });

    form.addEventListener('change', (event) => {
        return onChange({event, form, fields, submit});
    })

    form.addEventListener('submit', (event) => {
        event.stopPropagation();
        event.preventDefault();
        return onSubmit({
            event,
            form,
            fields,
            submit,
            data: Object.keys(fields)
                .reduce((a, c) => Object.assign(a, {
                    [c]: fields[c].getValue()
                }), {})
        });
    });
}

export function setupFormValidation(form, schema) {
    setupForm({
        form,
        schema,
        onReady: ({submit, fields}) => {
            submit.disabled = true;
            console.log(fields);
        },
        onChange: ({fields, submit}) => {
            let hasErrors = false;
            for (let fieldName in fields) {
                const { setError, getValue, type, rules } = fields[fieldName]
                setError("");
                const currentValue = getValue();
                let inputErrors = validateValue(currentValue, type, rules);
                if (inputErrors.length > 0) {
                    if (String(currentValue)) {
                        setError(inputErrors.join(", "));
                    }
                    hasErrors = true;
                }
            }
            submit.disabled = hasErrors;
        },
        onSubmit: ({data}) => {
            console.log('Submit: ', data);
        }
    });
}

export function setupValidationBySchema(schema = {}) {
    for (let formName in schema) {
        setupFormValidation(
            document.forms[formName],
            schema[formName]
        )
    }
}

export function setupGlobalValidation() {
    for (let form of document.forms) {
        setupFormValidation(form)
    }
}