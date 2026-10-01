# 11:11

The public frontend for 11:11, a digital event and personal surprise platform. Built with React, Vite, React Router, and plain CSS. Event content, photos, and stories are sample data. Surprise previews accept a recipient, sender, and message in browser navigation state; that text is not encoded in URLs. RSVP replies remain local React state. Nothing is published or stored on a server.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create a production bundle.

## Public routes

- `/` — original 11:11 homepage with category cards and a small invitation selection; choosing a card opens its full category view
- `/projects` — redirects to the event types section on Home for older links
- `/projects/birthday` and `/projects/wedding` — complete category invitation collections with style filters, category switching, and expandable experience examples
- `/projects/corporate` and `/projects/other-celebrations` — shared catalog category views with occasion filters; Other contains Gender Reveal, Bachelorette Party, and Christening / ნათლობა
- `/experiences/:slug/demo` — public guest demo using an existing theme canvas, with a local RSVP and optional +1 example; return links lead back to the original invitation design
- `/themes/:slug` — redirects to the public invitation catalog until full event themes are unlocked in a future flow
- `/invitations` — All view containing every category with independent filters; old `type` links open the matching full category view
- `/invitations/:slug` — public design presentations with static mood boards and event-card samples; back links lead to their category collection
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

The theme and module layer is presentation and local interaction only. `demoGuests.js` keeps sample +1 entitlement separate from event data, and `RSVPPreview` provides an editable attendance example without a backend. `previewConfig.js` validates occasion/theme/module combinations, gives each occasion a small recommended starting set, and preserves an explicitly empty module selection. Preview and return links carry personal text through React Router navigation state; copying a preview URL carries configuration only, not the personal message. Digital Surprise is a recipient-focused use case without event venue or RSVP fields. The example link shown on the showcase is illustrative; private links are not generated by this frontend.


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
