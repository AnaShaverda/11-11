import { useEffect, useRef, useState } from "react";
import InvitationArtwork from "./InvitationArtwork.jsx";

export default function IceCatchGame({ artwork, language, storageKey }) {
  const ka = language === "ka";
  const arena = useRef(null);
  const engine = useRef({ x: .5, cubes: [], elapsed: 0, spawn: 0, score: 0, id: 0 });
  const keys = useRef(new Set());
  const [phase, setPhase] = useState("ready");
  const [view, setView] = useState({ x: .5, cubes: [], time: 25, score: 0, flash: 0 });
  const [best, setBest] = useState(() => { try { return Number(localStorage.getItem(storageKey)) || 0; } catch { return 0; } });
  useEffect(() => {
    if (phase !== "playing") return;
    let frame, previous, render = 0;
    const tick = (now) => {
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      const e = engine.current;
      const rect = arena.current?.getBoundingClientRect();
      if (!rect) return;
      e.elapsed += dt;
      e.spawn += dt;
      if (keys.current.has("ArrowLeft") || keys.current.has("a")) e.x -= dt * .7;
      if (keys.current.has("ArrowRight") || keys.current.has("d")) e.x += dt * .7;
      e.x = Math.max(.13, Math.min(.87, e.x));
      if (e.spawn > .62) { e.spawn = 0; e.cubes.push({ id: e.id++, x: .1 + Math.random() * .8, y: -.08, speed: .22 + Math.random() * .08, angle: Math.random() * 50 - 25 }); }
      const rim = 1 - 104 / rect.height;
      e.cubes = e.cubes.filter(c => {
        const old = c.y;
        c.y += dt * c.speed;
        if (old < rim && c.y >= rim && Math.abs(c.x - e.x) < 48 / rect.width) { e.score++; e.flash = e.elapsed; return false; }
        return c.y < 1.1;
      });
      if (now - render > 30 || e.elapsed >= 25) {
        render = now;
        setView({ x: e.x, cubes: e.cubes.map(c => ({...c})), time: Math.max(0, Math.ceil(25 - e.elapsed)), score: e.score, flash: e.elapsed - (e.flash ?? -1) < .25 ? e.score : 0 });
      }
      if (e.elapsed >= 25) {
        setBest(b => { const next = Math.max(b, e.score); try { localStorage.setItem(storageKey, String(next)); } catch { /* Private browsing. */ } return next; });
        setView(v => ({ ...v, flash: 0 }));
        setPhase("done");
      } else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const hide = () => { if (document.hidden) setPhase("paused"); };
    document.addEventListener("visibilitychange", hide);
    return () => { cancelAnimationFrame(frame); keys.current.clear(); document.removeEventListener("visibilitychange", hide); };
  }, [phase, storageKey]);
  const start = () => { engine.current = { x: .5, cubes: [], elapsed: 0, spawn: .5, score: 0, id: 0 }; setView({ x:.5, cubes:[],time:25,score:0,flash:0 }); setPhase("playing"); arena.current?.focus({preventScroll:true}); };
  const move = (event) => { if (phase !== "playing") return; const rect = arena.current.getBoundingClientRect(); engine.current.x = Math.max(.13, Math.min(.87, (event.clientX - rect.left) / rect.width)); };
  return <div className="ice-game">
    <div className="ice-hud"><span>{ka ? "დაჭერილია" : "Caught"} <b>{view.score}</b></span><span>{view.time}{ka ? " წმ" : "s"}</span><span>{ka ? "რეკორდი" : "Best"} <b>{best}</b></span></div>
    <div ref={arena} className={`ice-arena ${view.flash ? "ice-caught" : ""}`} role="application" aria-label={ka ? "ყინულის დაჭერა — ისრებით ან თითით ამოძრავე ჭიქა" : "Ice catcher — move the glass with arrow keys or your pointer"} tabIndex={0}
      onPointerDown={e => { if (phase === "playing") { e.currentTarget.setPointerCapture(e.pointerId); move(e); } }} onPointerMove={move}
      onKeyDown={e => { if (["ArrowLeft","ArrowRight","a","d"].includes(e.key)) { e.preventDefault(); keys.current.add(e.key); } }} onKeyUp={e=>keys.current.delete(e.key)} onBlur={()=>keys.current.clear()}>
      {view.cubes.map(c => <img key={c.id} className="falling-ice" src="/images/bridal/cocktail-play/ice-cube.png" alt="" draggable="false" style={{left:`${c.x*100}%`,top:`${c.y*100}%`,transform:`translate(-50%,-50%) rotate(${c.angle}deg)`}}/>)}
      <div className="ice-glass" style={{left:`${view.x*100}%`}}><img src={artwork} alt="" draggable="false"/>{view.flash > 0 && <span key={view.flash} className="ice-plus">+1</span>}</div>
      {phase !== "playing" && <div className="ice-game-overlay"><h3>{phase === "done" ? (ka ? `${view.score} ყინული დაიჭირე!` : `${view.score} cubes. So cool!`) : phase === "paused" ? (ka ? "ცოტა შესვენება" : "A little pause") : (ka ? "ყინულის წვიმა!" : "Ice, ice, party!")}</h3><p>{ka ? "ამოძრავე ჭიქა და დაიჭირე ყინული. გაქვს 25 წამი!" : "Move your glass. Catch the falling ice. You have 25 seconds!"}</p><button onClick={phase === "paused" ? ()=>setPhase("playing") : start}>{phase === "paused" ? (ka ? "გაგრძელება" : "Resume") : phase === "done" ? (ka ? "კიდევ ერთხელ" : "Play again") : (ka ? "ვითამაშოთ" : "Let’s play")}</button></div>}
    </div>
    <div className="ice-controls"><button aria-label={ka ? "ჭიქა მარცხნივ" : "Move glass left"} onClick={()=>engine.current.x=Math.max(.13,engine.current.x-.12)}><InvitationArtwork name="arrow-left" size={20} /></button><p>{ka ? "გაუსვი თითი · ამოძრავე მაუსი · გამოიყენე ისრის ღილაკები" : "Swipe · move your mouse · use arrow keys"}</p><button aria-label={ka ? "ჭიქა მარჯვნივ" : "Move glass right"} onClick={()=>engine.current.x=Math.min(.87,engine.current.x+.12)}><InvitationArtwork name="arrow-right" size={20} /></button>{(phase === "playing" || phase === "paused") && <button onClick={()=>setPhase(phase === "playing" ? "paused" : "playing")}>{phase === "playing" ? (ka ? "პაუზა" : "Pause") : (ka ? "გაგრძელება" : "Resume")}</button>}</div>
    <p className="sr-only" role="status">{phase === "done" ? `${ka ? "შედეგი" : "Final score"}: ${view.score}` : ""}</p>
  </div>;
}
