import json
from PIL import Image, ImageOps, ImageDraw
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader
items=json.load(open('tmp/pdfs/ani/captures.json'))
# Contact sheet for visual review
sheet=Image.new('RGB',(1400,1040),'#fff5f7'); d=ImageDraw.Draw(sheet)
for i,item in enumerate(items):
 im=Image.open(item['file']).convert('RGB'); im.thumbnail((190,450))
 x=(i%7)*200+(200-im.width)//2;y=(i//7)*520+45
 sheet.paste(im,(x,y));d.text(((i%7)*200+8,(i//7)*520+12),item['device']+' '+item['label'][:21],fill='#71283e')
sheet.save('tmp/pdfs/ani/contact.png')
out='output/pdf/ani-desktop-and-mobile-design.pdf'
c=canvas.Canvas(out,pagesize=(1080,820));c.setTitle('Ani - Desktop and Mobile Design Screens');c.setAuthor('11:11')
for n,item in enumerate(items,1):
 im=Image.open(item['file']);iw,ih=im.size
 # preserve screenshot scale and accommodate the complete section without splitting
 pw=1080 if item['device']=='Desktop' else 520
 scale=(pw-40)/iw;ph=ih*scale+90
 c.setPageSize((pw,ph));c.setFillColorRGB(1,.97,.98);c.rect(0,0,pw,ph,fill=1,stroke=0)
 c.setFillColorRGB(.43,.12,.23);c.setFont('Helvetica-Bold',13);c.drawString(20,ph-25,f"Ani / {item['device']} / {item['label']}")
 c.setFont('Helvetica',9);c.drawString(20,ph-42,f"Viewport {item['width']} x {item['height']} px | Design screen export")
 c.drawImage(ImageReader(im),20,35,width=iw*scale,height=ih*scale)
 c.setFont('Helvetica',8);c.drawString(20,16,'Static PDF: music, animation and touch interactions run in the website.')
 c.drawRightString(pw-20,16,f'{n} / {len(items)}')
 c.bookmarkPage(f'screen-{n}');c.addOutlineEntry(f"{item['device']} - {item['label']}",f'screen-{n}',0)
 c.showPage()
c.save()
r=PdfReader(out);assert len(r.pages)==14
print(out,len(r.pages),'pages')
