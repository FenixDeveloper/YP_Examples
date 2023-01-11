import {RefObject, useEffect} from "react";

const isExists = (refs) => refs.filter(refItem => !!refItem.current).length === refs.length;
const isContains = (refs, target) => refs.filter(refItem => refItem.current?.contains(target)).length > 0;

/**
 * Monitors clicks outside the list of tracked items
 *
 * @param {RefObject[]} refs list of tracked refs (mutable ref, not elements!)
 * @param {boolean} isEnabled track or not to track
 * @param {function} callback fires when clicked outside
 */
export function useClickOutsideObserver(refs, isEnabled, callback) {
  useEffect(() => {
    const onClickOutside = (event) => {
      if (isExists(refs) && isEnabled && !isContains(refs, event.target)) {
        callback(event);
      }
    };
    if (isExists(refs) && isEnabled) {
      document.addEventListener("mousedown", onClickOutside);
      return () => {
        document.removeEventListener("mousedown", onClickOutside);
      }
    }
  }, [isEnabled, callback, refs]);
}
