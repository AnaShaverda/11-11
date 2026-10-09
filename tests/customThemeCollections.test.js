import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { canUploadCustomCover, customizableOccasions, getCustomThemes, getCustomThemeForOccasion, getClassicalTheme, getDetailsArtwork } from '../src/invitations/data/customClassicalThemes.js';
import { getCustomTemplate, customCategories } from '../src/invitations/data/customTemplates.js';

test('custom collections support weddings and christenings with distinct themes', () => {
  assert.deepEqual(customizableOccasions, ['wedding', 'christening']);
  const weddingIds = new Set(getCustomThemes('wedding').map(theme => theme.id));
  assert.equal(getCustomThemes('christening').length, 5);
  for (const occasion of customizableOccasions) for (const theme of getCustomThemes(occasion)) {
    assert.equal(theme.occasion, occasion);
    assert.equal(getClassicalTheme(theme.id).id, theme.id);
    if (occasion === 'christening') assert.ok(!weddingIds.has(theme.id));
    for (const asset of [theme.frameAsset, theme.ornamentAsset, getDetailsArtwork(theme.id)].filter(Boolean)) {
      assert.ok(existsSync(new URL(`../public${asset}`, import.meta.url)), asset);
    }
  }
});

test('switching occasions replaces incompatible saved themes with the right default', () => {
  assert.equal(getCustomThemeForOccasion('somethingBlue', 'christening').id, 'christeningBlueDove');
  assert.equal(getCustomThemeForOccasion('christeningBlueDove', 'wedding').id, 'somethingBlue');
  assert.equal(getCustomThemeForOccasion('christeningBlushGrace', 'christening').id, 'christeningBlushGrace');
});

test('removed wedding themes migrate saved drafts while portrait themes retain their styling', () => {
  const themes = getCustomThemes('wedding');
  for (const [removed, replacement] of [['gardenVeil', 'meadowMorning'], ['quietParchment', 'pearlLetter'], ['vellumPromise', 'pearlLetter'], ['champagneVows', 'pearlLetter']]) {
    assert.ok(!themes.some(theme => theme.id === removed));
    assert.equal(getCustomThemeForOccasion(removed, 'wedding').id, replacement);
    assert.equal(getClassicalTheme(removed).id, replacement);
    assert.equal(getDetailsArtwork(removed), getDetailsArtwork(replacement));
  }
  assert.equal(getClassicalTheme('forestClassic').id, 'meadowMorning');
  assert.equal(getClassicalTheme('sepia').id, 'pearlLetter');
  for (const id of ['couplePortrait', 'couplePortraitDark']) {
    const theme = getClassicalTheme(id);
    assert.equal(theme.color, '#efe9db');
    assert.equal(theme.frameShape, 'arch');
    assert.equal(theme.italic, true);
    assert.ok(existsSync(new URL(`../public${theme.frameAsset}`, import.meta.url)));
  }
});

test('kids catalog custom entry leads to Christening and other collections are excluded', () => {
  assert.equal(getCustomTemplate('baby-kids').subcategory, 'christening');
  assert.equal(getCustomTemplate('christening').subcategory, 'christening');
  assert.ok(!customCategories.includes('birthday'));
  assert.ok(!customCategories.includes('corporate'));
});

test('baby boy and girl themes both keep cover photos square and separate from titles', () => {
  const babies = getCustomThemes('christening').filter(theme => theme.squarePhoto);
  assert.deepEqual(babies.map(theme => theme.id), ['christeningBabyBoy', 'christeningBabyGirl']);
  assert.notEqual(babies[0].color, babies[1].color);
});

test('christening cover uploads are limited to the two baby photo themes', () => {
  assert.deepEqual(getCustomThemes('christening').filter(canUploadCustomCover).map(theme => theme.id), ['christeningBabyBoy', 'christeningBabyGirl']);
  assert.ok(getCustomThemes('wedding').every(canUploadCustomCover));
});
