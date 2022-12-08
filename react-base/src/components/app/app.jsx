import React, { useState } from 'react';
import styles from './app.module.css';

import { Form } from '../form';

class ButtonsGroup extends React.Component {
    render() {
        return <div className="buttons">
            {this.props.children}
        </div>
    }
}

function Button({label, ...props}) {
    return <button {...props}>{label}</button>
}

function Input({label}) {
    return <label>
        <span>{label}</span>
        <input />
    </label>
}

function ControlledInput({label}) {
    const [value, setValue] = useState("");

    return <label>
        <span>{label}</span>
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </label>
}

function App() {
    return <main className={styles.app}>
        <section className={styles.section}>
            <ButtonsGroup>
                <Button label="CLICK ME!" onClick={() => alert('Hello world!')} />
            </ButtonsGroup>
        </section>

        <section className={styles.section}>
            <Input label="Uncontrolled Input" />
            <ControlledInput label="Controlled Input" />
        </section>
        
        <section className={styles.section}>
            <Form name="test" fields={{
                name: { value: '', label: 'Имя' },
                email: { value: '', label: 'Email' },
                address: { value: '', label: 'Адрес' }
            }} />
        </section>
    </main>
}

export default App;