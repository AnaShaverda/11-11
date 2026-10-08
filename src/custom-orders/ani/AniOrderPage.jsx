import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AniExperience from "./App.jsx";
import orderStyles from "./index.css?inline";
import cakeStyles from "./cake.css?inline";

export default function AniOrderPage() {
  const [host, setHost] = useState(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (!host) return;
    const root = host.shadowRoot || host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `${orderStyles}\n${cakeStyles}`;
    root.append(style);
    setShadowRoot(root);
    return () => {
      style.remove();
      setShadowRoot(null);
    };
  }, [host]);

  return (
    <div ref={setHost}>
      {shadowRoot && createPortal(<AniExperience />, shadowRoot)}
    </div>
  );
}
