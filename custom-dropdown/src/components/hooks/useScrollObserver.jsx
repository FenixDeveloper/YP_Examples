import {RefObject, useEffect} from "react";
import {getElementSide} from "../lib/utils";

/**
 * Single scroll service provider for all components
 */
class ScrollService {
  nodeMap;
  onScroll;

  constructor() {
    this.nodeMap = new Map();

    this.onScroll = () => {
      this.nodeMap.forEach(({side, callback}, node) => {
        const nextSide = getElementSide(node.getBoundingClientRect()).join("-");
        if (nextSide !== side) callback(nextSide);
      });
    };

    window.addEventListener('scroll', this.onScroll);
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {function} callback fires when visibility changed
   */
  observe(node, callback) {
    this.nodeMap.set(node, {
      side: getElementSide(node.getBoundingClientRect()).join("-"),
      callback
    });
  }

  /**
   * Remove node from track list
   *
   * @param {HTMLElement} node tracked node
   */
  unobserve(node) {
    this.nodeMap.delete(node);
  }
}

const service = new ScrollService();

/**
 * Tracks the change in the position of the element relative to the viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {function} callback fires when nearest side changed
 */
export function useScrollObserver(ref, isEnabled, callback) {
  useEffect(() => {
    if (ref.current && isEnabled) {
      const node = ref.current;
      service.observe(node, callback);
      return () => {
        service.unobserve(node);
      }
    }
  }, [isEnabled, callback, ref]);
}
