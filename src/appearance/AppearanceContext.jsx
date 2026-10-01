import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppearanceContext = createContext(null);
const storageKey = "1111-theme";
export const appearances = ["dark", "light"];

function readAppearance() {
  try {
    const saved = localStorage.getItem(storageKey);
    return appearances.includes(saved) ? saved : "dark";
  } catch {
    return "dark";
  }
}

export function AppearanceProvider({ children }) {
  const [theme, setCurrentTheme] = useState(readAppearance);

  function setTheme(nextTheme) {
    if (!appearances.includes(nextTheme)) return;
    document.documentElement.dataset.theme = nextTheme;
    setCurrentTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      /* Storage may be unavailable. */
    }
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#edf1ff" : "#100f49");
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme]
  );
  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context)
    throw new Error("useAppearance must be used inside AppearanceProvider");
  return context;
}
