﻿import "@fontsource/roboto";
import "./index.scss";

import { createTable, createLink } from "./components/table.fn";
import {Table} from "./components/Table.oop";

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

const fnRoot = document.getElementById('fn-table');
const oopRoot = document.getElementById('oop-table');

const { table: fnTable } = createTable(DATA, {
    columns: [
        { label: 'Имя', key: 'name' },
        { label: 'Телефон', key: 'phone' },
        { label: 'Email', key: 'email', cell: function ({cell, row, key}) {
            cell.append(createLink(
                `mailto:${row[key]}`,
                row[key]
            ));
        }},
        { label: 'Адрес', key: 'address' }
    ],
    tableClass: 'table is-bordered is-fullwidth custom-table'
});
fnRoot.append(fnTable);

const oopTable = new Table(DATA, {
    columns: [
        { label: 'Имя', key: 'name' },
        { label: 'Телефон', key: 'phone' },
        { label: 'Email', key: 'email', cell: function ({cell, row}) {
            cell.append(this._link(
                `mailto:${row[this.key]}`,
                row[this.key]
            ));
        }},
        { label: 'Адрес', key: 'address' }
    ],
    tableClass: 'table is-bordered is-fullwidth custom-table'
});
oopRoot.append(oopTable.render());
