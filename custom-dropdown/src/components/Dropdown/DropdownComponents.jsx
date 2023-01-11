import React from "react";
import styles from "./Dropdown.module.scss";

/**
 * Default trigger content
 */
export function TriggerIcon() {
  return <div className={styles.defaultTrigger}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
      <path
        d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/>
    </svg>
  </div>;
}

/**
 * Default container for dropdown
 */
export const DropdownContainer = React.forwardRef((props, ref) => {
  const {children, ...rest} = props;
  return <div {...rest} ref={ref}>{children}</div>;
});

/**
 * Default control element
 */
export const DropdownTrigger = React.forwardRef((props, ref) => {
  const {children, ...rest} = props;
  return <button {...rest} ref={ref}>{children}</button>;
});

/**
 * Default content container
 */
export const DropdownPanel = React.forwardRef((props, ref) => {
  const {children, ...rest} = props;
  return <div {...rest} ref={ref}>{children}</div>;
});

export const DEFAULT_COMPONENTS = {
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  Panel: DropdownPanel
};

export const DEFAULT_OPTIONS = {
  container: {},
  trigger: {},
  panel: {}
};
