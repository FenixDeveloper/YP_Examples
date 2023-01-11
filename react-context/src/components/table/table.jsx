import React, {useCallback, useState} from "react";
import styles from "./table.module.css";
import clsx from "clsx";

const HCell = ({className, children}) => <th className={clsx(styles.column, className)}>{children}</th>;
const Cell = ({className, children}) => <td className={clsx(styles.column, className)}>{children}</td>;
const Row = ({className, children}) => <tr className={clsx(styles.column, className)}>{children}</tr>;
const Head = ({className, children}) => <thead className={clsx(styles.thead, className)}>
    <tr>{children}</tr>
</thead>;
const Body = ({className, children}) => <tbody className={clsx(styles.tbody, className)}>{children}</tbody>;
const Foot = ({className, children}) => <tfoot className={clsx(styles.tfoot, className)}>
    <tr>{children}</tr>
</tfoot>;

export function Table({data, children, className, renderRow, idKey = '_id'}) {
    let columns = [
        ...React.Children.toArray(children)
    ];

    const header = columns.map(child => child.type({
        ...child.props,
        key: `head_${child.props.name}`,
        place: "head",
        Container: HCell
    }));

    const footer = columns.map(child => child.type({
        ...child.props,
        key: `foot_${child.props.name}`,
        place: "foot",
        Container: Cell
    }));

    const concreteRenderRow = renderRow ?? function ({content, Container, key}) {
        return <Container key={key} className={styles.row}>{content}</Container>
    };

    return <table className={clsx(styles.table, className)}>
        <Head>{header}</Head>
        <Body>
        {data.map((item, index) => {
            const rowKey = `row_${item[idKey] ?? index}`;
            const content = columns.map(child => child.type({
                ...child.props,
                key: `cell_${index}_${child.props.name}`,
                item,
                index,
                row: rowKey,
                value: item[child.props.name],
                place: "body",
                Container: Cell
            }));
            return concreteRenderRow({
                item,
                content,
                Container: Row,
                key: `row_${item[idKey] ?? index}`
            });
        })}
        </Body>
        <Foot>{footer.filter(item => !!item).length ? footer.map((item, index) => item ?? <Cell key={`foot_${index}`}>&nbsp;</Cell>) : null}</Foot>
    </table>;
}

export const customColumn = function ({
  Head = ({Container, title, name}) => <Container>{title ?? name}</Container>,
  Cell = ({Container, value}) => <Container>{value}</Container>,
  Foot = ({Container, value}) => value ? <Container>{value}</Container> : null
}) {
    return function ({place, ...props}) {
        switch (place) {
            case "head": return <Head {...props} />;
            case "body": return <Cell {...props} />;
            case "foot": return <Foot {...props} />;
            default: return null;
        }
    }
}

export const Column = customColumn({});