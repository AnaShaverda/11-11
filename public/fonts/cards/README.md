# Supplied card fonts

## Local Georgian 3D lettering

The user-added `../3d_unicode.ttf` is registered as **3D Unicode**, Regular (400).
It contains all 33 standard Georgian Mkhedruli letters and no English letters.
It is used for Georgian headings on Classic Celebration, Ribbon Sketch,
Paper Garland, Velvet Post and Y2K Digital. The existing supplied English display font remains
first in each shared stack; 3D Unicode renders the unsupported Georgian letters.
Each theme's requested weight remains the same in both languages.
The file is served locally; no third-party font request is made at runtime.

Author/source reference: [Alexander Melia, 3D Unicode](https://fonts.ge/en/font/638/3D-Unicode).
No separate license notice was supplied with the user's file or the matching
Typeface download; no additional license terms are inferred.

The upload `drive-download-20261002T194516Z-1-001` contained five families.
All five TTF/OTF files already used by the project were byte-for-byte identical to
the corresponding uploaded files. Their clean filenames and file contents are
preserved. Elegance also supplied an alternate OTF format, retained and registered
as a second source for the same family.

| Registered family | File | Theme use | Missing-glyph companion |
| --- | --- | --- | --- |
| Casmera Demo | casmera-demo.ttf | classic, scrapbook, retro parties | BPG Gorda |
| Magnola Demo | magnola-demo.ttf | soft floral, watercolor, baby cards | BPG Chveulebrivi |
| Zalino | zalino.ttf | editorial weddings, dinner, structured cards and details | BPG Serif Modern |
| Elegance Natural Valentine | elegance-natural-valentine.ttf / .otf | romantic, velvet and ribbon cards | BPG Nateli |
| Birthday | birthday.otf | handwritten, doodle, ballet and coquette cards | BPG Irubaqidze |

## Rendering

All font registrations live in `src/styles/fonts.css`. Theme assignments and
specimens live in `src/invitations/data/cardTypography.js`.
The supplied family is always first in its stack, for both Georgian and English.
No language-based font substitution or CSS Unicode restriction is applied.
Only characters absent from the primary font fall through to the downloaded
companion, then Noto Serif Georgian. Supplied files are Regular (400), but each design keeps its requested CSS weight
in both languages (for example, 600 stays 600). Weight synthesis is enabled for
static files without a matching bold face; artificial italic stays disabled.
The font registry declares the actual file weight and never resets text weights.

Website text keeps Heritage Legacy first, with Noto Serif Georgian for unsupported
glyphs. Card details use supplied Zalino independently of the website font.

## Source cleanup

Duplicate ZIP archives, duplicate extracted folders, and macOS metadata from the
uploaded font folder were removed after verifying that every font was preserved.
Publisher source links and the Elegance documentation are kept in `sources/`.
Casmera, Magnola and Zalino source readmes remain beside their font files.
Previous supplemental card fonts (Fraunces, Great Vibes, Patrick Hand and Barlow)
and unused Georgian Serif/Nino files were removed along with their registrations.
The five necessary Georgian companion fonts and their notices remain in
`georgian/`.

Georgian companions are from the BPG font distribution. Copyright/GPL notices are
preserved in `georgian/`. Original supplied font notices and documentation are
preserved; none of the font binaries was relabeled or modified.
