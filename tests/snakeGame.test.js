import test from 'node:test';
import assert from 'node:assert/strict';
import { createSnake, stepSnake, placeFood, SNAKE_SIZE } from '../src/invitations/y2k/snakeModel.js';
const playing = () => ({ ...createSnake(), status: 'playing' });
test('Snake grows, scores and places food outside its body', () => {
  let game = playing();
  for (let i = 0; i < 4; i++) game = stepSnake(game, 'right', () => 0);
  assert.equal(game.score, 1);
  assert.equal(game.body.length, 4);
  assert.ok(!game.body.some(cell => cell.x === game.food.x && cell.y === game.food.y));
});
test('Snake blocks reverse moves and ends on its own body', () => {
  assert.equal(stepSnake(playing(), 'left').direction, 'right');
  const game = { ...playing(), body: [{x:2,y:2},{x:1,y:2},{x:1,y:1},{x:2,y:1},{x:3,y:1}], direction:'right' };
  assert.equal(stepSnake(game, 'up').status, 'over');
});
test('Snake can enter its vacating tail, and paused games do not move', () => {
  const game = { ...playing(), body: [{x:2,y:2},{x:1,y:2},{x:1,y:1},{x:2,y:1}], direction:'right' };
  assert.equal(stepSnake(game, 'up').status, 'playing');
  const paused = { ...game, status:'paused' };
  assert.equal(stepSnake(paused), paused);
  const full = Array.from({length:SNAKE_SIZE*SNAKE_SIZE},(_,i)=>({x:i%SNAKE_SIZE,y:Math.floor(i/SNAKE_SIZE)}));
  assert.equal(placeFood(full), null);
});

test('Snake wraps across all four edges without ending the game', () => {
  for (const [direction, head, expected] of [
    ['right', {x:17,y:9}, {x:0,y:9}],
    ['left', {x:0,y:9}, {x:17,y:9}],
    ['up', {x:9,y:0}, {x:9,y:17}],
    ['down', {x:9,y:17}, {x:9,y:0}],
  ]) {
    const next = stepSnake({ ...playing(), direction, body:[head] });
    assert.equal(next.status, 'playing');
    assert.deepEqual(next.body[0], expected);
  }
});
