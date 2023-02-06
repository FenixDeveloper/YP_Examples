import React from "react";
import styles from "./Table.module.css";

export function Table({data, columns, children, getRowKey = (r, i) => i}) {
    const cols = columns ?? Object.keys(data[0]).map(key => ({key, head: key}));
    return (data.length > 0) ? <table className={styles.table}>
        <thead>
        <tr>
            {cols.map(column => <th
                key={column.key}
                className={styles.head}
            >{column.head}</th>)}
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => <tr key={getRowKey(row, index)}>
            {cols.map(column => <td
                key={column.key}
                className={styles.cell}
            >
                {children({
                    value: data[index][column.key],
                    key: column.key,
                    className: styles.value,
                    row,
                    index,
                    column
                })}
            </td>)}
        </tr>)}
        </tbody>
    </table> : <p>Empty</p>;
}