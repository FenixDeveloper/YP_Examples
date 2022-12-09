import React, {useState} from "react";
import styles from "./dropdown.module.css";
import clsx from "clsx";

export function DropdownContainer({children, className}) {
    return <div className={clsx(styles.container, className)}>
        {children}
    </div>
}

export function DropdownTrigger({children, onClick}) {
    return <button
        className={styles.trigger}
        onClick={onClick}
    >
        {children}
    </button>
}

function DropdownPanelHeader({title, ...props}) {
    return <h2 {...props}>{title}</h2>
}

export function DropdownPanel({children, components, title}) {
    const {PanelHeader = DropdownPanelHeader} = components;
    return <div className={styles.panel}>
        <PanelHeader
            title={title}
            className={styles.panel_title}
        />
        <div className={styles.panel_body}>
            {children}
        </div>
    </div>
}

const DEFAULT_COMPONENTS = {
    Container: DropdownContainer,
    Trigger: DropdownTrigger,
    Panel: DropdownPanel
};

export function Dropdown({label, title, children, components}) {
    const [isOpened, setOpened] = useState(false);
    const {Container, Trigger, Panel, ...otherComponents} = Object.assign({}, DEFAULT_COMPONENTS, components ?? {});
    return <Container
        components={otherComponents}
        className={clsx({
            [styles.active]: isOpened
        })}
    >
        <Trigger
            components={otherComponents}
            onClick={() => setOpened(!isOpened)}
        >
            {label}
        </Trigger>
        <Panel
            title={title}
            components={otherComponents}
        >
            {children}
        </Panel>
    </Container>
}