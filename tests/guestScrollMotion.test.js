import test from 'node:test';
import assert from 'node:assert/strict';
import { getGuestSectionMotion } from '../src/invitations/data/guestScrollMotion.js';

test('screens reveal from transparent and stay visible when scrolling past', () => {
  const height = 834, viewport = 900;
  assert.equal(getGuestSectionMotion(900,height,viewport).opacity,0);
  const center = getGuestSectionMotion(66,height,viewport);
  assert.equal(center.opacity,1); assert.equal(center.y,0); assert.equal(center.scale,1);
  assert.equal(getGuestSectionMotion(-height+66,height,viewport).opacity,1);
});
test('animation follows position and reverses when scrolling back', () => {
  const positions=[900,800,700,500,66,500,700,800,900];
  const values=positions.map(top=>getGuestSectionMotion(top,834,900));
  assert.ok(values[1].opacity>0 && values[1].opacity<values[2].opacity);
  assert.ok(values[1].y>values[2].y);
  assert.ok(values[1].parallax!==values[2].parallax);
  for(let i=0;i<4;i++)assert.deepEqual(values[i],values[8-i]);
});
test('focused forms stay fully visible even near the edge of the viewport', () => {
  const motion=getGuestSectionMotion(800,2000,900,true);
  assert.equal(motion.opacity,1); assert.equal(motion.y,0); assert.equal(motion.scale,1); assert.equal(motion.parallax,0);
});

test('cards keep their natural position with a small entry movement', async () => {
  const {getGuestSlideshowMotion}=await import('../src/invitations/data/guestScrollMotion.js');
  const start=getGuestSlideshowMotion(900,834,900,1440);
  const enter=getGuestSlideshowMotion(650,834,900,1440);
  const center=getGuestSlideshowMotion(66,834,900,1440);
  assert.equal(start.opacity,0); assert.equal(enter.x,0);assert.equal(center.opacity,1);
  assert.ok(enter.y>=0 && enter.y<=12);
  assert.equal(getGuestSlideshowMotion(100,2000,900,1440).x,0);
});
test('gallery, event details, and forms have distinct restrained treatments', async () => {
  const {getGuestSlideshowMotion}=await import('../src/invitations/data/guestScrollMotion.js');
  const gallery=getGuestSlideshowMotion(650,834,900,1440,false,'gallery');
  const form=getGuestSlideshowMotion(650,834,900,1440,false,'notes');
  const event=getGuestSlideshowMotion(650,834,900,1440,false,'event');
  assert.ok(gallery.scale>1);assert.equal(form.scale,1);assert.equal(form.parallax,0);
  assert.ok(event.detailY>event.y);assert.ok(event.detailOpacity<event.opacity);
  const focused=getGuestSlideshowMotion(650,834,900,1440,true,'notes');
  assert.equal(focused.opacity,1);assert.equal(focused.y,0);assert.equal(focused.scale,1);
});

test('revealed cards never fade out when returning to an earlier scroll position', async () => {
  const {getGuestSlideshowMotion}=await import('../src/invitations/data/guestScrollMotion.js');
  for (const kind of ['gallery', 'event', 'notes', 'rsvp']) {
    const revealed=getGuestSlideshowMotion(66,834,900,1440,false,kind);
    const returned=getGuestSlideshowMotion(850,834,900,1440,false,kind,revealed.progress);
    const passed=getGuestSlideshowMotion(-800,834,900,1440,false,kind,revealed.progress);
    for (const motion of [returned,passed]) {
      assert.equal(motion.opacity,1);assert.equal(motion.detailOpacity,1);
      assert.equal(motion.y,0);assert.equal(motion.scale,1);
    }
  }
});
