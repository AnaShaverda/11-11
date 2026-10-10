import test from 'node:test';
import assert from 'node:assert/strict';
import { fitFontSize, textSlotHeight, flowContentBottom } from '../src/invitations/data/cardContentLayout.js';

test('a title reserves the next text field and a lower illustration', () => {
  assert.equal(textSlotHeight({ top: 10, left: 20, right: 80 }, [{ top: 40, left: 25, right: 75 }, { top: 60, left: 10, right: 90 }], 100), 27);
});
test('a side ornament does not consume a text field’s vertical room', () => {
  assert.equal(textSlotHeight({ top: 10, left: 10, right: 40 }, [{ top: 20, left: 60, right: 90 }], 100), 90);
});
test('type that fits retains its authored size', () => {
  assert.equal(fitFontSize(48, () => true), 48);
});
test('only the fitted field shrinks gradually until it fits', () => {
  const examined = [];
  const size = fitFontSize(48, next => { examined.push(next); return next <= 36; });
  assert.ok(size <= 36 && size > 34);
  assert.equal(examined[0], 48);
  assert.ok(examined.every((value, index) => index === 0 || value / examined[index - 1] > .969));
});

test('envelope compositions reserve clear paper without moving the assembly', () => {
  assert.equal(flowContentBottom('rose-letter', 640), 320);
  assert.equal(flowContentBottom('sweet-snapshot', 640), 179.20000000000002);
  assert.equal(flowContentBottom('default', 640), 614.4);
});
