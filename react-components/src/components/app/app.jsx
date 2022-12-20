import React from 'react';

import {Form} from '../form';
import {Layout} from "./layout";
import {Dropdown} from "../dropdown/dropdown";
import {Table, Column} from "../table/table";
import {Tabs, Tab} from "../tabs/tabs";
import {EditableList} from "../list/list";

const DATA = [
    {
        "name": "Fletcher Henson",
        "phone": "1-736-873-9826",
        "email": "malesuada.fames@aol.com",
        "address": "Ap #720-9827 Semper, Avenue"
    },
    {
        "name": "Leah Burton",
        "phone": "1-862-653-1324",
        "email": "vestibulum@protonmail.couk",
        "address": "Ap #939-3309 Dui Street"
    },
    {
        "name": "Hilary Morton",
        "phone": "(857) 368-4262",
        "email": "nec.tempus@hotmail.edu",
        "address": "363-4710 Vestibulum, Rd."
    },
    {
        "name": "Adrian Cooke",
        "phone": "1-451-635-8457",
        "email": "fringilla.donec@icloud.ca",
        "address": "905-2306 Augue Rd."
    },
    {
        "name": "Flynn Crawford",
        "phone": "(852) 426-7533",
        "email": "in.faucibus@yahoo.couk",
        "address": "Ap #164-5862 Tempor St."
    }
];

function App() {
    return <Layout
        header={<h1>React base examples</h1>}
    >
        <section>
            <Tabs opened="table">
                <Tab name="table">
                    <Table data={DATA}>
                        <Column field="name" header="Имя" />
                        <Column field="phone" header="Телефон" />
                        <Column field="email" header="Email" />
                        <Column field="address" header="Address" />
                    </Table>
                </Tab>
                <Tab name="editable">
                    <EditableList />
                </Tab>
            </Tabs>
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

        <section style={{height: 500}}></section>
    </Layout>
}

export default App;