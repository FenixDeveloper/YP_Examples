import React, {useCallback, useReducer} from 'react';
import {Layout} from "./layout";
import {Table, Column, customColumn} from "../table/table";
import {Form, useField} from "../form/form";

const DATA = [
    {
        "_id": "507f191e810c19729de860ea",
        "name": "Fletcher Henson",
        "phone": "1-736-873-9826",
        "email": "malesuada.fames@aol.com",
        "address": "Ap #720-9827 Semper, Avenue"
    },
    {
        "_id": "00000020f51bb4362eee2a4d",
        "name": "Leah Burton",
        "phone": "1-862-653-1324",
        "email": "vestibulum@protonmail.couk",
        "address": "Ap #939-3309 Dui Street"
    },
    {
        "_id": "63bea618bd9d18ae2ee738c5",
        "name": "Hilary Morton",
        "phone": "(857) 368-4262",
        "email": "nec.tempus@hotmail.edu",
        "address": "363-4710 Vestibulum, Rd."
    },
    {
        "_id": "63bea61e9962008a0eb25108",
        "name": "Adrian Cooke",
        "phone": "1-451-635-8457",
        "email": "fringilla.donec@icloud.ca",
        "address": "905-2306 Augue Rd."
    },
    {
        "_id": "63bea62caf0f50e1d4cb9111",
        "name": "Flynn Crawford",
        "phone": "(852) 426-7533",
        "email": "in.faucibus@yahoo.couk",
        "address": "Ap #164-5862 Tempor St."
    }
];

const EditableColumn = customColumn({
    Cell: function Editable({Container, index, name}) {
        const {onChange, ...field} = useField([index, name]);
        return <Container>
            <input {...field} type="text" onChange={(e) => onChange(e.target.value)} />
        </Container>
    }
});

const SelectorColumn = customColumn({
    Cell: function Editable({Container, index, name}) {
        const {onChange, value, ...field} = useField([index, name]);
        return <Container>
            <input type="checkbox" {...field} checked={value} onChange={(e) => onChange(e.target.checked)} />
        </Container>
    }
});

const initialState = {
    items: []
};

function tableReducer(state, action) {
    switch (action.type) {
        case "update":
            return {items: state.items.map((item, index) => {
                if (index === action.row) return {...item, [action.field]: action.value};
                else return item;
            })};
        default:
            return state;
    }
}

function EditableTable({data}) {
    const [state, dispatch] = useReducer(tableReducer, {
        items: data.map(item => ({
            ...item,
            __selected: false
        }))
    });
    const setValue = ([row, field], value) => dispatch({ type: 'update', row, field, value});
    const getValue = ([row, field]) => state.items[row][field];
    const getName = ([row, field]) => `${field}[${row}]`;
    const onSubmit = () => {};

    return <Form
        getValue={getValue}
        setValue={setValue}
        getName={getName}
        onSubmit={onSubmit}
    >
        <Table data={data}>
            <SelectorColumn name="__selected" />
            <EditableColumn name="name" />
            <EditableColumn name="phone" />
            <EditableColumn name="email" />
            <EditableColumn name="address" />
        </Table>
    </Form>
}

function App() {
    return <Layout
        header={<h1>React base examples</h1>}
    >
        <section>
            <Table data={DATA}>
                <Column name="name" />
                <Column name="phone" />
                <Column name="email" />
                <Column name="address" />
            </Table>
        </section>

        <section>
            <EditableTable data={DATA} />
        </section>

        <section style={{height: 500}}></section>
    </Layout>
}

export default App;