import {RefObject, useEffect} from "react";

/**
 * Single resize service provider for all components
 */
class ResizeService {
  nodeMap;
  observer;
  onResize;

  constructor() {
    this.nodeMap = new Map();

    this.onResize = (entries) => {
      for (let entry of entries) {
        const {size, callback} = this.nodeMap.get(entry.target);
        const nextSize = entry.target.getBoundingClientRect();
        if ((nextSize.width !== size.width || nextSize.height !== size.height) && callback) {
          callback(nextSize);
        }
      }
    }

    this.observer = new ResizeObserver(this.onResize);
  }

  /**
   * Add node to track list
   *
   * @param {HTMLElement} node tracked node
   * @param {function} callback fires when visibility changed
   */
  observe(node, callback) {
    this.nodeMap.set(node, {
      size: node.getBoundingClientRect(),
      callback
    });
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

const service = new ResizeService();

/**
 * Monitors element resize
 *
 * @param {RefObject[]} ref tracked mutable ref object (not node!)
 * @param {boolean} isEnabled track or not to track
 * @param {function} callback fires when element size changed
 */
export function useResizeObserver(ref, isEnabled, callback) {
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
