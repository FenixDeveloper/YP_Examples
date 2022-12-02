const DEFAULT_TEMPLATE = `
    <thead>
        <tr></tr>
    </thead>
    <tbody></tbody>
`;

const DEFAULT_SETTINGS = {
    tableClass: 'table'
};

export function createTable(rows, { columns = [], ...settings }) {
    const { tableClass } = Object.assign({}, DEFAULT_SETTINGS, settings ?? {});

    const table = document.createElement('table');
    table.innerHTML = DEFAULT_TEMPLATE;
    const head = table.querySelector('thead > tr');
    const body = table.querySelector('tbody');

    table.className = tableClass;

    for (let {label} of columns) {
        const headColumn = document.createElement('th');
        headColumn.textContent = label;
        head.append(headColumn);
    }

    for (let row of rows) {
        const rowElement = document.createElement('tr');
        for (let {key} of columns) {
            const cellElement = document.createElement('td');
            cellElement.textContent = row[key];
            rowElement.append(cellElement);
        }
        body.append(rowElement);
    }

    return { table };
}