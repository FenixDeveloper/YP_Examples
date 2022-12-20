import React, {useCallback, useState} from "react";
import styles from "./table.module.css";
import clsx from "clsx";

const customTable = function (Row) {
    return function Table({data, children}) {
        return <table className={styles.table}>
            <thead className={styles.thead}>
            <Row className={styles.row}>
                {React.Children.map(children, (child) => {
                    console.log(child);
                    return <child.type
                        {...child.props}
                        className={styles.column}
                        key={`head_${child.props.field}`}
                        place="head"
                    />
                })}
            </Row>
            </thead>
            <tbody className={styles.tbody}>
            {data.map((item, index) => <Row
                key={`row_${index}`}
                className={styles.row}
            >
                {React.Children.map(children, (child) => <child.type
                    {...child.props}
                    key={`item_${index}_${child.props.field}`}
                    className={styles.column}
                    item={item}
                    place="body"
                />)}
            </Row>)}
            </tbody>
        </table>
    }
}

export const Table = customTable(Row);

function Row({item, children, renderColumns, index, ...props}) {
    return <tr {...props}>{children}</tr>
}

export function Column({field, header, place, item, rowKey, headTemplate, bodyTemplate, ...props}) {
    switch (place) {
        case "head": return <th {...props}>
            {headTemplate ? headTemplate({field, header, ...props}) : header}
        </th>
        default: return <td {...props}>
            {bodyTemplate ? bodyTemplate({field, item, value: (item && field) ? item[field] : null, rowKey, ...props}) : item[field]}
        </td>
    }
}