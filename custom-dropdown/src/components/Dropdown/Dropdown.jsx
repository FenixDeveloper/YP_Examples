import React, {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {convertManualSide, getPosition} from "../lib/utils";
import {DropdownContext} from "./DropdownContext";
import {useViewportObserver} from "../hooks/useViewportObserver";
import {useClickOutsideObserver} from "../hooks/useClickOutsideObserver";
import {useScrollObserver} from "../hooks/useScrollObserver";
import merge from "../lib/merge";
import cs from "classnames";
import {
  DEFAULT_COMPONENTS,
  DEFAULT_OPTIONS,
  TriggerIcon
} from "./DropdownComponents";
import {useResizeObserver} from "../hooks/useResizeObserver";
import styles from "./Dropdown.module.scss";

/**
 * Customizable dropdown component for controllable display of nested custom content
 * @example internal components structure
 * <Container>
 *   <Trigger>{trigger}</Trigger>
 *   <Panel>{children | function}</Panel>
 * </Container>
 * @example minimal with default icon
 * <Dropdown>
 *   My Content
 * </Dropdown>
 * @example with close function and custom label
 * <Dropdown trigger="open panel">
 *   {(close) => <p>Content <a onClick={close}>close panel</a></p>}
 * </Dropdown>
 */
export function Dropdown({trigger, children, side, components, options, hover = false}) {
  //internal state
  const [isVisible, setVisible] = useState(false); //visibility state when panel is opened
  const [isOpened, setOpened] = useState(false); //panel opening state
  const [position, setPosition] = useState(null); //panel css position
  const sync = useContext(DropdownContext); //to have only one dropdown open
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  //customization section
  const {Container, Trigger, Panel} = Object.assign({}, DEFAULT_COMPONENTS, components ?? {});
  const mergedOptions = merge(DEFAULT_OPTIONS, options ?? {});

  //internal api
  /**
   * Open panel and close others if context used
   */
  const open = useCallback(() => {
    if (sync) {
      sync.setCurrent(triggerRef.current);
    }
    setOpened(true);
    setVisible(true);
  }, [sync]);
  /**
   * Close panel
   */
  const close = useCallback(() => {
    if (sync) {
      sync.setCurrent(null);
    }
    setOpened(false);
    setVisible(false);
  }, [sync]);
  /**
   * Recalculate panel position in auto mode or by side value
   * @param {ScreenSide} nextSide where to place panel, auto if undefined
   */
  const reposition = useCallback((nextSide) => {
    if (triggerRef.current && panelRef.current) {
      setPosition(getPosition(
        triggerRef.current.getBoundingClientRect(),
        panelRef.current.getBoundingClientRect(),
        nextSide ? convertManualSide(nextSide) : undefined
      ));
    }
  }, []);
  //event handlers
  /**
   * Event handler for trigger click, can not be customized
   */
  const onTriggerClick = () => {
    if (isOpened) close();
    else open();
  };

  //effects section
  useViewportObserver(triggerRef, isOpened, setVisible);
  useClickOutsideObserver([containerRef, panelRef], isVisible, (event) => {
    event.stopPropagation();
    close();
  });
  useScrollObserver(triggerRef, !side && isOpened && isVisible, () => {
    reposition(side);
  });
  useResizeObserver(panelRef, isVisible, () => {
    reposition(side);
  });
  useLayoutEffect(() => { //calculate position before paint
    reposition(side);
  }, [isVisible, side, reposition]);
  useEffect(() => {
    if (sync?.current && sync?.current !== triggerRef.current) {
      close();
    }
  }, [sync, close]);

  const {replaceClassName: containerReplaceClassName, ...containerOptions} = mergedOptions.container;
  const {replaceClassName: triggerReplaceClassName, ...triggerOptions} = mergedOptions.trigger;
  const {replaceClassName: panelReplaceClassName, ...panelOptions} = mergedOptions.panel;
  const hoverOptions = hover ? {
    onMouseEnter: open,
    onMouseLeave: close
  } : {};

  return <Container
    {...containerOptions}
    className={containerReplaceClassName ?? cs(styles.dropdown, mergedOptions.container?.className)}
    ref={containerRef}
  >
    <Trigger
      {...triggerOptions}
      {...hoverOptions}
      className={triggerReplaceClassName ?? cs(styles.trigger, mergedOptions.trigger?.className)}
      ref={triggerRef}
      onClick={onTriggerClick}
    >
      {trigger ?? <TriggerIcon/>}
    </Trigger>
    {(isOpened && isVisible) && createPortal(<Panel
      {...panelOptions}
      {...hoverOptions}
      className={panelReplaceClassName ?? cs(styles.panel, mergedOptions.panel?.className)}
      ref={panelRef}
      style={{
        position: 'absolute',
        left: `${position?.left ?? 0}px`,
        top: `${position?.top ?? 0}px`
      }}
    >
      {(typeof children === 'function') ? children(close) : children}
    </Panel>, document.body)}
  </Container>;
}
