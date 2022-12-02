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

    constructor(rows, { columns, ...settings}) {
        this.rows = rows;
        this.columns = (columns ?? []).map(c => new Column(c));
        this.settings = Object.assign({}, this.constructor.DEFAULT_SETTINGS, settings ?? {});
    }

    render() {
        this._renderContainer();

        for (let column of this.columns) {
            this._head.append(this._renderHeader(column));
        }

        for (let row of this.rows) {
            this._body.append(this._renderRow(row));
        }

        return this.el;
    }

    _renderContainer() {
        this.el = document.createElement('table');
        this.el.innerHTML = this.constructor.DEFAULT_TEMPLATE;
        this._head = this.el.querySelector('thead > tr');
        this._body = this.el.querySelector('tbody');
        this.el.className = this.settings.tableClass;
    }

    _renderRow(row) {
        const rowElement = document.createElement('tr');
        for (let column of this.columns) {
            rowElement.append(this._renderCell(row, column));
        }
        return rowElement;
    }

    _renderHeader(column) {
        const head = document.createElement('th');
        column.header({...column, head});
        return head;
    }

    _renderCell(row, column) {
        const cell = document.createElement('td');
        column.cell({...column, cell, row});
        return cell;
    }
}

class Column {
    label = '';
    key = '';

    constructor(settings) {
        Object.assign(this, settings ?? {});
    }

    header({head}) {
        head.textContent = this.label;
    }

    cell({cell, row}) {
        cell.textContent = row[this.key];
    }

    _link(href, text) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = text ?? href;
        return link;
    }
}