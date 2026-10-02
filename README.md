# 11:11

The public frontend for 11:11, a digital event and personal surprise platform. Built with React, Vite, React Router, and plain CSS. Event content, photos, and stories are sample data. Surprise previews accept a recipient, sender, and message in browser navigation state; that text is not encoded in URLs. RSVP replies remain local React state. Nothing is published or stored on a server.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create a production bundle.

## Public routes

- `/` — original 11:11 homepage with category cards and a small invitation selection; choosing a card opens the invitations catalog with that category selected
- `/projects` — redirects to the event types section on Home for older links
- `/projects/:slug` — compatibility redirects to the matching category in `/invitations`; the Friendship Diary link redirects to its module
- `/experiences/:slug/demo` — public guest demo using an existing theme canvas, with a local RSVP and optional +1 example; page navigation uses the header
- `/themes/:slug` — redirects to the public invitation catalog until full event themes are unlocked in a future flow
- `/invitations` — one catalog for All, Birthday, Wedding, Other Celebrations, and Corporate. `?category=birthday` (or `wedding`, `other`, `corporate`) selects a category in place; `style` and `occasion` refine the results. Legacy `type` links redirect to `category` URLs. The heading and catalog controls remain stable across category changes.
- `/invitations/:slug` — public design presentations with static mood boards and event-card samples; page navigation uses the header
- `/modules/friendship-diary` — optional module showcase
- `/surprises` — Digital Surprise presentation and local mock creator flow
- `/surprises/demo` — interactive Birthday Surprise example; accepts validated `occasion`, `theme`, and `modules` query parameters for previewing visual choices
- `/about` and `/contact` — public information pages

Old project links, including `/projects/friendship-diary`, redirect to their current category or module route.

## Frontend structure

- `src/app` owns routes and scopes the intro animation to the marketing pages.
- `src/data/projects.js` holds the four main event categories and Other Celebrations subcategories.
- `src/themes/data/themes.js` holds visual theme configuration, `themeStories.js` supplies theme-specific copy, and `demoEvents.js` holds separate mock event content.
- `src/themes/components/ThemeCanvas.jsx` retains the full event flow for all 23 themes: hero, invitation, story, details and countdown, photo gallery, optional module, and a local reply preview. `src/styles/themes.css` provides tokens; `theme-worlds.css` retains each complete theme's composition, invitation artwork, imagery treatment, and responsive styling. These full views are now accessible through the explicitly labeled guest demo route; `/themes/:slug` still redirects and storefront unlock metadata remains unchanged.
- `src/modules/data/eventModules.js` defines optional modules by category. `src/modules/components/ThemeModulePreview.jsx` renders them within the selected theme's CSS variables.
- `src/invitations/data/templates.js` maps public designs to saved `themeId` values and records `unlockStatus`; `showcaseDesigns.js` defines each design's palette, typography, pattern, and static sample pieces; `invitationSamples.js` holds separate demo event copy. `birthdayAssets.js` assigns illustrations by Birthday theme, while `summerAssets.js` names the reusable Painted Summer artwork. Shared artwork and mood-board components render these records; Wedding previews continue to use type and CSS graphics. The original full invitation template components and registry remain in `src/invitations` for a future event creation and unlock flow.
- `src/assets/birthday` keeps the renamed source PNG illustrations by subject, including the new flower, sticker, disco-ball, and party-hat variants. `public/images/birthday` contains transparent, compressed WebP copies of the curated illustrations used by the public Birthday landing page, invitation showcases, and guest demo heroes. Unused variants stay organized as source assets rather than being forced into unrelated themes.
- `src/assets/summer/painted` keeps the renamed original coastal PNGs. `public/images/summer/painted` holds transparent, compressed WebP copies for Painted Summer; the theme uses a curated subset of the collection.
- `src/surprises/data/surprises.js` holds occasion options, central demo content, and enabled module IDs. `src/surprises/components` renders shared recipient-facing blocks and lightweight cake, gift, and letter interactions. It uses the existing theme IDs and CSS variables from `src/themes`, plus module metadata from `src/modules/data/eventModules.js`.
- `public/images/surprise-memories.webp` is generated, compressed sample imagery for the demonstration gallery; it does not represent user uploads.
- `public/images/birthday-editorial.webp` and `wedding-editorial.webp` are compressed sample photo sheets for the event themes.
- `src/projects` holds category showcases, while `src/components` contains the shared website frame and UI.

The theme and module layer is presentation and local interaction only. `demoGuests.js` keeps sample +1 entitlement separate from event data, and `RSVPPreview` provides an editable attendance example without a backend. `previewConfig.js` validates occasion/theme/module combinations, gives each occasion a small recommended starting set, and preserves an explicitly empty module selection. Preview links carry personal text through React Router navigation state; copying a preview URL carries configuration only, not the personal message. Digital Surprise is a recipient-focused use case without event venue or RSVP fields. The example link shown on the showcase is illustrative; private links are not generated by this frontend.


## Product decisions for this public-site phase

The existing 11:11 identity, theme compositions, art, animation, CSS architecture, and invitation storefront remain authoritative. Competitors informed behavior only. No competitor assets, layouts, or copy were imported, and no dependencies or backend infrastructure were added.

Research references: [Partiful](https://partiful.com/) (responses and shared photos), [Kudoboard](https://www.kudoboard.com/cards/online-birthday-cards/) (collaborative messages and revisiting memories), [Joy](https://withjoy.com/wedding-website/?l=en-GB) (event details together), [Wedy](https://wedy.ge/) (personal invitations, schedule and wishes), [Weddsite](https://www.weddsite.ge/en) (small creation flow and guest previews), [Inviter](https://inviter.ge/en) (personal links and no guest app), [Invu](https://invu.ge/) (RSVP across occasions), [Celebrio](https://celebrio.ge/) (countdown, photos and location), [Paperless Post](https://www.paperlesspost.com/online-invitations), and [Greenvelope](https://www.greenvelope.com/faq) (invitation and RSVP product models). These observations are not visual references or endorsements of their pricing.

| Idea / problem | Fit and reuse within 11:11 | Complexity and public-site decision | Product stage / monetization |
| --- | --- | --- | --- |
| Guest preview: artwork alone cannot explain what recipients receive | Existing ThemeCanvas for Birthday/Wedding, existing SurpriseExperience for personal occasions | Small: link to existing full compositions; implemented as demo | Core/MVP; preview and guest access should remain basic |
| Attendance with permitted +1: hosts need an accurate headcount | One shared RSVP component; guest entitlement is separate from event/template data | Small local example now; no host dashboard or submission service | Core/MVP; do not paywall ordinary replies |
| Names and personal message: a surprise should feel made for its recipient | Same surprise renderer, themes, and module metadata across six occasions | Three optional fields; navigation retains text and choices; implemented | Core/MVP; advanced customization could be premium |
| Smart defaults: too many extras make starting difficult | Occasion configuration chooses three recommended modules; all original modules remain available | Small: no new settings screen; birthday-only cake is excluded elsewhere | Core/MVP; module basics remain accessible |
| Before/during/after: an image invitation does not preserve participation | Existing details, countdown, gallery, diary, wishes and stories | Explain the lifecycle within existing home copy; existing samples demonstrate it | Core: personal messages and memories; future: real contributions and recap |
| Collaborative wishes and uploads: absent friends still want to participate | Future Contribution/Media records used by both event and surprise modules | Demo content now; defer uploads, storage, moderation and invitations to contributors | Future; higher media limits/video storage could be premium |
| Personalized private links: guests should open without an account | Future Guest/Invitation identifiers, independent of template or occasion | Public demos are open now; no claim that their URLs are secure private links | Core/MVP when publishing exists; custom domains may be premium |
| Schedule, maps and calendar: guests need the right time and place | Event data consumed by reusable details modules | Existing time/location/countdown shown now; precise venue and calendar tools deferred | Core event MVP; avoid paywalling essentials |
| Analytics, automated reminders and guest groups: scale increases coordination work | Future shared event services, independent of birthday/wedding | Not needed to sell this public experience; no dashboard added | Future; advanced analytics or automation may be premium |
| Budgets, seating charts, vendor marketplace and mass delivery tools | Weak fit with the modest emotional experience | Rejected for current scope: operational complexity distracts from creation and memories | Not an MVP commitment |

Reasonable premium candidates are special themes, advanced personalization, custom domains, extra media capacity, selected advanced interactive modules, and optional branding removal. Basic links, previews, RSVP, and essential event details should not be artificially restricted. Existing storefront premium metadata is preserved; no payment or pricing promise is implemented.

Next product improvements:
1. Let a user personalize essential event information through the same event-data model, then preview through the existing template/theme renderers.
2. Add a small shared contribution demo for a wish or memory, usable by both event and surprise experiences before adding real storage.
3. Validate creation and guest flows with Georgian-speaking mobile users, then define publishing/private-link and memory-retention behavior before building a backend.

Verification: production build, guest demo route checks, invitation-to-guest navigation, RSVP attendance/+1/decline/edit, personalized Friendship preview/theme-change/return, invalid query configuration, empty module selections, and EN/KA mobile smoke checks. Temporary browser scripts and screenshots live outside the repository.

## Platform UI and UX guidelines

The shared theme follows the supplied folder reference: dark navy `#070f50`, plum `#241346`, and muted magenta `#923054`; light mode uses blue-white `#eef2ff`, lavender `#ece7f5`, and blush `#f8dce7`. `tokens.css` owns the palette, and `reference-theme.css` applies it to platform chrome, cards, and panels. Invitation designs retain their authored artwork palettes. The reusable `DocumentFolder` SVG has a folded paper sheet, text lines, and a translucent front. Decorative stars, cubes, hills, and the fading grid are noninteractive and kept toward the margins on content pages. Existing category names and navigation stay intact.

Keep the established gradients, rounded shapes, colors, and invitation compositions. Apply the platform scale to navigation, browsing controls, page copy, and card captions. Invitation artwork and guest experiences have their own expressive typography; do not shrink their text with platform-wide selectors.

| Element | Project guideline |
| --- | --- |
| Body text and inputs | 16px / 1rem, with 1.5–1.65 line height for prose |
| Controls and secondary copy | 14px / .875rem; inputs stay at 16px on mobile |
| Supporting captions | 13px / .8125rem; never use these for essential instructions |
| Page heading | 30–44px, fluid in rem units; line height 1.2 |
| Section heading | 24–32px; the home surprise feature can reach 40px |
| Touch controls | 48px high for dropdowns and inputs; at least 44px for navigation and filter removal |
| Reading width | Up to 62ch for explanatory prose; catalog width up to 1120px |
| Card grid | Four columns on wide desktop, three below 1100px, two below 800px, one below 520px |
| Artwork | Keep the authored square covers and scale them proportionally; no oversized featured card in browsing grids |
| Spacing | Use an 8px rhythm, with 12px for compact internals; 20px card gaps and 24–40px between browsing sections |

These sizes are recommendations for this project, not universal accessibility requirements. The implementation lives in `tokens.css` and `usability.css`. Keep one shared type scale rather than independently choosing font sizes for each UI component. Keep the existing Latin and Georgian font stacks, and verify Georgian wrapping when changing widths.

Catalog interaction rules:

- At 1100px and below, show the brand and a labeled hamburger button on one header row. Expand navigation and labeled language/appearance choices below it. Use native links and buttons with `aria-expanded` and `aria-controls`; close on navigation, Escape, outside interaction, focus leaving the header, and resizing to desktop. Hidden controls cannot receive focus. Keep normal Tab navigation, without a focus trap.
- Use spacing and heading hierarchy to separate sections. Omit horizontal rules in platform sections and demo section layouts; retain card outlines, field borders, link underlines, and artwork details.
- Home folders keep a 144px vector canvas across breakpoints. Only constrain it to the available column width on narrow phones. Use a centered 660px four-column grid on desktop and a 344px two-column grid at 900px and below, with 16–20px gaps. Avoid shrinking folder art at 600px or shorter screen heights.
- Homepage invitations use four equal cards on desktop. At 800px and below, use a native horizontal scroll carousel with snap points, a visible next-card preview, previous/next buttons, and a position indicator. Support arrow keys and reduced motion, without automatic rotation. Follow [W3C's carousel guidance](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for user-controlled navigation.
- Page headings use the shared 30–44px title scale; section headings use 24–32px. Personal surprise demo titles can reach 64px, with section headings capped at 40px. Invitation poster text remains part of the authored artwork.
- Invitation previews align the poster and title at the top on desktop. Place “02 / THE DESIGN LANGUAGE — The little details” and the compact color palette, pattern, and occasion cards directly beneath the title and short description. Keep the typography and supporting event cards below the hero. On mobile, put the title first, then the poster and color/pattern section. Avoid repeating the sample title, palette dots, or long explanations alongside the poster.
- Mobile navigation follows [W3C's disclosure navigation guidance](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) for ordinary links, keyboard navigation and Escape, and [GOV.UK's expandable mobile navigation pattern](https://design-system.service.gov.uk/components/service-navigation/). No modal backdrop is needed for this small navigation: the expanded header pushes content down.

- On desktop, place category choices and the style filter together on one row. On mobile and tablet, show category and filter as two dropdowns. Omit visible Category/Filter captions, retain accessible control names, and stack them only below 360px to keep long Georgian values readable.
- Use styled native selects, preserving mobile pickers and keyboard behavior. Replace the browser's arrow with one 18px chevron, 2px from the right edge and vertically centered in the field. Align the value with the label and reserve 28px of right padding so text cannot overlap the arrow.
- Category choices, selects, text inputs, and textareas share a text-first underlined style: transparent background, square corners, and only a bottom border. Hover strengthens the underline; keyboard focus adds an inset bottom line without a glow or layout shift. Auth and personalization fields share these states. Preserve a system focus outline in forced-color mode.
- Use one shared style selector. Update results immediately because these local filters do not require network loading. Keep the user's scroll position stable while refining.
- Show the result count and a removable style selection. The selected filter's × is the only clear action; omit duplicate reset buttons, including in empty results. Corporate remains an occasion preview with a disabled style filter. Other Celebrations includes Gender Reveal, Bridal Parties, Bachelorette Party, and Christening as subcategories; selecting an occasion filters only that collection and preserves the style. Bridal designs retain their existing preview URLs.
- Store the selected category and applied style in the `/invitations` URL so reload, history, and category navigation retain them. Homepage folders link directly to this filtered catalog; category tabs and mobile dropdowns update the same page in place. Older category style links are accepted; the first requested legacy style becomes the shared style when viewing All. Search has been replaced with category browsing, so old `q` parameters no longer narrow results and are removed on filter changes.
- Use the top header for page navigation; omit page-level back links. Normal browser history retains scroll, focused cards, open category details, and the home carousel position. Keep scroll snapshots free of form content. Programmatically focused route headings have no visual outline; keyboard focus remains visible on interactive controls.
- Category choices share one continuous baseline and a 3px active marker that moves between choices in 240ms. Disable that transition for reduced motion. Category and filter changes replace the current browsing entry, retain the style, and avoid filling Back history with intermediate selections.
- Invitation browsing cards show the design name and opening arrow, with a compact caption. Keep detailed style descriptions on the preview page and in the filter choices.

Research informing these rules: [GOV.UK's type scale](https://design-system.service.gov.uk/styles/type-scale/) supports consistent relative-unit typography; [Nielsen Norman Group's filtering research](https://www.nngroup.com/articles/applying-filters/) explains when immediate filtering and stable scroll behavior fit the task; [Carbon's dropdown guidance](https://carbondesignsystem.com/components/dropdown/usage/) covers persistent labels, consistent control sizes, alignment, and native selects on mobile; [W3C's target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies a 24×24 CSS-pixel minimum with exceptions, while this project chooses larger controls for comfort.

Validate new UI at desktop, tablet, narrow mobile, both themes, English and Georgian, and a narrow viewport equivalent to 200% zoom. Check keyboard selection, empty results, filter removal, category changes, header navigation, and reload/browser history. Research-informed improvements still need testing with real Georgian-speaking users; measure whether they can find a suitable design and return to their results without assistance.
