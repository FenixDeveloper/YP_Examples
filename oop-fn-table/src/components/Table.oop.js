export class Column {
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

export class LinkColumn extends Column {
    cell({cell, row}) {
        cell.append(this._link(row[this.key]));
    }
}

export class Table {
    //большими буквами потому что использую как константу
    static DEFAULT_TEMPLATE = `
    <thead>
        <tr></tr>
    </thead>
    <tbody></tbody>
    `;
    static DEFAULT_SETTINGS = {
        tableClass: 'table'
    };
    //маленькими буквами, потому что можно изменять
    static columnTypes = {
        default: Column,
        link: LinkColumn
    };
    static logPrefix = 'table-oop';

    el = null;
    columns = [];
    rows = [];
    settings = {};

    _head = null;
    _body = null;

    /*
    почему здесь? потому что Table создает колонки, а Column занимается только своим содержимым. Где вы раньше писали new SomeClass, вот так и добавляете factorySomeType() чтобы сделать фабричный метод.
    */
    static factoryColumn(column) {
        if (column.type && this.columnTypes[column.type]) {
            return new this.columnTypes[column.type](column);
        } else {
            return new this.columnTypes["default"](column);
        }
    }

    constructor(rows, { columns, ...settings}) {
        this.rows = rows;
        this.columns = (columns ?? []).map(c => this.constructor.factoryColumn(c));
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

    //мы можем унаследовать класс и переопределить любой метод
    _log(...msg) {
        console.log('table-oop: ', ...msg);
    }

    _renderContainer() {
        this._log('_renderContainer');
        this.el = document.createElement('table');
        this.el.innerHTML = this.constructor.DEFAULT_TEMPLATE;
        this._head = this.el.querySelector('thead > tr');
        this._body = this.el.querySelector('tbody');
        this.el.className = this.settings.tableClass;
    }

    _renderRow(row) {
        this._log('_renderRow');
        const rowElement = document.createElement('tr');
        for (let column of this.columns) {
            rowElement.append(this._renderCell(row, column));
        }
        return rowElement;
    }

    _renderHeader(column) {
        this._log('_renderHeader');
        const head = document.createElement('th');
        column.header({...column, head});
        return head;
    }

    _renderCell(row, column) {
        this._log('_renderCell');
        const cell = document.createElement('td');
        column.cell({...column, cell, row});
        return cell;
    }
}