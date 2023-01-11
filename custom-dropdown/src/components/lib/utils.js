/**
 * Check number more than "from" and less than "to"
 */
function inRange(num, from, to) {
  return num > from && num < to;
}

/**
 * Check both point of the line is in the range
 */
export function sideInRange(start, size, from, to) {
  return inRange(start, from, to) && inRange(start + size, from, to);
}

/**
 * Determines the closest sides of the viewport relative to the block
 */
export function getElementSide(el) {
  return [
    sideInRange(el.y, el.height, 0, (window.innerHeight / 2)) ? 'top' : 'bottom',
    sideInRange(el.x, el.width, 0, (window.innerWidth / 2)) ? 'left' : 'right'
  ];
}

/**
 * Convert side relative to trigger to side relative to viewport
 *
 * @param {string} side trigger relative side
 * @return {[string, string]} viewport relative side
 */
export function convertManualSide(side) {
  const [v, h] = side.split("-");
  const map = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  return [map[v], map[h]].join("-");
}

/**
 * Calculates the position of the panel relative to the trigger
 */
export function getPosition(trigger, panel, side) {
  const [v, h] = side ? (side.split("-")) : getElementSide(trigger);
  const map = {
    left: () => window.scrollX + trigger.x,
    right: () => window.scrollX + trigger.x + trigger.width - panel.width,
    top: () => window.scrollY + trigger.y + trigger.height + 1,
    bottom: () => window.scrollY + trigger.y - panel.height - 1
  };
  return {
    top: map[v](),
    left: map[h]()
  };
}
