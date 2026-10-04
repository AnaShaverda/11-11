// A field can consume the clear space before the next authored text or ornament.
// Side-by-side objects do not reduce its vertical space.
export function textSlotHeight(rect, blockers, cardBottom, gap = 3) {
  const below = blockers.filter(other => other.top > rect.top + 1
    && other.left < rect.right - gap && other.right > rect.left + gap);
  return Math.max(1, Math.min(cardBottom, ...below.map(other => other.top - gap)) - rect.top);
}

export function fitFontSize(size, fits, minimum = size * .08) {
  let next = size;
  while (!fits(next) && next > minimum) next = Math.max(minimum, next * .97);
  return next;
}

// These text areas sit above assembled envelopes. Keep the assembly intact;
// only reserve the clear paper above it, without moving the copy or artwork.
export function flowContentBottom(visual, cardHeight) {
  if (['rose-letter', 'sage-letter'].includes(visual)) return cardHeight * .50;
  if (visual === 'sweet-snapshot') return cardHeight * .28;
  return cardHeight * .96;
}
