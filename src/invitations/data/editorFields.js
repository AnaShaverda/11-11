export function getEditorFieldHelp(field, t) {
  const key = field.group === 'notes' ? 'notePrompt' : field.group === 'plan' && field.key === 'title' ? 'planTitle' : field.group === 'translations'
    ? field.key.startsWith('guestCards.') ? 'section' : 'wording'
    : ({ posterName: 'name', posterAge: 'age' }[field.key] ?? field.key);
  return t(`editor.help.${key}`);
}

export function getEditorFieldGroups(fields) {
  const personal = ['posterName', 'name', 'posterAge', 'age', 'title'];
  const event = ['date', 'time', 'location'];
  const main = fields.filter(field => field.group === 'fields' && field.aliases?.length !== 0);
  return [
    { title: 'editor.who', fields: personal.flatMap(key => main.filter(field => field.key === key)) },
    { title: 'editor.when', fields: event.flatMap(key => main.filter(field => field.key === key)) },
    { title: 'editor.words', fields: main.filter(field => !personal.includes(field.key) && !event.includes(field.key)) },
    { title: 'editor.moreWords', extra: true, fields: fields.filter(field => field.group === 'translations' || field.aliases?.length === 0) },
  ].filter(group => group.fields.length);
}

const dateMonths = new Map();
for (const locale of ['en-GB', 'ka-GE']) for (let month = 0; month < 12; month++) {
  for (const width of ['long', 'short']) {
    const name = new Intl.DateTimeFormat(locale, { month: width }).format(new Date(2027, month, 1));
    const normalized = name.toLocaleLowerCase().replace(/\./g, '');
    dateMonths.set(normalized, month + 1);
    if (locale === 'en-GB') dateMonths.set(normalized.slice(0, 3), month + 1);
  }
}

export function toDateInputValue(value) {
  const date = value.split('·')[0].trim();
  const iso = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const written = date.toLocaleLowerCase().replace(/[.,]/g, '').match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  const parts = iso ? [Number(iso[1]), Number(iso[2]), Number(iso[3])]
    : written && dateMonths.has(written[2]) ? [Number(written[3]), dateMonths.get(written[2]), Number(written[1])] : null;
  if (!parts) return '';
  const [year, month, day] = parts;
  const check = new Date(year, month - 1, day);
  if (check.getFullYear() !== year || check.getMonth() !== month - 1 || check.getDate() !== day) return '';
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
