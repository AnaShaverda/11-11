import { useLayoutEffect, useRef, useState } from "react";

/** Fit authored content inside one viewport, including short landscape screens. */
export default function FullscreenChapter({ children, chrome, className = "", contentClassName = "", ...props }) {
 const section = useRef(null);
 const content = useRef(null);
 const [scale, setScale] = useState(1);
 useLayoutEffect(() => {
  let frame;
  const measure = () => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    if (!section.current || !content.current) return;
    const style = getComputedStyle(section.current);
    const available = section.current.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const natural = content.current.offsetHeight;
    setScale(Math.min(1, available / Math.max(1, natural)));
   });
  };
  const resize = new ResizeObserver(measure);
  resize.observe(section.current); resize.observe(content.current);
  const visible = new IntersectionObserver(entries => {
   entries.forEach(entry => section.current?.setAttribute("data-visible", String(entry.isIntersecting)));
  }, { threshold: .12 });
  visible.observe(section.current);
  document.fonts.ready.then(measure);
  return () => { cancelAnimationFrame(frame); resize.disconnect(); visible.disconnect(); };
 }, []);
 return <section {...props} ref={section} className={`${className} doodles-fullscreen`}>
  {chrome}<div ref={content} className={`doodles-screen-content ${contentClassName}`} style={{ "--chapter-scale": scale }}>{children}</div>
 </section>;
}
