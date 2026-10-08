from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "ani-social-preview.jpg"
ASSETS = ROOT / "public" / "custom-orders" / "a1cbe778fe47dc687ef50b9f24d4981d" / "images"

W, H = 1200, 630
image = Image.new("RGB", (W, H), "#e894ad")
d = ImageDraw.Draw(image)
for y in range(H):
    blend = y / H
    color = (round(247 - 29 * blend), round(181 - 76 * blend), round(198 - 39 * blend))
    d.line((0, y, W, y), fill=color)
for y in range(0, H, 5):
    d.line((0, y, W, y), fill=(160, 54, 83), width=1)
for x in range(0, W, 90):
    d.line((x, 0, x, H), fill=(190, 82, 113), width=1)

glow = Image.new("RGBA", (W, H))
gd = ImageDraw.Draw(glow)
gd.ellipse((628, 48, 1208, 628), fill=(255, 232, 239, 115))
glow = glow.filter(ImageFilter.GaussianBlur(65))
image = Image.alpha_composite(image.convert("RGBA"), glow)
d = ImageDraw.Draw(image)

def sparkle(x, y, radius, fill):
    pts = []
    for n in range(8):
        angle = n * math.pi / 4 - math.pi / 2
        r = radius if n % 2 == 0 else radius * .13
        pts.append((x + math.cos(angle) * r, y + math.sin(angle) * r))
    d.polygon(pts, fill=fill)

for x, y, radius in [(71, 69, 17), (1133, 93, 20), (1080, 520, 13), (731, 560, 9), (1140, 304, 8)]:
    sparkle(x, y, radius, "#fff5e9")
for x, y, radius in [(1014, 35, 8), (612, 52, 8), (1168, 436, 9)]:
    sparkle(x, y, radius, "#e71f78")

# The cream card and lettering echo the card that opens on Ani's page.
d.rounded_rectangle((72, 79, 705, 555), radius=8, fill="#fff2df", outline="#b52b35", width=3)
d.rounded_rectangle((88, 95, 689, 539), radius=3, outline="#e7b6b7", width=2)
d.line((111, 158, 666, 158), fill="#df9da6", width=2)
d.line((111, 470, 666, 470), fill="#df9da6", width=2)

serif = ImageFont.truetype(r"C:\Windows\Fonts\georgia.ttf", 77)
sans = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 20)
small = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 18)
d.text((112, 119), "ESPECIALLY FOR ANI", font=small, fill="#b52b35", stroke_width=0)
d.text((111, 197), "Happy Birthday,", font=serif, fill="#ae2439")
d.text((111, 285), "Ani!", font=serif, fill="#ae2439")
d.text((112, 494), "FROM AKH NETAVI, WITH LOVE", font=small, fill="#b52b35")

cake = Image.open(ASSETS / "birthday-cake-flat.png").convert("RGBA")
cake.thumbnail((455, 415), Image.Resampling.LANCZOS)
image.alpha_composite(cake, (747, 163))
candles = Image.open(ASSETS / "number-25-candles.png").convert("RGBA")
candles.thumbnail((155, 155), Image.Resampling.LANCZOS)
image.alpha_composite(candles, (898, 165))

d = ImageDraw.Draw(image)
d.rounded_rectangle((903, 24, 1132, 143), radius=20, fill="#55172d")
logo = Image.open(ROOT / "design-proposals" / "social-share" / "logo-pink-star.png").convert("RGBA")
logo.thumbnail((130, 110), Image.Resampling.LANCZOS)
image.alpha_composite(logo, (952, 28))

image.convert("RGB").save(OUT, quality=91, optimize=True, progressive=True)
print(OUT)
