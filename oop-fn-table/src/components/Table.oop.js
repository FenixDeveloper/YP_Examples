export class Table {
    static DEFAULT_TEMPLATE = `
    <thead>
        <tr></tr>
    </thead>
    <tbody></tbody>
    `;
    static DEFAULT_SETTINGS = {
        tableClass: 'table'
    };

    el = null;
    columns = [];
    rows = [];
    settings = {};

    _head = null;
    _body = null;

    constructor(rows, { columns = [], ...settings}) {
        this.rows = rows;
        this.columns = columns;
        this.settings = Object.assign({}, this.constructor.DEFAULT_SETTINGS, settings ?? {});
    }

    render() {
        this.el = document.createElement('table');
        this.el.innerHTML = this.constructor.DEFAULT_TEMPLATE;
        this._head = this.el.querySelector('thead > tr');
        this._body = this.el.querySelector('tbody');

        this.el.className = this.settings.tableClass;

        for (let {label} of this.columns) {
            const headColumn = document.createElement('th');
            headColumn.textContent = label;
            this._head.append(headColumn);
        }

        for (let row of this.rows) {
            const rowElement = document.createElement('tr');
            for (let {key} of this.columns) {
                const cellElement = document.createElement('td');
                cellElement.textContent = row[key];
                rowElement.append(cellElement);
            }
            this._body.append(rowElement);
        }

        return this.el;
    }
}