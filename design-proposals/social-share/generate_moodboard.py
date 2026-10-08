from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

ROOT = Path(__file__).resolve().parent
W, H = 1200, 630
WHITE = Image.open(ROOT / "logo-white.png").convert("RGBA")
BLACK = Image.open(ROOT / "logo-black.png").convert("RGBA")
FONT = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 30)
SMALL = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 23)


def gradient(stops):
    im = Image.new("RGB", (W, H))
    pix = im.load()
    for y in range(H):
        t = y / (H - 1)
        pos = t * (len(stops) - 1)
        a = stops[int(pos)]
        b = stops[min(len(stops) - 1, int(pos) + 1)]
        f = pos - int(pos)
        c = tuple(round(a[i] * (1 - f) + b[i] * f) for i in range(3))
        for x in range(W):
            pix[x, y] = c
    return im.convert("RGBA")


def grid(im, color, spacing=88, opacity=44):
    layer = Image.new("RGBA", im.size)
    d = ImageDraw.Draw(layer)
    for x in range(0, W, spacing):
        d.line((x, 0, x, H), fill=(*color, opacity), width=1)
    for y in range(0, H, spacing):
        d.line((0, y, W, y), fill=(*color, opacity), width=1)
    return Image.alpha_composite(im, layer)


def star(draw, x, y, r, color):
    pts = []
    for i in range(8):
        a = i * math.pi / 4 - math.pi / 2
        radius = r if i % 2 == 0 else r * .16
        pts.append((x + math.cos(a) * radius, y + math.sin(a) * radius))
    draw.polygon(pts, fill=color)


def logo(im, x, y, width, dark=False):
    source = BLACK if dark else WHITE
    asset = source.resize((width, round(width * source.height / source.width)), Image.Resampling.LANCZOS)
    im.alpha_composite(asset, (x, y))


def folder(im, x, y, color1, color2, scale=1):
    layer = Image.new("RGBA", (160, 172))
    d = ImageDraw.Draw(layer)
    d.polygon([(44, 8), (102, 8), (138, 44), (138, 143), (130, 151), (44, 151), (36, 143), (36, 16)], fill=color1)
    d.polygon([(102, 8), (102, 35), (111, 44), (138, 44)], fill="#fff9ff")
    d.rounded_rectangle((9, 68, 152, 169), radius=13, fill=color2, outline="#fff9ff", width=3)
    d.polygon([(9, 68), (46, 68), (65, 79), (9, 79)], fill=color2)
    for yy in range(91, 148, 11):
        d.line((52, yy, 119 if yy < 137 else 96, yy), fill=(255, 255, 255, 185), width=3)
    layer = layer.resize((round(160 * scale), round(172 * scale)), Image.Resampling.LANCZOS)
    im.alpha_composite(layer, (x, y))


def ornaments(im, light=False):
    d = ImageDraw.Draw(im)
    color = "#8c75ba" if light else "#f2cfef"
    for x, y, r in [(70, 104, 15), (1060, 88, 10), (1102, 500, 16), (135, 520, 9), (968, 216, 7)]:
        star(d, x, y, r, color)
    d.polygon([(1055, 325), (1080, 309), (1104, 324), (1079, 340)], fill="#ba80cf")
    d.polygon([(1055, 325), (1079, 340), (1079, 371), (1057, 355)], fill="#9453ae")
    d.polygon([(1079, 340), (1104, 324), (1100, 355), (1079, 371)], fill="#623080")


def make_a():
    im = grid(gradient([(7, 15, 80), (36, 19, 70), (146, 48, 84)]), (230, 90, 173), 90, 50)
    ornaments(im)
    logo(im, 404, 95, 392)
    return im


def make_b():
    im = grid(gradient([(8, 17, 75), (22, 28, 87), (59, 35, 105)]), (216, 62, 157), 90, 36)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((58, 58, 1142, 572), radius=31, fill=(15, 24, 76, 220), outline=(216, 208, 243, 88), width=2)
    logo(im, 92, 140, 340)
    for x, c1, c2 in [(545, "#16d4ef", "#0874f4"), (690, "#ffa4c1", "#f55b9a"), (835, "#ffe190", "#ff9b0b"), (980, "#6555fa", "#a32aee")]:
        folder(im, x, 228, c1, c2, .90)
    ornaments(im)
    return im


def make_c():
    im = grid(gradient([(238, 242, 255), (236, 231, 245), (248, 220, 231)]), (139, 115, 179), 90, 31)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((48, 45, 1152, 585), radius=38, fill=(255, 255, 255, 140), outline=(126, 104, 173, 80), width=2)
    logo(im, 405, 82, 390, dark=True)
    ornaments(im, light=True)
    return im


def make_d():
    im = gradient([(7, 15, 80), (36, 19, 70), (146, 48, 84)])
    d = ImageDraw.Draw(im)
    d.rectangle((600, 0, W, H), fill="#eae7f5")
    im = grid(im, (218, 85, 170), 88, 43)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((44, 54, 1156, 576), radius=34, outline=(255, 255, 255, 105), width=2)
    logo(im, 105, 135, 320)
    folder(im, 615, 210, "#16d4ef", "#0874f4", 1.05)
    folder(im, 777, 205, "#ffa4c1", "#f55b9a", 1.05)
    folder(im, 939, 210, "#6555fa", "#a32aee", 1.05)
    star(d, 541, 300, 28, "#ffc1e8")
    return im


options = [make_a(), make_b(), make_c(), make_d()]
labels = ["A  /  Signature grid", "B  /  Website folders", "C  /  Light mode", "D  /  Two worlds"]
board = Image.new("RGB", (2540, 1580), "#f7f5f9")
d = ImageDraw.Draw(board)
d.text((70, 27), "11:11  /  WEBSITE VISUALS  /  SOCIAL PREVIEW MOODBOARD", font=FONT, fill="#211a42")
for i, option in enumerate(options):
    x = 60 + (i % 2) * 1250
    y = 88 + (i // 2) * 740
    board.paste(option.convert("RGB"), (x, y))
    d.text((x + 3, y + 647), labels[i], font=FONT, fill="#211a42")
    d.text((x + 3, y + 685), "Actual 11:11 logo, palette, grid, stars and folder motifs", font=SMALL, fill="#655d7a")
board.save(ROOT / "website-social-moodboard.png", optimize=True)
for i, option in enumerate(options):
    option.convert("RGB").save(ROOT / f"option-{chr(97+i)}.png", optimize=True)
print(ROOT / "website-social-moodboard.png")
