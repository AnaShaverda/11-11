export const WEB_GOAL = 6;
export function swingPosition(elapsed) {
  return 50 + 43 * Math.sin(elapsed / 720);
}
export function isOnTarget(position) {
  return position >= 32 && position <= 68;
}
export function addCollected(items, id) {
  return items.includes(id) ? items : [...items, id];
}
