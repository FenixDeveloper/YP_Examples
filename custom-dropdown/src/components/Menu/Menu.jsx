import React from "react";
import styles from "./Menu.module.scss";
import cs from "classnames";

/**
 * Abstract icon renderer, support class based icons and JSX elements
 *
 * @example with fontawesome icon class
 * <MenuIcon icon="fa-solid fa-user" />
 *
 * @example with fontawesome icon element
 * <MenuIcon icon={<FasUser />} />
 */
export function MenuIcon({icon}) {
  if (React.isValidElement(icon)) return icon;
  else if (typeof icon === "string") {
    return <span className={cs(icon, styles.icon)}></span>
  } else {
    return null;
  }
}

/**
 * One menu item, can be customized by classes or content renderer function. Marked as disabled if no command supplied.
 *
 * @see MenuItemData
 * @see MenuIcon
 * @example props with label and icon
 * {label: "first item", icon: "fa-solid fa-user"}
 *
 * @example props with custom renderer
 * {content: ({label, labelClassName, icon}) => <React.Fragment>
 *   <span className={labelClassName}>{label}</span>
 *   {icon ? <i className={icon} /> : null}
 * </React.Fragment>}
 *
 * @example default item component structure
 * <li className={className} onClick={command}>
 *   <span className={labelClassName}>{label}</span>
 *   <MenuIcon icon={icon} />
 * <li>
 */
export function MenuItem({content, ...props}) {
  const {onCommand, ...itemProps} = props; //separate item props
  const {label, command, className, labelClassName, ...rest} = itemProps;

  const onItemClick = (event) => {
    if (command) command(event, itemProps);
    if (onCommand) onCommand(event, itemProps);
  };

  return <li
    {...rest}
    onClick={onItemClick}
    className={cs(className, styles.item, {
      [styles.disabled]: !command
    })}>
    {(typeof content === "function") ? content(props) : <React.Fragment>
      <span className={cs(labelClassName, styles.label)}>{label}</span>
      <MenuIcon icon={props.icon}/>
    </React.Fragment>}
  </li>;
}

/**
 * Simple flat menu component
 *
 * @see MenuItem
 * @example internal structure
 * <ul className={className}>
 *   <MenuItem />
 *   ...
 * </ul>
 *
 * @example how to use
 * <Menu items={[
 *   {label: "first", command: () => {}},
 *   {label: "second", icon: "fa-solid fa-user", command: () => {}}
 * ]} />
 */
export function Menu({items, className, onCommand}) {
  return <ul className={cs(className, styles.menu)}>
    {items.map((item, index) => <MenuItem
      {...item}
      onCommand={onCommand}
      key={['item', index, item.label].join("-")}
    />)}
  </ul>;
}
