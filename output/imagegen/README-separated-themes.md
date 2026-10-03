# Separated Theme Assets

All 127 invitation templates were inspected, including inactive designs. Corporate currently has no templates.

- `src/invitations/data/separatedThemeAssets.js` and `generatedThemeLayers.json` define each converted card's independent background and component positions.
- `src/invitations/data/responsiveThemeLayouts.js` selects portrait variants, complete illustration groups, and per-format placement overrides.
- `public/images/components/separated/` contains transparent, individually reusable WebP ornaments.
- `public/images/backgrounds/separated/` contains reconstructed backgrounds with foreground objects removed.
- `src/assets/components/separated/` and `src/assets/backgrounds/separated/` preserve the full-resolution generated PNG sources.
- `theme-layer-audit.json` inventories every template, its layers, and the reason any full scene was retained.
- `separated-component-prompts.json` records the final prompts and built-in ImageGen output provenance. No CLI/API image generation was used.

## Layer Granularity

Bows, hearts, cakes, gifts, glasses, bottles, individual dancers, balloons and other discrete decorations can be omitted or repositioned without changing the background. Repeated ornaments use distinct component IDs while sharing a transparent source image. Text remains localized, editable HTML.

Connected frames and intrinsic illustration details remain together. For example, a cake includes its frosting and candles, and a connected dinner-table illustration includes its place settings. Integrated photographic scenes and detailed scrapbook collages are preserved rather than presented as extracted components.

Pink Minimal's bow and cherries are one `bow-cherries-assembly` component. Its nested image pieces use a shared 4:3 coordinate canvas, with the bow knot anchored to the stem loop. Square and portrait layouts only reposition and resize the assembly, never its internal join. The original transparent assets remain available, and the hearts and underline remain separate.

Glass towers, painted toast panels, and the envelope/portrait/bow assembly render as complete groups by default. Their extracted individual parts remain in `componentLibrary`; switch a group's `components` to that library to work with the pieces independently. Original full artwork has not been deleted.

To exclude a decoration, remove its entry from that theme's `components` array. To replace the background, change `background.image` or `background.color`. Percentage positions, sizes, rotation, mirroring and optional portrait overrides are independent per component. Bottle labels share the artwork's responsive coordinate system.

## Fullscreen Policy

Ornate floral, leafy, lace, and ribbon frames have native 9:16 transparent variants. Illustrated city/pool backgrounds and checker/grid artwork have recomposed portrait backgrounds, without stretching circles, tiles, checks, or illustration motifs. Plain papers, simple stripes, and line-only borders are reused rather than regenerated. Existing well-proportioned portrait photographic scenes and scrapbooks remain intact.

`getSeparatedBackground` and `getSeparatedComponents` resolve the current format without mutating the square configuration. A background's `portrait` property replaces only the portrait image; a component's `portrait` property can change image and placement. `portraitComponents` supports a connected tall border while keeping square/individual assets available.

## Rebuild

Run `node output/imagegen/save-component-assets.mjs` in the Codex workspace to package the recorded generated files, preserving PNG originals and alpha while compressing delivery WebPs. `--only-new` skips already packaged assets. This packaging script uses the bundled Codex Sharp runtime.

Run `node output/imagegen/build-theme-layers.mjs` after changing the curated placements to refresh the generated registry and audit. Missing files are listed in `pending-theme-layers.json`; incomplete conversions keep their original design until all required files exist.

Run `node --test tests/*.test.js` and `npm run build` to verify the app.
