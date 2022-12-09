import React from 'react';

import {Form} from '../form';
import {Layout} from "./layout";
import {Button, ButtonsGroup, ControlledInput, Input} from "./examples";
import {Dropdown} from "../dropdown/dropdown";

function App() {
    return <Layout
        header={<h1>React base examples</h1>}
    >
        <section>
            <ButtonsGroup>
                <Button label="CLICK ME!" onClick={() => alert('Hello world!')} />
            </ButtonsGroup>
        </section>

        <section>
            <Input label="Input" />
            <ControlledInput label="Controlled input" />
        </section>
        
        <section>
            <Form name="test" fields={{
                name: { value: '', label: 'Имя' },
                email: { value: '', label: 'Email', type: 'email' },
                address: { value: '', label: 'Адрес' }
            }} />
        </section>

        <section>
            <Dropdown label="dropdown panel" title="hidden content">
                HELLO WORLD!
            </Dropdown>
        </section>
    </Layout>
}

export default App;