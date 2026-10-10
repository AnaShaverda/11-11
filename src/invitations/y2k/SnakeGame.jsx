import { useLanguage } from "../../localization/LanguageContext.jsx";
import { captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from 'react';
import { createSnake, stepSnake, SNAKE_SIZE } from './snakeModel.js';

const keyDirections = { ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left', w: 'up', d: 'right', s: 'down', a: 'left' };
export default function SnakeGame({ t }) {
 const { language } = useLanguage();

  const [game, setGame] = useState(createSnake);
  const board = useRef(null);
  const nextDirection = useRef(null);
  const touch = useRef(null);
  const playing = game.status === 'playing';
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => { const requested = nextDirection.current; nextDirection.current = null; setGame(previous => stepSnake(previous, requested || previous.direction)); }, 170);
    const pause = () => setGame(previous => previous.status === 'playing' ? { ...previous, status: 'paused' } : previous);
    const visibility = () => { if (document.hidden) pause(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); });
    observer.observe(board.current);
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', visibility);
    return () => { clearInterval(timer); observer.disconnect(); window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', visibility); };
  }, [playing]);
  function turn(direction) { if (playing && !nextDirection.current) nextDirection.current = direction; }
  function start() {
    nextDirection.current = null;
    setGame(previous => ({ ...(previous.status === 'paused' ? previous : createSnake()), status: 'playing' }));
    board.current.focus({ preventScroll: true });
  }
  return <div className="y2k-snake">
    <div className="y2k-snake-hud"><span>SNAKE.EXE</span><span>{captionValue("invitations.y2k.SnakeGame.caption1", language)}: {game.score}</span></div>
    <div ref={board} className="y2k-snake-board" tabIndex={0} role="group" aria-label={captionValue("invitations.y2k.SnakeGame.caption2", language)}
      onKeyDown={event => { if (keyDirections[event.key]) { if (playing) event.preventDefault(); turn(keyDirections[event.key]); } else if (event.key === ' ' && playing) { event.preventDefault(); setGame(previous => ({ ...previous, status: 'paused' })); } }}
      onPointerDown={event => { if (playing) { touch.current = [event.clientX, event.clientY]; event.currentTarget.setPointerCapture(event.pointerId); } }}
      onPointerUp={event => { if (!touch.current) return; const dx = event.clientX - touch.current[0], dy = event.clientY - touch.current[1]; if (Math.max(Math.abs(dx), Math.abs(dy)) > 12) turn(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up'); touch.current = null; }} onPointerCancel={() => { touch.current = null; }}>
      <svg viewBox={`0 0 ${SNAKE_SIZE} ${SNAKE_SIZE}`} aria-hidden="true">{game.body.map((cell, i) => <rect key={`${cell.x}-${cell.y}`} x={cell.x + .08} y={cell.y + .08} width=".84" height=".84" rx=".14" fill={i === 0 ? '#652332' : '#986b89'} />)}{game.food && <circle cx={game.food.x + .5} cy={game.food.y + .5} r=".34" fill="#c64975" />}</svg>
      {!playing && <div className="y2k-snake-overlay"><strong>{game.status === 'ready' ? captionValue("invitations.y2k.SnakeGame.caption3", language) : game.status === 'paused' ? captionValue("invitations.y2k.SnakeGame.caption4", language) : game.status === 'won' ? captionValue("invitations.y2k.SnakeGame.caption5", language) : captionValue("invitations.y2k.SnakeGame.caption6", language)}</strong><p>{game.status === 'over' || game.status === 'won' ? captionValue("ui.invitations.y2k.SnakeGame.yourScore", language, { value1: game.score }) : captionValue("invitations.y2k.SnakeGame.caption7", language)}</p><button className="y2k-button" onClick={start}>{game.status === 'paused' ? captionValue("invitations.y2k.SnakeGame.caption8", language) : game.status === 'ready' ? captionValue("invitations.y2k.SnakeGame.caption9", language) : captionValue("invitations.y2k.SnakeGame.caption10", language)}</button></div>}
    </div>
    <p className="y2k-sr-only" role="status">{game.status === 'over' ? captionValue("ui.invitations.y2k.SnakeGame.gameOverScore", language, { value1: game.score }) : game.status === 'paused' ? captionValue("invitations.y2k.SnakeGame.caption11", language) : ''}</p>
  </div>;
}
