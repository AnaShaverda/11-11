# Christening watercolor artwork

Generated with the built-in image generation tool using the selected blue option 3 and pink option 4 as style references. Each PNG preserves genuine transparency.

Shared prompt: Create one isolated, centered reusable watercolor asset matching the reference’s soft painting, medium-simple brushwork, translucent pigment and delicate natural palette. Fully visible subject with a small clear margin; transparent background; no paper, card, photo frame, text or other decorations.

Subjects:
- blue-dove.png: white dove carrying an olive twig.
- pink-dove.png: white dove carrying an olive twig with a pink blossom.
- blue-candle.png: lit ivory christening candle with a soft blue bow and olive leaves.
- pink-candle.png: lit ivory christening candle with a blush pink bow and tiny flowers.
- blue-flowers.png: pale blue flowers and muted olive leaves.
- pink-flowers.png: blush pink flowers and sage leaves.

React components: ChristeningDove, ChristeningCandle and ChristeningFlowers in src/invitations/components/ChristeningArtwork.jsx. Their parent composes the assets independently. Candle positioning is controlled by .christening-candle in src/styles/invitation-form.css.

Watercolor washes (blue-wash.png and pink-wash.png) were generated with the built-in tool: transparent portrait 2:3 watercolor corner and edge overlay, powder blue / blush pink pigments, flowing irregular boundaries, granulation, translucent washes, large transparent central area, no paper, text, flowers or objects. Reusable component: ChristeningWatercolorWash.

## Refined classic covers
Built-in image generation, style reference: approved blue sky/dove, olive wreath, blush cascade concept. Each asset has genuine transparency and no text or crosses.
- blue-sky.png: loose powder blue cloud wash fading to transparent below; used only across upper portion.
- olive-wreath.png: tall oval of watercolor olive sprigs around clear center.
- blush-cascade.png: simple pale pink blossoms down left edge and loose blush wash bottom right.
Shared constraints: match medium-simple watercolor reference; no paper, text, cross, candle, bow or unwanted extra objects.
Inner cards: quiet watercolor edges, inset border, numbered event timeline, legible type, accessible RSVP fields. Decorative objects remain cover-only.

## Browser design verification
Concepts: /Users/mac/.codex/generated_images/01a111a7-bb30-72c1-8787-f037c1f8c8cc/exec-5b02dac8-83f7-42c8-87cc-14605cb33448.png (covers); exec-6732d756-7a23-44dd-b9d0-228aed208736.png in the same directory (inner cards). Viewed concepts and browser screenshots together with view_image.
Verified with Codex in-app browser at 1440×1000 and 390×844. Concept boards show several cards rather than the app viewport, so comparisons used each card composition rather than matching board dimensions.
Comparison points: distinct sky/wreath/cascade layouts; ivory/blue/sage/blush palette; clear title/date hierarchy; watercolor placement and alpha; inner border and timeline spacing; square baby photos with titles below; accessible RSVP controls.
Fixed: wedding frames reused on christening covers; oversized sky wash; excessive paper texture; inherited script fonts on inner headings; RSVP selected-state style conflicts; stretched candle; letterboxed wedding uploads.
Intentional adaptations: retain existing editable/localized content instead of generated placeholder dates/names; keep established cover fonts; reuse selected dove/flower/candle pieces; add dove and candle to Blush Grace at the user's request; add existing olive sprig to Olive Blessing's message card. No cross artwork is used. No extra generated message copy is saved.
Cover-upload controls and rendering permit only baby boy/girl for christenings; all wedding themes retain uploads. All five themes checked for loaded assets and text fitting within the cover; both baby photos measured 203.58px square on mobile. Supporting cards contain no candle/dove/flower pieces.
RSVP guest checks: declining removes companion controls; attending restores them; increment changes count to 1 and seats to 2; decrement restores count. No test response submitted. Wedding full and framed uploaded photos both report object-fit:cover and object-position:50% 50%; temporary test upload removed.
Copy changes: christening collection legend no longer promises uploads for every theme; upload hints hidden on illustrated themes; Blush Grace shows the christening occasion when title is customized. Other editable content retained.
Production build and ten collection/occasion tests passed. Existing bundle-size warning remains.
