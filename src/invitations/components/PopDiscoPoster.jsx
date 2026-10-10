import { captionValue } from "../../localization/captionValues.js";
import '../ribbon-sketch/fonts.css';
import '../../styles/pop-disco.css';
export default function PopDiscoPoster({sample,language,presentation,className='',ariaLabel}){
 const ka=language==='ka';
 return <div lang={language} className={`pd-poster ${presentation==='portrait'?'pd-poster-portrait':''} ${className}`} role="img" aria-label={ariaLabel||sample.title} style={{containerType:'inline-size'}}><p>{captionValue("ui.invitations.components.PopDiscoPoster.youReInvited", language)}</p><h3><span>{sample.name}</span><span>{captionValue("ui.invitations.components.PopDiscoPoster.turns", language, { value1: sample.age??33 })}</span></h3><small>{sample.date}<br/>{sample.time}<br/>{sample.location}</small><img src="/images/birthday/disco-scrapbook/pop-disco/mirrorball.webp" alt=""/><span className="pd-poster-hand">{captionValue("ui.invitations.components.PopDiscoPoster.sameDanceFloorWilderDreams", language)}</span></div>;
}
