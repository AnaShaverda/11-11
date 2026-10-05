import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitialOccasion, getOccasionWording, occasionOptions } from '../src/invitations/data/customOccasions.js';
import { defaultMoments, getMomentPresets, normalizeMoments, sortMomentsByTime } from '../src/invitations/data/customMoments.js';

test('All requires an occasion, while a category route takes precedence over an unrelated saved choice', () => {
  assert.equal(getInitialOccasion('all'), '');
  assert.equal(getInitialOccasion('all', 'christening'), 'christening');
  assert.equal(getInitialOccasion('all', 'unknown'), '');
  assert.equal(getInitialOccasion('wedding', 'birthday'), 'wedding');
  assert.equal(getInitialOccasion('baby-kids', 'christening'), 'christening');
});

test('Wedding and christening have distinct bilingual day plans', () => {
  const wedding = getMomentPresets('wedding');
  assert.ok(wedding.some(([, en, ka]) => en === 'Church wedding' && ka === 'ჯვრისწერა'));
  assert.ok(wedding.some(([, en, ka]) => en === 'Civil marriage registration' && ka === 'ხელმოწერა'));
  assert.ok(wedding.some(([, en, ka]) => en === 'Wedding ceremony' && ka === 'ცერემონია'));
  assert.ok(wedding.some(([, en, ka]) => en === 'Wedding reception' && ka === 'დარბაზი'));
  assert.deepEqual(defaultMoments('wedding').map(item => item.id), ['ceremony', 'reception']);
  assert.equal(defaultMoments('christening')[0].id, 'baptism');
  assert.ok(getMomentPresets('christening').every(([, en]) => !en.includes('Wedding')));
});

test('All occasion choices have readable questions in both languages and relevant invitation wording', () => {
  for (const option of occasionOptions) {
    for (const language of ['en', 'ka']) {
      assert.ok(option.titleLabel[language]);
      assert.ok(option.dateLabel[language]);
      assert.ok(option.momentsQuestion[language]);
      const wording = getOccasionWording(option.id, language);
      assert.ok(wording.headlines.length >= 2);
      if (option.id !== 'wedding') assert.ok(!wording.headlines.includes(language === 'ka' ? 'ჩვენ ვქორწინდებით!' : 'We are getting married!'));
    }
  }
});

test('Switching occasion normalization preserves custom event details rather than replacing them with defaults', () => {
  const original = { id: 'custom-venue', en: 'Welcome drinks', ka: 'მისალმება', time: '18:15', venue: 'Garden', mapUrl: 'https://maps.google.com/example', unknownTime: false };
  assert.deepEqual(normalizeMoments([original], 'wedding'), [original]);
  assert.deepEqual(normalizeMoments([], 'birthday'), []);
});

test('Guest cards sort by actual time while preserving creation order for ties and unknown times', () => {
  const moments = [
    { id: 'dinner', time: '19:00' }, { id: 'unknown', time: '' },
    { id: 'ceremony', time: '12:00' }, { id: 'photos', time: '12:00' },
    { id: 'unconfirmed', time: '09:00', unknownTime: true },
    { id: 'midnight', time: '00:00' },
  ];
  const original = moments.map(item => item.id);
  assert.deepEqual(sortMomentsByTime(moments).map(item => item.id), ['midnight', 'ceremony', 'photos', 'dinner', 'unknown', 'unconfirmed']);
  assert.deepEqual(moments.map(item => item.id), original);
});
