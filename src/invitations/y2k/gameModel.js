export const GAME_SECONDS = 30;
export const TRAY_WIDTH = 0.22;

export function createRound() {
  return { elapsed: 0, spawnAt: 0.25, nextId: 0, score: 0, discs: [] };
}

// Normalized coordinates keep the same physics on a phone and a wide desktop.
export function advanceRound(round, delta, trayX, random = Math.random) {
  const dt = Math.max(0, Math.min(delta, 0.05));
  const elapsed = Math.min(GAME_SECONDS, round.elapsed + dt);
  let spawnAt = round.spawnAt;
  let nextId = round.nextId;
  let score = round.score;
  const discs = [];
  for (const disc of round.discs) {
    const y = disc.y + dt * disc.speed;
    if (disc.y < 0.85 && y >= 0.85 && Math.abs(disc.x - trayX) <= TRAY_WIDTH / 2 + 0.025) {
      score += 1;
    } else if (y < 1.1) discs.push({ ...disc, y });
  }
  if (elapsed >= spawnAt && elapsed < GAME_SECONDS) {
    discs.push({ id: nextId++, x: 0.07 + random() * 0.86, y: -0.09, speed: 0.25 + elapsed * 0.003 });
    spawnAt = elapsed + Math.max(0.38, 0.75 - elapsed * 0.01);
  }
  return { elapsed, spawnAt, nextId, score, discs };
}

export const clampTray = x => Math.max(TRAY_WIDTH / 2, Math.min(1 - TRAY_WIDTH / 2, x));

export function makeMemoryDeck(random = Math.random) {
  const cards = ['heart', 'star', 'flower', 'moon', 'sparkle', 'sun'].flatMap((icon, pair) => [
    { id: pair * 2, icon, pair }, { id: pair * 2 + 1, icon, pair },
  ]);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
