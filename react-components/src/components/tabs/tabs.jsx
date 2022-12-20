import React, {useEffect, useState} from "react";
import styles from "./tabs.module.css";
import clsx from "clsx";

export function Tabs({children, opened, onOpen}) {
    const [active, setActive] = useState(null);

    useEffect(() => {
        const tabs = React.Children.toArray(children);
        if (opened) setActive(opened);
        else if (tabs.length > 0) {
            setActive(tabs[0].props.name);
        }
    }, [opened]);

    return <div className={styles.container}>
        <nav className={styles.nav}>
            {React.Children.map(children, (child, index) => <button
                key={`tab_${index}`}
                className={clsx(styles.tab, {
                    [styles.active]: active === child.props.name
                })}
                onClick={() => {
                    setActive(child.props.name);
                }}
            >
                {child.props.name}
            </button>)}
        </nav>
        {React.Children.toArray(children).filter(section => section.props.name === active)}
    </div>
}

export function Tab({name, children}) {
    return <div>{children}</div>
}