import React, {createContext, useState} from "react";

/**
 * Context for dropdown state synchronization
 */
export const DropdownContext = createContext(null);

/**
 * Context provider for multiple Dropdown synchronization
 * @example only one can be opened
 * <DropdownSync>
 *   <Dropdown>FIRST</Dropdown>
 *   <Dropdown>SECOND</Dropdown>
 * </DropdownSync>
 */
export function DropdownSync({children}) {
  const [current, setCurrent] = useState(null);

  return <DropdownContext.Provider value={{current, setCurrent}}>
    {children}
  </DropdownContext.Provider>
}
