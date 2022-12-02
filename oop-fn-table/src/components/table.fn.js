const DEFAULT_TEMPLATE = `
    <thead>
        <tr></tr>
    </thead>
    <tbody></tbody>
`;

const DEFAULT_SETTINGS = {
    tableClass: 'table'
};

function createContainer({ tableClass }) {
    const table = document.createElement('table');
    table.innerHTML = DEFAULT_TEMPLATE;
    const head = table.querySelector('thead > tr');
    const body = table.querySelector('tbody');
    table.className = tableClass;
    return { table, head, body };
}

function createHeader({ header, ...column }) {
    const headElement = document.createElement('th');
    if (header) {
        header({ head: headElement, ...column });
    } else {
        headElement.textContent = column.label;
    }
    return headElement;
}

function createCell(row, { cell, ...column}) {
    const cellElement = document.createElement('td');
    if (cell) {
        cell({ cell: cellElement, row, ...column });
    } else {
        cellElement.textContent = row[column.key];
    }
    return cellElement;
}

function createRow(row, columns, cellRenderer) {
    const rowElement = document.createElement('tr');
    for (let column of columns) {
        rowElement.append(cellRenderer(row, column));
    }
    return rowElement;
}

export function createTable(rows, { columns = [], ...customSettings }) {
    const settings = Object.assign({}, DEFAULT_SETTINGS, customSettings ?? {});

    const { table, head, body } = createContainer(settings);

    for (let column of columns) {
        head.append(createHeader(column));
    }

    for (let row of rows) {
        body.append(createRow(row, columns, createCell));
    }

    return { table };
}

export function createLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text ?? href;
    return link;
}