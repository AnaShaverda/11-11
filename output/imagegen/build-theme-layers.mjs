import fs from "node:fs/promises";
import { invitationTemplates } from "../../src/invitations/data/templates.js";

const templates = new Map(invitationTemplates.map((t) => [t.slug, t]));
const proposed = {};
const position = (x, y, w, h) => ({
  left: `${x}%`,
  top: `${y}%`,
  width: `${w}%`,
  height: `${h}%`,
});
const part = (id, x, y, w, h, options = {}) => ({
  id,
  image: `/images/components/separated/${id}.webp`,
  ...position(x, y, w, h),
  ...options,
});
const reused = (image, id, x, y, w, h, options = {}) => ({
  id,
  image,
  ...position(x, y, w, h),
  ...options,
});
const watercolor = (name, x, y, w, h, options) =>
  reused(
    `/images/components/watercolor/${name}.webp`,
    name,
    x,
    y,
    w,
    h,
    options,
  );
const frame = (id) => part(id, 0, 0, 100, 100, { objectFit: "fill" });
const background = (id) => `/images/backgrounds/separated/${id}.webp`;
const add = (slug, components, image) => {
  proposed[slug] = {
    background: {
      color: templates.get(slug).design.palette[0],
      ...(image ? { image } : {}),
    },
    components,
  };
};
const named = (slug, key, x, y, w, h, options) =>
  part(`${slug}-${key}`, x, y, w, h, options);
const texture = "/images/bridal/selected/backgrounds/ivory-paper.webp";



add(
  "birthday-cobalt-cheers",
  [
    part("cobalt-left-toast", -1, 33, 53, 44),
    part("cobalt-right-toast", 49, 34, 53, 44),
  ],
  texture,
);
add(
  "birthday-ribbon-social",
  [
    frame("ribbon-social-frame"),
    part("ribbon-social-lips", 5, 4, 17, 14),
    part("ribbon-social-cake", 83, 4, 16, 24),
    reused(
      "/images/birthday/ribbon-social/etched-citrus-coupe.webp",
      "citrus-coupe",
      3,
      59,
      26,
      37,
    ),
    reused(
      "/images/birthday/ribbon-social/bow-martini.webp",
      "martini",
      80,
      63,
      18,
      30,
    ),
  ],
  texture,
);
add("birthday-paper-garland", [
  named("birthday-paper-garland", "garland", 0, 0, 100, 20),
  named("birthday-paper-garland", "cake", 33, 70, 34, 25),
  ...[
    [7, 31],
    [90, 42],
    [18, 65],
    [79, 74],
  ].map(([x, y], i) =>
    named("birthday-paper-garland", "spark", x, y, 3, 4, { id: `spark-${i}` }),
  ),
]);
add(
  "birthday-strawberry-social",
  [
    reused(
      "/images/birthday/strawberry-social/shortcake-pedestal.webp",
      "cake",
      57,
      40,
      40,
      56,
    ),
    reused(
      "/images/birthday/strawberry-social/berries-and-daisy.webp",
      "berries",
      1,
      80,
      25,
      18,
    ),
  ],
  background("birthday-strawberry-social-background"),
);
add(
  "birthday-classic-celebration",
  [
    frame("birthday-classic-celebration-frame"),
    named("birthday-classic-celebration", "cake", 46, 16, 54, 79),
    named("birthday-classic-celebration", "bow", 1, 0, 13, 13),
  ],
  background("birthday-classic-celebration-background"),
);
add(
  "birthday-floral-affair",
  [
    named("birthday-floral-affair", "vase", 66, 65, 26, 30),
    named("birthday-floral-affair", "lily", 67, -5, 35, 44),
    named("birthday-floral-affair", "lily", 46, 27, 52, 44),
    named("birthday-floral-affair", "magnolia", 68, 44, 32, 34),
  ],
  texture,
);
add(
  "birthday-pastel-disco",
  [
    named("birthday-pastel-disco", "disco", 59, 0, 40, 46),
    named("birthday-pastel-disco", "ribbon", 0, 34, 100, 66),
    ...[
      [2, 2],
      [86, 9],
      [2, 17],
      [86, 59],
    ].map(([x, y]) => named("birthday-paper-garland", "spark", x, y, 4, 7)),
  ],
  background("birthday-pastel-disco-background"),
);
add(
  "birthday-coquette",
  [
    frame("birthday-coquette-frame"),
    named("birthday-coquette", "bow", 4, 0, 92, 95),
  ],
  "/images/bridal/selected/backgrounds/blush-paper.webp",
);
add("birthday-beer-party", [
  named("birthday-beer-party", "left-beer", 18, 57, 38, 39),
  named("birthday-beer-party", "right-beer", 49, 57, 38, 39),
]);
for (const key of [
  "city-after-dark",
  "comic-cutout",
  "retro-sport",
  "upside-down",
]) {
  const slug = `birthday-${key}`;
  const placements = {
    "city-after-dark": [77, 6, 17, 55],
    "comic-cutout": [68, 64, 20, 25],
    "retro-sport": [80, 52, 14, 30],
    "upside-down": [33, 6, 16, 23],
  };
  add(
    slug,
    [named(slug, "spider", ...placements[key])],
    background(`${slug}-background`),
  );
}
add(
  "birthday-pink-lido",
  [
    named("birthday-pink-lido", "umbrella", 69, -3, 36, 34),
    named("birthday-pink-lido", "ring", -4, 65, 33, 32),
    named("birthday-pink-lido", "palm", 0, 0, 27, 31),
    named("birthday-pink-lido", "palm", 76, 73, 27, 29, { rotation: 180 }),
  ],
  background("birthday-pink-lido-background"),
);
add(
  "birthday-blue-splash",
  [
    named("birthday-blue-splash", "ladder", 72, 15, 23, 45),
    named("birthday-blue-splash", "ring", 72, 60, 33, 35),
  ],
  background("birthday-blue-splash-background"),
);

for (const slug of [
  "wedding-happy-table",
  "wedding-watercolor-banquet",
  "wedding-colorful-company",
  "wedding-date-and-dinner",
  "wedding-celebration-table",
  "wedding-garden-table",
]) {
  const tablePositions = {
    "wedding-watercolor-banquet": [0, 38, 100, 59],
    "wedding-garden-table": [4, 58, 92, 38],
    "wedding-colorful-company": [0, 64, 100, 36],
  };
  add(
    slug,
    [named(slug, "table", ...(tablePositions[slug] ?? [0, 59, 100, 38]))],
    texture,
  );
}
proposed["wedding-colorful-company"].components.push(
  watercolor("pink-bow", 80, 0, 17, 21),
);
proposed["wedding-date-and-dinner"].components.push(
  watercolor("blue-bow", 79, 0, 19, 20),
);
proposed["wedding-garden-table"].components.push(
  frame("wedding-garden-table-garden-frame"),
  reused(
    "/images/wedding/garden-table/olive-ribbon-bow.webp",
    "bow",
    36,
    0,
    28,
    17,
  ),
);
for (const slug of ["wedding-ring-and-spark", "wedding-golden-promise"])
  add(
    slug,
    [
      named(slug, "rings", 24, 28, 52, 36),
      ...[
        [24, 35],
        [72, 35],
        [65, 24],
        [38, 23],
        [70, 59],
      ].map(([x, y]) =>
        part("birthday-midnight-martini-gold-star", x, y, 4, 6),
      ),
    ],
    texture,
  );
add(
  "wedding-little-yes",
  [
    named("wedding-little-yes", "ring-hand", 32, 27, 42, 48),
    part("birthday-midnight-martini-gold-star", 65, 29, 4, 6),
  ],
  texture,
);
add(
  "wedding-sweet-snapshot",
  [
    named("wedding-sweet-snapshot", "envelope", 9, 47, 82, 50),
    named("wedding-sweet-snapshot", "portrait", 29, 28, 42, 33),
    part("burgundy-bow", 36, 77, 28, 18),
    reused(
      "/images/wedding/sweet-snapshot/pastel-tulip-doodle.webp",
      "tulip",
      1,
      0,
      15,
      24,
    ),
    reused(
      "/images/wedding/sweet-snapshot/pastel-tulip-doodle.webp",
      "tulip",
      84,
      75,
      15,
      24,
      { flipX: true },
    ),
  ],
  texture,
);
add(
  "wedding-portrait-promise",
  [
    frame("wedding-portrait-promise-floral-frame"),
    named("wedding-portrait-promise", "portrait", 31, 30, 38, 44),
  ],
  texture,
);
add(
  "wedding-heartmarked",
  [
    named("wedding-heartmarked", "left-toast", 12, 55, 39, 39),
    named("wedding-heartmarked", "right-toast", 49, 55, 39, 39),
  ],
  texture,
);
add(
  "wedding-linked-steps",
  [named("wedding-linked-steps", "couple", 11, 30, 79, 65)],
  texture,
);
for (const slug of ["wedding-ribbon-revel", "wedding-garden-dance"]) {
  add(
    slug,
    [1, 2, 3, 4, 5].map((n) =>
      named(slug, `dancer-${n}`, (n - 1) * 19, 60, 24, 34),
    ),
    texture,
  );
  if (slug === "wedding-ribbon-revel")
    proposed[slug].components.push(
      frame(`${slug}-floral-frame`),
      named(slug, "ribbon-garland", 0, 0, 100, 19),
    );
  else
    proposed[slug].components.push(
      named(slug, "lemon-branch", 0, 0, 20, 39),
      named(slug, "lemon-branch", 80, 0, 20, 39, { flipX: true }),
      named(slug, "garland", 0, 0, 100, 14),
      reused(
        "/images/wedding/garden-dance/pink-disco-lantern.webp",
        "disco-left",
        5,
        6,
        12,
        16,
      ),
      reused(
        "/images/wedding/garden-dance/pink-disco-lantern.webp",
        "disco-right",
        82,
        9,
        12,
        16,
      ),
    );
}
add("wedding-ivory-vows", [
  named("wedding-ivory-vows", "jacket", 9, 33, 36, 52),
  named("wedding-ivory-vows", "dress", 51, 32, 39, 55),
]);
for (const slug of [
  "wedding-come-rain-or-shine",
  "wedding-side-by-side",
  "wedding-first-dance",
  "wedding-heart-hideaway",
  "wedding-little-vows",
  "wedding-ink-and-ivy",
])
  add(slug, [named(slug, "couple", 24, 52, 52, 36)], texture);
proposed["wedding-first-dance"].components.push(
  frame("wedding-first-dance-frame"),
  part("burgundy-bow", 39, 0, 22, 10),
);
proposed["wedding-little-vows"].components.push(
  named("wedding-little-vows", "cake", 6, 83, 13, 13),
  named("wedding-little-vows", "bottle", 85, 82, 8, 15),
  part("red-heart", 52, 50, 3, 4),
);
proposed["wedding-ink-and-ivy"].components.push(
  named("wedding-ink-and-ivy", "vine", 0, 0, 29, 100),
  named("wedding-ink-and-ivy", "vine", 71, 0, 29, 100, { flipX: true }),
);
add(
  "wedding-happily-away",
  [
    frame("wedding-happily-away-frame"),
    named("wedding-happily-away", "car", 8, 64, 86, 32),
  ],
  texture,
);
add(
  "wedding-our-people",
  [named("wedding-our-people", "dinner", 1, 1, 98, 98)],
  texture,
);
for (const slug of ["wedding-rose-letter", "wedding-sage-letter"]) {
  add(
    slug,
    [
      named(slug, "envelope", 0, 25, 100, 75),
      reused(
        "/images/wedding/sage-letter/sage-wax-seal.webp",
        "seal",
        80,
        78,
        17,
        17,
      ),
    ],
    texture,
  );
  if (slug.endsWith("rose-letter"))
    proposed[slug].components.push(
      reused(
        "/images/wedding/rose-letter/blush-ribbon-bow.webp",
        "bow",
        81,
        0,
        17,
        17,
      ),
    );
}
add(
  "wedding-day-notes",
  [
    named("wedding-day-notes", "bottle", 73, 0, 22, 22),
    named("wedding-day-notes", "camera", 1, 33, 12, 12),
    named("wedding-day-notes", "disco", 1, 0, 19, 19),
    named("wedding-day-notes", "cake", 3, 79, 20, 19),
    reused(
      "/images/wedding/blue-pour/ribbon-coupe.webp",
      "coupe",
      83,
      67,
      15,
      29,
    ),
  ],
  texture,
);
add(
  "wedding-blue-clink",
  [
    frame("wedding-blue-clink-frame"),
    named("wedding-blue-clink", "left-toast", 0, 52, 51, 34),
    named("wedding-blue-clink", "right-toast", 49, 52, 51, 34),
  ],
  texture,
);
add(
  "wedding-tipsy-together",
  [
    named("wedding-tipsy-together", "squiggle", 1, 0, 10, 100, {
      objectFit: "fill",
    }),
    named("wedding-tipsy-together", "squiggle", 89, 0, 10, 100, {
      objectFit: "fill",
      flipX: true,
    }),
    named("wedding-tipsy-together", "bride", 25, 59, 28, 36),
    named("wedding-tipsy-together", "groom", 54, 59, 28, 36),
  ],
  texture,
);
add(
  "wedding-blue-pour",
  [
    frame("wedding-blue-pour-pour"),
    named("wedding-blue-pour", "bottle-hand", 71, -1, 31, 26),
    named("wedding-blue-pour", "coupe-hand", -1, 61, 29, 38),
  ],
  texture,
);

for (const key of [
  "olive-full-frame",
  "blue-full-frame",
  "little-dreamer",
  "blue-dove",
  "olive-dove",
  "blush-petals",
  "olive-ribbon",
  "ivory-blessing",
  "little-blue-heaven",
  "blush-grace",
  "olive-light",
]) {
  const slug = `christening-${key}`;
  const components = [];
  if (key === "olive-full-frame") components.push(frame(`${slug}-olive-frame`));
  if (key === "blue-full-frame")
    components.push(
      frame(`${slug}-blue-floral-frame`),
      watercolor("blue-bow", 38, 0, 24, 15),
      watercolor("blue-bow", 38, 86, 24, 14),
      watercolor("little-dove", 38, 8, 24, 15),
    );
  if (key === "little-dreamer")
    components.push(
      frame(`${slug}-gold-frame`),
      watercolor("baby-sparkles", 37, 5, 26, 16),
    );
  if (key === "blue-dove")
    components.push(
      watercolor("little-dove", 38, 0, 31, 24),
      watercolor("blue-bow", -2, 65, 27, 35),
    );
  if (key === "olive-dove")
    components.push(
      watercolor("little-dove", 39, 0, 28, 24),
      watercolor("olive-sprig", -2, -2, 32, 26),
      watercolor("olive-sprig", 73, 70, 29, 30, { rotation: 180 }),
    );
  if (key === "blush-petals")
    components.push(
      frame(`${slug}-petal-frame`),
      watercolor("pink-bow", 3, 0, 21, 16),
      watercolor("little-dove", 36, 0, 25, 19),
    );
  if (key === "olive-ribbon")
    components.push(
      frame(`${slug}-olive-frame`),
      watercolor("champagne-bow", 79, -2, 23, 21),
    );
  if (key === "ivory-blessing")
    components.push(watercolor("champagne-bow", 24, 4, 52, 27));
  if (key === "little-blue-heaven")
    components.push(
      watercolor("blue-bow", 23, 1, 54, 26),
      named(slug, "petal", 81, 77, 9, 9),
      named(slug, "petal", 89, 83, 9, 9),
      named(slug, "petal", 83, 88, 8, 8),
    );
  if (key === "blush-grace")
    components.push(
      watercolor("pink-bow", 23, 1, 54, 27),
      named(slug, "petal", 1, 78, 11, 15),
      named(slug, "petal", 9, 88, 9, 10),
    );
  if (key === "olive-light")
    components.push(
      watercolor("olive-sprig", -5, -3, 36, 39),
      watercolor("olive-sprig", 81, 78, 21, 23, { rotation: 180 }),
    );
  add(slug, components, texture);
}
add("bridal-retro-pink-card", [
  frame("bridal-retro-pink-card-frame"),
  named("bridal-retro-pink-card", "cherries", 43, 2, 16, 14),
  named("bridal-retro-pink-card", "bow", 36, 82, 28, 16),
  ...[
    [4, 5],
    [83, 5],
    [4, 79],
    [83, 79],
  ].map(([x, y]) => named("bridal-retro-pink-card", "daisy", x, y, 13, 15)),
]);
add("bridal-doll-pink-card", [
  frame("bridal-doll-pink-card-frame"),
  named("bridal-doll-pink-card", "heels", 5, 75, 23, 22),
  named("bridal-doll-pink-card", "heart", 72, 74, 22, 23),
  named("bridal-doll-pink-card", "sprig", 3, 0, 15, 28),
  named("bridal-doll-pink-card", "sprig", 82, 0, 15, 28, { flipX: true }),
]);
add(
  "bridal-cool-girl-card",
  [
    named("bridal-cool-girl-card", "sunglasses", 34, 4, 33, 13),
    named("bridal-cool-girl-card", "lipstick", 8, 69, 15, 25, {
      rotation: -20,
    }),
    named("bridal-cool-girl-card", "cherries", 76, 77, 16, 17),
  ],
  background("bridal-cool-girl-card-background"),
);
add("bridal-pink-cocktail-card", [
  frame("bridal-pink-cocktail-card-frame"),
  named("bridal-pink-cocktail-card", "left-coupe", 30, 1, 19, 18),
  named("bridal-pink-cocktail-card", "right-coupe", 51, 1, 19, 18),
  named("bridal-pink-cocktail-card", "citrus", 78, 82, 14, 14),
]);
add("bridal-modern-pink-line-card", [
  frame("bridal-modern-pink-line-card-ribbon-frame"),
  named("bridal-modern-pink-line-card", "left-coupe", 33, 5, 16, 17),
  named("bridal-modern-pink-line-card", "right-coupe", 51, 5, 16, 17),
  named("bridal-modern-pink-line-card", "flower", 3, 76, 20, 23),
]);
add("bridal-pink-disco-dream-card", [
  named("bridal-pink-disco-dream-card", "disco", 39, 3, 22, 20),
  named("bridal-pink-disco-dream-card", "bow", 35, 86, 30, 9),
  ...[
    [9, 5],
    [23, 2],
    [85, 5],
    [9, 85],
    [85, 85],
  ].map(([x, y]) => part("red-starburst", x, y, 4, 8)),
]);
add(
  "bridal-peach-cherry",
  [
    named("bridal-peach-cherry", "bow", 32, 0, 36, 19),
    named("bridal-peach-cherry", "left-coupe", 34, 75, 16, 23),
    named("bridal-peach-cherry", "right-coupe", 50, 75, 16, 23),
    named("bridal-peach-cherry", "cherries", 17, 78, 18, 18),
    named("bridal-peach-cherry", "cherries", 65, 78, 18, 18, { flipX: true }),
  ],
  background("bridal-peach-cherry-background"),
);
add(
  "wedding-blush-lift",
  [
    named("wedding-blush-lift", "pink-heart-balloon", 2, 0, 23, 61),
    named("wedding-blush-lift", "peach-balloon", 81, 0, 18, 64),
    named("wedding-blush-lift", "pink-heart-balloon", 1, 62, 19, 34),
    named("wedding-blush-lift", "pink-heart-balloon", 81, 60, 19, 36, {
      flipX: true,
    }),
  ],
  texture,
);
add(
  "wedding-cherry-toast",
  [
    named("wedding-cherry-toast", "bride", 26, 59, 24, 36),
    reused(
      "/images/wedding/cherry-toast/coupe-tower.webp",
      "tower",
      49,
      67,
      28,
      25,
    ),
  ],
  texture,
);
add(
  "gender-reveal-tiny-footprints",
  [
    named("gender-reveal-tiny-footprints", "blue-foot", 29, 26, 12, 18, {
      rotation: -15,
    }),
    named("gender-reveal-tiny-footprints", "blue-foot", 40, 30, 12, 18, {
      rotation: 14,
      flipX: true,
    }),
    named("gender-reveal-tiny-footprints", "pink-foot", 54, 26, 12, 18, {
      rotation: -15,
    }),
    named("gender-reveal-tiny-footprints", "pink-foot", 65, 30, 12, 18, {
      rotation: 14,
      flipX: true,
    }),
  ],
  texture,
);
for (const slug of ["gender-reveal-little-wonder", "gender-reveal-bear-hug"]) {
  const noun = slug.endsWith("bear-hug") ? "bear" : "bootie";
  add(
    slug,
    [
      named(slug, `pink-${noun}`, 27, 66, 26, 28),
      named(slug, `blue-${noun}`, 49, 66, 26, 28),
    ],
    texture,
  );
  if (noun === "bear") proposed[slug].components.push(frame(`${slug}-frame`));
}
add(
  "gender-reveal-special-delivery",
  [
    frame("gender-reveal-special-delivery-frame"),
    named("gender-reveal-special-delivery", "stork", 11, 65, 55, 27),
    named("gender-reveal-special-delivery", "baby-bundle", 64, 70, 18, 24),
  ],
  texture,
);
add(
  "gender-reveal-up-in-the-air",
  [
    named("gender-reveal-up-in-the-air", "pink-balloon", 4, 57, 22, 39),
    named("gender-reveal-up-in-the-air", "blue-balloon", 73, 62, 22, 34),
    named("gender-reveal-up-in-the-air", "sun", 4, 4, 14, 15),
  ],
  texture,
);
add(
  "gender-reveal-little-surprise",
  [
    named("gender-reveal-little-surprise", "blue-balloon", 5, 1, 16, 59),
    named("gender-reveal-little-surprise", "pink-balloon", 20, 9, 17, 54),
    watercolor("olive-sprig", 0, 74, 16, 24),
  ],
  texture,
);
add(
  "gender-reveal-ribbon-surprise",
  [
    named("gender-reveal-ribbon-surprise", "pink-ribbon", 0, 0, 52, 100, {
      objectFit: "fill",
    }),
    named("gender-reveal-ribbon-surprise", "blue-ribbon", 48, 0, 52, 100, {
      objectFit: "fill",
    }),
  ],
  texture,
);
add(
  "gender-reveal-pink-or-blue",
  [
    frame("gender-reveal-pink-or-blue-frame"),
    watercolor("pink-bow", 41, 4, 18, 13),
  ],
  background("gender-reveal-pink-or-blue-background"),
);

proposed["wedding-sweet-snapshot"].background.image = background(
  "wedding-sweet-snapshot-background",
);
proposed["gender-reveal-little-wonder"].components.push(
  frame("gender-reveal-little-wonder-frame"),
);
proposed["bridal-pink-disco-dream-card"].components.push(
  frame("bridal-pink-disco-dream-card-frame"),
);
proposed["wedding-come-rain-or-shine"].components.push(
  frame("wedding-come-rain-or-shine-frame"),
);
proposed["wedding-day-notes"].components.push(
  named("wedding-day-notes", "pour", 82, 15, 10, 61, { objectFit: "fill" }),
);

const foreground = (slug, components) => {
  add(slug, components, templates.get(slug).visualAssets.coverImage);
  proposed[slug].container = "foreground";
};
foreground("birthday-midnight-martini", [
  named("birthday-midnight-martini", "martini", 15, 0, 72, 100),
  named("birthday-midnight-martini", "gold-star", 60, 46, 30, 34),
  named("birthday-midnight-martini", "stroke", 4, 70, 37, 7),
  named("birthday-midnight-martini", "stroke", 4, 77, 37, 7),
]);
foreground("birthday-peach-fizz", [
  named("birthday-peach-fizz", "left-coupe", 0, 0, 51, 96),
  named("birthday-peach-fizz", "right-coupe", 49, 7, 51, 93),
]);
const pop = [
  named("birthday-pink-pop", "bottle", 35, 0, 38, 100),
  named("birthday-pink-pop", "left-flute", 1, 17, 26, 79),
  named("birthday-pink-pop", "right-flute", 73, 32, 25, 68),
];
for (const slug of ["birthday-pink-pop", "bridal-pink-pop"])
  foreground(slug, pop);
const tower = [
  named("birthday-cherry-tower", "bottle", 68, 25, 31, 75),
  ...[
    [25, 12],
    [10, 41],
    [41, 41],
    [0, 69],
    [28, 69],
    [56, 69],
  ].map(([x, y], i) =>
    named(
      "birthday-cherry-tower",
      i === 2 || i === 4 ? "striped-coupe" : "red-coupe",
      x,
      y,
      29,
      31,
    ),
  ),
  named("bridal-lilac-pop", "cork", 73, 6, 10, 13),
];
for (const slug of ["birthday-cherry-tower", "bridal-cherry-tower"])
  foreground(slug, tower);
foreground("bridal-lilac-pop", [
  named("bridal-lilac-pop", "bottle", 32.3, 3.8, 35.4, 94.6),
  named("bridal-lilac-pop", "cork", 62, 1.8, 13, 14),
]);
foreground("bridal-cherry-clink", [
  named("bridal-cherry-clink", "left-flute", 0, 0, 40, 99),
  named("bridal-cherry-clink", "right-flute", 20, 4, 37, 89),
  named("bridal-cherry-clink", "bottle", 57, 2, 37, 96),
]);
for (const slug of [
  "bridal-blue-spritz",
  "bridal-pink-stripe-social",
  "bridal-mint-cheers",
  "bridal-lilac-happy-hour",
])
  foreground(slug, [
    named(slug, "left-coupe", 0, 1, 53, 98),
    named(slug, "right-coupe", 48, 7, 52, 93),
  ]);
for (const slug of ["bridal-mint-bash", "bridal-sunny-pop"])
  foreground(slug, [
    named(
      slug,
      "bottle",
      slug.endsWith("sunny-pop") ? 22.5 : 23.5,
      1,
      slug.endsWith("sunny-pop") ? 42 : 40,
      98,
    ),
    named(slug, "coupe", 63, 65, 24, 33),
  ]);
for (const slug of [
  "bridal-blush-label",
  "bridal-pink-country-club",
  "bridal-citrus-cool",
  "bridal-cherry-soda",
  "bridal-lilac-lemonade",
  "bridal-blush-boot-club",
])
  foreground(slug, [
    reused(
      templates.get(slug).visualAssets.selectedBridal.artwork,
      "artwork",
      0,
      0,
      100,
      100,
    ),
  ]);
add(
  "birthday-little-pizza-chef",
  [
    named("birthday-little-pizza-chef", "pizza", 4, 39, 92, 54, {
      portrait: position(2, 44, 96, 44),
    }),
    part("red-starburst", 5, 48, 7, 9),
  ],
  templates.get("birthday-little-pizza-chef").visualAssets.coverImage,
);
add(
  "birthday-slice-club",
  [
    named("birthday-slice-club", "pizza", 10, 7, 25, 24, {
      rotation: -12,
      portrait: position(10, 7, 33, 22),
    }),
    named("birthday-slice-club", "pizza", 64, 76, 27, 17, {
      rotation: 6,
      portrait: position(58, 73, 34, 22),
    }),
  ],
  templates.get("birthday-slice-club").visualAssets.coverImage,
);
add(
  "birthday-supper-club",
  [
    named("birthday-supper-club", "napkin", 39, 83, 51, 17),
    named("birthday-supper-club", "candle", 62, 0, 32, 84),
    named("birthday-supper-club", "coupe", 20, 45, 46, 42),
    named("birthday-supper-club", "olive-bowl", 50, 76, 32, 16),
  ],
  templates.get("birthday-supper-club").visualAssets.photoCard.background,
);
proposed["birthday-supper-club"].background.size = "cover";
proposed["birthday-supper-club"].container = "paper";

const registry = {};
const pending = [];
for (const [slug, record] of Object.entries(proposed)) {
  record.components = record.components.map((component, index) => ({
    ...component,
    id: `${component.id}-${index + 1}`,
  }));
  const files = [
    ...record.components.map((c) => c.image),
    ...(record.background.image ? [record.background.image] : []),
  ];
  const missing = [];
  for (const image of files) {
    try {
      await fs.access(`public${image}`);
    } catch {
      missing.push(image);
    }
  }
  if (missing.length) pending.push({ slug, missing });
  else registry[slug] = record;
}
await fs.writeFile(
  "src/invitations/data/generatedThemeLayers.json",
  JSON.stringify(registry, null, 2) + "\n",
);
await fs.writeFile(
  "output/imagegen/pending-theme-layers.json",
  JSON.stringify(pending, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    ready: Object.keys(registry).length,
    pending: pending.length,
  }),
);

const { separatedThemeAssets } =
  await import("../../src/invitations/data/separatedThemeAssets.js");
const themes = invitationTemplates.map((template) => {
  const layers = separatedThemeAssets[template.slug];
  const photo = template.visualAssets?.photoCard;
  const common = {
    slug: template.slug,
    category: template.category,
    visibility: template.status,
    textLayer: "localized HTML",
  };
  if (layers)
    return { ...common, separation: "independent-components", ...layers };
  if (photo?.artwork?.length)
    return {
      ...common,
      separation: "existing-layers",
      background: { image: photo.background },
      components: photo.artwork,
      note: "Existing independent illustrations or connected decorative frames retained.",
    };
  if (photo)
    return {
      ...common,
      separation: "background-only",
      background: { image: photo.background },
      components: [],
    };
  if (template.slug === "birthday-retro-pop")
    return {
      ...common,
      separation: "graphic-background",
      background: { image: template.visualAssets.coverImage },
      components: [],
      note: "The abstract print is treated as a single background.",
    };
  return {
    ...common,
    separation: "retained-scene",
    background: { image: template.visualAssets?.coverImage },
    components: [],
    note: "Integrated photographic scene or detailed collage retained as one image to preserve its composition, lighting and textures.",
  };
});
const summary = Object.fromEntries(
  [...new Set(themes.map((theme) => theme.separation))].map((kind) => [
    kind,
    themes.filter((theme) => theme.separation === kind).length,
  ]),
);
await fs.writeFile(
  "output/imagegen/theme-layer-audit.json",
  JSON.stringify(
    {
      total: themes.length,
      summary,
      categories: Object.fromEntries(
        ["Birthday", "Wedding", "Other", "Corporate"].map((category) => [
          category,
          themes.filter((theme) => theme.category === category).length,
        ]),
      ),
      granularity:
        "Independent decorative objects are separate layers. Intrinsic details, connected borders and connected narrative illustrations remain within their own illustration.",
      themes,
    },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify(summary));
