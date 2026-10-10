import test from 'node:test';
import assert from 'node:assert/strict';
import { addCollected, isOnTarget, swingPosition, WEB_GOAL } from '../src/invitations/spider-party/gameModel.js';

test('swing stays inside the track and begins at a fair release point', () => {
  assert.equal(swingPosition(0), 50);
  for (let ms = 0; ms < 30000; ms += 17) {
    assert.ok(swingPosition(ms) >= 7 && swingPosition(ms) <= 93);
  }
  assert.equal(isOnTarget(32), true);
  assert.equal(isOnTarget(68), true);
  assert.equal(isOnTarget(31.9), false);
  assert.equal(isOnTarget(68.1), false);
});

test('repeated collection cannot inflate the score or mutate prior state', () => {
  const first = addCollected([], 2);
  assert.deepEqual(first, [2]);
  assert.equal(addCollected(first, 2), first);
  assert.deepEqual(addCollected(first, 4), [2, 4]);
  assert.deepEqual(first, [2]);
  assert.equal(Array.from({ length: WEB_GOAL }, (_, id) => id).reduce(addCollected, []).length, 6);
});
