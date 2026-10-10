import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceRound, clampTray, createRound, GAME_SECONDS, makeMemoryDeck } from '../src/invitations/y2k/gameModel.js';

test('a crossing disc scores once only when it overlaps the tray', () => {
  const state = { ...createRound(), spawnAt: 99, discs: [
    { id: 0, x: 0.5, y: 0.849, speed: 0.3 },
    { id: 1, x: 0.9, y: 0.849, speed: 0.3 },
  ] };
  const caught = advanceRound(state, 0.02, 0.5);
  assert.equal(caught.score, 1);
  assert.equal(caught.discs.length, 1);
  assert.equal(advanceRound(caught, 0.02, 0.5).score, 1);
});

test('tab stalls cannot skip the game and rounds stop at thirty seconds', () => {
  assert.equal(advanceRound(createRound(), 10, 0.5).elapsed, 0.05);
  const final = advanceRound({ ...createRound(), elapsed: 29.99 }, 0.05, 0.5);
  assert.equal(final.elapsed, GAME_SECONDS);
  assert.equal(final.discs.length, 0);
});

test('catcher stays inside both screen edges', () => {
  assert.equal(clampTray(-1), 0.11);
  assert.equal(clampTray(5), 0.89);
});

test('memory deck has six exact pairs and unique card identities', () => {
  const deck = makeMemoryDeck(() => 0.4);
  assert.equal(deck.length, 12);
  assert.equal(new Set(deck.map(card => card.id)).size, 12);
  for (let pair = 0; pair < 6; pair++) assert.equal(deck.filter(card => card.pair === pair).length, 2);
});
