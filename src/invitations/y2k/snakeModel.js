export const SNAKE_SIZE = 18;
export const SNAKE_DIRECTIONS = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
const equal = (a, b) => a.x === b.x && a.y === b.y;
export function placeFood(body, random = Math.random) {
  const free = [];
  for (let y = 0; y < SNAKE_SIZE; y++) for (let x = 0; x < SNAKE_SIZE; x++) if (!body.some(cell => equal(cell, { x, y }))) free.push({ x, y });
  return free.length ? free[Math.min(free.length - 1, Math.floor(random() * free.length))] : null;
}
export function createSnake() {
  const body = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
  return { body, direction: 'right', food: { x: 12, y: 9 }, score: 0, status: 'ready' };
}
export function stepSnake(game, requested = game.direction, random = Math.random) {
  if (game.status !== 'playing') return game;
  const previous = SNAKE_DIRECTIONS[game.direction];
  const candidate = SNAKE_DIRECTIONS[requested] || previous;
  const direction = candidate[0] === -previous[0] && candidate[1] === -previous[1] ? game.direction : SNAKE_DIRECTIONS[requested] ? requested : game.direction;
  const [dx, dy] = SNAKE_DIRECTIONS[direction];
  const head = { x: (game.body[0].x + dx + SNAKE_SIZE) % SNAKE_SIZE, y: (game.body[0].y + dy + SNAKE_SIZE) % SNAKE_SIZE };
  const eating = game.food && equal(head, game.food);
  // The tail moves away on this tick unless food is eaten.
  const occupied = eating ? game.body : game.body.slice(0, -1);
  if (occupied.some(cell => equal(cell, head))) return { ...game, direction, status: 'over' };
  const body = [head, ...game.body];
  if (!eating) body.pop();
  const food = eating ? placeFood(body, random) : game.food;
  return { body, direction, food, score: game.score + (eating ? 1 : 0), status: food ? 'playing' : 'won' };
}
