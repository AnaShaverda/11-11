import { useEffect, useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { advanceRound, clampTray, createRound, GAME_SECONDS, makeMemoryDeck } from './gameModel.js';

const assets = '/images/birthday/y2k-experience/';

export function CDCatch({ t }) {
  const canvas = useRef(null);
  const area = useRef(null);
  const position = useRef(0.5);
  const direction = useRef(0);
  const round = useRef(createRound());
  const sprites = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('ready');
  const [hud, setHud] = useState({ score: 0, seconds: GAME_SECONDS });

  useEffect(() => {
    const img = new Image();
    img.onload = () => { sprites.current = img; setLoaded(true); };
    img.src = `${assets}cd-game-sprites.png`;
    return () => { img.onload = null; };
  }, []);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext('2d');
    let frame;
    let previous;
    let lastSecond = -1;
    let lastScore = -1;
    function paint(now) {
      const delta = previous === undefined ? 0 : (now - previous) / 1000;
      previous = now;
      if (status === 'playing') {
        position.current = clampTray(position.current + direction.current * Math.min(delta, 0.05) * 0.8);
        round.current = advanceRound(round.current, delta, position.current);
      }
      const game = round.current;
      const seconds = Math.ceil(GAME_SECONDS - game.elapsed);
      if (lastSecond !== seconds || lastScore !== game.score) {
        setHud({ score: game.score, seconds });
        lastSecond = seconds; lastScore = game.score;
      }
      ctx.clearRect(0, 0, c.width, c.height);
      const img = sprites.current;
      if (img) {
        // The generated sheet contains the disc at left and its matching tray at right.
        const sw = img.naturalWidth, sh = img.naturalHeight;
        const discs = status === 'ready' ? [{ x: 0.25, y: 0.25 }, { x: 0.7, y: 0.13 }, { x: 0.53, y: 0.55 }] : game.discs;
        for (const disc of discs) {
          ctx.drawImage(img, sw * 0.027, sh * 0.035, sw * 0.621, sh * 0.92,
            disc.x * c.width - 17, disc.y * c.height - 17, 34, 34);
        }
        ctx.drawImage(img, sw * 0.65, sh * 0.71, sw * 0.32, sh * 0.21,
          position.current * c.width - c.width * 0.11, c.height * 0.84, c.width * 0.22, c.height * 0.12);
      }
      if (status === 'playing' && seconds <= 0) { direction.current = 0; setStatus('finished'); return; }
      if (status === 'playing') frame = requestAnimationFrame(paint);
    }
    frame = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frame);
  }, [status, loaded]);

  useEffect(() => {
    if (status !== 'playing') return;
    const pause = () => { direction.current = 0; setStatus(s => s === 'playing' ? 'paused' : s); };
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', pause);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); });
    observer.observe(area.current);
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('blur', pause); observer.disconnect(); };
  }, [status]);

  function start() {
    if (status !== 'paused') { round.current = createRound(); position.current = 0.5; setHud({ score: 0, seconds: GAME_SECONDS }); }
    direction.current = 0; setStatus('playing'); area.current.focus({ preventScroll: true });
  }
  function move(event) {
    if (status !== 'playing' || (event.pointerType === 'mouse' && event.buttons !== 1)) return;
    const box = event.currentTarget.getBoundingClientRect();
    position.current = clampTray((event.clientX - box.left) / box.width);
  }
  return <div className="y2k-game-unit">
    <div className="y2k-console">
      <img className="y2k-console-shell" src={`${assets}violet-console.png`} alt="" aria-hidden="true" loading="lazy" width="1536" height="1024" />
      <div ref={area} className={`y2k-game-screen is-${status}`} tabIndex={0} role="group" aria-label={t('CD Catch game. Use left and right arrow keys, or drag to move.', 'CD Catch თამაში. იმოძრავე ისრის ღილაკებით ან თითის გასმით.')}
        onKeyDown={e => { if (status === 'playing' && ['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); direction.current = e.key === 'ArrowLeft' ? -1 : 1; } }}
        onKeyUp={e => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); direction.current = 0; } }}
        onBlur={() => { direction.current = 0; }}
        onPointerDown={e => { if (status === 'playing') { e.currentTarget.setPointerCapture(e.pointerId); move(e); } }} onPointerMove={move}>
        <div className="y2k-game-hud"><span>CD CATCH</span><span>{t('TIME', 'დრო')} {hud.seconds}</span></div>
        <canvas ref={canvas} width="600" height="360" aria-hidden="true" />
        <span className="y2k-game-score">{t('SCORE', 'ქულა')} {hud.score.toString().padStart(2, '0')}</span>
        {status !== 'playing' && <div className="y2k-game-overlay"><p>{status === 'finished' ? t('GOOD GAME!', 'კარგი თამაში!') : status === 'paused' ? t('PAUSED', 'პაუზა') : t('READY, PLAYER?', 'მზად ხარ?')}</p>{status === 'finished' && <span>{hud.score} {t('CDs collected', 'შეგროვებული CD')}</span>}<button className="y2k-button" disabled={!loaded} onClick={start}>{!loaded ? t('Loading…', 'იტვირთება…') : status === 'paused' ? t('Resume', 'გაგრძელება') : status === 'finished' ? t('Play again', 'თავიდან თამაში') : t('Start game', 'თამაშის დაწყება')}</button></div>}
      </div>
    </div>
    <div className="y2k-game-controls"><p id="y2k-game-instructions">{t('Drag to catch. Or use your arrow keys.', 'დაიჭირე თითის გასმით ან ისრის ღილაკებით.')}</p><span className="y2k-game-mobile-hud">{t('Score', 'ქულა')}: {hud.score} / {t('Time', 'დრო')}: {hud.seconds}</span>{status !== 'playing' && <button className="y2k-button y2k-game-mobile-start" disabled={!loaded} onClick={start}>{status === 'paused' ? t('Resume', 'გაგრძელება') : status === 'finished' ? t('Play again', 'თავიდან თამაში') : t('Start game', 'თამაშის დაწყება')}</button>}<button className="y2k-icon-button" disabled={status !== 'playing'} onClick={() => { direction.current = 0; setStatus('paused'); }} aria-label={t('Pause game', 'თამაშის დაპაუზება')}><InvitationArtwork name="pause" /></button></div>
    <p className="y2k-sr-only" role="status">{status === 'finished' ? t(`Game over. You caught ${hud.score} CDs.`, `თამაში დასრულდა. დაიჭირე ${hud.score} CD.`) : status === 'paused' ? t('Game paused.', 'თამაში დაპაუზებულია.') : ''}</p>
  </div>;
}

export function MemoryMatch({ t }) {
  const [deck, setDeck] = useState(makeMemoryDeck);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const complete = matched.length === 6;
  function flip(card) {
    if (open.length === 2 || open.includes(card.id) || matched.includes(card.pair)) return;
    const next = [...open, card.id];
    setOpen(next);
    if (next.length === 2) {
      setMoves(v => v + 1);
      if (deck.find(item => item.id === next[0]).pair === card.pair) { setMatched(v => [...v, card.pair]); setOpen([]); }
      else timer.current = setTimeout(() => setOpen([]), 900);
    }
  }
  function restart() { clearTimeout(timer.current); setDeck(makeMemoryDeck()); setOpen([]); setMatched([]); setMoves(0); }
  return <div className="y2k-memory"><div className="y2k-memory-status"><span>MEMORY.MATCH</span><span>{moves} {t('moves', 'სვლა')}</span></div><div className="y2k-memory-grid">{deck.map((card, index) => {
    const visible = open.includes(card.id) || matched.includes(card.pair);
    return <button key={card.id} className={`y2k-memory-card ${visible ? 'is-flipped' : ''} ${matched.includes(card.pair) ? 'is-matched' : ''}`} onClick={() => flip(card)} disabled={matched.includes(card.pair)} aria-label={visible ? t(`${card.icon}, card ${index + 1}`, `${card.icon}, ბარათი ${index + 1}`) : t(`Reveal card ${index + 1}`, `გახსენი ბარათი ${index + 1}`)} aria-pressed={visible}>{visible ? <InvitationArtwork name={card.icon} size={35} /> : <span className="y2k-card-back">11:11</span>}</button>;
  })}</div><div className="y2k-memory-bottom"><p role="status">{complete ? t('All matched. Best friends forever.', 'ყველა წყვილი ნაპოვნია. მეგობრები სამუდამოდ.') : t(`${matched.length} / 6 pairs found`, `${matched.length} / 6 წყვილი ნაპოვნია`)}</p><button className="y2k-button y2k-button-small" onClick={restart}>{t('New game', 'ახალი თამაში')}</button></div></div>;
}
