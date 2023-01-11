import {RefObject, useEffect} from "react";

/**
 * Single intersection service provider for all components
 */
class IntersectionService {
  nodeMap;
  onIntersection;
  observer;

  constructor() {
    this.nodeMap = new Map();

    this.onIntersection = (entries) => {
      for (let entry of entries) {
        const callback = this.nodeMap.get(entry.target);
        if (callback) callback(entry.isIntersecting);
      }
    }

    this.observer = new IntersectionObserver(this.onIntersection, {
      rootMargin: "0px 0px 0px 0px",
      threshold: 1
    });
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {function} callback fires when visibility changed
   */
  observe(node, callback) {
    this.nodeMap.set(node, callback);
    this.observer.observe(node);
  }

  /**
   * Remove node from track list
   *
   * @param {HTMLElement} node tracked node
   */
  unobserve(node) {
    this.nodeMap.delete(node);
    this.observer.unobserve(node);
  }
}

const service = new IntersectionService();

/**
 * Tracks the visibility of element within viewport
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {function} callback fires when nearest side changed
 */
export function useViewportObserver(ref, isEnabled, callback) {
  useEffect(() => {
    if (ref.current && isEnabled) {
      const node = ref.current;
      service.observe(node, callback);
      return () => {
        service.unobserve(node);
      }
    }
  }, [isEnabled, callback, ref])
}
