import React from "react";
import styles from "./app.module.css";
import clsx from "clsx";

export function Layout({children, header}) {
    return <React.Fragment>
        {header}
        <main className={styles.app}>
            {React.Children.map(children, element => {
                // как изнутри выглядит компонент в ReactDOM,
                // нужно включить verbose level в инструментах разработчика
                console.debug(element);
                return React.isValidElement(element) ? React.cloneElement(element, {
                    className: clsx(element.props.className, styles.section)
                }) : element;
            })}
        </main>
    </React.Fragment>
}