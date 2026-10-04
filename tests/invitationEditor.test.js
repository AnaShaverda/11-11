import test from 'node:test';
import assert from 'node:assert/strict';
import { getEditorFieldGroups, getEditorFieldHelp, toDateInputValue } from '../src/invitations/data/editorFields.js';
import { getEditableCardFields } from '../src/invitations/data/guestCardText.js';
import { invitationTemplates } from '../src/invitations/data/templates.js';
import { invitationSamples } from '../src/invitations/data/invitationSamples.js';
import { guestCardCopy } from '../src/localization/guestCardCopy.js';
import { invitationEditorCopy } from '../src/localization/invitationEditorCopy.js';

test('forms expose every editable field once with localized explanations, while keeping metadata in extra wording', () => {
  assert.deepEqual(Object.keys(invitationEditorCopy.en).sort(), Object.keys(invitationEditorCopy.ka).sort());
  for (const template of invitationTemplates) for (const language of ['en', 'ka']) {
    const t = key => guestCardCopy[language][key] ?? key;
    const fields = getEditableCardFields(template, invitationSamples[template.slug], {}, t);
    const groups = getEditorFieldGroups(fields);
    const shown = groups.flatMap(group => group.fields);
    assert.equal(shown.length, fields.length, template.slug);
    assert.equal(new Set(shown.map(field => `${field.group}:${field.key}`)).size, fields.length, template.slug);
    for (const field of fields) assert.ok(!getEditorFieldHelp(field, t).startsWith('editor.help.'), `${template.slug}: ${field.key} ${language}`);
    assert.ok(groups.filter(group => !group.extra).flatMap(group => group.fields).every(field => field.aliases.length), template.slug);
  }
});

test('calendar controls recognize display dates in both languages and reject impossible dates', () => {
  assert.equal(toDateInputValue('18 JULY 2027'), '2027-07-18');
  assert.equal(toDateInputValue('12 SEP 2027 · 14:00'), '2027-09-12');
  assert.equal(toDateInputValue('18 ივლისი 2027'), '2027-07-18');
  assert.equal(toDateInputValue('2027-07-18'), '2027-07-18');
  assert.equal(toDateInputValue('31 FEBRUARY 2027'), '');
  assert.equal(toDateInputValue('2027-13-01'), '');
  assert.equal(toDateInputValue('Next Saturday'), '');
});
