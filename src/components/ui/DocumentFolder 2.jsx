import { useId } from "react";

/** Folded paper and translucent folder, drawn as a scalable vector. */
export default function DocumentFolder() {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="document-folder" viewBox="0 0 160 172" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-paper`} x1=".2" y1="0" x2=".7" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="var(--folder-light)" />
          <stop offset="1" stopColor="var(--folder-dark)" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity=".95" />
          <stop offset=".6" stopColor="var(--folder-light)" />
          <stop offset="1" stopColor="var(--folder-dark)" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity=".32" />
          <stop offset="1" stopColor="var(--folder-dark)" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--folder-light)" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="var(--folder-light)" stopOpacity=".75" />
        </linearGradient>
      </defs>
      <path d="M44 8h58l36 36v99a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8Z" fill={`url(#${id}-paper)`} />
      <path d="M102 8v27a9 9 0 0 0 9 9h27Z" fill={`url(#${id}-fold)`} />
      <path d="M21 59h25c8 0 10 20 20 20h74a12 12 0 0 1 12 12v66a12 12 0 0 1-12 12H21a12 12 0 0 1-12-12V71a12 12 0 0 1 12-12Z" fill={`url(#${id}-glass)`} />
      <path d="M21 59h25c8 0 10 20 20 20h74a12 12 0 0 1 12 12v66a12 12 0 0 1-12 12H21a12 12 0 0 1-12-12V71a12 12 0 0 1 12-12Z" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="4" strokeLinejoin="round" />
      <path d="M53 59h66M53 70h66M53 81h66M53 92h66M53 103h66M53 114h66M53 125h44" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
