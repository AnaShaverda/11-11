import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { draftStorageKey, getDemoDraft, normalizeDraft, readDrafts } from "./data/eventDrafts.js";

const EventDraftContext = createContext(null);

export default function EventDraftLayout() {
  const [drafts, setDrafts] = useState(() => {
    try { return readDrafts(window.sessionStorage); } catch { return {}; }
  });
  useEffect(() => {
    try { sessionStorage.setItem(draftStorageKey, JSON.stringify(drafts)); } catch { /* Draft remains usable in memory if storage is unavailable. */ }
  }, [drafts]);
  function updateDraft(eventId, update) {
    setDrafts((previous) => {
      const current = previous[eventId] ?? getDemoDraft(eventId);
      if (!current) return previous;
      const next = normalizeDraft(update(current));
      return next ? { ...previous, [eventId]: next } : previous;
    });
  }
  return <EventDraftContext.Provider value={{ getDraft: (id) => drafts[id] ?? getDemoDraft(id), updateDraft }}><Outlet /></EventDraftContext.Provider>;
}

export function useEventDrafts() { return useContext(EventDraftContext); }
