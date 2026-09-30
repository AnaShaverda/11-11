import { useEffect, useState } from "react";

const storageKey = "eleven-eleven-intro-shown";

function shouldShowLoader() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    if (window.sessionStorage.getItem(storageKey)) return false;
  } catch {
    // The intro still works when storage is unavailable.
  }
  return true;
}

export default function SiteLoader() {
  const [visible, setVisible] = useState(shouldShowLoader);

  useEffect(() => {
    if (!visible) return undefined;
    try {
      window.sessionStorage.setItem(storageKey, "true");
    } catch {
      // Storage access is optional for this visual intro.
    }
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="site-loader-backdrop"
      role="status"
      aria-live="polite"
      aria-label="Feelings are loading. Please wait."
    >
      <div className="site-loader-window" aria-hidden="true">
        <div className="site-loader-titlebar">
          <span className="site-loader-heart">♥</span>
          <span>11:11</span>
          <span className="site-loader-close">×</span>
        </div>
        <div className="site-loader-body">
          <p className="site-loader-message">Feelings are loading....</p>
          <div className="site-loader-progress">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <p className="site-loader-wait">Please Wait...</p>
        </div>
      </div>
    </div>
  );
}
