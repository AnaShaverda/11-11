# Project rules

## Icons and decorative symbols

- Never use emoji, Unicode/keyboard symbols, or text glyphs as visual icons. This includes hearts, arrows, chevrons, close marks, stars, and similar decorations, including CSS `content` and Unicode escape sequences.
- Use the project's existing SVG assets and icon components. Search for a matching asset before creating anything new.
- Prefer `src/invitations/components/InvitationArtwork.jsx` for invitation icons. It uses `public/images/invitations/marks/`, including heart, heart-filled, arrow-right, arrow-left, arrow-up-right, chevron-right, and close.
- Decorative ornament SVGs also live in `public/images/invitations/ornaments/`. Use their actual shapes, not font substitutes.
- Keep decorative SVGs hidden from assistive technology; give icon-only buttons descriptive accessible labels.
- When touching a UI surface, replace its existing typed icon glyphs with the corresponding SVGs. Ordinary punctuation and prose are not icons.
