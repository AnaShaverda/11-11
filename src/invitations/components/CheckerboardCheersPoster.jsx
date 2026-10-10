import { captionValue } from "../../localization/captionValues.js";
import '../../styles/checkerboard-cheers.css';
export default function CheckerboardCheersPoster({sample,language,presentation,className='',ariaLabel}){
 const ka=language==='ka';
 return <div className={`cc-poster cc-poster-grand ${presentation==='portrait'?'cc-poster--portrait':''} ${className}`} lang={language} role="img" aria-label={ariaLabel||sample.title} style={{containerType:'inline-size'}}><div className="cc-poster-paper"><h3>{captionValue("ui.invitations.components.CheckerboardCheersPoster.letTheGoodTimesFlow", language)}</h3><p>{captionValue("ui.invitations.components.CheckerboardCheersPoster.turns", language, { value1: sample.name, value2: sample.age??28 })}</p><small>{sample.date} · {sample.time} · {sample.location}</small></div><img className="cc-poster-glass cc-poster-martini" src="/images/birthday/checkerboard-cheers/painted-olive-martini.webp" alt=""/><img className="cc-poster-glass cc-poster-spritz" src="/images/components/separated/checkerboard-spritz.webp" alt=""/></div>;
}
