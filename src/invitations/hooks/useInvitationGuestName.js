import { useCallback, useSyncExternalStore } from "react";

const names = new Map();
const listeners = new Map();
const keyFor = scope => `1111-guest-name-v1:${scope}`;

// Separate invitations keep separate identities; forms within one share a draft.
export default function useInvitationGuestName(scope, initialName = "") {
  if (!names.has(scope)) {
    let name = initialName;
    try { name = localStorage.getItem(keyFor(scope)) ?? initialName; } catch { /* Storage is optional. */ }
    names.set(scope, typeof name === "string" ? name.slice(0, 80) : "");
  }
  const subscribe = useCallback(listener => {
    if (!listeners.has(scope)) listeners.set(scope, new Set());
    listeners.get(scope).add(listener);
    return () => listeners.get(scope)?.delete(listener);
  }, [scope]);
  const snapshot = useCallback(() => names.get(scope) ?? "", [scope]);
  const name = useSyncExternalStore(subscribe, snapshot, snapshot);
  const setName = useCallback(value => {
    const next = String(value).slice(0, 80);
    if (next === names.get(scope)) return;
    names.set(scope, next);
    try { localStorage.setItem(keyFor(scope), next); } catch { /* Keep the draft in memory. */ }
    listeners.get(scope)?.forEach(listener => listener());
  }, [scope]);
  return [name, setName];
}
