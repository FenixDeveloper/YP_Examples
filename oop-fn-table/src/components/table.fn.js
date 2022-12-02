const DEFAULT_TEMPLATE = `
    <thead>
        <tr></tr>
    </thead>
    <tbody></tbody>
`;

export const DEFAULT_SETTINGS = {
    tableClass: 'table'
};

export const columnTypes = {    
    "link:cell": ({cell, row, key}) => {
        cell.append(createLink(row[key]));
    }
};

function log(...msg) {
    console.log('table-fn: ', ...msg);
}

function createContainer({ tableClass }) {
    log('createContainer');
    const table = document.createElement('table');
    table.innerHTML = DEFAULT_TEMPLATE;
    const head = table.querySelector('thead > tr');
    const body = table.querySelector('tbody');
    table.className = tableClass;
    return { table, head, body };
}

function createHeader({ header, ...column }) {
    log('createHeader');
    const headElement = document.createElement('th');
    const key = `${column.type}:header`;
    if (column.type && columnTypes[key]) {
        columnTypes[key]({ head: headElement, ...column });
    } else if (header) {
        header({ head: headElement, ...column });
    } else {
        headElement.textContent = column.label;
    }
    return headElement;
}

function createCell(row, { cell, ...column}) {
    log('createCell');
    const cellElement = document.createElement('td');
    const key = `${column.type}:cell`;
    if (column.type && columnTypes[key]) {
        columnTypes[key]({ cell: cellElement, row, ...column });
    } else if (cell) {
        cell({ cell: cellElement, row, ...column });
    } else {
        cellElement.textContent = row[column.key];
    }
    return cellElement;
}

function createRow(row, columns, cellRenderer) {
    log('createRow');
    const rowElement = document.createElement('tr');
    for (let column of columns) {
        rowElement.append(cellRenderer(row, column));
    }
    return rowElement;
}

const DEFAULT_CREATORS = {
    container: createContainer,
    header: createHeader,
    row: createRow,
    cell: createCell
};

/*
    через третий аргумент можно передать кастомные рендер функции, чтобы переопределить детали реализации как в ООП варианте
*/
export function createTable(rows, { columns = [], ...customSettings }, customCreators = {}) {
    const settings = Object.assign({}, DEFAULT_SETTINGS, customSettings ?? {});
    const { container, header, row, cell } = Object.assign({}, DEFAULT_CREATORS, customCreators);

    const { table, head, body } = container(settings);

    for (let columnItem of columns) {
        head.append(header(columnItem));
    }

    for (let rowItem of rows) {
        body.append(row(rowItem, columns, cell));
    }

    return { table };
}

export function createLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text ?? href;
    return link;
}