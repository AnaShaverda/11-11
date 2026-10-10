# Project rules

## Caption keys and localized values

- Apply this rule throughout the project, including every invitation card, theme, preview, form, game, and shared UI component.
- Keep user-facing text behind stable, descriptive caption keys. Store English (`en`) and Georgian (`ka`) translations in shared localization files under `src/localization/`; keep the same wording in both languages when migrating existing text.
- Use the shared `useLanguage().t(captionKey, values)` system or the caption-key helpers in `src/localization/captionValues.js`. Card configuration should reference caption keys; language values belong in localization files.
- Do not hardcode translated text in JSX, component-local `en`/`ka` objects, inline language ternaries, or helpers such as `t(en, ka)`.
- This includes titles, descriptions, buttons, labels, placeholders, validation messages, accessibility labels, and demo wording. Use named interpolation values for dynamic text.
- Reuse existing caption keys when their meaning matches. Add both English and Georgian values for new keys, and check both languages when changing a card.
- Preserve user-entered names, messages, and other personal content as user data; do not turn those into translation keys.

## Icons and decorative symbols

- Never use emoji, Unicode/keyboard symbols, or text glyphs as visual icons. This includes hearts, arrows, chevrons, close marks, stars, and similar decorations, including CSS `content` and Unicode escape sequences.
- Use the project's existing SVG assets and icon components. Search for a matching asset before creating anything new.
- Prefer `src/invitations/components/InvitationArtwork.jsx` for invitation icons. It uses `public/images/invitations/marks/`, including heart, heart-filled, arrow-right, arrow-left, arrow-up-right, chevron-right, and close.
- Decorative ornament SVGs also live in `public/images/invitations/ornaments/`. Use their actual shapes, not font substitutes.
- Keep decorative SVGs hidden from assistive technology; give icon-only buttons descriptive accessible labels.
- When touching a UI surface, replace its existing typed icon glyphs with the corresponding SVGs. Ordinary punctuation and prose are not icons.
