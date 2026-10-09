import { useEffect, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const stars = [
  [8,18,17,.1], [19,56,8,.7], [31,12,11,1.1], [71,21,9,.4],
  [89,13,18,1.4], [92,62,11,.9], [76,75,7,1.7],
];

export default function SiteLoader({ pending = false }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState("loading");
  useEffect(() => {
    if (pending) return;
    const abort = new AbortController();
    let fadeTimer;
    let finishTimer;
    let minimumTimer;
    let cancelled = false;
    const minimum = new Promise(resolve => { minimumTimer = setTimeout(resolve, 450); });
    const frame = requestAnimationFrame(async () => {
      const images = [...document.images].filter(img => {
        const rect = img.getBoundingClientRect();
        return !img.closest('.site-loader-backdrop') && img.loading !== 'lazy' && rect.width > 0 && rect.bottom > 0 && rect.top < innerHeight;
      });
      const resources = Promise.allSettled([
        document.fonts?.ready,
        ...images.map(img => img.complete ? img.decode().catch(() => {}) : new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true, signal: abort.signal });
          img.addEventListener('error', resolve, { once: true, signal: abort.signal });
        })),
      ]);
      const timeout = new Promise(resolve => { finishTimer = setTimeout(resolve, 6000); });
      await Promise.all([minimum, Promise.race([resources, timeout])]);
      if (cancelled) return;
      clearTimeout(finishTimer);
      setPhase('leaving');
      fadeTimer = setTimeout(() => setPhase('hidden'), 220);
    });
    return () => {
      cancelled = true;
      abort.abort();
      cancelAnimationFrame(frame);
      clearTimeout(minimumTimer);
      clearTimeout(finishTimer);
      clearTimeout(fadeTimer);
    };
  }, [pending]);

  if (!pending && phase === 'hidden') return null;
  return <div className={`site-loader-backdrop${!pending && phase === 'leaving' ? ' is-leaving' : ''}`} role="status" aria-live="polite" aria-label={t('loader.status')}>
    <span className="boot-glow" aria-hidden="true" />
    {stars.map(([x,y,size,delay]) => <span key={x} className="boot-star" style={{'--x':`${x}%`,'--y':`${y}%`,'--size':`${size}px`,'--delay':`${delay}s`}} aria-hidden="true" />)}
    <img className="boot-logo" src="/logos/logo-pink-star.svg" width="1330" height="1112" alt="11:11" />
  </div>;
}
