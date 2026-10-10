import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// One phone and mobile viewport for the gallery and the live invitation form.
export default function InvitationPhone({ src, title = "Mobile invitation preview", className = "", resetKey, documentRef, children }) {
  const display = useRef(null);
  const [scale, setScale] = useState(1);
  const frame = useRef(null);
  useEffect(() => { frame.current?.contentWindow?.scrollTo(0, 0); }, [resetKey]);
  const [body, setBody] = useState(null);
  useEffect(() => {
    const element = display.current;
    const update = () => setScale(element.clientWidth / 390);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const prepare = event => {
    const doc = event.currentTarget.contentDocument;
    if (documentRef) documentRef.current = doc;
    if (!src) doc.head.replaceChildren(...Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'), node => node.cloneNode(true)));
    const style = doc.createElement("style");
    style.textContent = "html,body{margin:0;padding:0;min-width:0}body{overflow-x:hidden}html,body,*{scrollbar-width:none}*::-webkit-scrollbar{display:none;width:0;height:0}.guest-card-suite .guest-nav{display:none}";
    doc.head.append(style);
    if (!src) setBody(doc.body);
  };
  return <div className={`custom-design-phone-screen ${className}`}>
    <span className="custom-design-phone-button custom-design-phone-action" aria-hidden="true" />
    <span className="custom-design-phone-button custom-design-phone-volume" aria-hidden="true" />
    <span className="custom-design-phone-button custom-design-phone-power" aria-hidden="true" />
    <div className="custom-design-phone-display" ref={display}>
      <iframe ref={frame} className="custom-design-experience-frame" title={title} src={src} srcDoc={src ? undefined : "<!doctype html><html><head></head><body></body></html>"} onLoad={prepare} style={{ width: 390, height: 844, transform: `scale(${scale})` }}>{body && createPortal(children, body)}</iframe>
    </div>
  </div>;
}
