import { chromium } from '/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const browser = await chromium.launch({headless:true,channel:"chrome"});
const captures=[];
for (const [device,width,height] of [['Desktop',1440,1000],['Mobile',390,844]]) {
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:2,reducedMotion:'reduce'});
 await page.goto('http://localhost:5173/surprises/for/a1cbe778fe47dc687ef50b9f24d4981d',{waitUntil:'networkidle'});
 await page.locator('.birthday-site').waitFor();
 await page.evaluate(async()=>{await document.fonts.ready; const root=[...document.querySelectorAll('*')].find(e=>e.shadowRoot)?.shadowRoot; await Promise.all([...root.querySelectorAll('img')].map(i=>i.decode().catch(()=>{})));});
 const sections=page.locator('.birthday-site > section');
 console.log(device,'sections',await sections.count());
 for(let i=0;i<await sections.count();i++) {
 const section=sections.nth(i); const label=await section.getAttribute('aria-label');
 const file=`tmp/pdfs/ani/${device.toLowerCase()}-${i+1}.png`;
 await section.screenshot({path:file,animations:'disabled'});
 captures.push({device,width,height,label:label||`Screen ${i+1}`,file});
 }
 await page.locator('.open-button').click();
 await page.waitForTimeout(700);
 let file=`tmp/pdfs/ani/${device.toLowerCase()}-card-open.png`;
 await sections.nth(0).screenshot({path:file,animations:'disabled'});
 captures.push({device,width,height,label:'Birthday card - opened',file});
 for(let i=0;i<12;i++) await page.locator('button.scratch-surface').evaluate(el=>el.click());
 file=`tmp/pdfs/ani/${device.toLowerCase()}-surprise-revealed.png`;
 await page.locator('.scratch-page').screenshot({path:file,animations:'disabled'});
 captures.push({device,width,height,label:'Birthday surprise - revealed',file});
 console.log(device,JSON.stringify(await page.locator('.birthday-site img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src))));
 await page.close();
}
fs.writeFileSync('tmp/pdfs/ani/captures.json',JSON.stringify(captures,null,2));
await browser.close();
