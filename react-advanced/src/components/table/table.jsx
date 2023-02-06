import React, {useLayoutEffect, useMemo, useRef, useState} from "react";
import styles from "./table.module.css";
import {getTableSize, iterate, iterate2D} from "../../app/utils";

export function Table({
        startRow = 1,
        startColumn = 1,
        cellWidth = 100,
        cellHeight = 25,
        children
    }) {
    const [size, setSize] = useState(getTableSize(window.innerWidth, window.innerHeight, cellWidth, cellHeight));
    const ref = useRef(null);
    useLayoutEffect(() => {
        const cr = ref.current.getBoundingClientRect();
        setSize(getTableSize(cr.width, cr.height, cellWidth, cellHeight));
    }, [cellWidth, cellHeight]);

    const content = iterate2D(startRow, size.rows, startColumn, size.columns)
        .map((id) => children({key: `cell_${id}`, id, className: styles.cell}));

    const columns = iterate(startColumn, size.columns, true)
            .map(id => <HeadCell key={`column_${id}`} value={id} />);

    const rows = iterate(startRow, size.rows)
            .map(id => <HeadCell key={`row_${id}`} value={id} />);

    // noinspection JSValidateTypes
    return <div
        className={styles.container}
        style={{
            '--cols': size.columns,
            '--rows': size.rows
        }}
    >
        <div className={styles.rows}>{rows}</div>
        <div className={styles.cols}>{columns}</div>
        <div
            ref={ref}
            className={styles.table}
        >{content}</div>
    </div>;
}

export function HeadCell({value}) {
    return <div className={styles.head}>{value}</div>
}

