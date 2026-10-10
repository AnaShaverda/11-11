# Pizza Party — Tiny Trattoria

Revised direction A: a pizza birthday celebration with friends, slices and cake.

- `moodboard.png`: six section concepts, palette, typography and mobile adaptations.
- `artwork-sheet.png`: matching pizza, individual slice, open box and party-ticket artwork exploration.

Palette: ivory #FFF4DB, tomato #D73525, basil #244A38, butter #F6CB62.

Journey: invitation, event details, optional pick-a-slice game, party prompt reveal, birthday wishes, RSVP and farewell. The game offers friendly prompts such as sharing a memory, striking a silly pose or making a birthday wish. No cooking stages.

Implementation should preserve the actual project header/footer and SVG icons, use live semantic text and controls, and recompose every chapter for mobile/tablet/desktop. Use viewport minimum heights with natural overflow, not clipped fixed-height content. Keep skip and RSVP access, keyboard and tap alternatives, reduced-motion support, clear focus and 44px minimum touch targets. Wishes and replies remain device-local demos. Generated text, incidental decorations and logos are concept references; event data and existing brand assets take precedence.

Implemented at `/invitations/birthday-little-pizza-chef` in `PizzaPartyExperience.jsx` and `pizza-party-experience.css`. Slice Club retains its separate existing experience.

User revisions supersede the original game concept: the page now has five chapters, with the topping-selection game restored and its finished state shown inline. There is no separate game-result chapter. The game pizza and ingredients use matching generated gouache sprites. The pizza-box illustration and birthday note in the wishes section are hidden below 701px; desktop retains them.

Validation: production build passes. Playwright Chrome checks covered 390px, 768px and 1440px widths, English/Georgian, keyboard topping selection, finishing/resetting, saved wish and reply persistence/editing, decline response and calendar download. No runtime console errors or horizontal page overflow were observed. Screenshots were compared with the accepted board for palette, chapter composition, artwork, typography and controls; game and mobile-wishes differences follow the user's revisions. The project font substitutes the available local editorial serif for the board's suggested Recoleta. Controls are text-only, with no interface icons or confetti. Ingredient artwork appears on the pizza; the existing maker logo is retained.

Latest refinements: ingredient buttons show matching food illustrations; other controls remain free of icons. Header scrolls naturally with the page. Section content fades and moves into view again on forward and reverse scrolling, with no scroll lock and no hidden content when motion is disabled. Verified header exit, reveal reset, reverse reveal, and reduced-motion cleanup in Chrome.
